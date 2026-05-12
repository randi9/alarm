import { ref } from 'vue'
// No need for static Ringtone type anymore

export function useDownload() {
  const isDownloading = ref(false)

  function triggerDownload(ringtone: any, format: 'mp3' | 'm4r' = 'mp3') {
    isDownloading.value = true

    const link = document.createElement('a')
    // Fallback to audio_filename if audio_url is empty (like in seed data without real URL)
    link.href = ringtone.audio_url || `/audio/${ringtone.audio_filename}`
    link.download = `${ringtone.slug}.${format}`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    // Increment download count client-side (optimistic update)
    ringtone.downloads += 1

    setTimeout(() => {
      isDownloading.value = false
    }, 1000)
  }

  return {
    isDownloading,
    triggerDownload
  }
}
