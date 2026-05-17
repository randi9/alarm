<template>
  <section class="category-slider section" id="category-section">
    <div class="container">
      <div class="category-slider__header liquid-glass-card">
        <h2 class="section-title"><Icon icon="mdi:folder-open-outline" class="section-icon" /> Jelajahi Kategori</h2>
        <p class="section-subtitle">Temukan ringtone berdasarkan kategori favoritmu</p>
      </div>
      <div class="category-slider__track">
        <router-link
          v-for="cat in categories"
          :key="cat.slug"
          :to="`/kategori/${cat.slug}`"
          class="category-slider__card"
          :style="{ '--cat-color': cat.color }"
        >
          <div class="category-slider__icon-wrap" :style="{ background: `linear-gradient(135deg, ${cat.color}20, ${cat.color}08)` }">
            <Icon :icon="cat.icon" class="category-slider__icon" :style="{ color: cat.color }" />
          </div>
          <span class="category-slider__label">{{ cat.label }}</span>
        </router-link>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Icon } from '@iconify/vue'
import { api } from '../../services/api'

const categories = ref<any[]>([])

onMounted(async () => {
  const res = await api.getCategories()
  if (res.success) {
    categories.value = res.data
  }
})
</script>

<style scoped>
.section-icon {
  font-size: 1.2em;
  vertical-align: -0.15em;
  color: var(--primary-start);
}

.category-slider__header {
  margin-bottom: var(--space-lg);
}

.section-subtitle {
  font-size: 0.9rem;
  color: var(--text-muted);
  margin-top: 0.25rem;
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
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-sm);
  scroll-snap-align: start;
  transition: all var(--transition-base);
  text-align: center;
  cursor: pointer;
  backdrop-filter: blur(8px);
  box-shadow: 0 1px 4px var(--card-shadow);
}

.category-slider__card:hover {
  background: var(--card-bg-hover);
  border-color: color-mix(in srgb, var(--cat-color) 30%, transparent);
  transform: translateY(-6px);
  box-shadow: 0 12px 30px color-mix(in srgb, var(--cat-color) 15%, transparent);
}

.category-slider__icon-wrap {
  width: 56px;
  height: 56px;
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform var(--transition-base);
}

.category-slider__card:hover .category-slider__icon-wrap {
  transform: scale(1.1);
}

.category-slider__icon {
  font-size: 1.8rem;
}

.category-slider__label {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--text-primary);
}

@media (min-width: 768px) {
  .category-slider__card {
    width: 150px;
  }
}
</style>
