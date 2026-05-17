import { ref, watch, onMounted } from 'vue'

const isDark = ref(false)

function getStoredTheme(): boolean {
  const stored = localStorage.getItem('alarmu-theme')
  if (stored !== null) return stored === 'dark'
  // Default to system preference
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

function applyTheme(dark: boolean) {
  document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light')
  localStorage.setItem('alarmu-theme', dark ? 'dark' : 'light')
}

export function useTheme() {
  onMounted(() => {
    isDark.value = getStoredTheme()
    applyTheme(isDark.value)
  })

  watch(isDark, (val) => {
    applyTheme(val)
  })

  function toggleTheme() {
    isDark.value = !isDark.value
  }

  return {
    isDark,
    toggleTheme
  }
}
