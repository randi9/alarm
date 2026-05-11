<template>
  <div class="page-wrapper">
    <div class="container">
      <div class="about-page">
        <header class="about-hero">
          <Icon icon="mdi:bell-ring" class="about-hero__icon" />
          <h1 class="about-hero__title">Tentang <span class="gradient-text">BunYing</span></h1>
          <p class="about-hero__tagline">Alarm & Ringtone Paling Ngeselin se-Indonesia</p>
        </header>

        <section class="about-section">
          <h2><Icon icon="mdi:target" class="about-section-icon" /> Misi Kami</h2>
          <p>
            <strong>Bikin pagi kamu lebih seru dengan alarm yang nggak biasa.</strong>
          </p>
          <p>
            BunYing lahir dari keresahan sederhana: alarm biasa udah nggak mempan buat bangunin kita.
            Makanya kami bikin koleksi alarm dan ringtone yang unik, lucu, dan dijamin bikin kamu
            langsung melek — mulai dari suara emak marah, motivasi toxic, sampai waifu anime yang
            bangunin kamu tiap pagi.
          </p>
        </section>

        <section class="about-section">
          <h2><Icon icon="mdi:book-open-page-variant-outline" class="about-section-icon" /> Cerita BunYing</h2>
          <p>
            Nama "BunYing" berasal dari gabungan kata <strong>"Bunyi"</strong> dan <strong>"Ring"</strong>.
            Kami percaya bahwa alarm yang tepat bisa mengubah pagi kamu — dan akhirnya mengubah hari kamu juga.
          </p>
          <p>
            Dimulai dari iseng bikin alarm suara emak buat grup WhatsApp, ternyata banyak yang suka dan minta
            lebih banyak variasi. Dari situlah BunYing lahir sebagai platform download ringtone dan alarm
            gratis untuk seluruh Indonesia.
          </p>
        </section>

        <section class="about-section">
          <h2><Icon icon="mdi:email-fast-outline" class="about-section-icon" /> Kontak Kami</h2>
          <div class="about-contacts">
            <a href="mailto:halo@bunying.id" class="about-contact">
              <Icon icon="mdi:email-outline" class="about-contact__icon" />
              <span>halo@bunying.id</span>
            </a>
            <a href="https://wa.me/6281234567890" target="_blank" rel="noopener" class="about-contact">
              <Icon icon="mdi:whatsapp" class="about-contact__icon" />
              <span>WhatsApp</span>
            </a>
            <a href="https://instagram.com/bunying.id" target="_blank" rel="noopener" class="about-contact">
              <Icon icon="mdi:instagram" class="about-contact__icon" />
              <span>@bunying.id</span>
            </a>
            <a href="https://tiktok.com/@bunying.id" target="_blank" rel="noopener" class="about-contact">
              <Icon icon="ic:baseline-tiktok" class="about-contact__icon" />
              <span>@bunying.id</span>
            </a>
          </div>
        </section>
      </div>
    </div>
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import AppFooter from '../components/layout/AppFooter.vue'
</script>

<style scoped>
.about-page {
  padding: var(--space-2xl) 0;
  max-width: 700px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: var(--space-2xl);
}

/* Hero */
.about-hero {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-md);
}

.about-hero__icon {
  font-size: 4rem;
  color: var(--primary-start);
  animation: vibrate 2s ease infinite;
}

.about-hero__title {
  font-size: 2.2rem;
  font-weight: 800;
}

.about-hero__tagline {
  color: var(--text-secondary);
  font-size: 1.1rem;
}

/* Sections */
.about-section h2 {
  font-size: 1.3rem;
  margin-bottom: var(--space-md);
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.about-section-icon {
  color: var(--primary-start);
  font-size: 1.1em;
}

.about-section p {
  color: var(--text-secondary);
  line-height: 1.8;
  font-size: 0.95rem;
  margin-bottom: var(--space-md);
}

/* Contacts */
.about-contacts {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-md);
}

@media (max-width: 480px) {
  .about-contacts {
    grid-template-columns: 1fr;
  }
}

.about-contact {
  display: flex;
  align-items: center;
  gap: var(--space-md);
  padding: var(--space-md);
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-lg);
  transition: all var(--transition-base);
  font-size: 0.9rem;
  color: var(--text-secondary);
}

.about-contact:hover {
  transform: translateY(-2px);
  border-color: rgba(124, 58, 237, 0.3);
  color: var(--text-primary);
}

.about-contact__icon {
  font-size: 1.5rem;
  color: var(--primary-start);
  flex-shrink: 0;
}
</style>
