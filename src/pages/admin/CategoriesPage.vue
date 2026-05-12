<template>
  <div class="admin-page">
    <div class="admin-header">
      <div class="admin-header__text">
        <h1 class="admin-title">Manage Categories</h1>
        <p class="admin-subtitle">Create, update, and delete ringtone categories</p>
      </div>
      <button class="btn btn-primary" @click="openModal()">
        <Icon icon="mdi:plus" /> Add Category
      </button>
    </div>

    <div class="admin-table-container">
      <table class="admin-table">
        <thead>
          <tr>
            <th>Icon & Label</th>
            <th>Slug</th>
            <th>Color</th>
            <th>Sort Order</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="cat in categories" :key="cat.id">
            <td>
              <div class="admin-td-icon">
                <Icon :icon="cat.icon" :style="{ color: cat.color }" class="cat-icon-preview" />
                <span class="font-medium">{{ cat.label }}</span>
              </div>
            </td>
            <td><code>{{ cat.slug }}</code></td>
            <td>
              <div class="admin-td-color">
                <span class="color-dot" :style="{ background: cat.color }"></span>
                {{ cat.color }}
              </div>
            </td>
            <td>{{ cat.sort_order }}</td>
            <td>
              <div class="admin-actions">
                <button class="btn-icon btn-edit" @click="openModal(cat)" title="Edit">
                  <Icon icon="mdi:pencil" />
                </button>
                <button class="btn-icon btn-delete" @click="confirmDelete(cat)" title="Delete">
                  <Icon icon="mdi:delete" />
                </button>
              </div>
            </td>
          </tr>
          <tr v-if="categories.length === 0">
            <td colspan="5" class="admin-table-empty">No categories found</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal -->
    <div class="admin-modal" v-if="showModal" @click.self="closeModal">
      <div class="admin-modal-content">
        <div class="admin-modal-header">
          <h2>{{ isEditing ? 'Edit Category' : 'Add Category' }}</h2>
          <button class="btn-close" @click="closeModal"><Icon icon="mdi:close" /></button>
        </div>
        <form @submit.prevent="saveCategory" class="admin-form">
          <div class="form-group">
            <label>Label</label>
            <input type="text" v-model="formData.label" required class="form-input" @input="generateSlug" />
          </div>
          <div class="form-group">
            <label>Slug</label>
            <input type="text" v-model="formData.slug" required class="form-input" :disabled="isEditing" />
          </div>
          <div class="form-row">
            <div class="form-group flex-1">
              <label>Icon (Iconify)</label>
              <input type="text" v-model="formData.icon" class="form-input" placeholder="mdi:music-note" />
            </div>
            <div class="form-group flex-1">
              <label>Color (Hex)</label>
              <input type="color" v-model="formData.color" class="form-input form-color" />
            </div>
          </div>
          <div class="form-group">
            <label>Description</label>
            <textarea v-model="formData.description" class="form-input" rows="3"></textarea>
          </div>
          <div class="form-group">
            <label>Sort Order</label>
            <input type="number" v-model="formData.sort_order" class="form-input" />
          </div>

          <div v-if="errorMsg" class="form-error">{{ errorMsg }}</div>

          <div class="admin-modal-footer">
            <button type="button" class="btn btn-outline" @click="closeModal">Cancel</button>
            <button type="submit" class="btn btn-primary" :disabled="isSaving">
              {{ isSaving ? 'Saving...' : 'Save Category' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Icon } from '@iconify/vue'
import { api, adminApi } from '../../services/api'

const categories = ref<any[]>([])
const showModal = ref(false)
const isEditing = ref(false)
const isSaving = ref(false)
const errorMsg = ref('')

const defaultForm = {
  slug: '',
  label: '',
  icon: 'mdi:music-note',
  color: '#6D28D9',
  description: '',
  sort_order: 0
}

const formData = ref({ ...defaultForm })

async function fetchCategories() {
  const res = await api.getCategories()
  if (res.success) {
    categories.value = res.data
  }
}

onMounted(fetchCategories)

function generateSlug() {
  if (!isEditing.value) {
    formData.value.slug = formData.value.label
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '')
  }
}

function openModal(cat?: any) {
  errorMsg.value = ''
  if (cat) {
    isEditing.value = true
    formData.value = { ...cat }
  } else {
    isEditing.value = false
    formData.value = { ...defaultForm }
    // Auto increment sort order
    if (categories.value.length > 0) {
      formData.value.sort_order = Math.max(...categories.value.map(c => c.sort_order)) + 1
    }
  }
  showModal.value = true
}

function closeModal() {
  showModal.value = false
}

