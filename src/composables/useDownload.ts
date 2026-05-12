import { ref } from 'vue'

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8787'

export function useDownload() {
  const isDownloading = ref(false)

  async function triggerDownload(ringtone: any, format: 'mp3' | 'm4r' = 'mp3') {
    if (isDownloading.value) return
    isDownloading.value = true

    try {
      // Use the worker proxy to download (avoids cross-origin issues)
      const proxyUrl = `${API_BASE}/api/download/${ringtone.slug}`
      
      const response = await fetch(proxyUrl)
      if (!response.ok) throw new Error('Download failed')
      
      const blob = await response.blob()
      const blobUrl = URL.createObjectURL(blob)

      const link = document.createElement('a')
      link.href = blobUrl
      link.download = `${ringtone.slug}.${format}`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      // Clean up blob URL
      setTimeout(() => URL.revokeObjectURL(blobUrl), 1000)

      // Increment download count (optimistic)
      if (ringtone.downloads !== undefined) {
        ringtone.downloads += 1
      }
    } catch (err) {
      console.error('Download error:', err)
      // Fallback: open audio URL directly
      window.open(ringtone.audio_url, '_blank')
    } finally {
      isDownloading.value = false
    }
  }

  return {
    isDownloading,
    triggerDownload
  }
}
