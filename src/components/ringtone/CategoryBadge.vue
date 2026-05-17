<template>
  <span class="category-badge" :style="{ backgroundColor: bgColor, color: textColor }">
    <Icon :icon="iconName" class="category-badge__icon" />
    {{ label }}
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Icon } from '@iconify/vue'

const props = defineProps<{
  category: string
  label: string
  icon?: string
  color?: string
}>()

const iconName = computed(() => props.icon || 'mdi:music-note')

const bgColor = computed(() => {
  const c = props.color || '#7A9D00'
  return c + '20'
})

const textColor = computed(() => props.color || '#7A9D00')
</script>

<style scoped>
.category-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.15rem 0.5rem;
  border-radius: var(--radius-full);
  font-size: 0.65rem;
  font-weight: 600;
  white-space: nowrap;
}

.category-badge__icon {
  font-size: 0.8rem;
  flex-shrink: 0;
}
</style>
