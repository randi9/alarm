<template>
  <AppNavbar v-if="!isAdminRoute" @toggleSearch="handleToggleSearch" />
  <router-view />
  <GlobalAudioPlayer v-if="!isAdminRoute" />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import AppNavbar from './components/layout/AppNavbar.vue'
import GlobalAudioPlayer from './components/layout/GlobalAudioPlayer.vue'

const route = useRoute()

const isAdminRoute = computed(() => {
  return route.path.startsWith('/admin') || route.path === '/login'
})

function handleToggleSearch() {
  // Focus the search input on the page if it exists
  const searchInput = document.getElementById('search-input') as HTMLInputElement | null
  if (searchInput) {
    searchInput.focus()
    searchInput.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }
}
</script>

<style>
/* Import global styles */
@import './assets/css/variables.css';
@import './assets/css/base.css';
@import './assets/css/animations.css';
@import './assets/css/components.css';
</style>
