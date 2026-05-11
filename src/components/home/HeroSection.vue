<template>
  <section class="hero" id="hero-section">
    <!-- Floating particles -->
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
      <h1 class="hero__title">
        Alarm & Ringtone
        <span class="hero__title-gradient">Paling Ngeselin</span>
        se-Indonesia
      </h1>

      <p class="hero__subtitle">
        Download gratis alarm yang bikin kamu pasti bangun. Dijamin nggak bisa tidur lagi!
        <Icon icon="mdi:volume-high" class="hero__subtitle-icon" />
      </p>

      <div class="hero__search">
        <SearchBar
          v-model="searchQuery"
          placeholder="Cari ringtone... (contoh: emak, subuh, anime)"
          @clear="$emit('clearSearch')"
        />
      </div>

      <div class="hero__stats" ref="statsRef">
        <div class="hero__stat" v-for="stat in stats" :key="stat.label">
          <span class="hero__stat-value">
            <Icon :icon="stat.icon" class="hero__stat-ico" />
            {{ stat.displayValue }}
          </span>
          <span class="hero__stat-label">{{ stat.label }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
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
  { icon: 'mdi:fire', value: 1200, displayValue: '0', label: 'Ringtone', suffix: '+' },
  { icon: 'mdi:account-group', value: 50000, displayValue: '0', label: 'Download', suffix: '+' },
  { icon: 'mdi:star', value: 4.8, displayValue: '0', label: 'Rating', suffix: '' }
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

function getParticleStyle(i: number) {
  const positions = [
    { left: '5%', top: '20%' },
    { left: '15%', top: '70%' },
    { left: '30%', top: '15%' },
    { left: '50%', top: '80%' },
    { left: '65%', top: '10%' },
    { left: '75%', top: '65%' },
    { left: '88%', top: '25%' },
    { left: '92%', top: '75%' }
  ]
  return {
    ...positions[i - 1],
    animationDelay: `${i * 0.5}s`,
    animationDuration: `${3 + i * 0.5}s`
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
})
</script>

<style scoped>
.hero {
  position: relative;
  background: linear-gradient(180deg, var(--bg-primary) 0%, var(--bg-secondary) 100%);
  padding: var(--space-3xl) 0;
  overflow: hidden;
  min-height: 50vh;
  display: flex;
  align-items: center;
}

/* Particles */
.hero__particles {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.hero__particle {
  position: absolute;
  font-size: 1.5rem;
  opacity: 0.12;
  color: var(--primary-start);
  animation: float-particle 4s ease infinite;
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

.hero__title {
  font-size: 2rem;
  font-weight: 800;
  line-height: 1.15;
  max-width: 700px;
}

@media (min-width: 768px) {
  .hero__title {
    font-size: 3rem;
  }
}

.hero__title-gradient {
  display: block;
  background: linear-gradient(135deg, var(--primary-start), var(--primary-end), var(--accent-pink));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero__subtitle {
  color: var(--text-secondary);
  font-size: 1.05rem;
  max-width: 500px;
  line-height: 1.6;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.35rem;
  flex-wrap: wrap;
}

.hero__subtitle-icon {
  color: var(--primary-start);
  font-size: 1.2rem;
}

.hero__search {
  width: 100%;
  max-width: 500px;
}

/* Stats */
.hero__stats {
  display: flex;
  gap: var(--space-xl);
  margin-top: var(--space-md);
  flex-wrap: wrap;
  justify-content: center;
}

.hero__stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
}

.hero__stat-value {
  font-family: var(--font-heading);
  font-size: 1.3rem;
  font-weight: 700;
  color: var(--text-primary);
  display: flex;
  align-items: center;
  gap: 0.3rem;
}

.hero__stat-ico {
  font-size: 1.1rem;
  color: var(--accent-orange);
}

.hero__stat-label {
  font-size: 0.75rem;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
</style>
