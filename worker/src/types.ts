export interface Env {
  DB: D1Database
  AUDIO_BUCKET: R2Bucket
  ADMIN_USERNAME: string
  ADMIN_PASSWORD: string
  R2_PUBLIC_URL: string
}

// Database row types
export interface CategoryRow {
  id: number
  slug: string
  label: string
  icon: string
  color: string
  description: string
  sort_order: number
  created_at: string
  updated_at: string
}

export interface RingtoneRow {
  id: number
  slug: string
  title: string
  category_slug: string
  description: string
  duration: string
  duration_ms: number
  downloads: number
  rating: number
  audio_filename: string
  audio_url: string
  file_size: number
  mime_type: string
  is_featured: number
  is_trending: number
  is_premium: number
  affiliate_url: string
  status: string
  created_at: string
  updated_at: string
  // Joined fields
  category_label?: string
  category_icon?: string
  category_color?: string
}

export interface TagRow {
  id: number
  name: string
}

// API request/response types
export interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  error?: string
  meta?: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

export interface RingtoneCreateInput {
  title: string
  category_slug: string
  description?: string
  duration?: string
  duration_ms?: number
  rating?: number
  tags?: string[]
  is_featured?: boolean
  is_trending?: boolean
  is_premium?: boolean
  affiliate_url?: string
}

export interface RingtoneUpdateInput {
  title?: string
  category_slug?: string
  description?: string
  duration?: string
  duration_ms?: number
  rating?: number
  tags?: string[]
  is_featured?: boolean
  is_trending?: boolean
  is_premium?: boolean
  affiliate_url?: string
  status?: string
}

export interface CategoryInput {
  slug?: string
  label: string
  icon?: string
  color?: string
  description?: string
  sort_order?: number
}
