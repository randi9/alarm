<template>
  <div class="dashboard-page">
    <div class="admin-header">
      <h1 class="admin-title">Dashboard</h1>
      <p class="admin-subtitle">Welcome back to BunYing Admin</p>
    </div>

    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-card__icon" style="background: rgba(124, 58, 237, 0.1); color: var(--primary-start);">
          <Icon icon="mdi:music-note" />
        </div>
        <div class="stat-card__info">
          <h3>Total Ringtones</h3>
          <p class="stat-card__value">{{ stats.ringtones }}</p>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-card__icon" style="background: rgba(16, 185, 129, 0.1); color: var(--accent-green);">
          <Icon icon="mdi:folder-outline" />
        </div>
        <div class="stat-card__info">
          <h3>Categories</h3>
          <p class="stat-card__value">{{ stats.categories }}</p>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-card__icon" style="background: rgba(245, 158, 11, 0.1); color: var(--accent-orange);">
          <Icon icon="mdi:download" />
        </div>
        <div class="stat-card__info">
          <h3>Total Downloads</h3>
          <p class="stat-card__value">{{ formatNumber(stats.downloads) }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Icon } from '@iconify/vue'
import { api } from '../../services/api'

const stats = ref({
  ringtones: 0,
  categories: 0,
  downloads: 0
})

onMounted(async () => {
  // Fetch basic stats
  const catRes = await api.getCategories()
  if (catRes.success) {
    stats.value.categories = catRes.data.length
  }

  const ringRes = await api.getRingtones({ limit: 1000 }) // Hacky way to get all for now
  if (ringRes.success) {
    stats.value.ringtones = ringRes.meta?.total || ringRes.data.length
    stats.value.downloads = ringRes.data.reduce((acc: number, cur: any) => acc + cur.downloads, 0)
  }
})

function formatNumber(num: number) {
  return new Intl.NumberFormat('id-ID').format(num)
}
</script>

<style scoped>
.dashboard-page {
  display: flex;
  flex-direction: column;
  gap: var(--space-2xl);
}

.admin-header {
  margin-bottom: var(--space-xl);
}

.admin-title {
  font-size: 2rem;
  font-weight: 800;
  margin-bottom: var(--space-xs);
}

.admin-subtitle {
  color: var(--text-secondary);
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--space-lg);
}

.stat-card {
  background: var(--bg-secondary);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-lg);
  padding: var(--space-xl);
  display: flex;
  align-items: center;
  gap: var(--space-lg);
}

.stat-card__icon {
  width: 64px;
  height: 64px;
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
}

.stat-card__info h3 {
  font-size: 0.9rem;
  color: var(--text-secondary);
  font-weight: 500;
  margin-bottom: 4px;
}

.stat-card__value {
  font-size: 1.8rem;
  font-weight: 800;
  font-family: var(--font-heading);
}
</style>
