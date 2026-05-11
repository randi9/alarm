<template>
  <AppNavbar @toggleSearch="handleToggleSearch" />
  <router-view />
  <GlobalAudioPlayer />
</template>

<script setup lang="ts">
import AppNavbar from './components/layout/AppNavbar.vue'
import GlobalAudioPlayer from './components/layout/GlobalAudioPlayer.vue'

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
