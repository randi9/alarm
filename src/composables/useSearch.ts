import { ref, computed, watch } from 'vue'
import { api } from '../services/api'

export type SortOption = 'terbaru' | 'terpopuler' | 'rating'

export function useSearch() {
  const query = ref('')
  const selectedCategory = ref('')
  const sortBy = ref<SortOption>('terpopuler')
  const debounceTimer = ref<ReturnType<typeof setTimeout> | null>(null)
  const debouncedQuery = ref('')

  const ringtones = ref<any[]>([])
  const isLoading = ref(false)

  // Fetch ringtones based on current filters
  const fetchRingtones = async () => {
    isLoading.value = true
    try {
      const sortMap: Record<string, string> = {
        'terbaru': 'newest',
        'terpopuler': 'downloads',
        'rating': 'rating'
      }

      const res = await api.getRingtones({
        q: debouncedQuery.value || undefined,
        category: selectedCategory.value || undefined,
        sort: sortMap[sortBy.value],
        limit: 50 // Adjust as needed
      })
      if (res.success) {
        ringtones.value = res.data
      }
    } catch (err) {
      console.error('Failed to fetch ringtones:', err)
    } finally {
      isLoading.value = false
    }
  }

  // Watch for changes that should trigger a re-fetch
  watch([debouncedQuery, selectedCategory, sortBy], () => {
    fetchRingtones()
  }, { immediate: true })

  // Debounce search
  watch(query, (newVal) => {
    if (debounceTimer.value) clearTimeout(debounceTimer.value)
    debounceTimer.value = setTimeout(() => {
      debouncedQuery.value = newVal
    }, 300)
  })

  const filteredRingtones = computed(() => ringtones.value)

  function clearSearch() {
    query.value = ''
    debouncedQuery.value = ''
  }

  function setCategory(cat: string) {
    selectedCategory.value = cat
  }

  function clearCategory() {
    selectedCategory.value = ''
  }

  return {
    query,
    debouncedQuery,
    selectedCategory,
    sortBy,
    filteredRingtones,
    isLoading,
    clearSearch,
    setCategory,
    clearCategory
  }
}
