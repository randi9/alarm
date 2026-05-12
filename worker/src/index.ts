import { Env } from './types'
import { handleRequest } from './router'

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    try {
      return await handleRequest(request, env)
    } catch (error) {
      console.error('Unhandled error:', error)
      return Response.json(
        { success: false, error: 'Internal Server Error' },
        {
          status: 500,
          headers: {
            'Access-Control-Allow-Origin': '*',
          },
        }
      )
    }
  },
}
