# 🔔 BunYing — Alarm & Ringtone Paling Ngeselin se-Indonesia

> Platform download ringtone dan alarm unik gratis. Dijamin bikin pagi kamu lebih seru!

## 🚀 Cara Install & Run

```bash
# Install dependencies
npm install

# Jalankan dev server
npm run dev

# Build untuk production
npm run build
```

## 🎵 Cara Menambah Ringtone Baru

### 1. Tambah file audio
Letakkan file `.mp3` di folder `public/audio/`:
```
public/audio/nama-ringtone.mp3
```

### 2. Tambah data ringtone
Buka file `src/data/ringtones.ts` dan tambahkan objek baru ke array `ringtones`:

```typescript
{
  id: 'nama-ringtone',                    // slug unik (huruf kecil, pakai strip)
  title: 'Judul Ringtone',                // judul yang tampil di website
  category: 'suara-emak',                 // slug kategori (lihat categories.ts)
  categoryLabel: 'Suara Emak',            // label kategori
  description: 'Deskripsi singkat...',     // untuk SEO
  duration: '0:15',                        // durasi format M:SS
  downloads: 0,                            // jumlah download awal
  rating: 4.5,                             // rating 1-5
  dateAdded: '2026-05-11',                // tanggal upload
  audioFile: '/audio/nama-ringtone.mp3',  // path ke file audio
  tags: ['tag1', 'tag2'],                 // tags untuk search
  isFeatured: false,                       // tampil di "Ringtone Minggu Ini"?
  isTrending: false                        // tandai sebagai trending?
}
```

### 3. Tambah kategori baru (opsional)
Buka `src/data/categories.ts` dan tambahkan objek baru:

```typescript
{
  slug: 'nama-kategori',
  label: 'Nama Kategori',
  emoji: '🎵',
  color: '#6D28D9',
  description: 'Deskripsi kategori...'
}
```

## 📺 Cara Setup Google AdSense

1. Daftar akun Google AdSense di https://adsense.google.com
2. Setelah diapprove, dapatkan kode script AdSense
3. Tambahkan script AdSense di `index.html` (di dalam `<head>`):
   ```html
   <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX" crossorigin="anonymous"></script>
   ```
4. Ganti komponen `AdPlaceholder.vue` di `src/components/shared/` dengan kode ad unit dari AdSense
5. Pastikan halaman Kebijakan Privasi (`/privasi`) sudah lengkap sebelum submit review

## 🔗 Cara Mengganti Affiliate Link

Affiliate link saat ini menggunakan placeholder. Untuk mengganti:

1. Buka `src/components/download/AffiliateSection.vue`
2. Ganti URL `https://shope.ee/placeholder-affiliate` dengan link affiliate asli Anda
3. Anda bisa mendaftar program affiliate di:
   - Shopee Affiliate: https://affiliate.shopee.co.id
   - Tokopedia Affiliate: https://affiliate.tokopedia.com
   - Lazada Affiliate: https://www.lazada.co.id/lazada-affiliate/

## 📁 Struktur Folder

```
src/
├── assets/css/          → CSS (variables, base, animations, components)
├── components/
│   ├── layout/          → Navbar, Footer, GlobalAudioPlayer
│   ├── ringtone/        → RingtoneCard, RingtoneGrid, RingtonePlayer, dll
│   ├── home/            → HeroSection, CategorySlider, FeaturedSection
│   ├── download/        → CountdownTimer, AffiliateSection
│   └── shared/          → SearchBar, AdPlaceholder, ShareButtons, BreadcrumbNav
├── composables/         → useAudioPlayer, useSearch, useDownload
├── data/                → ringtones.ts, categories.ts
├── pages/               → Semua halaman (Home, Category, Detail, Download, dll)
├── router/              → Vue Router config
├── App.vue              → Root component
└── main.ts              → Entry point

public/
└── audio/               → File audio (.mp3)
```

## 🛠️ Tech Stack

- **Framework**: Vite + Vue 3 + TypeScript
- **Styling**: Vanilla CSS (dark mode, glassmorphism)
- **Router**: Vue Router 4
- **State**: Pinia
- **Font**: Inter + Outfit (Google Fonts)
- **Icons**: Inline SVG

## 📄 License

© 2026 BunYing. All rights reserved.
