<template>
  <div class="waveform" :class="{ 'waveform--playing': isActive }">
    <span
      v-for="i in barCount"
      :key="i"
      class="waveform__bar"
      :style="{
        height: getBarHeight(i) + '%',
        animationDelay: `${i * 0.08}s`
      }"
    ></span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  isActive: boolean
  barCount?: number
}>()

const barCount = computed(() => props.barCount || 20)

function getBarHeight(index: number): number {
  // Create a pattern that looks like a waveform
  const heights = [30, 60, 45, 80, 50, 90, 35, 70, 55, 85, 40, 75, 60, 95, 45, 65, 50, 80, 55, 70]
  return heights[(index - 1) % heights.length]
}
</script>

<style scoped>
.waveform {
  display: flex;
  align-items: flex-end;
  gap: 2px;
  height: 60px;
  padding: 0 var(--space-sm);
}

.waveform__bar {
  flex: 1;
  min-width: 3px;
  max-width: 6px;
  background: linear-gradient(to top, var(--primary-start), var(--primary-end));
  border-radius: 2px;
  transition: height 0.3s ease;
  transform-origin: bottom;
}

.waveform--playing .waveform__bar {
  animation: wave-bounce 0.6s ease infinite;
}

.waveform:not(.waveform--playing) .waveform__bar {
  opacity: 0.4;
}
</style>
