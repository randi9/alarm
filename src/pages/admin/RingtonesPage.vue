<template>
  <div class="admin-page">
    <div class="admin-header">
      <div class="admin-header__text">
        <h1 class="admin-title">Manage Ringtones</h1>
        <p class="admin-subtitle">Upload and organize ringtones</p>
      </div>
      <button class="btn btn-primary" @click="openModal()">
        <Icon icon="mdi:upload" /> Upload Ringtone
      </button>
    </div>

    <!-- Filters -->
    <div class="admin-filters">
      <select v-model="filterCategory" class="admin-select" @change="fetchRingtones">
        <option value="">All Categories</option>
        <option v-for="cat in categories" :key="cat.slug" :value="cat.slug">
          {{ cat.label }}
        </option>
      </select>
    </div>

    <div class="admin-table-container">
      <table class="admin-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Category</th>
            <th>Stats</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="ringtone in ringtones" :key="ringtone.id">
            <td>
              <div class="admin-td-title">
                <span class="font-medium">{{ ringtone.title }}</span>
                <span class="text-xs text-muted">{{ ringtone.slug }}</span>
              </div>
            </td>
            <td>
              <CategoryBadge 
                v-if="ringtone.category_slug"
                :category="ringtone.category_slug" 
                :label="ringtone.category_label"
                :icon="ringtone.category_icon"
                :color="ringtone.category_color"
              />
            </td>
            <td>
              <div class="admin-td-stats">
                <span title="Downloads"><Icon icon="mdi:download" /> {{ ringtone.downloads }}</span>
                <span title="Rating"><Icon icon="mdi:star" class="text-orange" /> {{ ringtone.rating }}</span>
              </div>
            </td>
            <td>
              <span class="status-badge" :class="`status-${ringtone.status}`">
                {{ ringtone.status }}
              </span>
            </td>
            <td>
              <div class="admin-actions">
                <button class="btn-icon btn-play" @click="playRingtone(ringtone)" title="Play">
                  <Icon icon="mdi:play" />
                </button>
                <button class="btn-icon btn-edit" @click="openModal(ringtone)" title="Edit">
                  <Icon icon="mdi:pencil" />
                </button>
                <button class="btn-icon btn-delete" @click="confirmDelete(ringtone)" title="Delete">
                  <Icon icon="mdi:delete" />
                </button>
              </div>
            </td>
          </tr>
          <tr v-if="ringtones.length === 0">
            <td colspan="5" class="admin-table-empty">No ringtones found</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <div class="admin-pagination" v-if="totalPages > 1">
      <button 
        class="btn-icon" 
        :disabled="currentPage === 1" 
        @click="changePage(currentPage - 1)"
      ><Icon icon="mdi:chevron-left" /></button>
      <span>Page {{ currentPage }} of {{ totalPages }}</span>
      <button 
        class="btn-icon" 
        :disabled="currentPage === totalPages" 
        @click="changePage(currentPage + 1)"
      ><Icon icon="mdi:chevron-right" /></button>
    </div>

    <!-- Modal -->
    <div class="admin-modal" v-if="showModal" @click.self="closeModal">
      <div class="admin-modal-content">
        <div class="admin-modal-header">
          <h2>{{ isEditing ? 'Edit Ringtone' : 'Upload Ringtone' }}</h2>
          <button class="btn-close" @click="closeModal"><Icon icon="mdi:close" /></button>
        </div>
        <form @submit.prevent="saveRingtone" class="admin-form">
          <div class="form-row">
            <div class="form-group flex-2">
              <label>Title</label>
              <input type="text" v-model="formData.title" required class="form-input" />
            </div>
            <div class="form-group flex-1">
              <label>Category</label>
              <select v-model="formData.category_slug" required class="form-input">
                <option value="" disabled>Select category</option>
                <option v-for="cat in categories" :key="cat.slug" :value="cat.slug">
                  {{ cat.label }}
                </option>
              </select>
            </div>
          </div>
          
          <div class="form-group" v-if="!isEditing">
            <label>Audio File (MP3/M4R)</label>
            <input type="file" ref="fileInput" accept="audio/*" required class="form-input" @change="handleFileChange" />
            <span class="text-xs text-muted" v-if="audioDurationMs">Duration: {{ audioDurationStr }} ({{ audioDurationMs }}ms)</span>
          </div>

          <div class="form-group">
            <label>Description</label>
            <textarea v-model="formData.description" class="form-input" rows="2"></textarea>
          </div>

          <div class="form-group">
            <label>Tags (comma separated)</label>
            <input type="text" v-model="formData.tagsInput" class="form-input" placeholder="lucu, emak, alarm" />
          </div>

          <div class="form-group">
            <label>Shopee Affiliate URL</label>
            <input type="url" v-model="formData.affiliate_url" class="form-input" placeholder="https://shope.ee/..." />
          </div>

          <div class="form-row">
            <label class="form-checkbox">
              <input type="checkbox" v-model="formData.is_featured" /> Featured
            </label>
            <label class="form-checkbox">
              <input type="checkbox" v-model="formData.is_trending" /> Trending
            </label>
            <label class="form-checkbox">
              <input type="checkbox" v-model="formData.is_premium" /> Premium
            </label>
          </div>

          <div class="form-group" v-if="isEditing">
            <label>Status</label>
            <select v-model="formData.status" class="form-input">
              <option value="published">Published</option>
              <option value="draft">Draft</option>
            </select>
          </div>

          <div v-if="errorMsg" class="form-error">{{ errorMsg }}</div>

          <div class="admin-modal-footer">
            <button type="button" class="btn btn-outline" @click="closeModal">Cancel</button>
            <button type="submit" class="btn btn-primary" :disabled="isSaving">
              {{ isSaving ? 'Saving...' : (isEditing ? 'Update Ringtone' : 'Upload') }}
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
import { useAudioPlayer } from '../../composables/useAudioPlayer'
import CategoryBadge from '../../components/ringtone/CategoryBadge.vue'

