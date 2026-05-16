<template>
  <section class="featured section" id="featured-section">
    <div class="container">
      <div class="featured__header">
        <h2 class="section-title"><Icon icon="mdi:star-shooting" class="section-icon" /> Ringtone Minggu Ini</h2>
        <p class="section-subtitle">Pilihan terpopuler yang lagi viral</p>
      </div>
      <div class="featured__grid">
        <router-link
          v-for="ringtone in featuredRingtones"
          :key="ringtone.id"
          :to="`/ringtone/${ringtone.id}`"
          class="featured__card"
        >
          <div class="featured__card-bg" :style="{ '--cat-color': ringtone.category_color || '#6D28D9' }"></div>
          <div class="featured__card-content">
            <div class="featured__icon-wrap" :style="{ background: `linear-gradient(135deg, ${ringtone.category_color || '#6D28D9'}25, ${ringtone.category_color || '#6D28D9'}08)` }">
              <Icon :icon="ringtone.category_icon || 'mdi:music-note'" class="featured__cat-icon" :style="{ color: ringtone.category_color || '#6D28D9' }" />
            </div>
            <h3 class="featured__title">{{ ringtone.title }}</h3>
            <p class="featured__desc">{{ ringtone.description }}</p>
            <div class="featured__meta">
              <span><Icon icon="mdi:download" class="fmeta-icon" /> {{ formatDownloads(ringtone.downloads) }}</span>
              <span><Icon icon="mdi:star" class="fmeta-icon fmeta-icon--star" /> {{ ringtone.rating }}</span>
              <span><Icon icon="mdi:timer-outline" class="fmeta-icon" /> {{ ringtone.duration }}</span>
            </div>
            <button class="featured__play" @click.prevent="handlePlay(ringtone)">
              <Icon icon="mdi:play" /> Putar Sekarang
            </button>
          </div>
        </router-link>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Icon } from '@iconify/vue'
import { api } from '../../services/api'
import { useAudioPlayer } from '../../composables/useAudioPlayer'

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
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(0, 0, 0, 0.04);
  transition: all var(--transition-base);
  min-height: 260px;
  display: flex;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
}

.featured__card:hover {
  transform: translateY(-6px);
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.08);
  border-color: rgba(124, 58, 237, 0.15);
  background: rgba(255, 255, 255, 0.9);
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

.featured__play {
  margin-top: var(--space-sm);
  padding: var(--space-sm) var(--space-md);
  background: linear-gradient(135deg, var(--primary-start), var(--primary-end));
  border-radius: var(--radius-md);
  font-size: 0.8rem;
  font-weight: 600;
  color: white;
  transition: all var(--transition-base);
  align-self: flex-start;
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
}

.featured__play:hover {
  transform: scale(1.05);
  box-shadow: var(--shadow-glow);
}
</style>
