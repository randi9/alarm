<template>
  <div class="countdown" id="countdown-timer">
    <div class="countdown__circle">
      <svg viewBox="0 0 120 120" class="countdown__svg">
        <circle
          cx="60" cy="60" r="54"
          fill="none"
          stroke="rgba(255,255,255,0.1)"
          stroke-width="6"
        />
        <circle
          cx="60" cy="60" r="54"
          fill="none"
          :stroke="circleColor"
          stroke-width="6"
          stroke-linecap="round"
          :stroke-dasharray="circumference"
          :stroke-dashoffset="dashOffset"
          class="countdown__progress"
        />
      </svg>
      <div class="countdown__number" :style="{ color: circleColor }">
        {{ remaining }}
      </div>
    </div>
    <p class="countdown__text" v-if="remaining > 0">
      Download akan dimulai dalam <strong>{{ remaining }} detik</strong>...
    </p>
    <p class="countdown__text countdown__text--done" v-else>
      <Icon icon="mdi:check-circle" class="countdown__check" /> Siap untuk download!
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { Icon } from '@iconify/vue'

const props = defineProps<{
  duration?: number
}>()

const emit = defineEmits(['complete'])

const totalDuration = props.duration || 10
const remaining = ref(totalDuration)
let intervalId: ReturnType<typeof setInterval> | null = null

const circumference = 2 * Math.PI * 54 // ~339.29

const dashOffset = computed(() => {
  const progress = remaining.value / totalDuration
  return circumference * progress
})

const circleColor = computed(() => {
  if (remaining.value <= 0) return '#10B981'
  if (remaining.value <= 3) return '#EF4444'
  if (remaining.value <= 6) return '#F59E0B'
  return '#10B981'
})

onMounted(() => {
  intervalId = setInterval(() => {
    remaining.value--
    if (remaining.value <= 0) {
      if (intervalId) clearInterval(intervalId)
      emit('complete')
    }
  }, 1000)
})

onUnmounted(() => {
  if (intervalId) clearInterval(intervalId)
})
</script>

<style scoped>
.countdown {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-lg);
}

.countdown__circle {
  position: relative;
  width: 140px;
  height: 140px;
}

.countdown__svg {
  width: 100%;
  height: 100%;
  transform: rotate(-90deg);
}

.countdown__progress {
  transition: stroke-dashoffset 1s linear, stroke 0.5s ease;
}

.countdown__number {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-heading);
  font-size: 3rem;
  font-weight: 800;
  transition: color 0.5s ease;
}

.countdown__text {
  color: var(--text-secondary);
  font-size: 1rem;
  text-align: center;
}

.countdown__text--done {
  color: var(--accent-green);
  font-weight: 600;
  animation: bounce-in 0.5s ease;
  display: flex;
  align-items: center;
  gap: 0.3rem;
}

.countdown__check {
  font-size: 1.2rem;
}
</style>
