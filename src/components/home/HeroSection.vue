<template>
  <section class="hero" id="hero-section">
    <!-- Animated gradient orbs -->
    <div class="hero__orbs">
      <div class="hero__orb hero__orb--1"></div>
      <div class="hero__orb hero__orb--2"></div>
      <div class="hero__orb hero__orb--3"></div>
    </div>

    <!-- Cursor-following particles -->
    <div class="hero__particles">
      <Icon
        v-for="(ic, i) in particleIcons"
        :key="i"
        :icon="ic"
        class="hero__particle"
        :style="getParticleStyle(i + 1)"
      />
    </div>

    <div class="container hero__content">
      <!-- Badge -->
      <div class="hero__badge">
        <Icon icon="mdi:bell-ring" class="hero__badge-icon" />
        <span>Platform Ringtone #1 Indonesia</span>
      </div>

      <h1 class="hero__title">
        Alarm & Ringtone
        <span class="hero__title-gradient">Paling Ngeselin</span>
        se-Indonesia 🇮🇩
      </h1>

      <p class="hero__subtitle">
        Download <strong>gratis</strong> alarm yang bikin kamu pasti bangun.
        Dijamin nggak bisa tidur lagi! 🔊
      </p>

      <div class="hero__search">
        <SearchBar
          v-model="searchQuery"
          placeholder="Cari ringtone... (contoh: emak, subuh, anime)"
          @clear="$emit('clearSearch')"
        />
      </div>

      <!-- Stats -->
      <div class="hero__stats" ref="statsRef">
        <div class="hero__stat-card" v-for="stat in stats" :key="stat.label">
          <div class="hero__stat-icon-wrap" :style="{ background: stat.gradient }">
            <Icon :icon="stat.icon" class="hero__stat-ico" />
          </div>
          <div class="hero__stat-info">
            <span class="hero__stat-value">{{ stat.displayValue }}</span>
            <span class="hero__stat-label">{{ stat.label }}</span>
          </div>
        </div>
      </div>

      <!-- Quick categories -->
      <div class="hero__tags">
        <span class="hero__tag" v-for="tag in quickTags" :key="tag">{{ tag }}</span>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { Icon } from '@iconify/vue'
import SearchBar from '../shared/SearchBar.vue'

const props = defineProps<{
  searchQuery: string
}>()

const emit = defineEmits(['update:searchQuery', 'clearSearch'])

const searchQuery = computed({
  get: () => props.searchQuery,
  set: (val: string) => emit('update:searchQuery', val)
})

const statsRef = ref<HTMLElement | null>(null)
const isVisible = ref(false)

const quickTags = ['🔔 Islami', '😂 Lucu', '🔥 Trending', '🎵 Anime', '👩 Emak', '👻 Horror']

const particleIcons = [
  'mdi:music-note',
  'mdi:music',
  'mdi:bell-ring',
  'mdi:volume-high',
  'mdi:headphones',
  'mdi:microphone',
  'mdi:cellphone',
  'mdi:alarm'
]

const stats = ref([
  { icon: 'mdi:music-note', value: 1200, displayValue: '0', label: 'Ringtone', suffix: '+', gradient: 'linear-gradient(135deg, #7C3AED, #A78BFA)' },
  { icon: 'mdi:download', value: 50000, displayValue: '0', label: 'Download', suffix: '+', gradient: 'linear-gradient(135deg, #2563EB, #60A5FA)' },
  { icon: 'mdi:star', value: 4.8, displayValue: '0', label: 'Rating', suffix: '', gradient: 'linear-gradient(135deg, #F59E0B, #FBBF24)' }
])

function animateCountUp() {
  stats.value.forEach((stat) => {
    let current = 0
    const target = stat.value
    const isDecimal = target < 10
    const step = isDecimal ? target / 40 : Math.ceil(target / 40)
    const interval = setInterval(() => {
      current += step
      if (current >= target) {
        current = target
        clearInterval(interval)
      }
      if (isDecimal) {
        stat.displayValue = current.toFixed(1) + stat.suffix
      } else if (current >= 1000) {
        stat.displayValue = (current / 1000).toFixed(current >= target ? 0 : 1) + 'K' + stat.suffix
      } else {
        stat.displayValue = Math.floor(current).toLocaleString() + stat.suffix
      }
    }, 40)
  })
}

const mouseX = ref(0)
const mouseY = ref(0)

function handleMouseMove(e: MouseEvent) {
  mouseX.value = (e.clientX / window.innerWidth - 0.5) * 2
  mouseY.value = (e.clientY / window.innerHeight - 0.5) * 2
}

function getParticleStyle(i: number) {
  const positions = [
    { left: '3%', top: '15%' },
    { left: '12%', top: '75%' },
    { left: '25%', top: '10%' },
    { left: '45%', top: '85%' },
    { left: '60%', top: '8%' },
    { left: '78%', top: '70%' },
    { left: '90%', top: '20%' },
    { left: '95%', top: '80%' }
  ]
  const factor = ((i % 3) + 1) * 18
  const x = mouseX.value * factor * (i % 2 === 0 ? 1 : -1)
  const y = mouseY.value * factor * (i % 2 === 0 ? 1 : -1)
  
  return {
    ...positions[i - 1],
    transform: `translate(${x}px, ${y}px)`,
    transition: 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    fontSize: `${1.2 + (i % 3) * 0.5}rem`
  }
}

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !isVisible.value) {
          isVisible.value = true
          animateCountUp()
        }
      })
    },
    { threshold: 0.3 }
  )

  if (statsRef.value) observer.observe(statsRef.value)
  window.addEventListener('mousemove', handleMouseMove)
})

