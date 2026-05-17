<template>
  <div class="login-page">
    <div class="login-card">
      <div class="login-header">
        <Icon icon="mdi:bell-ring" class="login-icon" />
        <h1>Alarmu Admin</h1>
        <p>Silakan login untuk mengelola konten</p>
      </div>

      <form @submit.prevent="handleLogin" class="login-form">
        <div class="form-group">
          <label>Username</label>
          <input type="text" v-model="username" required class="form-input" placeholder="admin" />
        </div>
        <div class="form-group">
          <label>Password</label>
          <input type="password" v-model="password" required class="form-input" placeholder="••••••••" />
        </div>
        
        <div v-if="error" class="login-error">
          <Icon icon="mdi:alert-circle" /> {{ error }}
        </div>

        <button type="submit" class="btn btn-primary login-btn" :disabled="isLoading">
          {{ isLoading ? 'Loading...' : 'Login' }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Icon } from '@iconify/vue'

const router = useRouter()
const username = ref('')
const password = ref('')
const error = ref('')
const isLoading = ref(false)

async function handleLogin() {
  isLoading.value = true
  error.value = ''
  
  try {
    // Basic Auth string
    const credentials = btoa(`${username.value}:${password.value}`)
    
    // Test the credentials against an admin endpoint
    const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8787'}/api/admin/categories`, {
      headers: {
        'Authorization': `Basic ${credentials}`
      }
    })

    if (res.ok) {
      localStorage.setItem('admin_token', credentials)
      router.push('/admin')
    } else {
      error.value = 'Username atau password salah'
    }
  } catch (err) {
    error.value = 'Terjadi kesalahan jaringan'
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-primary);
  padding: var(--space-md);
}

.login-card {
  background: var(--bg-secondary);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-xl);
  padding: var(--space-2xl);
  width: 100%;
  max-width: 400px;
  box-shadow: var(--shadow-xl);
}

.login-header {
  text-align: center;
  margin-bottom: var(--space-xl);
}

.login-icon {
  font-size: 3rem;
  color: var(--primary-start);
  margin-bottom: var(--space-sm);
}

.login-header h1 {
  font-size: 1.5rem;
  font-weight: 800;
  margin-bottom: var(--space-xs);
}

.login-header p {
  color: var(--text-secondary);
  font-size: 0.9rem;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
}

.form-group label {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--text-secondary);
}

.form-input {
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-md);
  padding: var(--space-md);
  color: var(--text-primary);
  font-size: 1rem;
  transition: all var(--transition-fast);
}

.form-input:focus {
  outline: none;
  border-color: var(--primary-start);
  box-shadow: 0 0 0 2px rgba(198, 253, 1, 0.2);
}

.login-error {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--accent-pink);
  font-size: 0.85rem;
  background: rgba(239, 68, 68, 0.1);
  padding: var(--space-sm);
  border-radius: var(--radius-md);
}

.login-btn {
  margin-top: var(--space-sm);
  width: 100%;
  padding: var(--space-md);
  font-size: 1rem;
}
</style>
