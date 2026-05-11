<template>
  <div class="ringtone-grid" id="ringtone-grid">
    <RingtoneCard
      v-for="ringtone in ringtones"
      :key="ringtone.id"
      :ringtone="ringtone"
    />
    <div v-if="ringtones.length === 0" class="ringtone-grid__empty">
      <Icon icon="mdi:volume-off" class="ringtone-grid__empty-icon" />
      <p>Tidak ada ringtone ditemukan</p>
      <p class="ringtone-grid__empty-sub">Coba kata kunci lain atau jelajahi kategori</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import type { Ringtone } from '../../data/ringtones'
import RingtoneCard from './RingtoneCard.vue'

defineProps<{
  ringtones: Ringtone[]
}>()
</script>

<style scoped>
.ringtone-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-md);
}

@media (min-width: 768px) {
  .ringtone-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .ringtone-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

.ringtone-grid__empty {
  grid-column: 1 / -1;
  text-align: center;
  padding: var(--space-3xl);
  color: var(--text-muted);
}

.ringtone-grid__empty-icon {
  font-size: 3rem;
  display: block;
  margin: 0 auto var(--space-md);
  opacity: 0.5;
}

.ringtone-grid__empty p {
  font-size: 1.1rem;
  font-weight: 500;
  color: var(--text-secondary);
}

.ringtone-grid__empty-sub {
  font-size: 0.85rem !important;
  color: var(--text-muted) !important;
  font-weight: 400 !important;
  margin-top: var(--space-xs);
}
</style>
