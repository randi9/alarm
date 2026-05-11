<template>
  <section class="category-slider section" id="category-section">
    <div class="container">
      <h2 class="section-title"><Icon icon="mdi:folder-open-outline" class="section-icon" /> Jelajahi Kategori</h2>
      <div class="category-slider__track">
        <router-link
          v-for="cat in categories"
          :key="cat.slug"
          :to="`/kategori/${cat.slug}`"
          class="category-slider__card"
          :style="{ '--cat-color': cat.color }"
        >
          <Icon :icon="cat.icon" class="category-slider__icon" :style="{ color: cat.color }" />
          <span class="category-slider__label">{{ cat.label }}</span>
          <span class="category-slider__count">{{ getCategoryCount(cat.slug) }} item</span>
        </router-link>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { categories } from '../../data/categories'
import { ringtones } from '../../data/ringtones'

function getCategoryCount(slug: string): number {
  return ringtones.filter(r => r.category === slug).length
}
</script>

<style scoped>
.section-icon {
  font-size: 1.2em;
  vertical-align: -0.15em;
  color: var(--primary-start);
}

.category-slider__track {
  display: flex;
  gap: var(--space-md);
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  padding-bottom: var(--space-md);
  scrollbar-width: none;
}

.category-slider__track::-webkit-scrollbar {
  display: none;
}

.category-slider__card {
  flex-shrink: 0;
  width: 140px;
  padding: var(--space-lg) var(--space-md);
  border-radius: var(--radius-lg);
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-sm);
  scroll-snap-align: start;
  transition: all var(--transition-base);
  text-align: center;
  cursor: pointer;
}

.category-slider__card:hover {
  background: linear-gradient(135deg, color-mix(in srgb, var(--cat-color) 15%, transparent), color-mix(in srgb, var(--cat-color) 5%, transparent));
  border-color: color-mix(in srgb, var(--cat-color) 40%, transparent);
  transform: translateY(-4px);
  box-shadow: 0 8px 25px color-mix(in srgb, var(--cat-color) 20%, transparent);
  animation: float 3s ease infinite;
}

.category-slider__icon {
  font-size: 2rem;
}

.category-slider__label {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--text-primary);
}

.category-slider__count {
  font-size: 0.7rem;
  color: var(--text-muted);
}

@media (min-width: 768px) {
  .category-slider__card {
    width: 150px;
  }
}
</style>
