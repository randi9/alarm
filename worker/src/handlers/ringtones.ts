import { Env, RingtoneRow } from '../types'

function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '')
}

export async function listRingtones(req: Request, env: Env): Promise<Response> {
  const url = new URL(req.url)
  const page = parseInt(url.searchParams.get('page') || '1')
  const limit = Math.min(parseInt(url.searchParams.get('limit') || '20'), 50)
  const category = url.searchParams.get('category')
  const sort = url.searchParams.get('sort') || 'downloads'
  const q = url.searchParams.get('q')
  const isFeatured = url.searchParams.get('featured')
  const isTrending = url.searchParams.get('trending')
  const offset = (page - 1) * limit

  let whereClauses = ["r.status = 'published'"]
  const params: any[] = []

  if (category) {
    whereClauses.push('r.category_slug = ?')
    params.push(category)
  }
  if (q) {
    whereClauses.push('(r.title LIKE ? OR r.description LIKE ?)')
    params.push(`%${q}%`, `%${q}%`)
  }
  if (isFeatured === 'true') {
    whereClauses.push('r.is_featured = 1')
  }
  if (isTrending === 'true') {
    whereClauses.push('r.is_trending = 1')
  }

  const where = whereClauses.length > 0 ? `WHERE ${whereClauses.join(' AND ')}` : ''

  const orderMap: Record<string, string> = {
    downloads: 'r.downloads DESC',
    rating: 'r.rating DESC',
    newest: 'r.created_at DESC'
  }
  const orderBy = orderMap[sort] || 'r.downloads DESC'

  const countResult = await env.DB.prepare(
    `SELECT COUNT(*) as total FROM ringtones r ${where}`
  ).bind(...params).first<{ total: number }>()

  const rows = await env.DB.prepare(`
    SELECT r.*, c.label as category_label, c.icon as category_icon, c.color as category_color
    FROM ringtones r
    JOIN categories c ON r.category_slug = c.slug
    ${where}
    ORDER BY ${orderBy}
    LIMIT ? OFFSET ?
  `).bind(...params, limit, offset).all<RingtoneRow>()

  // Get tags for the ringtones
  const ringtones = rows.results
  if (ringtones && ringtones.length > 0) {
    const slugs = ringtones.map(r => `'${r.slug}'`).join(',')
    const tagsResult = await env.DB.prepare(`
      SELECT rt.ringtone_slug, t.name
      FROM ringtone_tags rt
      JOIN tags t ON rt.tag_id = t.id
      WHERE rt.ringtone_slug IN (${slugs})
    `).all<{ ringtone_slug: string, name: string }>()
    
    const tagsByRingtone: Record<string, string[]> = {}
    tagsResult.results.forEach(row => {
      if (!tagsByRingtone[row.ringtone_slug]) {
        tagsByRingtone[row.ringtone_slug] = []
      }
      tagsByRingtone[row.ringtone_slug].push(row.name)
    })

    ringtones.forEach((r: any) => {
      r.tags = tagsByRingtone[r.slug] || []
    })
  }

  return Response.json({
    success: true,
    data: ringtones,
    meta: {
      page, limit,
      total: countResult?.total || 0,
      totalPages: Math.ceil((countResult?.total || 0) / limit)
    }
  })
}

export async function getRingtone(slug: string, env: Env): Promise<Response> {
  const ringtone = await env.DB.prepare(`
    SELECT r.*, c.label as category_label, c.icon as category_icon, c.color as category_color
    FROM ringtones r
    JOIN categories c ON r.category_slug = c.slug
    WHERE r.slug = ? AND r.status = 'published'
  `).bind(slug).first<RingtoneRow>()

  if (!ringtone) {
    return Response.json({ success: false, error: 'Ringtone not found' }, { status: 404 })
  }

  const tagsResult = await env.DB.prepare(`
    SELECT t.name
    FROM ringtone_tags rt
    JOIN tags t ON rt.tag_id = t.id
    WHERE rt.ringtone_slug = ?
  `).bind(slug).all<{ name: string }>()

  const result = {
    ...ringtone,
    tags: tagsResult.results.map(t => t.name)
  }

  return Response.json({ success: true, data: result })
}

export async function incrementDownload(slug: string, env: Env): Promise<Response> {
  await env.DB.prepare(
    'UPDATE ringtones SET downloads = downloads + 1 WHERE slug = ?'
  ).bind(slug).run()
  
  return Response.json({ success: true })
}

