import { Env, CategoryRow } from '../types'

export async function listCategories(env: Env): Promise<Response> {
  const result = await env.DB.prepare(`
    SELECT * FROM categories ORDER BY sort_order ASC
  `).all<CategoryRow>()

  return Response.json({ success: true, data: result.results })
}

export async function getCategory(slug: string, env: Env): Promise<Response> {
  const category = await env.DB.prepare(`
    SELECT * FROM categories WHERE slug = ?
  `).bind(slug).first<CategoryRow>()

  if (!category) {
    return Response.json({ success: false, error: 'Category not found' }, { status: 404 })
  }

  return Response.json({ success: true, data: category })
}

export async function createCategory(req: Request, env: Env): Promise<Response> {
  try {
    const data = await req.json() as any
    
    if (!data.slug || !data.label) {
      return Response.json({ success: false, error: 'Missing slug or label' }, { status: 400 })
    }

    await env.DB.prepare(`
      INSERT INTO categories (slug, label, icon, color, description, sort_order)
      VALUES (?, ?, ?, ?, ?, ?)
    `).bind(
      data.slug, 
      data.label, 
      data.icon || 'mdi:music-note', 
      data.color || '#6D28D9', 
      data.description || '', 
      data.sort_order || 0
    ).run()

    return Response.json({ success: true, data: { slug: data.slug } }, { status: 201 })
  } catch (err: any) {
    return Response.json({ success: false, error: err.message }, { status: 400 })
  }
}

export async function updateCategory(slug: string, req: Request, env: Env): Promise<Response> {
  try {
    const data = await req.json() as any
    const updates: string[] = []
    const params: any[] = []

    const allowedFields = ['label', 'icon', 'color', 'description', 'sort_order']
    
    for (const field of allowedFields) {
      if (data[field] !== undefined) {
        updates.push(`${field} = ?`)
        params.push(data[field])
      }
    }

    if (updates.length > 0) {
      updates.push("updated_at = datetime('now')")
      params.push(slug)
      
      await env.DB.prepare(`
        UPDATE categories SET ${updates.join(', ')} WHERE slug = ?
      `).bind(...params).run()
    }

    return Response.json({ success: true })
  } catch (err: any) {
    return Response.json({ success: false, error: err.message }, { status: 400 })
  }
}

export async function deleteCategory(slug: string, env: Env): Promise<Response> {
  // First check if there are ringtones in this category
  const count = await env.DB.prepare(
    'SELECT COUNT(*) as total FROM ringtones WHERE category_slug = ?'
  ).bind(slug).first<{total: number}>()

  if (count && count.total > 0) {
    return Response.json({ 
      success: false, 
      error: 'Cannot delete category with existing ringtones' 
    }, { status: 400 })
  }

  await env.DB.prepare('DELETE FROM categories WHERE slug = ?').bind(slug).run()

  return Response.json({ success: true })
}
