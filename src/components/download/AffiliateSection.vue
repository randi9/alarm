<template>
  <div class="affiliate" id="affiliate-section">
    <div class="affiliate__banner">
      <div class="affiliate__icon-wrap">
        <Icon :icon="icon" class="affiliate__icon" />
      </div>
      <div class="affiliate__content">
        <h3 class="affiliate__title">{{ title }}</h3>
        <p class="affiliate__desc">{{ description }}</p>
        <a
          :href="url"
          target="_blank"
          rel="noopener noreferrer"
          class="affiliate__btn"
          id="affiliate-link"
        >
          <Icon icon="mdi:cart-outline" /> Lihat di Shopee
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'

withDefaults(defineProps<{
  url?: string
  title?: string
  description?: string
  icon?: string
}>(), {
  url: 'https://shope.ee/placeholder-affiliate',
  title: 'Biar alarm-nya makin kenceng, pakai speaker ini!',
  description: 'Speaker Bluetooth portable terlaris di Shopee. Suara jernih, bass mantap, harga terjangkau!',
  icon: 'mdi:headphones'
})
</script>

<style scoped>
.affiliate__banner {
  background: linear-gradient(135deg, rgba(249, 115, 22, 0.1), rgba(234, 88, 12, 0.05));
  border: 1px solid rgba(249, 115, 22, 0.2);
  border-radius: var(--radius-xl);
  padding: var(--space-xl);
  display: flex;
  align-items: center;
  gap: var(--space-lg);
}

@media (max-width: 600px) {
  .affiliate__banner {
    flex-direction: column;
    text-align: center;
  }
}

.affiliate__icon-wrap {
  flex-shrink: 0;
}

.affiliate__icon {
  font-size: 3rem;
  color: var(--accent-orange);
}

.affiliate__content {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

.affiliate__title {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--accent-orange);
}

.affiliate__desc {
  font-size: 0.85rem;
  color: var(--text-secondary);
  line-height: 1.5;
}

.affiliate__btn {
  display: inline-flex;
  align-items: center;
  gap: var(--space-sm);
  padding: var(--space-sm) var(--space-lg);
  background: linear-gradient(135deg, #F97316, #EA580C);
  border-radius: var(--radius-md);
  color: white;
  font-weight: 600;
  font-size: 0.85rem;
  transition: all var(--transition-base);
  align-self: flex-start;
}

@media (max-width: 600px) {
  .affiliate__btn {
    align-self: center;
  }
}

.affiliate__btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 0 20px rgba(249, 115, 22, 0.3);
}
</style>
