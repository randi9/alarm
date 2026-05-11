<template>
  <span class="category-badge" :style="{ backgroundColor: bgColor, color: textColor }">
    <Icon :icon="iconName" class="category-badge__icon" />
    {{ label }}
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Icon } from '@iconify/vue'
import { getCategoryBySlug } from '../../data/categories'

const props = defineProps<{
  category: string
  label: string
}>()

const categoryData = computed(() => getCategoryBySlug(props.category))

const iconName = computed(() => categoryData.value?.icon || 'mdi:music-note')

const bgColor = computed(() => {
  const color = categoryData.value?.color || '#6D28D9'
  return color + '20'
})

const textColor = computed(() => categoryData.value?.color || '#6D28D9')
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
