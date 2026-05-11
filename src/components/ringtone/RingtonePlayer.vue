<template>
  <div class="ringtone-player" id="ringtone-detail-player">
    <!-- Waveform -->
    <WaveformVisualizer :is-active="isCurrentPlaying" :bar-count="30" />

    <!-- Controls -->
    <div class="ringtone-player__controls">
      <button
        class="ringtone-player__play-btn"
        :class="{ 'ringtone-player__play-btn--active': isCurrentPlaying }"
        @click="handlePlay"
        id="detail-play-btn"
      >
        <div class="ringtone-player__play-ring" v-if="isCurrentPlaying"></div>
        <svg v-if="!isCurrentPlaying" width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
          <polygon points="5 3 19 12 5 21 5 3" />
        </svg>
        <svg v-else width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
          <rect x="6" y="4" width="4" height="16" />
          <rect x="14" y="4" width="4" height="16" />
        </svg>
      </button>
    </div>

    <!-- Progress -->
    <div class="ringtone-player__progress" @click="handleProgressClick">
      <div class="ringtone-player__progress-bar">
        <div class="ringtone-player__progress-fill" :style="{ width: displayProgress + '%' }"></div>
        <div class="ringtone-player__progress-thumb" :style="{ left: displayProgress + '%' }"></div>
      </div>
      <div class="ringtone-player__time">
        <span>{{ formatTime(displayCurrentTime) }}</span>
        <span>{{ formatTime(displayDuration) }}</span>
      </div>
    </div>

    <!-- Volume -->
    <div class="ringtone-player__volume">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
        <path d="M19.07 4.93a10 10 0 0 1 0 14.14" v-if="volume > 0.5" />
        <path d="M15.54 8.46a5 5 0 0 1 0 7.07" v-if="volume > 0" />
      </svg>
      <input
        type="range"
        min="0"
        max="1"
        step="0.05"
        :value="volume"
        @input="handleVolumeChange"
        class="ringtone-player__volume-slider"
        id="volume-slider"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Ringtone } from '../../data/ringtones'
import { useAudioPlayer } from '../../composables/useAudioPlayer'
import WaveformVisualizer from './WaveformVisualizer.vue'

const props = defineProps<{
  ringtone: Ringtone
}>()

const {
  currentRingtone,
  isPlaying,
  currentTime,
  duration,
  progress,
  volume,
  play,
  seekByPercent,
  setVolume,
  formatTime
} = useAudioPlayer()

const isCurrentPlaying = computed(() =>
  currentRingtone.value?.id === props.ringtone.id && isPlaying.value
)

const isCurrentRingtone = computed(() =>
  currentRingtone.value?.id === props.ringtone.id
)

const displayProgress = computed(() => isCurrentRingtone.value ? progress.value : 0)
const displayCurrentTime = computed(() => isCurrentRingtone.value ? currentTime.value : 0)
const displayDuration = computed(() => {
  if (isCurrentRingtone.value && duration.value > 0) return duration.value
  // Parse duration string
  const parts = props.ringtone.duration.split(':')
  return parseInt(parts[0]) * 60 + parseInt(parts[1])
})

function handlePlay() {
  play(props.ringtone)
}

function handleProgressClick(e: MouseEvent) {
  if (!isCurrentRingtone.value) {
    play(props.ringtone)
    return
  }
  const target = e.currentTarget as HTMLElement
  const rect = target.getBoundingClientRect()
  const percent = ((e.clientX - rect.left) / rect.width) * 100
  seekByPercent(percent)
}

function handleVolumeChange(e: Event) {
  const val = parseFloat((e.target as HTMLInputElement).value)
  setVolume(val)
}
</script>

<style scoped>
.ringtone-player {
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-xl);
  padding: var(--space-xl);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-lg);
}

/* Play button */
.ringtone-player__controls {
  display: flex;
  align-items: center;
  justify-content: center;
}

.ringtone-player__play-btn {
  position: relative;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--primary-start), var(--primary-end));
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all var(--transition-base);
}

.ringtone-player__play-btn:hover {
  transform: scale(1.1);
  box-shadow: var(--shadow-glow-strong);
}

.ringtone-player__play-btn--active {
  animation: glow-pulse 1.5s ease infinite;
}

.ringtone-player__play-ring {
  position: absolute;
  inset: -6px;
  border-radius: 50%;
  border: 2px solid var(--primary-start);
  animation: pulse-ring 1.5s ease infinite;
}

/* Progress */
.ringtone-player__progress {
  width: 100%;
  cursor: pointer;
}

.ringtone-player__progress-bar {
  position: relative;
  height: 6px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
  margin-bottom: var(--space-sm);
}

.ringtone-player__progress-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--primary-start), var(--primary-end));
  border-radius: 3px;
  transition: width 0.1s linear;
}

.ringtone-player__progress-thumb {
  position: absolute;
  top: 50%;
  width: 14px;
  height: 14px;
  background: white;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
  opacity: 0;
  transition: opacity var(--transition-fast);
}

.ringtone-player__progress:hover .ringtone-player__progress-thumb {
  opacity: 1;
}

.ringtone-player__time {
  display: flex;
  justify-content: space-between;
  font-size: 0.75rem;
  color: var(--text-muted);
  font-variant-numeric: tabular-nums;
}

/* Volume */
.ringtone-player__volume {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  color: var(--text-muted);
}

.ringtone-player__volume-slider {
  -webkit-appearance: none;
  appearance: none;
  width: 100px;
  height: 4px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 2px;
  outline: none;
}

.ringtone-player__volume-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: var(--primary);
  cursor: pointer;
}

.ringtone-player__volume-slider::-moz-range-thumb {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: var(--primary);
  cursor: pointer;
  border: none;
}
</style>
