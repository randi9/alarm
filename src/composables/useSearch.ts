import { ref, computed, watch } from 'vue'
import { ringtones } from '../data/ringtones'

export type SortOption = 'terbaru' | 'terpopuler' | 'rating'

export function useSearch() {
  const query = ref('')
  const selectedCategory = ref('')
  const sortBy = ref<SortOption>('terpopuler')
  const debounceTimer = ref<ReturnType<typeof setTimeout> | null>(null)
  const debouncedQuery = ref('')

  // Debounce search
  watch(query, (newVal) => {
    if (debounceTimer.value) clearTimeout(debounceTimer.value)
    debounceTimer.value = setTimeout(() => {
      debouncedQuery.value = newVal
    }, 300)
  })

  const filteredRingtones = computed(() => {
    let result = [...ringtones]

    // Filter by search query
    if (debouncedQuery.value) {
      const q = debouncedQuery.value.toLowerCase()
      result = result.filter(r =>
        r.title.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q) ||
        r.tags.some(t => t.toLowerCase().includes(q))
      )
    }

    // Filter by category
    if (selectedCategory.value) {
      result = result.filter(r => r.category === selectedCategory.value)
    }

    // Sort
    switch (sortBy.value) {
      case 'terbaru':
        result.sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime())
        break
      case 'terpopuler':
        result.sort((a, b) => b.downloads - a.downloads)
        break
      case 'rating':
        result.sort((a, b) => b.rating - a.rating)
        break
    }

    return result
  })

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
    clearSearch,
    setCategory,
    clearCategory
  }
}
