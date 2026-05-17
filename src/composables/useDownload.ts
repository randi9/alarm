import { ref } from 'vue'

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8787'

export function useDownload() {
  const isDownloading = ref(false)

  function triggerDownload(ringtone: any, _format: 'mp3' | 'm4r' = 'mp3') {
    if (isDownloading.value) return
    isDownloading.value = true

    // Direct navigation to the download proxy URL.
    // The worker responds with Content-Disposition: attachment,
    // so the browser downloads the file without leaving the page.
    const proxyUrl = `${API_BASE}/api/download/${ringtone.slug}`
    window.location.href = proxyUrl

    // Increment download count (optimistic)
    if (ringtone.downloads !== undefined) {
      ringtone.downloads += 1
    }

    // Reset flag after a short delay
    setTimeout(() => {
      isDownloading.value = false
    }, 3000)
  }

  return {
    isDownloading,
    triggerDownload
  }
}
