<template>
  <div class="page-wrapper">
    <div class="container">
      <div class="not-found">
        <Icon icon="mdi:bell-ring" class="not-found__icon" />
        <h1 class="not-found__title">404</h1>
        <p class="not-found__text">Waduh, halaman ini nggak ada!</p>
        <p class="not-found__subtext">
          Mungkin kamu salah ketik URL, atau halaman ini sudah dipindahkan.
        </p>
        <router-link to="/" class="btn btn-primary not-found__btn" id="go-home-btn">
          <Icon icon="mdi:home" /> Kembali ke Homepage
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
</script>

<style scoped>
.not-found {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  text-align: center;
  gap: var(--space-md);
  padding: var(--space-2xl);
}

.not-found__icon {
  font-size: 5rem;
  color: var(--primary-start);
  animation: vibrate 1s ease infinite;
}

.not-found__title {
  font-size: 6rem;
  font-weight: 800;
  background: linear-gradient(135deg, var(--primary-start), var(--primary-end));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1;
}

.not-found__text {
  font-size: 1.3rem;
  font-weight: 600;
  color: var(--text-primary);
}

.not-found__subtext {
  color: var(--text-muted);
  font-size: 0.9rem;
  max-width: 400px;
}

.not-found__btn {
  margin-top: var(--space-md);
  padding: var(--space-md) var(--space-xl);
  font-size: 1rem;
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
}
</style>
