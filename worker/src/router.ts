import { Env } from './types'
import { basicAuth } from './middleware/auth'
import {
  listRingtones,
  getRingtone,
  createRingtone,
  updateRingtone,
  deleteRingtone,
  incrementDownload,
} from './handlers/ringtones'
import {
  listCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} from './handlers/categories'

export async function handleRequest(request: Request, env: Env): Promise<Response> {
  const url = new URL(request.url)
  const pathname = url.pathname
  const method = request.method

  // CORS headers
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  }

  // Handle CORS preflight requests
  if (method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: corsHeaders,
    })
  }

  const withCors = (response: Response) => {
    Object.entries(corsHeaders).forEach(([key, value]) => {
      response.headers.set(key, value)
    })
    return response
  }

  try {
    // --- Public API ---

    // Ringtones
    if (method === 'GET' && pathname === '/api/ringtones') {
      return withCors(await listRingtones(request, env))
    }
    const ringtoneMatch = pathname.match(/^\/api\/ringtones\/([^/]+)$/)
    if (method === 'GET' && ringtoneMatch) {
      return withCors(await getRingtone(ringtoneMatch[1], env))
    }
    const downloadMatch = pathname.match(/^\/api\/ringtones\/([^/]+)\/download$/)
    if (method === 'POST' && downloadMatch) {
      return withCors(await incrementDownload(downloadMatch[1], env))
    }

    // Categories
    if (method === 'GET' && pathname === '/api/categories') {
      return withCors(await listCategories(env))
    }
    const categoryMatch = pathname.match(/^\/api\/categories\/([^/]+)$/)
    if (method === 'GET' && categoryMatch) {
      return withCors(await getCategory(categoryMatch[1], env))
    }

    // Download proxy — serves audio files from R2 with proper headers
    const proxyMatch = pathname.match(/^\/api\/download\/([^/]+)$/)
    if (method === 'GET' && proxyMatch) {
      const slug = proxyMatch[1]
      // Look up ringtone to get the R2 key
      const row: any = await env.DB.prepare('SELECT audio_url, title FROM ringtones WHERE slug = ?').bind(slug).first()
      if (!row) {
        return withCors(Response.json({ success: false, error: 'Not found' }, { status: 404 }))
      }
      // Extract R2 key from the full URL (e.g. "https://audio.alarmu.site/ringtones/file.mp3" → "ringtones/file.mp3")
      const r2Key = row.audio_url.replace(/^https?:\/\/[^/]+\//, '')
      const object = await env.AUDIO_BUCKET.get(r2Key)
      if (!object) {
        return withCors(Response.json({ success: false, error: 'File not found in storage' }, { status: 404 }))
      }
      const filename = `${slug}.mp3`
      const headers = new Headers(corsHeaders)
      headers.set('Content-Type', object.httpMetadata?.contentType || 'audio/mpeg')
      headers.set('Content-Disposition', `attachment; filename="${filename}"`)
      if (object.size) headers.set('Content-Length', String(object.size))
      return new Response(object.body, { headers })
    }

    // --- Admin API ---

    if (pathname.startsWith('/api/admin/')) {
      const authResponse = basicAuth(request, env)
      if (authResponse) return withCors(authResponse)

      // Admin Categories (GET for auth verification + listing)
      if (method === 'GET' && pathname === '/api/admin/categories') {
        return withCors(await listCategories(env))
      }

      // Admin Ringtones
      if (method === 'POST' && pathname === '/api/admin/ringtones') {
        return withCors(await createRingtone(request, env))
      }
      const adminRingtoneMatch = pathname.match(/^\/api\/admin\/ringtones\/([^/]+)$/)
      if (method === 'PUT' && adminRingtoneMatch) {
        return withCors(await updateRingtone(adminRingtoneMatch[1], request, env))
      }
      if (method === 'DELETE' && adminRingtoneMatch) {
        return withCors(await deleteRingtone(adminRingtoneMatch[1], env))
      }

      // Admin Categories
      if (method === 'POST' && pathname === '/api/admin/categories') {
        return withCors(await createCategory(request, env))
      }
      const adminCategoryMatch = pathname.match(/^\/api\/admin\/categories\/([^/]+)$/)
      if (method === 'PUT' && adminCategoryMatch) {
        return withCors(await updateCategory(adminCategoryMatch[1], request, env))
      }
      if (method === 'DELETE' && adminCategoryMatch) {
        return withCors(await deleteCategory(adminCategoryMatch[1], env))
      }
    }

    return withCors(
      Response.json({ success: false, error: 'Not Found' }, { status: 404 })
    )
  } catch (error: any) {
    console.error('API Error:', error)
    return withCors(
      Response.json(
        { success: false, error: error.message || 'Internal Server Error' },
        { status: 500 }
      )
    )
  }
}
