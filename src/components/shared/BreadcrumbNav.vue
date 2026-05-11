<template>
  <nav class="breadcrumb" aria-label="Breadcrumb" id="breadcrumb">
    <router-link to="/">Home</router-link>
    <template v-for="(item, index) in items" :key="index">
      <span class="separator">›</span>
      <router-link v-if="item.to" :to="item.to">{{ item.label }}</router-link>
      <span v-else class="current">{{ item.label }}</span>
    </template>
  </nav>
</template>

<script setup lang="ts">
defineProps<{
  items: Array<{ label: string; to?: string }>
}>()
</script>
