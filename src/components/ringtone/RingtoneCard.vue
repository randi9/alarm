<template>
  <article class="ringtone-card" :id="`ringtone-card-${ringtone.id}`">
    <router-link :to="`/ringtone/${ringtone.id}`" class="ringtone-card__link">
      <!-- Icon -->
      <div class="ringtone-card__icon" :style="{ background: iconBg }">
        <Icon :icon="catIcon" class="ringtone-card__cat-icon" :style="{ color: catColor }" />
      </div>

      <!-- Content -->
      <div class="ringtone-card__content">
        <h3 class="ringtone-card__title">{{ ringtone.title }}</h3>
        <div class="ringtone-card__meta">
          <CategoryBadge :category="ringtone.category" :label="ringtone.categoryLabel" />
          <span class="ringtone-card__duration"><Icon icon="mdi:timer-outline" class="meta-icon" /> {{ ringtone.duration }}</span>
        </div>
        <div class="ringtone-card__stats">
          <span class="ringtone-card__downloads"><Icon icon="mdi:download" class="meta-icon" /> {{ formattedDownloads }} download</span>
          <span class="ringtone-card__rating"><Icon icon="mdi:star" class="meta-icon meta-icon--star" /> {{ ringtone.rating }}</span>
        </div>
      </div>
    </router-link>

    <!-- Actions -->
    <div class="ringtone-card__actions">
      <button
        class="ringtone-card__play"
        :class="{ 'ringtone-card__play--active': isCurrentPlaying }"
        @click.prevent="handlePlay"
        :id="`play-${ringtone.id}`"
        :aria-label="isCurrentPlaying ? 'Pause' : 'Play'"
      >
        <div class="ringtone-card__play-ring" v-if="isCurrentPlaying"></div>
        <svg v-if="!isCurrentPlaying" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <polygon points="5 3 19 12 5 21 5 3" />
        </svg>
        <svg v-else width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <rect x="6" y="4" width="4" height="16" />
          <rect x="14" y="4" width="4" height="16" />
        </svg>
      </button>

      <router-link
        :to="`/download/${ringtone.id}`"
        class="ringtone-card__download-btn"
        :id="`download-${ringtone.id}`"
        @click.stop
      >
        <Icon icon="mdi:download" width="16" />
      </router-link>
    </div>
  </article>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Icon } from '@iconify/vue'
import type { Ringtone } from '../../data/ringtones'
import { formatDownloads } from '../../data/ringtones'
import { getCategoryBySlug } from '../../data/categories'
import { useAudioPlayer } from '../../composables/useAudioPlayer'
import CategoryBadge from './CategoryBadge.vue'

const props = defineProps<{
  ringtone: Ringtone
}>()

const { currentRingtone, isPlaying, play } = useAudioPlayer()

const isCurrentPlaying = computed(() =>
  currentRingtone.value?.id === props.ringtone.id && isPlaying.value
)

const categoryData = computed(() => getCategoryBySlug(props.ringtone.category))
const catIcon = computed(() => categoryData.value?.icon || 'mdi:volume-high')
const catColor = computed(() => categoryData.value?.color || '#6D28D9')

const iconBg = computed(() => {
  const color = categoryData.value?.color || '#6D28D9'
  return `linear-gradient(135deg, ${color}30, ${color}10)`
})

const formattedDownloads = computed(() => formatDownloads(props.ringtone.downloads))

function handlePlay() {
  play(props.ringtone)
}
</script>

<style scoped>
.ringtone-card {
  display: flex;
  align-items: center;
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-lg);
  padding: var(--space-md);
  transition: all var(--transition-base);
  gap: var(--space-sm);
}

.ringtone-card:hover {
  transform: translateY(-4px) scale(1.01);
  box-shadow: 0 8px 30px rgba(124, 58, 237, 0.15);
  border-color: rgba(124, 58, 237, 0.3);
  background: var(--glass-bg-strong);
}

.ringtone-card__link {
  display: flex;
  align-items: center;
  gap: var(--space-md);
  flex: 1;
  min-width: 0;
}

/* Icon */
.ringtone-card__icon {
  width: 48px;
  height: 48px;
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.ringtone-card__cat-icon {
  font-size: 1.4rem;
}

/* Content */
.ringtone-card__content {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.ringtone-card__title {
  font-size: 0.9rem;
  font-weight: 600;
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  font-family: var(--font-body);
}

.ringtone-card__meta {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  flex-wrap: wrap;
}

.ringtone-card__duration {
  font-size: 0.7rem;
  color: var(--text-muted);
  display: inline-flex;
  align-items: center;
  gap: 2px;
}

.ringtone-card__stats {
  display: flex;
  align-items: center;
  gap: var(--space-md);
}

.ringtone-card__downloads,
.ringtone-card__rating {
  font-size: 0.7rem;
  color: var(--text-muted);
  display: inline-flex;
  align-items: center;
  gap: 2px;
}

.meta-icon {
  font-size: 0.75rem;
  opacity: 0.7;
}

.meta-icon--star {
  color: var(--accent-orange);
  opacity: 1;
}

/* Actions */
.ringtone-card__actions {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-sm);
  flex-shrink: 0;
}

.ringtone-card__play {
  position: relative;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--primary-start), var(--primary-end));
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all var(--transition-fast);
}

.ringtone-card__play:hover {
  transform: scale(1.1);
  box-shadow: var(--shadow-glow);
}

.ringtone-card__play--active {
  animation: glow-pulse 1.5s ease infinite;
}

.ringtone-card__play-ring {
  position: absolute;
  inset: -3px;
  border-radius: 50%;
  border: 2px solid var(--primary-start);
  animation: pulse-ring 1.5s ease infinite;
}

.ringtone-card__download-btn {
  width: 32px;
  height: 32px;
  border-radius: var(--radius-sm);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--accent-green);
  transition: all var(--transition-fast);
}

.ringtone-card__download-btn:hover {
  background: rgba(16, 185, 129, 0.15);
}

/* Mobile */
@media (max-width: 480px) {
  .ringtone-card__icon {
    width: 40px;
    height: 40px;
  }

  .ringtone-card__cat-icon {
    font-size: 1.1rem;
  }

  .ringtone-card__stats {
    display: none;
  }
}
</style>
