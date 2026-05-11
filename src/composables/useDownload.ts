import { ref } from 'vue'
import type { Ringtone } from '../data/ringtones'

export function useDownload() {
  const isDownloading = ref(false)

  function triggerDownload(ringtone: Ringtone, format: 'mp3' | 'm4r' = 'mp3') {
    isDownloading.value = true

    const link = document.createElement('a')
    link.href = ringtone.audioFile
    link.download = `${ringtone.id}.${format}`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    // Increment download count client-side
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
