import { ref } from 'vue'

export function useDownload() {
  const isDownloading = ref(false)

  async function triggerDownload(ringtone: any, _format: 'mp3' | 'm4r' = 'mp3') {
    if (isDownloading.value) return
    isDownloading.value = true

    try {
      // Fetch audio file directly from the public R2 URL
      const response = await fetch(ringtone.audio_url)
      if (!response.ok) throw new Error('Download failed')

      const blob = await response.blob()
      const blobUrl = URL.createObjectURL(blob)

      // Create a hidden <a download> link and click it.
      // Blob URLs are same-origin, so the download attribute works properly.
      const link = document.createElement('a')
      link.href = blobUrl
      link.download = `${ringtone.slug}.mp3`
      link.style.display = 'none'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      // Clean up blob URL
      setTimeout(() => URL.revokeObjectURL(blobUrl), 3000)

      // Increment download count (optimistic)
      if (ringtone.downloads !== undefined) {
        ringtone.downloads += 1
      }
    } catch (err) {
      console.error('Download error:', err)
      // Fallback: direct navigation to audio URL (will play/download depending on browser)
      const link = document.createElement('a')
      link.href = ringtone.audio_url
      link.download = `${ringtone.slug}.mp3`
      link.target = '_self'
      link.style.display = 'none'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } finally {
      isDownloading.value = false
    }
  }

  return {
    isDownloading,
    triggerDownload
  }
}
