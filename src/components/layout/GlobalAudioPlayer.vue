<template>
  <Transition name="slide-up">
    <div v-if="isPlayerVisible && currentRingtone" class="global-player" id="global-audio-player">
      <div class="global-player__inner container">
        <!-- Play/Pause -->
        <button class="global-player__play" id="global-player-toggle" @click="toggle">
          <div class="global-player__play-ring" v-if="isPlaying"></div>
          <svg v-if="!isPlaying" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <polygon points="5 3 19 12 5 21 5 3" />
          </svg>
          <svg v-else width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <rect x="6" y="4" width="4" height="16" />
            <rect x="14" y="4" width="4" height="16" />
          </svg>
        </button>

        <!-- Info -->
        <div class="global-player__info">
          <router-link
            :to="`/ringtone/${currentRingtone.slug}`"
            class="global-player__title"
          >
            {{ currentRingtone.title }}
          </router-link>
          <span class="global-player__category">{{ currentRingtone.category_label }}</span>
        </div>

        <!-- Progress -->
        <div class="global-player__progress-wrap" @click="handleProgressClick">
          <div class="global-player__progress-bar">
            <div class="global-player__progress-fill" :style="{ width: progress + '%' }"></div>
            <div class="global-player__progress-thumb" :style="{ left: progress + '%' }"></div>
          </div>
        </div>

        <!-- Time -->
        <span class="global-player__time">
          {{ formatTime(currentTime) }} / {{ formatTime(duration) }}
        </span>

        <!-- Download -->
        <router-link
          :to="`/download/${currentRingtone.slug}`"
          class="global-player__download"
          id="global-player-download"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
        </router-link>
      </div>

      <!-- Waveform bars (visual only) -->
      <div class="global-player__waveform" v-if="isPlaying">
        <span v-for="i in 5" :key="i" class="wave-bar" :style="{ animationDelay: `${i * 0.1}s` }"></span>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { useAudioPlayer } from '../../composables/useAudioPlayer'

const {
  currentRingtone,
  isPlaying,
  currentTime,
  duration,
  progress,
  isPlayerVisible,
  toggle,
  seekByPercent,
  formatTime
} = useAudioPlayer()

function handleProgressClick(e: MouseEvent) {
  const target = e.currentTarget as HTMLElement
  const rect = target.getBoundingClientRect()
  const percent = ((e.clientX - rect.left) / rect.width) * 100
  seekByPercent(percent)
}
</script>

<style scoped>
.global-player {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: var(--player-height);
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-top: 1px solid rgba(0, 0, 0, 0.06);
  z-index: var(--z-player);
  animation: slide-up 0.4s ease;
  box-shadow: 0 -2px 20px rgba(0, 0, 0, 0.05);
}

.global-player__inner {
  display: flex;
  align-items: center;
  gap: var(--space-md);
  height: 100%;
}

/* Play button */
.global-player__play {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--primary-start), var(--primary-end));
  color: white;
  flex-shrink: 0;
  transition: all var(--transition-fast);
}

.global-player__play:hover {
  transform: scale(1.1);
  box-shadow: var(--shadow-glow);
}

.global-player__play-ring {
  position: absolute;
  inset: -4px;
  border-radius: 50%;
  border: 2px solid var(--primary-start);
  animation: pulse-ring 1.5s ease infinite;
}

/* Info */
.global-player__info {
  display: flex;
  flex-direction: column;
  min-width: 0;
  flex-shrink: 0;
  max-width: 200px;
}

.global-player__title {
  font-size: 0.85rem;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: color var(--transition-fast);
}

.global-player__title:hover {
  color: var(--primary-start);
}

.global-player__category {
  font-size: 0.7rem;
  color: var(--text-muted);
}

/* Progress */
.global-player__progress-wrap {
  flex: 1;
  cursor: pointer;
  padding: 8px 0;
  min-width: 60px;
}

.global-player__progress-bar {
  position: relative;
  height: 4px;
  background: rgba(0, 0, 0, 0.08);
  border-radius: 2px;
}

.global-player__progress-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--primary-start), var(--primary-end));
  border-radius: 2px;
  transition: width 0.1s linear;
}

.global-player__progress-thumb {
  position: absolute;
  top: 50%;
  width: 12px;
  height: 12px;
  background: var(--text-primary);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  opacity: 0;
  transition: opacity var(--transition-fast);
}

.global-player__progress-wrap:hover .global-player__progress-thumb {
  opacity: 1;
}

/* Time */
.global-player__time {
  font-size: 0.75rem;
  color: var(--text-muted);
  white-space: nowrap;
  font-variant-numeric: tabular-nums;
}

/* Download */
.global-player__download {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: var(--radius-md);
  color: var(--accent-green);
  transition: all var(--transition-fast);
  flex-shrink: 0;
}

.global-player__download:hover {
  background: rgba(16, 185, 129, 0.15);
}

/* Waveform */
.global-player__waveform {
  position: absolute;
  top: -2px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: flex-end;
  gap: 2px;
  height: 8px;
}

.wave-bar {
  width: 3px;
  height: 100%;
  background: var(--primary-start);
  border-radius: 1px;
  animation: wave-bounce 0.6s ease infinite;
  transform-origin: bottom;
}

/* Transition */
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.4s ease;
}
.slide-up-enter-from,
.slide-up-leave-to {
  transform: translateY(100%);
  opacity: 0;
}

/* Mobile */
@media (max-width: 768px) {
  .global-player__info {
    max-width: 120px;
  }

  .global-player__time {
    display: none;
  }

  .global-player__waveform {
    display: none;
  }
}
</style>
