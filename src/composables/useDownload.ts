import { ref } from 'vue'

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8787'

export function useDownload() {
  const isDownloading = ref(false)

  function triggerDownload(ringtone: any, format: 'mp3' | 'm4r' = 'mp3') {
    if (isDownloading.value) return
    isDownloading.value = true

    try {
      // Use the worker proxy URL — it already sets Content-Disposition: attachment
      const proxyUrl = `${API_BASE}/api/download/${ringtone.slug}`

      // Create a hidden iframe to trigger download without popup
      const iframe = document.createElement('iframe')
      iframe.style.display = 'none'
      iframe.src = proxyUrl
      document.body.appendChild(iframe)

      // Clean up iframe after download starts
      setTimeout(() => {
        document.body.removeChild(iframe)
        isDownloading.value = false
      }, 5000)

      // Increment download count (optimistic)
      if (ringtone.downloads !== undefined) {
        ringtone.downloads += 1
      }
    } catch (err) {
      console.error('Download error:', err)
      isDownloading.value = false
    }
  }

  return {
    isDownloading,
    triggerDownload
  }
}
