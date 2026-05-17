<template>
  <div class="admin-layout">
    <!-- Sidebar -->
    <aside class="admin-sidebar" :class="{ 'admin-sidebar--open': isSidebarOpen }">
      <div class="admin-sidebar__header">
        <Icon icon="mdi:bell-ring" class="admin-logo-icon" />
        <span>Alarmu Admin</span>
        <button class="admin-close-btn" @click="isSidebarOpen = false">
          <Icon icon="mdi:close" />
        </button>
      </div>
      
      <nav class="admin-nav">
        <router-link to="/admin" class="admin-nav__link" exact-active-class="active">
          <Icon icon="mdi:view-dashboard" /> Dashboard
        </router-link>
        <router-link to="/admin/ringtones" class="admin-nav__link" active-class="active">
          <Icon icon="mdi:music-note" /> Ringtones
        </router-link>
        <router-link to="/admin/categories" class="admin-nav__link" active-class="active">
          <Icon icon="mdi:folder" /> Categories
        </router-link>
      </nav>

      <div class="admin-sidebar__footer">
        <button @click="logout" class="admin-logout-btn">
          <Icon icon="mdi:logout" /> Logout
        </button>
      </div>
    </aside>

    <!-- Overlay -->
    <div 
      class="admin-overlay" 
      v-if="isSidebarOpen" 
      @click="isSidebarOpen = false"
    ></div>

    <!-- Main Content -->
    <main class="admin-main">
      <header class="admin-topbar">
        <button class="admin-menu-btn" @click="isSidebarOpen = true">
          <Icon icon="mdi:menu" />
        </button>
        <div class="admin-topbar__right">
          <router-link to="/" target="_blank" class="admin-view-site">
            <Icon icon="mdi:open-in-new" /> View Site
          </router-link>
        </div>
      </header>

      <div class="admin-content">
        <router-view></router-view>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Icon } from '@iconify/vue'

const router = useRouter()
const isSidebarOpen = ref(false)

function logout() {
  localStorage.removeItem('admin_token')
  router.push('/login')
}
</script>

<style scoped>
.admin-layout {
  display: flex;
  min-height: 100vh;
  background: var(--bg-primary);
  color: var(--text-primary);
}

/* Sidebar */
.admin-sidebar {
  width: 260px;
  background: var(--bg-secondary);
  border-right: 1px solid var(--glass-border);
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 100;
  transition: transform 0.3s ease;
}

.admin-sidebar__header {
  padding: var(--space-lg);
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  font-family: var(--font-heading);
  font-weight: 800;
  font-size: 1.2rem;
  border-bottom: 1px solid var(--glass-border);
}

.admin-logo-icon {
  color: var(--primary-start);
  font-size: 1.5rem;
}

.admin-close-btn {
  display: none;
  margin-left: auto;
  color: var(--text-secondary);
}

.admin-nav {
  padding: var(--space-md);
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
  flex: 1;
}

.admin-nav__link {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  padding: var(--space-md);
  border-radius: var(--radius-md);
  color: var(--text-secondary);
  transition: all var(--transition-fast);
  font-weight: 500;
}

.admin-nav__link:hover {
  background: var(--glass-bg);
  color: var(--text-primary);
}

.admin-nav__link.active {
  background: linear-gradient(135deg, var(--primary-start), var(--primary-end));
  color: white;
}

.admin-sidebar__footer {
  padding: var(--space-md);
  border-top: 1px solid var(--glass-border);
}

.admin-logout-btn {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-sm);
  padding: var(--space-md);
  border-radius: var(--radius-md);
  background: rgba(239, 68, 68, 0.1);
  color: var(--accent-pink);
  font-weight: 600;
  transition: all var(--transition-fast);
}

.admin-logout-btn:hover {
  background: rgba(239, 68, 68, 0.2);
}

/* Main */
.admin-main {
  flex: 1;
  margin-left: 260px;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.admin-topbar {
  height: 64px;
  background: var(--bg-secondary);
  border-bottom: 1px solid var(--glass-border);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 var(--space-lg);
}

.admin-menu-btn {
  display: none;
  color: var(--text-primary);
  font-size: 1.5rem;
}

.admin-view-site {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  color: var(--text-secondary);
  font-size: 0.9rem;
}

.admin-view-site:hover {
  color: var(--primary-start);
}

.admin-content {
  padding: var(--space-xl);
  flex: 1;
  overflow-y: auto;
}

/* Mobile */
@media (max-width: 768px) {
  .admin-sidebar {
    transform: translateX(-100%);
  }

  .admin-sidebar--open {
    transform: translateX(0);
  }

  .admin-close-btn {
    display: block;
  }

  .admin-main {
    margin-left: 0;
  }

  .admin-menu-btn {
    display: block;
  }

  .admin-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 90;
  }
}
</style>
