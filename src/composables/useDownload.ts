import { ref } from 'vue'

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8787'

export function useDownload() {
  const isDownloading = ref(false)

  async function triggerDownload(ringtone: any, _format: 'mp3' | 'm4r' = 'mp3') {
    if (isDownloading.value) return
    isDownloading.value = true

    try {
      // Fetch through the worker proxy — it adds Content-Disposition: attachment
      // and proper CORS headers, ensuring cross-origin download works
      const proxyUrl = `${API_BASE}/api/download/${ringtone.slug}`
      const response = await fetch(proxyUrl)
      if (!response.ok) throw new Error('Download failed')

      const blob = await response.blob()
      const blobUrl = URL.createObjectURL(blob)

      // Blob URLs are same-origin, so <a download> always works
      const link = document.createElement('a')
      link.href = blobUrl
      link.download = `${ringtone.slug}.mp3`
      link.style.display = 'none'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      setTimeout(() => URL.revokeObjectURL(blobUrl), 3000)

      if (ringtone.downloads !== undefined) {
        ringtone.downloads += 1
      }
    } catch (err) {
      console.error('Auto-download failed:', err)
      // Don't navigate away — user can click the manual download button
    } finally {
      isDownloading.value = false
    }
  }

  return {
    isDownloading,
    triggerDownload
  }
}
