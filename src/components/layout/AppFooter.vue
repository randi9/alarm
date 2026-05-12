<template>
  <footer class="footer">
    <div class="container">
      <div class="footer__grid">
        <!-- Brand -->
        <div class="footer__brand">
          <div class="footer__logo">
            <Icon icon="mdi:bell-ring" class="footer__logo-icon" />
            <span class="footer__logo-text">BunYing</span>
          </div>
          <p class="footer__tagline">Alarm & Ringtone Paling Ngeselin se-Indonesia</p>
          <p class="footer__desc">Platform download ringtone dan alarm unik gratis. Dijamin bikin pagi kamu lebih seru!</p>
        </div>

        <!-- Quick Links -->
        <div class="footer__section">
          <h4 class="footer__heading">Menu</h4>
          <ul class="footer__links">
            <li><router-link to="/">Home</router-link></li>
            <li><router-link to="/premium">Premium</router-link></li>
            <li><router-link to="/tentang">Tentang</router-link></li>
          </ul>
        </div>

        <!-- Kategori -->
        <div class="footer__section">
          <h4 class="footer__heading">Kategori Populer</h4>
          <ul class="footer__links">
            <li v-for="cat in categories.slice(0, 4)" :key="cat.slug">
              <router-link :to="`/kategori/${cat.slug}`">
                <Icon :icon="cat.icon" class="footer__cat-icon" /> {{ cat.label }}
              </router-link>
            </li>
          </ul>
        </div>

        <!-- Legal -->
        <div class="footer__section">
          <h4 class="footer__heading">Legal</h4>
          <ul class="footer__links">
            <li><router-link to="/privasi">Kebijakan Privasi</router-link></li>
            <li><router-link to="/privasi">Syarat & Ketentuan</router-link></li>
          </ul>
          <h4 class="footer__heading" style="margin-top: 1rem;">Kontak</h4>
          <ul class="footer__links">
            <li>
              <a href="https://wa.me/6281234567890" target="_blank" rel="noopener">
                <Icon icon="mdi:whatsapp" class="footer__cat-icon" /> WhatsApp
              </a>
            </li>
            <li>
              <a href="mailto:halo@bunying.id">
                <Icon icon="mdi:email-outline" class="footer__cat-icon" /> halo@bunying.id
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div class="footer__bottom">
        <p>&copy; {{ currentYear }} BunYing. All rights reserved.</p>
        <p class="footer__made">Made with <Icon icon="mdi:heart" class="footer__heart" /> di Indonesia</p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Icon } from '@iconify/vue'
import { api } from '../../services/api'

const currentYear = new Date().getFullYear()
const categories = ref<any[]>([])

onMounted(async () => {
  const res = await api.getCategories()
  if (res.success) {
    categories.value = res.data
  }
})
</script>

<style scoped>
.footer {
  background: var(--bg-secondary);
  border-top: 1px solid var(--glass-border);
  padding: var(--space-3xl) 0 var(--space-xl);
  margin-top: var(--space-3xl);
}

.footer__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-xl);
}

@media (min-width: 768px) {
  .footer__grid {
    grid-template-columns: 1.5fr 1fr 1fr 1fr;
    gap: var(--space-2xl);
  }
}

.footer__logo {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  margin-bottom: var(--space-md);
}

.footer__logo-icon {
  font-size: 1.5rem;
  color: var(--primary-start);
}

.footer__logo-text {
  font-family: var(--font-heading);
  font-weight: 800;
  font-size: 1.4rem;
  background: linear-gradient(135deg, var(--primary-start), var(--primary-end));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.footer__tagline {
  color: var(--text-secondary);
  font-size: 0.85rem;
  font-weight: 500;
  margin-bottom: var(--space-sm);
}

.footer__desc {
  color: var(--text-muted);
  font-size: 0.8rem;
  line-height: 1.6;
}

.footer__heading {
  font-family: var(--font-heading);
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: var(--space-md);
}

.footer__links {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

.footer__links a {
  color: var(--text-muted);
  font-size: 0.85rem;
  transition: color var(--transition-fast);
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
}

.footer__links a:hover {
  color: var(--primary-start);
}

.footer__cat-icon {
  font-size: 0.9rem;
  opacity: 0.7;
}

.footer__bottom {
  margin-top: var(--space-2xl);
  padding-top: var(--space-xl);
  border-top: 1px solid var(--glass-border);
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: var(--space-sm);
}

.footer__bottom p {
  color: var(--text-muted);
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.footer__made {
  color: var(--accent-pink) !important;
}

.footer__heart {
  color: var(--accent-pink);
  font-size: 0.9rem;
}
</style>
