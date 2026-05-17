<template>
  <div v-if="false" class="ad-placeholder" :class="[sizeClass]" :id="id">
    <div class="ad-placeholder__content">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" opacity="0.5">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <line x1="3" y1="9" x2="21" y2="9" />
        <line x1="9" y1="21" x2="9" y2="9" />
      </svg>
      <span>Ad Space</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  size?: 'default' | 'large' | 'sidebar'
  id?: string
}>()

const sizeClass = computed(() => {
  if (props.size === 'large') return 'ad-placeholder--large'
  if (props.size === 'sidebar') return 'ad-placeholder--sidebar'
  return ''
})
</script>
