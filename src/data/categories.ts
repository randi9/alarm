export interface Category {
  slug: string
  label: string
  icon: string
  color: string
  description: string
}

export const categories: Category[] = [
  {
    slug: 'trending',
    label: 'Trending',
    icon: 'mdi:fire',
    color: '#EF4444',
    description: 'Ringtone dan alarm yang lagi viral dan paling banyak di-download minggu ini!'
  },
  {
    slug: 'lucu-receh',
    label: 'Lucu & Receh',
    icon: 'mdi:emoticon-lol-outline',
    color: '#F59E0B',
    description: 'Alarm lucu yang bikin kamu bangun sambil ketawa. Dijamin hari-harimu lebih seru!'
  },
  {
    slug: 'islami',
    label: 'Islami',
    icon: 'mdi:mosque',
    color: '#10B981',
    description: 'Reminder sholat, adzan, dan motivasi islami untuk memulai pagi dengan berkah.'
  },
  {
    slug: 'anime-wibu',
    label: 'Anime & Wibu',
    icon: 'mdi:star-four-points',
    color: '#EC4899',
    description: 'Alarm ala anime Jepang! Dari waifu yang bangunin sampai opening theme legendaris.'
  },
  {
    slug: 'suara-emak',
    label: 'Suara Emak',
    icon: 'mdi:account-voice',
    color: '#F97316',
    description: 'Suara emak marah yang bikin kamu langsung loncat dari kasur. Nostalgia masa kecil!'
  },
  {
    slug: 'logat-daerah',
    label: 'Logat Daerah',
    icon: 'mdi:translate',
    color: '#8B5CF6',
    description: 'Alarm pakai logat daerah dari Sabang sampai Merauke. Bangun dengan cinta lokal!'
  },
  {
    slug: 'horror',
    label: 'Horror',
    icon: 'mdi:ghost',
    color: '#6B7280',
    description: 'Buat kamu yang susah bangun — alarm horror dijamin bikin kamu nggak bisa tidur lagi!'
  },
  {
    slug: 'motivasi-toxic',
    label: 'Motivasi Toxic',
    icon: 'mdi:briefcase-outline',
    color: '#3B82F6',
    description: 'Alarm motivasi yang nyelekit tapi efektif. Bangun karena takut kalah dari orang lain!'
  },
  {
    slug: 'gebetan',
    label: 'Gebetan / Romantis',
    icon: 'mdi:heart-multiple',
    color: '#F43F5E',
    description: 'Alarm lembut dari "gebetan" virtual. Bangun pagi jadi lebih semangat~'
  },
  {
    slug: 'jingle-musik',
    label: 'Jingle & Musik',
    icon: 'mdi:music-note',
    color: '#14B8A6',
    description: 'Jingle catchy dan musik pendek yang cocok buat ringtone atau notifikasi.'
  }
]

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find(c => c.slug === slug)
}
