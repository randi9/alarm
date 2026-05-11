<template>
  <div class="page-wrapper">
    <div class="container" v-if="ringtone">
      <BreadcrumbNav :items="breadcrumbs" />

      <div class="detail-page__layout">
        <main class="detail-page__main">
          <!-- Player -->
          <RingtonePlayer :ringtone="ringtone" />

          <!-- Info -->
          <div class="detail-info">
            <h1 class="detail-info__title">{{ ringtone.title }}</h1>
            <p class="detail-info__desc">{{ ringtone.description }}</p>

            <div class="detail-info__meta">
              <CategoryBadge :category="ringtone.category" :label="ringtone.categoryLabel" />
              <span><Icon icon="mdi:timer-outline" class="dmeta-icon" /> {{ ringtone.duration }}</span>
              <span><Icon icon="mdi:download" class="dmeta-icon" /> {{ formatDownloads(ringtone.downloads) }} download</span>
              <span><Icon icon="mdi:star" class="dmeta-icon dmeta-icon--star" /> {{ ringtone.rating }}</span>
              <span><Icon icon="mdi:calendar-outline" class="dmeta-icon" /> {{ formatDate(ringtone.dateAdded) }}</span>
            </div>

            <!-- Download buttons -->
            <div class="detail-info__downloads">
              <router-link :to="`/download/${ringtone.id}`" class="btn btn-download" id="download-mp3-btn">
                <Icon icon="mdi:download" /> Download MP3
              </router-link>
              <router-link :to="`/download/${ringtone.id}?format=m4r`" class="btn btn-download btn-download--m4r" id="download-m4r-btn">
                <Icon icon="mdi:apple" /> Download M4R (iPhone)
              </router-link>
            </div>

            <!-- Share -->
            <div class="detail-info__share">
              <h3>Bagikan:</h3>
              <ShareButtons :title="ringtone.title" />
            </div>
          </div>

          <!-- Ad -->
          <AdPlaceholder size="default" id="ad-detail-1" />

          <!-- Similar -->
          <section class="detail-similar" v-if="similarRingtones.length > 0">
            <h2 class="section-title"><Icon icon="mdi:music-note" class="section-icon" /> Ringtone Serupa</h2>
            <RingtoneGrid :ringtones="similarRingtones" />
          </section>
        </main>
      </div>
    </div>

    <div class="container" v-else>
      <div class="detail-page__not-found">
        <p>Ringtone tidak ditemukan</p>
        <router-link to="/" class="btn btn-primary">Kembali ke Home</router-link>
      </div>
    </div>
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { Icon } from '@iconify/vue'
import { getRingtoneById, getRingtonesByCategory, formatDownloads } from '../data/ringtones'
import BreadcrumbNav from '../components/shared/BreadcrumbNav.vue'
import RingtonePlayer from '../components/ringtone/RingtonePlayer.vue'
import RingtoneGrid from '../components/ringtone/RingtoneGrid.vue'
import CategoryBadge from '../components/ringtone/CategoryBadge.vue'
import ShareButtons from '../components/shared/ShareButtons.vue'
import AdPlaceholder from '../components/shared/AdPlaceholder.vue'
import AppFooter from '../components/layout/AppFooter.vue'

const route = useRoute()

const ringtone = computed(() => getRingtoneById(route.params.id as string))

const similarRingtones = computed(() => {
  if (!ringtone.value) return []
  return getRingtonesByCategory(ringtone.value.category)
    .filter(r => r.id !== ringtone.value!.id)
    .slice(0, 6)
})

const breadcrumbs = computed(() => [
  { label: ringtone.value?.categoryLabel || 'Kategori', to: `/kategori/${ringtone.value?.category}` },
  { label: ringtone.value?.title || 'Ringtone' }
])

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('id-ID', {
    day: 'numeric', month: 'long', year: 'numeric'
  })
}

watch(() => route.params.id, () => {
  if (ringtone.value) {
    document.title = `${ringtone.value.title} — BunYing`
    const meta = document.querySelector('meta[name="description"]')
    if (meta) meta.setAttribute('content', ringtone.value.description)
  }
}, { immediate: true })
</script>

<style scoped>
.section-icon {
  font-size: 1.2em;
  vertical-align: -0.15em;
  color: var(--primary-start);
}

.detail-page__layout {
  padding: var(--space-xl) 0;
}

.detail-page__main {
  display: flex;
  flex-direction: column;
  gap: var(--space-xl);
  max-width: 800px;
  margin: 0 auto;
}

/* Info */
.detail-info {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}

.detail-info__title {
  font-size: 1.8rem;
  font-weight: 800;
  line-height: 1.2;
}

.detail-info__desc {
  color: var(--text-secondary);
  font-size: 0.95rem;
  line-height: 1.6;
}

.detail-info__meta {
  display: flex;
  align-items: center;
  gap: var(--space-md);
  flex-wrap: wrap;
  font-size: 0.8rem;
  color: var(--text-muted);
}

.detail-info__meta span {
  display: inline-flex;
  align-items: center;
  gap: 3px;
}

.dmeta-icon {
  font-size: 0.9rem;
  opacity: 0.7;
}

.dmeta-icon--star {
  color: var(--accent-orange);
  opacity: 1;
}

.detail-info__downloads {
  display: flex;
  gap: var(--space-md);
  flex-wrap: wrap;
}

.btn-download--m4r {
  background: linear-gradient(135deg, #3B82F6, #2563EB);
}

.btn-download--m4r:hover {
  box-shadow: 0 0 20px rgba(59, 130, 246, 0.4);
}

.detail-info__share {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

.detail-info__share h3 {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--text-secondary);
}

/* Not found */
.detail-page__not-found {
  text-align: center;
  padding: var(--space-3xl);
  color: var(--text-secondary);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-lg);
  font-size: 1.2rem;
}

.detail-similar {
  margin-top: var(--space-lg);
}
</style>
