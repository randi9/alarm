import { ref, computed } from 'vue'
// No static import needed

const audio = new Audio()
const currentRingtone = ref<any | null>(null)
const isPlaying = ref(false)
const currentTime = ref(0)
const duration = ref(0)
const volume = ref(1)
const isPlayerVisible = ref(false)

// Update time on audio events
audio.addEventListener('timeupdate', () => {
  currentTime.value = audio.currentTime
})

audio.addEventListener('loadedmetadata', () => {
  duration.value = audio.duration
})

audio.addEventListener('ended', () => {
  isPlaying.value = false
  currentTime.value = 0
})

audio.addEventListener('play', () => {
  isPlaying.value = true
})

audio.addEventListener('pause', () => {
  isPlaying.value = false
})

export function useAudioPlayer() {
  const progress = computed(() => {
    if (duration.value === 0) return 0
    return (currentTime.value / duration.value) * 100
  })

  function play(ringtone: any) {
    if (currentRingtone.value?.slug === ringtone.slug && !audio.paused) {
      pause()
      return
    }

    if (currentRingtone.value?.slug !== ringtone.slug) {
      audio.src = ringtone.audio_url || `/audio/${ringtone.audio_filename}`
      currentRingtone.value = ringtone
      duration.value = 0
      currentTime.value = 0
    }

    isPlayerVisible.value = true
    audio.volume = volume.value
    audio.play().catch(() => {
      // Audio play failed (e.g., no user interaction yet)
      isPlaying.value = false
    })
  }

  function pause() {
    audio.pause()
  }

  function toggle() {
    if (isPlaying.value) {
      pause()
    } else if (currentRingtone.value) {
      audio.play().catch(() => {})
    }
  }

  function seek(time: number) {
    audio.currentTime = time
    currentTime.value = time
  }

  function seekByPercent(percent: number) {
    const time = (percent / 100) * duration.value
    seek(time)
  }

  function setVolume(v: number) {
    volume.value = v
    audio.volume = v
  }

  function formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return {
    currentRingtone,
    isPlaying,
    currentTime,
    duration,
    progress,
    volume,
    isPlayerVisible,
    play,
    pause,
    toggle,
    seek,
    seekByPercent,
    setVolume,
    formatTime
  }
}
