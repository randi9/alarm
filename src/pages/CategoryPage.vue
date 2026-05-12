<template>
  <div class="page-wrapper">
    <div class="container">
      <BreadcrumbNav :items="breadcrumbs" />

      <header class="category-header" v-if="category">
        <div class="category-header__icon">
          <Icon :icon="category.icon" class="category-header__icon-svg" :style="{ color: category.color }" />
        </div>
        <div class="category-header__info">
          <h1 class="category-header__title">{{ category.label }}</h1>
          <p class="category-header__desc">{{ category.description }}</p>
          <span class="category-header__count">{{ categoryRingtones.length }} ringtone tersedia</span>
        </div>
      </header>

      <div class="category-page__layout" v-if="category">
        <div class="category-page__main">
          <RingtoneGrid :ringtones="categoryRingtones" />
        </div>
        <aside class="category-page__sidebar">
          <AdPlaceholder size="sidebar" id="ad-category-sidebar" />
        </aside>
      </div>

      <div v-else class="category-page__not-found">
        <p>Kategori tidak ditemukan</p>
        <router-link to="/" class="btn btn-primary">Kembali ke Home</router-link>
      </div>
    </div>
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { Icon } from '@iconify/vue'
import { useRoute } from 'vue-router'
import { api } from '../services/api'
import BreadcrumbNav from '../components/shared/BreadcrumbNav.vue'
import RingtoneGrid from '../components/ringtone/RingtoneGrid.vue'
import AdPlaceholder from '../components/shared/AdPlaceholder.vue'
import AppFooter from '../components/layout/AppFooter.vue'

const route = useRoute()

const category = ref<any>(null)
const categoryRingtones = ref<any[]>([])

const fetchCategoryData = async () => {
  const slug = route.params.slug as string
  if (!slug) return

  const res = await api.getCategory(slug)
  if (res.success) {
    category.value = res.data

    const ringtonesRes = await api.getRingtones({ category: slug, limit: 50 })
    if (ringtonesRes.success) {
      categoryRingtones.value = ringtonesRes.data
    }
  } else {
    category.value = null
  }
}

const breadcrumbs = computed(() => [
  { label: 'Kategori', to: '/' },
  { label: category.value?.label || 'Unknown' }
])

watch(() => route.params.slug, () => {
  fetchCategoryData()
}, { immediate: true })

watch(category, (newVal) => {
  if (newVal) {
    document.title = `${newVal.label} — BunYing`
  }
})
</script>

<style scoped>
.category-header {
  display: flex;
  align-items: center;
  gap: var(--space-lg);
  padding: var(--space-xl) 0;
  margin-bottom: var(--space-lg);
}

.category-header__icon {
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-xl);
  flex-shrink: 0;
}

.category-header__icon-svg {
  font-size: 2.5rem;
}

.category-header__title {
  font-size: 1.8rem;
  font-weight: 800;
  margin-bottom: var(--space-xs);
}

.category-header__desc {
  color: var(--text-secondary);
  font-size: 0.9rem;
  line-height: 1.5;
  margin-bottom: var(--space-xs);
}

.category-header__count {
  font-size: 0.8rem;
  color: var(--text-muted);
}

.category-page__layout {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-xl);
}

@media (min-width: 1024px) {
  .category-page__layout {
    grid-template-columns: 1fr 300px;
  }
}

.category-page__sidebar {
  display: none;
}

@media (min-width: 1024px) {
  .category-page__sidebar {
    display: block;
  }
}

.category-page__not-found {
  text-align: center;
  padding: var(--space-3xl);
  color: var(--text-secondary);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-lg);
  font-size: 1.2rem;
}
</style>