export async function createRingtone(req: Request, env: Env): Promise<Response> {
  const formData = await req.formData()
  const audioFile = formData.get('audio') as File | null
  const metadataStr = formData.get('metadata') as string | null

  if (!audioFile || !metadataStr) {
    return Response.json({ success: false, error: 'Missing audio file or metadata' }, { status: 400 })
  }

  const metadata = JSON.parse(metadataStr)

  if (!metadata.title || !metadata.category_slug) {
    return Response.json({ success: false, error: 'Missing title or category_slug' }, { status: 400 })
  }

  let slug = slugify(metadata.title)
  
  // Ensure unique slug
  let slugExists = await env.DB.prepare('SELECT id FROM ringtones WHERE slug = ?').bind(slug).first()
  let counter = 1
  while (slugExists) {
    slug = `${slugify(metadata.title)}-${counter}`
    slugExists = await env.DB.prepare('SELECT id FROM ringtones WHERE slug = ?').bind(slug).first()
    counter++
  }

  const ext = audioFile.name.split('.').pop() || 'mp3'
  const filename = `${slug}.${ext}`

  // Upload to R2
  await env.AUDIO_BUCKET.put(`ringtones/${filename}`, audioFile.stream(), {
    httpMetadata: { contentType: audioFile.type }
  })

  // Insert to D1
  const audioUrl = `${env.R2_PUBLIC_URL}/ringtones/${filename}`
  await env.DB.prepare(`
    INSERT INTO ringtones (slug, title, category_slug, description, duration,
      duration_ms, audio_filename, audio_url, file_size, mime_type,
      is_featured, is_trending, is_premium, affiliate_url, status)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).bind(
    slug, metadata.title, metadata.category_slug,
    metadata.description || '', metadata.duration || '0:00',
    metadata.duration_ms || 0, filename, audioUrl,
    audioFile.size, audioFile.type,
    metadata.is_featured ? 1 : 0,
    metadata.is_trending ? 1 : 0,
    metadata.is_premium ? 1 : 0,
    metadata.affiliate_url || '',
    metadata.status || 'published'
  ).run()

  // Insert tags
  if (metadata.tags && metadata.tags.length > 0) {
    for (const tag of metadata.tags) {
      await env.DB.prepare('INSERT OR IGNORE INTO tags (name) VALUES (?)').bind(tag).run()
      const tagRow = await env.DB.prepare('SELECT id FROM tags WHERE name = ?').bind(tag).first<{id: number}>()
      if (tagRow) {
        await env.DB.prepare(
          'INSERT OR IGNORE INTO ringtone_tags (ringtone_slug, tag_id) VALUES (?, ?)'
        ).bind(slug, tagRow.id).run()
      }
    }
  }

  return Response.json({ success: true, data: { slug, audioUrl } }, { status: 201 })
}

export async function updateRingtone(slug: string, req: Request, env: Env): Promise<Response> {
  try {
    const data = await req.json() as any
    const updates: string[] = []
    const params: any[] = []

    const allowedFields = ['title', 'category_slug', 'description', 'duration', 'duration_ms', 'rating', 'is_featured', 'is_trending', 'is_premium', 'affiliate_url', 'status']
    
    for (const field of allowedFields) {
      if (data[field] !== undefined) {
        updates.push(`${field} = ?`)
        params.push(typeof data[field] === 'boolean' ? (data[field] ? 1 : 0) : data[field])
      }
    }

    if (updates.length > 0) {
      updates.push("updated_at = datetime('now')")
      params.push(slug)
      
      await env.DB.prepare(`
        UPDATE ringtones SET ${updates.join(', ')} WHERE slug = ?
      `).bind(...params).run()
    }

    if (data.tags !== undefined) {
      // Clear existing tags
      await env.DB.prepare('DELETE FROM ringtone_tags WHERE ringtone_slug = ?').bind(slug).run()
      
      // Add new tags
      for (const tag of data.tags) {
        await env.DB.prepare('INSERT OR IGNORE INTO tags (name) VALUES (?)').bind(tag).run()
        const tagRow = await env.DB.prepare('SELECT id FROM tags WHERE name = ?').bind(tag).first<{id: number}>()
        if (tagRow) {
          await env.DB.prepare(
            'INSERT OR IGNORE INTO ringtone_tags (ringtone_slug, tag_id) VALUES (?, ?)'
          ).bind(slug, tagRow.id).run()
        }
      }
    }

    return Response.json({ success: true })
  } catch (err: any) {
    return Response.json({ success: false, error: err.message }, { status: 400 })
  }
}

export async function deleteRingtone(slug: string, env: Env): Promise<Response> {
  const ringtone = await env.DB.prepare(
    'SELECT audio_filename FROM ringtones WHERE slug = ?'
  ).bind(slug).first<{audio_filename: string}>()

  if (!ringtone) {
    return Response.json({ success: false, error: 'Not found' }, { status: 404 })
  }

  // Delete from R2
  await env.AUDIO_BUCKET.delete(`ringtones/${ringtone.audio_filename}`)

  // Delete from D1
  await env.DB.prepare('DELETE FROM ringtones WHERE slug = ?').bind(slug).run()

  return Response.json({ success: true })
}
