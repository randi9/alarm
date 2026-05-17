<template>
  <div class="page-wrapper">
    <div class="container">
      <div class="download-page" v-if="ringtone">
        <!-- Confetti -->
        <div class="download-page__confetti" v-if="isComplete">
          <span v-for="i in 20" :key="i" class="confetti-piece" :style="getConfettiStyle(i)"></span>
        </div>

        <h1 class="download-page__title">
          <Icon icon="mdi:download" class="dl-title-icon" /> Download: {{ ringtone.title }}
        </h1>

        <!-- Countdown -->
        <CountdownTimer v-if="!isComplete" @complete="onCountdownComplete" />

        <!-- Download button (appears after countdown) -->
        <div v-if="isComplete" class="download-page__ready">
          <button
            class="btn btn-download download-page__btn"
            @click="handleDownload('mp3')"
            id="final-download-btn"
          >
            <Icon icon="mdi:download" /> Download Sekarang (MP3)
          </button>
          <button
            v-if="format === 'm4r'"
            class="btn btn-download download-page__btn download-page__btn--m4r"
            @click="handleDownload('m4r')"
            id="final-download-m4r-btn"
          >
            <Icon icon="mdi:apple" /> Download M4R (iPhone)
          </button>
          <p class="download-page__success-text">
            Download berhasil? Jangan lupa share ke teman!
            <Icon icon="mdi:volume-high" class="dl-share-icon" />
          </p>
          <ShareButtons :title="ringtone.title" />
        </div>

        <!-- Affiliate (shown during countdown) -->
        <div v-if="!isComplete" class="download-page__affiliate">
          <AffiliateSection />
        </div>

        <!-- Ad -->
        <AdPlaceholder size="large" id="ad-download-1" />
      </div>

      <div v-else class="download-page__not-found">
        <p>Ringtone tidak ditemukan</p>
        <router-link to="/" class="btn btn-primary">Kembali ke Home</router-link>
      </div>
    </div>
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { Icon } from '@iconify/vue'
import { api } from '../services/api'
import { useDownload } from '../composables/useDownload'
import CountdownTimer from '../components/download/CountdownTimer.vue'
import AffiliateSection from '../components/download/AffiliateSection.vue'
import ShareButtons from '../components/shared/ShareButtons.vue'
import AdPlaceholder from '../components/shared/AdPlaceholder.vue'
import AppFooter from '../components/layout/AppFooter.vue'

const route = useRoute()
const format = computed(() => (route.query.format as string) || 'mp3')
const isComplete = ref(false)
const ringtone = ref<any>(null)

watch(() => route.params.id, async () => {
  const slug = route.params.id as string
  if (slug) {
    const res = await api.getRingtone(slug)
    if (res.success) {
      ringtone.value = res.data
    } else {
      ringtone.value = null
    }
  }
}, { immediate: true })
const { triggerDownload } = useDownload()

function onCountdownComplete() {
  isComplete.value = true
  // Auto trigger download for default format
  handleDownload(format.value as 'mp3' | 'm4r')
}

function handleDownload(fmt: 'mp3' | 'm4r') {
  if (ringtone.value) {
    triggerDownload(ringtone.value, fmt)
    // Optionally increment download count via API
    api.incrementDownload(ringtone.value.slug).catch(console.error)
  }
}

function getConfettiStyle(i: number) {
  const colors = ['#C6FD01', '#98C400', '#10B981', '#F59E0B', '#EF4444', '#EC4899']
  return {
    left: `${Math.random() * 100}%`,
    backgroundColor: colors[i % colors.length],
    animationDelay: `${Math.random() * 2}s`,
    animationDuration: `${2 + Math.random() * 2}s`,
    width: `${6 + Math.random() * 8}px`,
    height: `${6 + Math.random() * 8}px`
  }
}
</script>

<style scoped>
.download-page {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-xl);
  padding: var(--space-3xl) 0;
  text-align: center;
  min-height: 60vh;
}

.download-page__title {
  font-size: 1.5rem;
  font-weight: 700;
  max-width: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  flex-wrap: wrap;
}

.dl-title-icon {
  color: var(--accent-green);
  font-size: 1.3em;
}

@media (min-width: 768px) {
  .download-page__title {
    font-size: 1.8rem;
  }
}

/* Ready state */
.download-page__ready {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-lg);
  animation: bounce-in 0.5s ease;
}

.download-page__btn {
  font-size: 1.1rem;
  padding: var(--space-md) var(--space-2xl);
  border-radius: var(--radius-xl);
}

.download-page__btn--m4r {
  background: linear-gradient(135deg, #3B82F6, #98C400);
}

.download-page__success-text {
  color: var(--text-secondary);
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.3rem;
}

.dl-share-icon {
  color: var(--primary-start);
}

.download-page__affiliate {
  width: 100%;
  max-width: 600px;
}

/* Confetti */
.download-page__confetti {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 50;
  overflow: hidden;
}

.confetti-piece {
  position: absolute;
  top: -10px;
  border-radius: 2px;
  animation: confetti-fall 3s ease forwards;
}

/* Not found */
.download-page__not-found {
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
