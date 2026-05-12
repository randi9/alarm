import { Env } from '../types'

export function basicAuth(request: Request, env: Env): Response | null {
  const authHeader = request.headers.get('Authorization')

  if (!authHeader || !authHeader.startsWith('Basic ')) {
    return new Response('Unauthorized', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Admin"',
      },
    })
  }

  const base64Credentials = authHeader.split(' ')[1]
  const credentials = atob(base64Credentials)
  const [username, password] = credentials.split(':')

  if (username !== env.ADMIN_USERNAME || password !== env.ADMIN_PASSWORD) {
    return new Response('Unauthorized', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Admin"',
      },
    })
  }

  return null // Auth success
}
