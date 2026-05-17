<template>
  <section class="featured section" id="featured-section">
    <div class="container">
      <div class="featured__header liquid-glass-card">
        <h2 class="section-title"><Icon icon="mdi:star-shooting" class="section-icon" /> Ringtone Minggu Ini</h2>
        <p class="section-subtitle">Pilihan terpopuler yang lagi viral</p>
      </div>
      <div class="featured__grid">
        <router-link
          v-for="ringtone in featuredRingtones"
          :key="ringtone.slug"
          :to="`/ringtone/${ringtone.slug}`"
          class="featured__card liquid-glass-card"
        >
          <div class="featured__card-bg" :style="{ '--cat-color': ringtone.category_color || '#7A9D00' }"></div>
          <div class="featured__card-content">
            <div class="featured__icon-wrap" :style="{ background: `linear-gradient(135deg, ${ringtone.category_color || '#7A9D00'}25, ${ringtone.category_color || '#7A9D00'}08)` }">
              <Icon :icon="ringtone.category_icon || 'mdi:music-note'" class="featured__cat-icon" :style="{ color: ringtone.category_color || '#7A9D00' }" />
            </div>
            <h3 class="featured__title">{{ ringtone.title }}</h3>
            <p class="featured__desc">{{ ringtone.description }}</p>
            <div class="featured__meta">
              <span><Icon icon="mdi:download" class="fmeta-icon" /> {{ formatDownloads(ringtone.downloads) }}</span>
              <span><Icon icon="mdi:star" class="fmeta-icon fmeta-icon--star" /> {{ ringtone.rating }}</span>
              <span><Icon icon="mdi:timer-outline" class="fmeta-icon" /> {{ ringtone.duration }}</span>
            </div>
            <div class="featured__actions">
              <button class="featured__play" @click.prevent="handlePlay(ringtone)">
                <Icon icon="mdi:play" /> Putar Sekarang
              </button>
              <button
                class="featured__download-btn"
                @click.stop="handleDownloadClick(ringtone)"
              >
                <Icon icon="mdi:download" />
              </button>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { Icon } from '@iconify/vue'
import { api } from '../../services/api'
import { useAudioPlayer } from '../../composables/useAudioPlayer'

const router = useRouter()
const featuredRingtones = ref<any[]>([])
const { play } = useAudioPlayer()

onMounted(async () => {
  const res = await api.getRingtones({ featured: true, limit: 3 })
  if (res.success) {
    featuredRingtones.value = res.data
  }
})

function formatDownloads(count: number): string {
  if (!count) return '0'
  if (count >= 1000) {
    return (count / 1000).toFixed(1).replace(/\.0$/, '') + 'K'
  }
  return count.toString()
}

function handlePlay(ringtone: any) {
  play(ringtone)
}

function handleDownloadClick(ringtone: any) {
  // Open affiliate link in new tab first
  if (ringtone.affiliate_url) {
    window.open(ringtone.affiliate_url, '_blank', 'noopener,noreferrer')
  }
  // Navigate to download page in current tab
  router.push(`/download/${ringtone.slug}`)
}
</script>

<style scoped>
.section-icon {
  font-size: 1.2em;
  vertical-align: -0.15em;
  color: var(--accent-orange);
}

.featured__header {
  margin-bottom: var(--space-lg);
}

.section-subtitle {
  font-size: 0.9rem;
  color: var(--text-muted);
  margin-top: 0.25rem;
}

.featured__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-lg);
}

@media (min-width: 768px) {
  .featured__grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.featured__card {
  position: relative;
  border-radius: var(--radius-xl);
  overflow: hidden;
  transition: all var(--transition-base);
  min-height: 260px;
  display: flex;
  padding: 0 !important;
}

.featured__card:hover {
  transform: translateY(-6px);
  box-shadow: 0 16px 40px var(--card-shadow-hover);
  border-color: rgba(198, 253, 1, 0.15);
  background: var(--card-bg-hover);
}

.featured__card-bg {
  position: absolute;
  top: -50%;
  right: -30%;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background: var(--cat-color);
  opacity: 0.06;
  filter: blur(40px);
  transition: all var(--transition-base);
}

.featured__card:hover .featured__card-bg {
  opacity: 0.12;
  transform: scale(1.3);
}

.featured__card-content {
  position: relative;
  z-index: 1;
  padding: var(--space-xl);
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
  flex: 1;
}

.featured__icon-wrap {
  width: 52px;
  height: 52px;
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
}

.featured__cat-icon {
  font-size: 1.8rem;
}

.featured__title {
  font-size: 1.1rem;
  font-weight: 700;
  line-height: 1.3;
  color: var(--text-primary);
}

.featured__desc {
  font-size: 0.8rem;
  color: var(--text-muted);
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.featured__meta {
  display: flex;
  gap: var(--space-md);
  font-size: 0.75rem;
  color: var(--text-muted);
  margin-top: auto;
}

.featured__meta span {
  display: inline-flex;
  align-items: center;
  gap: 2px;
}

.fmeta-icon {
  font-size: 0.85rem;
  opacity: 0.6;
}

.fmeta-icon--star {
  color: var(--accent-orange);
  opacity: 1;
}

.featured__actions {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  margin-top: var(--space-sm);
}

.featured__play {
  padding: var(--space-sm) var(--space-md);
  background: linear-gradient(135deg, var(--primary-start), var(--primary-end));
  border-radius: var(--radius-md);
  font-size: 0.8rem;
  font-weight: 600;
  color: white;
  transition: all var(--transition-base);
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  flex: 1;
  justify-content: center;
}

.featured__play:hover {
  transform: scale(1.05);
  box-shadow: var(--shadow-glow);
}

.featured__download-btn {
  width: 36px;
  height: 36px;
  border-radius: var(--radius-md);
  background: rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--accent-green);
  transition: all var(--transition-base);
}

.featured__download-btn:hover {
  background: rgba(16, 185, 129, 0.2);
  transform: scale(1.05);
}
</style>
