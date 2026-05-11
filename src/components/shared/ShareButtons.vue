<template>
  <div class="share-buttons">
    <a
      :href="waUrl"
      target="_blank"
      rel="noopener"
      class="share-btn share-btn--wa"
      id="share-wa"
    >
      <Icon icon="mdi:whatsapp" /> WhatsApp
    </a>
    <a
      :href="twitterUrl"
      target="_blank"
      rel="noopener"
      class="share-btn share-btn--twitter"
      id="share-twitter"
    >
      <Icon icon="mdi:twitter" /> Twitter/X
    </a>
    <button class="share-btn share-btn--copy" @click="copyLink" id="share-copy">
      <Icon :icon="copied ? 'mdi:check-circle' : 'mdi:link-variant'" />
      {{ copied ? 'Tersalin!' : 'Copy Link' }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Icon } from '@iconify/vue'

const props = defineProps<{
  title: string
  url?: string
}>()

const copied = ref(false)

const currentUrl = computed(() => props.url || window.location.href)

const waUrl = computed(() => {
  const text = `Cek ringtone "${props.title}" di BunYing! ${currentUrl.value}`
  return `https://wa.me/?text=${encodeURIComponent(text)}`
})

const twitterUrl = computed(() => {
  const text = `Cek ringtone "${props.title}" di BunYing!`
  return `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(currentUrl.value)}`
})

function copyLink() {
  navigator.clipboard.writeText(currentUrl.value)
  copied.value = true
  setTimeout(() => { copied.value = false }, 2000)
}
</script>
