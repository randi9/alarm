<template>
  <div class="page-wrapper">
    <HeroSection v-model:search-query="searchQuery" @clearSearch="clearSearch" />
    <CategorySlider />

    <section class="section" id="ringtone-list-section">
      <div class="container">
        <!-- Sort controls -->
        <div class="home__controls">
          <h2 class="section-title"><Icon icon="mdi:music-note" class="section-icon" /> Semua Ringtone</h2>
          <div class="home__sort">
            <label class="home__sort-label">Urutkan:</label>
            <select v-model="sortBy" class="home__sort-select" id="sort-select">
              <option value="terpopuler">Terpopuler</option>
              <option value="terbaru">Terbaru</option>
              <option value="rating">Rating Tertinggi</option>
            </select>
          </div>
        </div>

        <!-- Ringtone Grid with ad in between -->
        <RingtoneGrid :ringtones="firstBatch" />
        <AdPlaceholder size="default" id="ad-homepage-1" />
        <RingtoneGrid :ringtones="secondBatch" v-if="secondBatch.length > 0" />
      </div>
    </section>

    <FeaturedSection />
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Icon } from '@iconify/vue'
import { useSearch } from '../composables/useSearch'
import HeroSection from '../components/home/HeroSection.vue'
import CategorySlider from '../components/home/CategorySlider.vue'
import FeaturedSection from '../components/home/FeaturedSection.vue'
import RingtoneGrid from '../components/ringtone/RingtoneGrid.vue'
import AdPlaceholder from '../components/shared/AdPlaceholder.vue'
import AppFooter from '../components/layout/AppFooter.vue'

const { query: searchQuery, sortBy, filteredRingtones, clearSearch } = useSearch()

const firstBatch = computed(() => filteredRingtones.value.slice(0, 6))
const secondBatch = computed(() => filteredRingtones.value.slice(6))
</script>

<style scoped>
.section-icon {
  font-size: 1.2em;
  vertical-align: -0.15em;
  color: var(--primary-start);
}

.home__controls {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: var(--space-md);
  margin-bottom: var(--space-lg);
}

.home__sort {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
}

.home__sort-label {
  font-size: 0.85rem;
  color: var(--text-muted);
}

.home__sort-select {
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-md);
  padding: var(--space-sm) var(--space-md);
  color: var(--text-primary);
  font-size: 0.85rem;
  cursor: pointer;
  outline: none;
  transition: border-color var(--transition-fast);
}

.home__sort-select:focus {
  border-color: var(--primary-start);
}

.home__sort-select option {
  background: var(--bg-secondary);
}
</style>
