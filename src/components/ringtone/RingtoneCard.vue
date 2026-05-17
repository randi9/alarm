<template>
  <article class="ringtone-card liquid-glass-card" :id="`ringtone-card-${ringtone.slug}`">
    <router-link :to="`/ringtone/${ringtone.slug}`" class="ringtone-card__link">
      <!-- Icon -->
      <div class="ringtone-card__icon" :style="{ background: iconBg }">
        <Icon :icon="catIcon" class="ringtone-card__cat-icon" :style="{ color: catColor }" />
      </div>

      <!-- Content -->
      <div class="ringtone-card__content">
        <h3 class="ringtone-card__title">{{ ringtone.title }}</h3>
        <div class="ringtone-card__meta">
          <CategoryBadge 
            :category="ringtone.category_slug" 
            :label="ringtone.category_label" 
            :icon="ringtone.category_icon"
            :color="ringtone.category_color"
          />
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
        :id="`play-${ringtone.slug}`"
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
        :to="`/download/${ringtone.slug}`"
        class="ringtone-card__download-btn"
        :id="`download-${ringtone.slug}`"
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
import { useAudioPlayer } from '../../composables/useAudioPlayer'
import CategoryBadge from './CategoryBadge.vue'

const props = defineProps<{
  ringtone: any
}>()

const { currentRingtone, isPlaying, play } = useAudioPlayer()

const isCurrentPlaying = computed(() =>
  currentRingtone.value?.slug === props.ringtone.slug && isPlaying.value
)

const catIcon = computed(() => props.ringtone.category_icon || 'mdi:volume-high')
const catColor = computed(() => props.ringtone.category_color || '#7A9D00')

const iconBg = computed(() => {
  const color = props.ringtone.category_color || '#7A9D00'
  return `linear-gradient(135deg, ${color}30, ${color}10)`
})

function formatDownloadsLocal(count: number): string {
  if (!count) return '0'
  if (count >= 1000) {
    return (count / 1000).toFixed(1).replace(/\.0$/, '') + 'K'
  }
  return count.toString()
}

const formattedDownloads = computed(() => formatDownloadsLocal(props.ringtone.downloads))

function handlePlay() {
  play(props.ringtone)
}

function handleDownloadClick() {
  if (props.ringtone.affiliate_url) {
    window.open(props.ringtone.affiliate_url, '_blank', 'noopener,noreferrer')
  } else {
    // Optionally open a default fallback link
    window.open('https://shope.ee/placeholder-affiliate', '_blank', 'noopener,noreferrer')
  }
}
</script>

<style scoped>
.ringtone-card {
  display: flex;
  align-items: center;
  background: var(--card-bg);
  backdrop-filter: blur(8px);
  border: 1px solid var(--card-border);
  border-radius: var(--radius-lg);
  padding: var(--space-md) !important;
  transition: all var(--transition-base);
  gap: var(--space-sm);
  box-shadow: 0 1px 4px var(--card-shadow);
}

.ringtone-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px var(--card-shadow-hover);
  border-color: rgba(198, 253, 1, 0.15);
  background: var(--card-bg-hover);
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
  color: var(--text-primary);
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
  opacity: 0.6;
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
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--primary-start), var(--primary-end));
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all var(--transition-fast);
  box-shadow: 0 3px 10px rgba(198, 253, 1, 0.2);
}

.ringtone-card__play:hover {
  transform: scale(1.12);
  box-shadow: 0 5px 18px rgba(198, 253, 1, 0.3);
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
  background: rgba(16, 185, 129, 0.1);
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