async function saveCategory() {
  isSaving.value = true
  errorMsg.value = ''
  try {
    let res
    if (isEditing.value) {
      res = await adminApi.updateCategory(formData.value.slug, formData.value)
    } else {
      res = await adminApi.createCategory(formData.value)
    }

    if (res.success) {
      closeModal()
      fetchCategories()
    } else {
      errorMsg.value = res.error || 'Failed to save category'
    }
  } catch (err: any) {
    errorMsg.value = err.message || 'Network error'
  } finally {
    isSaving.value = false
  }
}

async function confirmDelete(cat: any) {
  if (confirm(`Are you sure you want to delete category "${cat.label}"?`)) {
    try {
      const res = await adminApi.deleteCategory(cat.slug)
      if (res.success) {
        fetchCategories()
      } else {
        alert(res.error || 'Failed to delete category')
      }
    } catch (err: any) {
      alert(err.message || 'Network error')
    }
  }
}
</script>

<style scoped>
.admin-page {
  display: flex;
  flex-direction: column;
  gap: var(--space-xl);
}

.admin-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: var(--space-md);
  flex-wrap: wrap;
}

.admin-title {
  font-size: 1.8rem;
  font-weight: 800;
}

.admin-subtitle {
  color: var(--text-secondary);
  font-size: 0.9rem;
}

/* Table */
.admin-table-container {
  background: var(--bg-secondary);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-lg);
  overflow-x: auto;
}

.admin-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  font-size: 0.9rem;
}

.admin-table th,
.admin-table td {
  padding: var(--space-md) var(--space-lg);
  border-bottom: 1px solid var(--glass-border);
}

.admin-table th {
  background: rgba(255, 255, 255, 0.02);
  color: var(--text-secondary);
  font-weight: 600;
  text-transform: uppercase;
  font-size: 0.75rem;
  letter-spacing: 0.5px;
}

.admin-table tr:last-child td {
  border-bottom: none;
}

.admin-table tr:hover td {
  background: rgba(255, 255, 255, 0.02);
}

.admin-table-empty {
  text-align: center;
  color: var(--text-muted);
  padding: var(--space-2xl) !important;
}

.admin-td-icon {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
}

.cat-icon-preview {
  font-size: 1.5rem;
  padding: 4px;
  background: var(--glass-bg);
  border-radius: var(--radius-sm);
}

.admin-td-color {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  font-family: monospace;
}

.color-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  display: inline-block;
}

/* Actions */
.admin-actions {
  display: flex;
  gap: var(--space-xs);
}

.btn-icon {
  width: 32px;
  height: 32px;
  border-radius: var(--radius-sm);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all var(--transition-fast);
  color: var(--text-secondary);
}

.btn-edit:hover {
  background: rgba(59, 130, 246, 0.1);
  color: #3B82F6;
}

.btn-delete:hover {
  background: rgba(239, 68, 68, 0.1);
  color: #EF4444;
}

/* Modal */
.admin-modal {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  z-index: 200;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-md);
}

.admin-modal-content {
  background: var(--bg-secondary);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-xl);
  width: 100%;
  max-width: 500px;
  box-shadow: var(--shadow-2xl);
  max-height: 90vh;
  overflow-y: auto;
}

.admin-modal-header {
  padding: var(--space-lg);
  border-bottom: 1px solid var(--glass-border);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.admin-modal-header h2 {
  font-size: 1.2rem;
  font-weight: 700;
}

.btn-close {
  color: var(--text-secondary);
  transition: color var(--transition-fast);
}

.btn-close:hover {
  color: var(--accent-pink);
}

.admin-form {
  padding: var(--space-lg);
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
}

.form-row {
  display: flex;
  gap: var(--space-md);
}

.flex-1 {
  flex: 1;
}

.form-group label {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--text-secondary);
}

.form-input {
  background: var(--bg-primary);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-md);
  padding: var(--space-sm) var(--space-md);
  color: var(--text-primary);
  font-size: 0.95rem;
  transition: all var(--transition-fast);
  font-family: inherit;
}

.form-input:focus {
  outline: none;
  border-color: var(--primary-start);
  box-shadow: 0 0 0 2px rgba(124, 58, 237, 0.2);
}

.form-input:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.form-color {
  padding: 2px 4px;
  height: 38px;
  cursor: pointer;
}

textarea.form-input {
  resize: vertical;
}

.form-error {
  color: var(--accent-pink);
  font-size: 0.85rem;
  background: rgba(239, 68, 68, 0.1);
  padding: var(--space-sm);
  border-radius: var(--radius-md);
}

.admin-modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: var(--space-md);
  margin-top: var(--space-sm);
}

.btn-outline {
  background: transparent;
  border: 1px solid var(--glass-border);
  color: var(--text-primary);
}

.btn-outline:hover {
  background: var(--glass-bg);
}
</style>