onUnmounted(() => {
  window.removeEventListener('mousemove', handleMouseMove)
})
</script>

<style scoped>
.hero {
  position: relative;
  background: linear-gradient(160deg, #F0EAFF 0%, #E8F0FE 30%, #FCE7F3 60%, #F8FAFC 100%);
  padding: calc(var(--navbar-height) + var(--space-2xl)) 0 var(--space-3xl);
  overflow: hidden;
  min-height: 85vh;
  display: flex;
  align-items: center;
}

/* Animated gradient orbs */
.hero__orbs {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
}

.hero__orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.4;
}

.hero__orb--1 {
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, rgba(124, 58, 237, 0.35), transparent 70%);
  top: -10%;
  left: -5%;
  animation: orb-float-1 12s ease-in-out infinite;
}

.hero__orb--2 {
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, rgba(37, 99, 235, 0.3), transparent 70%);
  top: 40%;
  right: -8%;
  animation: orb-float-2 15s ease-in-out infinite;
}

.hero__orb--3 {
  width: 350px;
  height: 350px;
  background: radial-gradient(circle, rgba(236, 72, 153, 0.25), transparent 70%);
  bottom: -5%;
  left: 30%;
  animation: orb-float-3 10s ease-in-out infinite;
}

@keyframes orb-float-1 {
  0%, 100% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(40px, 30px) scale(1.1); }
  66% { transform: translate(-20px, -20px) scale(0.95); }
}

@keyframes orb-float-2 {
  0%, 100% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(-30px, 20px) scale(1.05); }
  66% { transform: translate(20px, -30px) scale(0.9); }
}

@keyframes orb-float-3 {
  0%, 100% { transform: translate(0, 0) scale(1); }
  50% { transform: translate(30px, -25px) scale(1.15); }
}

/* Particles */
.hero__particles {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.hero__particle {
  position: absolute;
  opacity: 0.12;
  color: var(--primary);
}

/* Content */
.hero__content {
  position: relative;
  z-index: 1;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-lg);
}

/* Badge */
.hero__badge {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.4rem 1rem;
  background: rgba(124, 58, 237, 0.08);
  border: 1px solid rgba(124, 58, 237, 0.15);
  border-radius: var(--radius-full);
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--primary);
  animation: fade-in-down 0.6s ease;
}

.hero__badge-icon {
  font-size: 0.9rem;
  animation: vibrate 3s ease infinite;
}

@keyframes fade-in-down {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Title */
.hero__title {
  font-size: 2.2rem;
  font-weight: 800;
  line-height: 1.2;
  max-width: 700px;
  color: var(--text-primary);
  animation: fade-in-up 0.7s ease 0.1s both;
}

@media (min-width: 768px) {
  .hero__title {
    font-size: 3.5rem;
  }
}

.hero__title-gradient {
  display: block;
  background: linear-gradient(135deg, #7C3AED, #2563EB, #EC4899);
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: gradient-shift 4s ease infinite;
}

@keyframes gradient-shift {
  0%, 100% { background-position: 0% center; }
  50% { background-position: 100% center; }
}

@keyframes fade-in-up {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Subtitle */
.hero__subtitle {
  color: var(--text-secondary);
  font-size: 1.1rem;
  max-width: 520px;
  line-height: 1.7;
  animation: fade-in-up 0.7s ease 0.2s both;
}

.hero__subtitle strong {
  color: var(--primary);
}

/* Search */
.hero__search {
  width: 100%;
  max-width: 520px;
  animation: fade-in-up 0.7s ease 0.3s both;
}

/* Stats */
.hero__stats {
  display: flex;
  gap: var(--space-lg);
  margin-top: var(--space-md);
  flex-wrap: wrap;
  justify-content: center;
  animation: fade-in-up 0.7s ease 0.4s both;
}

.hero__stat-card {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1.25rem;
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(0, 0, 0, 0.04);
  border-radius: var(--radius-lg);
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
  transition: all var(--transition-base);
}

.hero__stat-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
}

.hero__stat-icon-wrap {
  width: 40px;
  height: 40px;
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.hero__stat-ico {
  font-size: 1.1rem;
  color: white;
}

.hero__stat-info {
  display: flex;
  flex-direction: column;
}

.hero__stat-value {
  font-family: var(--font-heading);
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--text-primary);
  line-height: 1.2;
}

.hero__stat-label {
  font-size: 0.7rem;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  font-weight: 500;
}

/* Quick tags */
.hero__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
  animation: fade-in-up 0.7s ease 0.5s both;
}

.hero__tag {
  padding: 0.35rem 0.85rem;
  background: rgba(255, 255, 255, 0.6);
  border: 1px solid rgba(0, 0, 0, 0.05);
  border-radius: var(--radius-full);
  font-size: 0.78rem;
  font-weight: 500;
  color: var(--text-secondary);
  cursor: default;
  transition: all var(--transition-fast);
}

.hero__tag:hover {
  background: rgba(124, 58, 237, 0.08);
  color: var(--primary);
  border-color: rgba(124, 58, 237, 0.15);
}

/* Responsive */
@media (max-width: 480px) {
  .hero {
    min-height: 75vh;
    padding-top: calc(var(--navbar-height) + var(--space-xl));
  }

  .hero__title {
    font-size: 1.8rem;
  }

  .hero__subtitle {
    font-size: 0.95rem;
  }

  .hero__stat-card {
    padding: 0.6rem 1rem;
  }

  .hero__stats {
    gap: 0.75rem;
  }
}
</style>
