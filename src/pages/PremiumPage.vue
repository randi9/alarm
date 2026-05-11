<template>
  <div class="page-wrapper">
    <div class="container">
      <div class="premium-page">
        <!-- Hero -->
        <header class="premium-hero">
          <span class="premium-hero__badge"><Icon icon="mdi:sparkles" /> EXCLUSIVE</span>
          <h1 class="premium-hero__title"><Icon icon="mdi:gift-outline" class="premium-title-icon" /> Paket Premium</h1>
          <h2 class="premium-hero__subtitle">50+ Alarm Eksklusif</h2>
          <p class="premium-hero__desc">
            Dapatkan koleksi lengkap alarm dan ringtone premium yang tidak tersedia di versi gratis.
            Format MP3 & M4R, kualitas tinggi, update setiap bulan!
          </p>
        </header>

        <!-- Price -->
        <div class="premium-price">
          <div class="premium-price__card">
            <span class="premium-price__old">Rp 49.000</span>
            <span class="premium-price__current">Rp 19.900</span>
            <span class="premium-price__save">Hemat 59%!</span>
            <a
              href="https://wa.me/62xxxx?text=Halo%2C%20saya%20mau%20pesan%20Paket%20Premium%20BunYing"
              target="_blank"
              rel="noopener"
              class="btn btn-download premium-price__btn"
              id="premium-order-btn"
            >
              <Icon icon="mdi:whatsapp" /> Pesan via WhatsApp
            </a>
          </div>
        </div>

        <!-- What's included -->
        <section class="premium-includes">
          <h2 class="section-title"><Icon icon="mdi:package-variant" class="section-icon" /> Apa yang Kamu Dapat?</h2>
          <div class="premium-includes__grid">
            <div class="premium-includes__item" v-for="item in includes" :key="item.title">
              <Icon :icon="item.icon" class="premium-includes__icon" />
              <h3>{{ item.title }}</h3>
              <p>{{ item.desc }}</p>
            </div>
          </div>
        </section>

        <!-- Ringtone list preview -->
        <section class="premium-list">
          <h2 class="section-title"><Icon icon="mdi:music-note" class="section-icon" /> Preview Isi Paket</h2>
          <div class="premium-list__items">
            <div v-for="(item, index) in previewList" :key="index" class="premium-list__item">
              <span class="premium-list__number">{{ index + 1 }}</span>
              <span class="premium-list__name">{{ item }}</span>
            </div>
          </div>
          <p class="premium-list__more">...dan 40+ alarm lainnya!</p>
        </section>

        <!-- Testimonials -->
        <section class="premium-testimoni">
          <h2 class="section-title"><Icon icon="mdi:comment-quote-outline" class="section-icon" /> Kata Mereka</h2>
          <div class="premium-testimoni__grid">
            <div class="testimoni-card" v-for="t in testimonials" :key="t.author">
              <div class="stars">
                <Icon v-for="s in 5" :key="s" icon="mdi:star" class="star-icon" />
              </div>
              <p class="text">"{{ t.text }}"</p>
              <span class="author">— {{ t.author }}</span>
            </div>
          </div>
        </section>

        <!-- FAQ -->
        <section class="premium-faq">
          <h2 class="section-title"><Icon icon="mdi:help-circle-outline" class="section-icon" /> FAQ</h2>
          <div class="faq-list">
            <div
              v-for="(faq, index) in faqs"
              :key="index"
              class="faq-item"
              :class="{ active: activeFaq === index }"
            >
              <button class="faq-question" @click="toggleFaq(index)">
                {{ faq.q }}
                <Icon icon="mdi:chevron-down" class="icon" />
              </button>
              <div class="faq-answer">
                <div class="faq-answer-content">{{ faq.a }}</div>
              </div>
            </div>
          </div>
        </section>

        <!-- CTA Bottom -->
        <div class="premium-cta">
          <h2>Siap Bikin Pagi Lebih Seru?</h2>
          <a
            href="https://wa.me/62xxxx?text=Halo%2C%20saya%20mau%20pesan%20Paket%20Premium%20BunYing"
            target="_blank"
            rel="noopener"
            class="btn btn-download"
            id="premium-cta-btn"
          >
            <Icon icon="mdi:whatsapp" /> Pesan Sekarang — Rp 19.900
          </a>
        </div>
      </div>
    </div>
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Icon } from '@iconify/vue'
import AppFooter from '../components/layout/AppFooter.vue'