const { play } = useAudioPlayer()

const ringtones = ref<any[]>([])
const categories = ref<any[]>([])
const filterCategory = ref('')
const currentPage = ref(1)
const totalPages = ref(1)

const showModal = ref(false)
const isEditing = ref(false)
const isSaving = ref(false)
const errorMsg = ref('')
const fileInput = ref<HTMLInputElement | null>(null)

const audioDurationStr = ref('0:00')
const audioDurationMs = ref(0)
const selectedFile = ref<File | null>(null)

const defaultForm = {
  slug: '',
  title: '',
  category_slug: '',
  description: '',
  tagsInput: '',
  is_featured: false,
  is_trending: false,
  is_premium: false,
  affiliate_url: '',
  status: 'published'
}

const formData = ref({ ...defaultForm })

onMounted(async () => {
  const catRes = await api.getCategories()
  if (catRes.success) {
    categories.value = catRes.data
  }
  fetchRingtones()
})

async function fetchRingtones() {
  const res = await api.getRingtones({ 
    page: currentPage.value, 
    limit: 20,
    category: filterCategory.value || undefined
  })
  if (res.success) {
    ringtones.value = res.data
    totalPages.value = res.meta?.totalPages || 1
  }
}

function changePage(page: number) {
  currentPage.value = page
  fetchRingtones()
}

function playRingtone(ringtone: any) {
  play(ringtone)
}

function handleFileChange(e: Event) {
  const target = e.target as HTMLInputElement
  if (target.files && target.files.length > 0) {
    const file = target.files[0]
    selectedFile.value = file
    
    // Get audio duration
    const audio = new Audio(URL.createObjectURL(file))
    audio.addEventListener('loadedmetadata', () => {
      audioDurationMs.value = Math.round(audio.duration * 1000)
      const mins = Math.floor(audio.duration / 60)
      const secs = Math.floor(audio.duration % 60)
      audioDurationStr.value = `${mins}:${secs.toString().padStart(2, '0')}`
    })
  }
}

async function openModal(ringtone?: any) {
  errorMsg.value = ''
  selectedFile.value = null
  audioDurationStr.value = '0:00'
  audioDurationMs.value = 0
  
  if (fileInput.value) fileInput.value.value = ''

  if (ringtone) {
    isEditing.value = true
    formData.value = { 
      ...ringtone,
      is_featured: !!ringtone.is_featured,
      is_trending: !!ringtone.is_trending,
      is_premium: !!ringtone.is_premium,
      affiliate_url: ringtone.affiliate_url || '',
      tagsInput: ringtone.tags?.join(', ') || ''
    }
  } else {
    isEditing.value = false
    formData.value = { ...defaultForm }
  }
  showModal.value = true
}

function closeModal() {
  showModal.value = false
}

