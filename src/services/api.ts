const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8787'

// Public API
export const api = {
  async getRingtones(params?: {
    page?: number
    limit?: number
    category?: string
    sort?: string
    q?: string
    featured?: boolean
    trending?: boolean
  }) {
    const query = new URLSearchParams()
    if (params?.page) query.set('page', String(params.page))
    if (params?.limit) query.set('limit', String(params.limit))
    if (params?.category) query.set('category', params.category)
    if (params?.sort) query.set('sort', params.sort)
    if (params?.q) query.set('q', params.q)
    if (params?.featured) query.set('featured', 'true')
    if (params?.trending) query.set('trending', 'true')
    
    const res = await fetch(`${API_BASE}/api/ringtones?${query.toString()}`)
    return res.json()
  },

  async getRingtone(slug: string) {
    const res = await fetch(`${API_BASE}/api/ringtones/${slug}`)
    return res.json()
  },

  async getCategories() {
    const res = await fetch(`${API_BASE}/api/categories`)
    return res.json()
  },

  async getCategory(slug: string) {
    const res = await fetch(`${API_BASE}/api/categories/${slug}`)
    return res.json()
  },

  async incrementDownload(slug: string) {
    const res = await fetch(`${API_BASE}/api/ringtones/${slug}/download`, {
      method: 'POST'
    })
    return res.json()
  }
}

// Admin API
const getAuthHeaders = () => {
  const token = localStorage.getItem('admin_token')
  return {
    'Authorization': `Basic ${token}`,
    'Content-Type': 'application/json'
  }
}

export const adminApi = {
  // Categories
  async createCategory(data: any) {
    const res = await fetch(`${API_BASE}/api/admin/categories`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data)
    })
    return res.json()
  },
  async updateCategory(slug: string, data: any) {
    const res = await fetch(`${API_BASE}/api/admin/categories/${slug}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(data)
    })
    return res.json()
  },
  async deleteCategory(slug: string) {
    const res = await fetch(`${API_BASE}/api/admin/categories/${slug}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    })
    return res.json()
  },

  // Ringtones
  async createRingtone(formData: FormData) {
    // FormData doesn't need Content-Type header (browser sets boundary)
    const token = localStorage.getItem('admin_token')
    const res = await fetch(`${API_BASE}/api/admin/ringtones`, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${token}`
      },
      body: formData
    })
    return res.json()
  },
  async updateRingtone(slug: string, data: any) {
    const res = await fetch(`${API_BASE}/api/admin/ringtones/${slug}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(data)
    })
    return res.json()
  },
  async deleteRingtone(slug: string) {
    const res = await fetch(`${API_BASE}/api/admin/ringtones/${slug}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    })
    return res.json()
  }
}