const activeFaq = ref<number | null>(null)

function toggleFaq(index: number) {
  activeFaq.value = activeFaq.value === index ? null : index
}

const includes = [
  { icon: 'mdi:music-note-plus', title: '50+ Alarm Eksklusif', desc: 'Koleksi alarm unik yang tidak ada di versi gratis.' },
  { icon: 'mdi:cellphone', title: 'Format MP3 & M4R', desc: 'Kompatibel dengan semua HP Android & iPhone.' },
  { icon: 'mdi:refresh', title: 'Update Bulanan', desc: 'Dapat alarm baru setiap bulan tanpa biaya tambahan.' },
  { icon: 'mdi:flash', title: 'Download Instan', desc: 'Tanpa iklan, tanpa countdown. Download langsung!' },
  { icon: 'mdi:headphones', title: 'Kualitas HD', desc: 'Audio berkualitas tinggi 320kbps.' },
  { icon: 'mdi:message-text-outline', title: 'Support via WA', desc: 'Bantuan langsung via WhatsApp jika ada kendala.' }
]

const previewList = [
  'Emak Ultra Marah — Extended Version',
  'Waifu Compilation — 5 Karakter',
  'Adzan Subuh Merdu — 3 Qari',
  'Motivasi Toxic — CEO Edition',
  'Alarm Horror — Jumpscare Pack',
  'Logat Daerah — All Province',
  'Gebetan Pack — 10 Variasi',
  'Jingle Viral TikTok — 2026',
  'Alarm DJ — Bass Boosted',
  'Naruto Ultimate Pack — 5 Karakter'
]

const testimonials = [
  {
    text: 'Alarm emaknya realistis banget, langsung melek tiap subuh! Worth it banget Rp 19rb.',
    author: 'Rizky A. — Mahasiswa'
  },
  {
    text: 'Akhirnya ada alarm yang bener-bener bikin bangun. Yang horror sih juara, serem tapi efektif.',
    author: 'Dina S. — Pekerja Kantoran'
  },
  {
    text: 'Beli buat iseng, ternyata teman-teman kantor pada minta juga. Kualitas audionya bagus!',
    author: 'Budi H. — Freelancer'
  },
  {
    text: 'Yang waifu pack sih paling worth it, ada 5 karakter. Teman wibu wajib beli!',
    author: 'Andi W. — Otaku'
  }
]

const faqs = [
  {
    q: 'Bagaimana cara download setelah pembayaran?',
    a: 'Setelah konfirmasi pembayaran via WhatsApp, kami akan kirimkan link Google Drive berisi semua file alarm dalam format MP3 dan M4R.'
  },
  {
    q: 'Apakah bisa dipakai di iPhone?',
    a: 'Bisa! Kami menyediakan format M4R yang kompatibel dengan iPhone. Panduan cara set ringtone iPhone juga disertakan.'
  },
  {
    q: 'Format file apa yang tersedia?',
    a: 'Semua alarm tersedia dalam format MP3 (Android) dan M4R (iPhone) dengan kualitas 320kbps.'
  },
  {
    q: 'Apakah ada garansi?',
    a: 'Tentu! Jika ada file yang corrupt atau tidak sesuai, kami akan kirim ulang. Hubungi kami via WhatsApp.'
  },
  {
    q: 'Apakah akan ada update?',
    a: 'Ya! Setiap bulan kami tambah 5-10 alarm baru. Link download akan di-update otomatis.'
  }
]
</script>

<style scoped>
.section-icon {
  font-size: 1.2em;
  vertical-align: -0.15em;
  color: var(--primary-start);
}