async function saveRingtone() {
  isSaving.value = true
  errorMsg.value = ''
  try {
    const tags = formData.value.tagsInput
      .split(',')
      .map(t => t.trim().toLowerCase())
      .filter(t => t.length > 0)

    if (isEditing.value) {
      const payload = {
        title: formData.value.title,
        category_slug: formData.value.category_slug,
        description: formData.value.description,
        tags,
        is_featured: formData.value.is_featured,
        is_trending: formData.value.is_trending,
        is_premium: formData.value.is_premium,
        affiliate_url: formData.value.affiliate_url,
        status: formData.value.status
      }
      const res = await adminApi.updateRingtone(formData.value.slug, payload)
      if (res.success) {
        closeModal()
        fetchRingtones()
      } else {
        errorMsg.value = res.error || 'Failed to update ringtone'
      }
    } else {
      if (!selectedFile.value) {
        throw new Error('Please select an audio file')
      }

      const metadata = {
        title: formData.value.title,
        category_slug: formData.value.category_slug,
        description: formData.value.description,
        duration: audioDurationStr.value,
        duration_ms: audioDurationMs.value,
        tags,
        is_featured: formData.value.is_featured,
        is_trending: formData.value.is_trending,
        is_premium: formData.value.is_premium,
        affiliate_url: formData.value.affiliate_url,
        status: formData.value.status
      }

      const form = new FormData()
      form.append('audio', selectedFile.value)
      form.append('metadata', JSON.stringify(metadata))

      const res = await adminApi.createRingtone(form)
      if (res.success) {
        closeModal()
        fetchRingtones()
      } else {
        errorMsg.value = res.error || 'Failed to upload ringtone'
      }
    }
  } catch (err: any) {
    errorMsg.value = err.message || 'Network error'
  } finally {
    isSaving.value = false
  }
}

async function confirmDelete(ringtone: any) {
  if (confirm(`Are you sure you want to delete "${ringtone.title}"? This cannot be undone.`)) {
    try {
      const res = await adminApi.deleteRingtone(ringtone.slug)
      if (res.success) {
        fetchRingtones()
      } else {
        alert(res.error || 'Failed to delete ringtone')
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

.admin-filters {
  display: flex;
  gap: var(--space-md);
}

.admin-select {
  background: var(--bg-secondary);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-md);
  padding: var(--space-sm) var(--space-md);
  color: var(--text-primary);
  font-size: 0.9rem;
  outline: none;
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

.admin-table tr:hover td {
  background: rgba(255, 255, 255, 0.02);
}

.admin-table-empty {
  text-align: center;
  color: var(--text-muted);
  padding: var(--space-2xl) !important;
}

.admin-td-title {
  display: flex;
  flex-direction: column;
}

.text-xs { font-size: 0.75rem; }
.text-muted { color: var(--text-muted); }
.font-medium { font-weight: 500; }
.text-orange { color: var(--accent-orange); }

.admin-td-stats {
  display: flex;
  gap: var(--space-md);
  font-size: 0.85rem;
  color: var(--text-secondary);
}

.admin-td-stats span {
  display: inline-flex;
  align-items: center;
  gap: 2px;
}

.status-badge {
  font-size: 0.75rem;
  padding: 2px 8px;
  border-radius: var(--radius-full);
  font-weight: 600;
  text-transform: uppercase;
}
.status-published { background: rgba(16, 185, 129, 0.1); color: var(--accent-green); }
.status-draft { background: rgba(245, 158, 11, 0.1); color: var(--accent-orange); }

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

.btn-play:hover { background: rgba(198, 253, 1, 0.1); color: var(--primary-start); }
.btn-edit:hover { background: rgba(59, 130, 246, 0.1); color: #3B82F6; }
.btn-delete:hover { background: rgba(239, 68, 68, 0.1); color: #EF4444; }

.admin-pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-md);
  color: var(--text-secondary);
  font-size: 0.9rem;
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
  max-width: 600px;
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

.admin-modal-header h2 { font-size: 1.2rem; font-weight: 700; }
.btn-close { color: var(--text-secondary); transition: color var(--transition-fast); }
.btn-close:hover { color: var(--accent-pink); }

.admin-form {
  padding: var(--space-lg);
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}

.form-group { display: flex; flex-direction: column; gap: var(--space-xs); }
.form-row { display: flex; gap: var(--space-md); }
.flex-1 { flex: 1; }
.flex-2 { flex: 2; }

.form-group label { font-size: 0.85rem; font-weight: 600; color: var(--text-secondary); }
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
  box-shadow: 0 0 0 2px rgba(198, 253, 1, 0.2);
}

.form-checkbox {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  cursor: pointer;
  font-size: 0.9rem;
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
.btn-outline:hover { background: var(--glass-bg); }
</style>
