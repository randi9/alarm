export interface Ringtone {
  id: string
  title: string
  category: string
  categoryLabel: string
  description: string
  duration: string
  downloads: number
  rating: number
  dateAdded: string
  audioFile: string
  tags: string[]
  isFeatured: boolean
  isTrending: boolean
}

export const ringtones: Ringtone[] = [
  // === Suara Emak ===
  {
    id: 'emak-marah-subuh',
    title: 'Emak Marah Suruh Bangun Subuh',
    category: 'suara-emak',
    categoryLabel: 'Suara Emak',
    description: 'Alarm suara emak yang marah-marah suruh bangun subuh. Dijamin langsung melek!',
    duration: '0:15',
    downloads: 23400,
    rating: 4.9,
    dateAdded: '2026-05-01',
    audioFile: '/audio/placeholder.mp3',
    tags: ['lucu', 'emak', 'subuh', 'alarm', 'viral'],
    isFeatured: true,
    isTrending: true
  },
  {
    id: 'mamah-teriak-jam7',
    title: 'Mamah Teriak: Udah Jam 7 Masih Tidur!',
    category: 'suara-emak',
    categoryLabel: 'Suara Emak',
    description: 'Suara mamah yang teriak karena udah jam 7 tapi kamu masih tidur. Klasik!',
    duration: '0:12',
    downloads: 18200,
    rating: 4.8,
    dateAdded: '2026-04-28',
    audioFile: '/audio/placeholder.mp3',
    tags: ['mamah', 'teriak', 'sekolah', 'pagi'],
    isFeatured: false,
    isTrending: true
  },
  {
    id: 'bunda-ngomel',
    title: 'Bunda Ngomel Panjang x Lebar',
    category: 'suara-emak',
    categoryLabel: 'Suara Emak',
    description: 'Bunda ngomel panjang lebar soal anak yang ketiduran. Full version!',
    duration: '0:22',
    downloads: 12100,
    rating: 4.7,
    dateAdded: '2026-04-25',
    audioFile: '/audio/placeholder.mp3',
    tags: ['bunda', 'ngomel', 'lucu', 'panjang'],
    isFeatured: false,
    isTrending: false
  },

  // === Motivasi Toxic ===
  {
    id: 'saingan-gajian',
    title: 'Sainganmu Udah Gajian, Kamu Masih Tidur',
    category: 'motivasi-toxic',
    categoryLabel: 'Motivasi Toxic',
    description: 'Alarm motivasi toxic yang nyelekit — sainganmu udah sukses, kamu masih molor.',
    duration: '0:10',
    downloads: 15600,
    rating: 4.6,
    dateAdded: '2026-05-03',
    audioFile: '/audio/placeholder.mp3',
    tags: ['motivasi', 'toxic', 'kerja', 'gajian'],
    isFeatured: true,
    isTrending: true
  },
  {
    id: 'deadline-besok',
    title: 'Deadline Besok, Masih Molor!',
    category: 'motivasi-toxic',
    categoryLabel: 'Motivasi Toxic',
    description: 'Reminder kejam bahwa deadline-mu besok tapi kamu masih tidur.',
    duration: '0:08',
    downloads: 9800,
    rating: 4.5,
    dateAdded: '2026-04-30',
    audioFile: '/audio/placeholder.mp3',
    tags: ['deadline', 'kuliah', 'kerja', 'panik'],
    isFeatured: false,
    isTrending: false
  },
  {
    id: 'dosen-batal-libur',
    title: 'Dosenmu Batal Libur, Masuk Hari Ini',
    category: 'motivasi-toxic',
    categoryLabel: 'Motivasi Toxic',
    description: 'Plot twist paling nyesek — dosen yang katanya libur ternyata masuk!',
    duration: '0:11',
    downloads: 8700,
    rating: 4.4,
    dateAdded: '2026-04-27',
    audioFile: '/audio/placeholder.mp3',
    tags: ['dosen', 'kuliah', 'libur', 'mahasiswa'],
    isFeatured: false,
    isTrending: false
  },

  // === Anime & Wibu ===
  {
    id: 'waifu-ohayou',
    title: 'Waifu Bangunin: Senpai~ Ohayou~',
    category: 'anime-wibu',
    categoryLabel: 'Anime & Wibu',
    description: 'Alarm waifu yang bangunin kamu dengan suara lembut ala anime. Kawaii!',
    duration: '0:09',
    downloads: 21000,
    rating: 4.9,
    dateAdded: '2026-05-02',
    audioFile: '/audio/placeholder.mp3',
    tags: ['anime', 'waifu', 'kawaii', 'jepang'],
    isFeatured: true,
    isTrending: true
  },
  {
    id: 'naruto-dattebayo',
    title: 'Suara Naruto: BANGUN DATTEBAYO!',
    category: 'anime-wibu',
    categoryLabel: 'Anime & Wibu',
    description: 'Naruto teriak suruh bangun dengan semangat ninja! DATTEBAYO!',
    duration: '0:07',
    downloads: 19500,
    rating: 4.8,
    dateAdded: '2026-04-29',
    audioFile: '/audio/placeholder.mp3',
    tags: ['naruto', 'anime', 'ninja', 'dattebayo'],
    isFeatured: false,
    isTrending: true
  },
  {
    id: 'aot-opening-alarm',
    title: 'Attack on Titan Opening — Alarm Version',
    category: 'anime-wibu',
    categoryLabel: 'Anime & Wibu',
    description: 'Opening Attack on Titan yang epic dijadikan alarm. Bangun kayak mau perang!',
    duration: '0:18',
    downloads: 16300,
    rating: 4.7,
    dateAdded: '2026-04-26',
    audioFile: '/audio/placeholder.mp3',
    tags: ['aot', 'anime', 'epic', 'opening'],
    isFeatured: false,
    isTrending: false
  },

  // === Islami ===
  {
    id: 'reminder-subuh',
    title: 'Reminder Subuh — Sholat Dulu Baru Tidur',
    category: 'islami',
    categoryLabel: 'Islami',
    description: 'Reminder lembut untuk sholat Subuh. Bangun, sholat dulu, baru lanjut tidur.',
    duration: '0:20',
    downloads: 28900,
    rating: 4.9,
    dateAdded: '2026-05-04',
    audioFile: '/audio/placeholder.mp3',
    tags: ['islami', 'subuh', 'sholat', 'reminder'],
    isFeatured: true,
    isTrending: true
  },
  {
    id: 'adzan-subuh-motivasi',
    title: 'Adzan Subuh + Motivasi Pagi',
    category: 'islami',
    categoryLabel: 'Islami',
    description: 'Adzan Subuh yang merdu dilengkapi dengan motivasi pagi islami.',
    duration: '0:30',
    downloads: 25600,
    rating: 4.9,
    dateAdded: '2026-04-30',
    audioFile: '/audio/placeholder.mp3',
    tags: ['adzan', 'subuh', 'motivasi', 'islami'],
    isFeatured: false,
    isTrending: true
  },
  {
    id: 'tahajud-reminder',
    title: 'Tahajud Reminder Lembut',
    category: 'islami',
    categoryLabel: 'Islami',
    description: 'Reminder tahajud dengan suara lembut dan menenangkan. Bangun malam penuh berkah.',
    duration: '0:25',
    downloads: 14200,
    rating: 4.8,
    dateAdded: '2026-04-28',
    audioFile: '/audio/placeholder.mp3',
    tags: ['tahajud', 'malam', 'islami', 'lembut'],
    isFeatured: false,
    isTrending: false
  },

  // === Lucu & Receh ===
  {
    id: 'ayam-kampung-teriak',
    title: 'Suara Ayam Kampung Teriak',
    category: 'lucu-receh',
    categoryLabel: 'Lucu & Receh',
    description: 'Alarm klasik suara ayam kampung yang berkokok keras. Nostalgia kampung!',
    duration: '0:14',
    downloads: 17800,
    rating: 4.6,
    dateAdded: '2026-05-01',
    audioFile: '/audio/placeholder.mp3',
    tags: ['ayam', 'kampung', 'lucu', 'nostalgia'],
    isFeatured: false,
    isTrending: true
  },
  {
    id: 'klakson-bus-antarkota',
    title: 'Klakson Bus Antar Kota',
    category: 'lucu-receh',
    categoryLabel: 'Lucu & Receh',
    description: 'Suara klakson bus antar kota yang khas. Telolet telolet!',
    duration: '0:10',
    downloads: 11200,
    rating: 4.5,
    dateAdded: '2026-04-29',
    audioFile: '/audio/placeholder.mp3',
    tags: ['bus', 'klakson', 'telolet', 'lucu'],
    isFeatured: false,
    isTrending: false
  },
  {
    id: 'tukang-bakso-lewat',
    title: 'Tukang Bakso Lewat — Mangkok Edition',
    category: 'lucu-receh',
    categoryLabel: 'Lucu & Receh',
    description: 'Suara tukang bakso ketok-ketok mangkok yang iconic. Tok tok tok!',
    duration: '0:08',
    downloads: 13500,
    rating: 4.7,
    dateAdded: '2026-04-27',
    audioFile: '/audio/placeholder.mp3',
    tags: ['bakso', 'mangkok', 'lucu', 'street-food'],
    isFeatured: false,
    isTrending: false
  },

  // === Logat Daerah ===
  {
    id: 'alarm-sunda-hudang',
    title: 'Alarm Bahasa Sunda: Hudang Euy!',
    category: 'logat-daerah',
    categoryLabel: 'Logat Daerah',
    description: 'Alarm pakai bahasa Sunda yang bilang "Hudang euy!" alias bangun!',
    duration: '0:10',
    downloads: 9600,
    rating: 4.6,
    dateAdded: '2026-04-30',
    audioFile: '/audio/placeholder.mp3',
    tags: ['sunda', 'daerah', 'hudang', 'lucu'],
    isFeatured: false,
    isTrending: false
  },
  {
    id: 'alarm-jawa-tangi',
    title: 'Alarm Bahasa Jawa: Tangi Rek!',
    category: 'logat-daerah',
    categoryLabel: 'Logat Daerah',
    description: 'Alarm bahasa Jawa Timur: "Tangi rek!" — khas Surabaya!',
    duration: '0:09',
    downloads: 8900,
    rating: 4.5,
    dateAdded: '2026-04-28',
    audioFile: '/audio/placeholder.mp3',
    tags: ['jawa', 'surabaya', 'tangi', 'daerah'],
    isFeatured: false,
    isTrending: false
  },
  {
    id: 'alarm-batak-bangun',
    title: 'Alarm Bahasa Batak: Bah, Bangun Kau!',
    category: 'logat-daerah',
    categoryLabel: 'Logat Daerah',
    description: 'Alarm tegas pakai logat Batak: "Bah, bangun kau!" — nggak bisa nolak.',
    duration: '0:11',
    downloads: 10200,
    rating: 4.7,
    dateAdded: '2026-04-26',
    audioFile: '/audio/placeholder.mp3',
    tags: ['batak', 'medan', 'tegas', 'daerah'],
    isFeatured: false,
    isTrending: false
  },

  // === Horror ===
  {
    id: 'bisikan-tengah-malam',
    title: 'Bisikan Tengah Malam: Bangun...',
    category: 'horror',
    categoryLabel: 'Horror',
    description: 'Alarm horror suara bisikan misterius di tengah malam. Dijamin langsung melek!',
    duration: '0:15',
    downloads: 14800,
    rating: 4.3,
    dateAdded: '2026-05-02',
    audioFile: '/audio/placeholder.mp3',
    tags: ['horror', 'bisikan', 'malam', 'seram'],
    isFeatured: false,
    isTrending: true
  },
  {
    id: 'ketuk-pintu-3x',
    title: 'Suara Ketuk Pintu 3x — Alarm Edition',
    category: 'horror',
    categoryLabel: 'Horror',
    description: 'Tok tok tok... suara ketukan pintu misterius 3 kali. Alarm paling serem!',
    duration: '0:12',
    downloads: 11500,
    rating: 4.2,
    dateAdded: '2026-04-29',
    audioFile: '/audio/placeholder.mp3',
    tags: ['horror', 'ketuk', 'pintu', 'misterius'],
    isFeatured: false,
    isTrending: false
  },

  // === Gebetan / Romantis ===
  {
    id: 'gebetan-nelpon-pagi',
    title: 'Gebetan Nelpon Pagi: Hei, Udah Bangun?',
    category: 'gebetan',
    categoryLabel: 'Gebetan / Romantis',
    description: 'Alarm seolah gebetan kamu nelpon pagi-pagi. Sweet tapi efektif!',
    duration: '0:13',
    downloads: 19800,
    rating: 4.8,
    dateAdded: '2026-05-03',
    audioFile: '/audio/placeholder.mp3',
    tags: ['gebetan', 'romantis', 'nelpon', 'pagi'],
    isFeatured: true,
    isTrending: true
  },
  {
    id: 'cewek-manja-bangun',
    title: 'Suara Cewek Manja: Ayo Bangun Dong~',
    category: 'gebetan',
    categoryLabel: 'Gebetan / Romantis',
    description: 'Alarm suara cewek manja yang minta kamu bangun. Bikin semangat pagi!',
    duration: '0:10',
    downloads: 16700,
    rating: 4.7,
    dateAdded: '2026-04-30',
    audioFile: '/audio/placeholder.mp3',
    tags: ['cewek', 'manja', 'romantis', 'alarm'],
    isFeatured: false,
    isTrending: true
  }
]

export function getRingtoneById(id: string): Ringtone | undefined {
  return ringtones.find(r => r.id === id)
}

export function getRingtonesByCategory(category: string): Ringtone[] {
  return ringtones.filter(r => r.category === category)
}

export function getFeaturedRingtones(): Ringtone[] {
  return ringtones.filter(r => r.isFeatured)
}

export function getTrendingRingtones(): Ringtone[] {
  return ringtones.filter(r => r.isTrending)
}

export function formatDownloads(count: number): string {
  if (count >= 1000) {
    return (count / 1000).toFixed(1).replace(/\.0$/, '') + 'K'
  }
  return count.toString()
}