.premium-page {
  display: flex;
  flex-direction: column;
  gap: var(--space-3xl);
  padding: var(--space-xl) 0;
}

/* Hero */
.premium-hero {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-md);
}

.premium-hero__badge {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.3rem 1rem;
  background: linear-gradient(135deg, var(--accent-orange), #F97316);
  border-radius: var(--radius-full);
  font-size: 0.75rem;
  font-weight: 700;
  color: white;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.premium-hero__title {
  font-size: 2.5rem;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
}

.premium-title-icon {
  color: var(--accent-orange);
}

.premium-hero__subtitle {
  font-size: 1.5rem;
  background: linear-gradient(135deg, var(--primary-start), var(--primary-end));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.premium-hero__desc {
  color: var(--text-secondary);
  max-width: 500px;
  line-height: 1.6;
}

/* Price */
.premium-price {
  display: flex;
  justify-content: center;
}

.premium-price__card {
  background: var(--glass-bg);
  border: 2px solid var(--primary-start);
  border-radius: var(--radius-xl);
  padding: var(--space-2xl);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-md);
  box-shadow: var(--shadow-glow);
}

.premium-price__old {
  font-size: 1.2rem;
  color: var(--text-muted);
  text-decoration: line-through;
}

.premium-price__current {
  font-family: var(--font-heading);
  font-size: 3rem;
  font-weight: 800;
  background: linear-gradient(135deg, var(--accent-green), #059669);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.premium-price__save {
  background: rgba(16, 185, 129, 0.15);
  color: var(--accent-green);
  padding: 0.2rem 0.8rem;
  border-radius: var(--radius-full);
  font-size: 0.8rem;
  font-weight: 600;
}

.premium-price__btn {
  font-size: 1.1rem;
  padding: var(--space-md) var(--space-2xl);
}

/* Includes */
.premium-includes__grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-lg);
}

@media (min-width: 768px) {
  .premium-includes__grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.premium-includes__item {
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-lg);
  padding: var(--space-lg);
  text-align: center;
  transition: all var(--transition-base);
}

.premium-includes__item:hover {
  transform: translateY(-4px);
  border-color: rgba(124, 58, 237, 0.3);
}

.premium-includes__icon {
  font-size: 2rem;
  display: block;
  margin: 0 auto var(--space-sm);
  color: var(--primary-start);
}

.premium-includes__item h3 {
  font-size: 0.9rem;
  margin-bottom: var(--space-xs);
}

.premium-includes__item p {
  font-size: 0.8rem;
  color: var(--text-muted);
  line-height: 1.5;
}

/* List */
.premium-list__items {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-sm);
}

@media (min-width: 768px) {
  .premium-list__items {
    grid-template-columns: repeat(2, 1fr);
  }
}

.premium-list__item {
  display: flex;
  align-items: center;
  gap: var(--space-md);
  padding: var(--space-sm) var(--space-md);
  background: var(--glass-bg);
  border-radius: var(--radius-md);
}

.premium-list__number {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--primary-start), var(--primary-end));
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 700;
  flex-shrink: 0;
}

.premium-list__name {
  font-size: 0.85rem;
  font-weight: 500;
}

.premium-list__more {
  text-align: center;
  color: var(--text-muted);
  font-size: 0.9rem;
  margin-top: var(--space-md);
  font-style: italic;
}

/* Testimonials */
.premium-testimoni__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-lg);
}

@media (min-width: 768px) {
  .premium-testimoni__grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

.star-icon {
  color: var(--accent-orange);
  font-size: 0.9rem;
}

/* CTA */
.premium-cta {
  text-align: center;
  padding: var(--space-2xl);
  background: linear-gradient(135deg, rgba(124, 58, 237, 0.1), rgba(37, 99, 235, 0.1));
  border: 1px solid rgba(124, 58, 237, 0.2);
  border-radius: var(--radius-xl);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-lg);
}

.premium-cta h2 {
  font-size: 1.5rem;
}
</style>
