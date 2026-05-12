<template>
  <nav class="navbar" :class="{ 'navbar--scrolled': isScrolled }">
    <div class="navbar__inner container">
      <!-- Logo -->
      <router-link to="/" class="navbar__logo" id="navbar-logo">
        <Icon icon="mdi:bell-ring" class="navbar__logo-icon" />
        <span class="navbar__logo-text">BunYing</span>
      </router-link>

      <!-- Desktop Menu -->
      <div class="navbar__menu" :class="{ 'navbar__menu--open': isMobileOpen }">
        <router-link to="/" class="navbar__link" id="nav-home" @click="closeMobile">Home</router-link>
        
        <div class="navbar__dropdown" @mouseenter="showDropdown = true" @mouseleave="showDropdown = false">
          <button class="navbar__link navbar__link--dropdown" id="nav-kategori">
            Kategori
            <Icon icon="mdi:chevron-down" width="14" />
          </button>
          <div class="navbar__dropdown-menu" v-show="showDropdown">
            <router-link
              v-for="cat in categories"
              :key="cat.slug"
              :to="`/kategori/${cat.slug}`"
              class="navbar__dropdown-item"
              @click="closeMobileAndDropdown"
            >
              <Icon :icon="cat.icon" width="16" :style="{ color: cat.color }" />
              <span>{{ cat.label }}</span>
            </router-link>
          </div>
        </div>

        <router-link to="/premium" class="navbar__link" id="nav-premium" @click="closeMobile">
          <Icon icon="mdi:gift-outline" class="navbar__premium-badge" />
          Premium
        </router-link>
        <router-link to="/tentang" class="navbar__link" id="nav-tentang" @click="closeMobile">Tentang</router-link>
      </div>

      <!-- Right side -->
      <div class="navbar__actions">
        <button class="navbar__search-btn" id="nav-search-btn" @click="$emit('toggleSearch')">
          <Icon icon="mdi:magnify" width="20" />
        </button>

        <!-- Hamburger -->
        <button class="navbar__hamburger" id="nav-hamburger" @click="isMobileOpen = !isMobileOpen">
          <span :class="{ active: isMobileOpen }"></span>
          <span :class="{ active: isMobileOpen }"></span>
          <span :class="{ active: isMobileOpen }"></span>
        </button>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { Icon } from '@iconify/vue'
import { api } from '../../services/api'

defineEmits(['toggleSearch'])

const isScrolled = ref(false)
const isMobileOpen = ref(false)
const showDropdown = ref(false)
const categories = ref<any[]>([])

function handleScroll() {
  isScrolled.value = window.scrollY > 20
}

function closeMobile() {
  isMobileOpen.value = false
}

function closeMobileAndDropdown() {
  isMobileOpen.value = false
  showDropdown.value = false
}

onMounted(async () => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  const res = await api.getCategories()
  if (res.success) {
    categories.value = res.data
  }
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: var(--navbar-height);
  z-index: var(--z-navbar);
  transition: all var(--transition-base);
  background: rgba(15, 15, 26, 0.6);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid transparent;
}

.navbar--scrolled {
  background: rgba(15, 15, 26, 0.9);
  border-bottom-color: var(--glass-border);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}

.navbar__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  gap: var(--space-lg);
}

/* Logo */
.navbar__logo {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  font-family: var(--font-heading);
  font-weight: 800;
  font-size: 1.3rem;
  white-space: nowrap;
  z-index: 10;
}

.navbar__logo-icon {
  font-size: 1.4rem;
  color: var(--primary-start);
  animation: vibrate 2s ease infinite;
  animation-delay: 3s;
}

.navbar__logo-text {
  background: linear-gradient(135deg, var(--primary-start), var(--primary-end));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Menu */
.navbar__menu {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
}

.navbar__link {
  padding: var(--space-sm) var(--space-md);
  border-radius: var(--radius-md);
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--text-secondary);
  transition: all var(--transition-fast);
  white-space: nowrap;
  display: flex;
  align-items: center;
  gap: var(--space-xs);
}

.navbar__link:hover,
.navbar__link.router-link-active {
  color: var(--text-primary);
  background: var(--glass-bg);
}

.navbar__link--dropdown {
  cursor: pointer;
}

.navbar__premium-badge {
  font-size: 1rem;
  color: var(--accent-orange);
}

/* Dropdown */
.navbar__dropdown {
  position: relative;
}

.navbar__dropdown-menu {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  min-width: 220px;
  background: var(--bg-secondary);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-md);
  padding: var(--space-sm);
  animation: slide-down 0.2s ease;
  box-shadow: var(--shadow-lg);
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2px;
  z-index: var(--z-dropdown);
}

.navbar__dropdown-item {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  padding: var(--space-sm) var(--space-md);
  border-radius: var(--radius-sm);
  font-size: 0.85rem;
  color: var(--text-secondary);
  transition: all var(--transition-fast);
}

.navbar__dropdown-item:hover {
  background: var(--glass-bg-strong);
  color: var(--text-primary);
}

/* Actions */
.navbar__actions {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  z-index: 10;
}

.navbar__search-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: var(--radius-md);
  color: var(--text-secondary);
  transition: all var(--transition-fast);
}

.navbar__search-btn:hover {
  background: var(--glass-bg);
  color: var(--text-primary);
}

/* Hamburger */
.navbar__hamburger {
  display: none;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  width: 40px;
  height: 40px;
  border-radius: var(--radius-md);
  padding: 10px;
}

.navbar__hamburger span {
  display: block;
  width: 100%;
  height: 2px;
  background: var(--text-secondary);
  border-radius: 2px;
  transition: all var(--transition-base);
}

.navbar__hamburger span.active:nth-child(1) {
  transform: rotate(45deg) translate(5px, 5px);
}

.navbar__hamburger span.active:nth-child(2) {
  opacity: 0;
}

.navbar__hamburger span.active:nth-child(3) {
  transform: rotate(-45deg) translate(5px, -5px);
}

/* Mobile */
@media (max-width: 768px) {
  .navbar__hamburger {
    display: flex;
  }

  .navbar__menu {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: var(--bg-primary);
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: var(--space-md);
    transform: translateX(100%);
    transition: transform var(--transition-base);
    z-index: 5;
  }

  .navbar__menu--open {
    transform: translateX(0);
  }

  .navbar__link {
    font-size: 1.1rem;
    padding: var(--space-md) var(--space-xl);
  }

  .navbar__dropdown-menu {
    position: static;
    transform: none;
    background: var(--bg-card);
    box-shadow: none;
    grid-template-columns: 1fr;
    min-width: 200px;
    margin-top: var(--space-sm);
  }
}
</style>
