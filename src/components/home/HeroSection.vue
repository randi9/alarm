<template>
  <section class="hero" id="hero-section">
    <!-- Cursor-following blurred orbs -->
    <div class="hero__orbs-cursor">
      <div
        v-for="(orb, i) in cursorOrbs"
        :key="i"
        class="hero__cursor-orb"
        :style="getCursorOrbStyle(i)"
      >
        <div class="hero__cursor-orb-inner" :style="{
          background: `radial-gradient(50% 50% at 50% 50%, ${orb.color} 0%, transparent 100%)`,
          animationDelay: `-${i * 2}s`,
          animationDuration: `${8 + i * 1.5}s`
        }"></div>
      </div>
    </div>

    <!-- Subtle mesh grid -->
    <div class="hero__mesh"></div>

    <!-- Liquid glass content card -->
    <div class="container hero__wrapper">
      <div class="liquid-glass-card hero__glass" v-if="isLoaded">
        <h1 class="hero__title">
          Alarm & Ringtone
          <span class="hero__title-gradient">Gratis untuk Semua</span>
        </h1>

        <div class="hero__search">
          <SearchBar
            v-model="searchQuery"
            placeholder="Cari ringtone... (contoh: emak, subuh, anime)"
            @clear="$emit('clearSearch')"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import SearchBar from '../shared/SearchBar.vue'

const props = defineProps<{
  searchQuery: string
}>()

const emit = defineEmits(['update:searchQuery', 'clearSearch'])

const searchQuery = computed({
  get: () => props.searchQuery,
  set: (val: string) => emit('update:searchQuery', val)
})

const isLoaded = ref(false)

// Cursor-following orbs — bigger & bolder
const cursorOrbs = [
  { color: 'rgba(198, 253, 1, 0.65)', size: 550 },
  { color: 'rgba(52, 211, 153, 0.5)', size: 450 },
  { color: 'rgba(34, 211, 238, 0.4)', size: 400 },
  { color: 'rgba(198, 253, 1, 0.55)', size: 500 },
]

const mouseX = ref(0.5)
const mouseY = ref(0.5)

function handleMouseMove(e: MouseEvent) {
  mouseX.value = e.clientX / window.innerWidth
  mouseY.value = e.clientY / window.innerHeight
}

function getCursorOrbStyle(i: number) {
  const orb = cursorOrbs[i]
  const offsetX = (i % 2 === 0 ? 1 : -1) * (15 + i * 12)
  const offsetY = (i % 2 === 0 ? -1 : 1) * (10 + i * 10)

  const x = mouseX.value * 100 + offsetX
  const y = mouseY.value * 100 + offsetY

  return {
    width: `${orb.size}px`,
    height: `${orb.size}px`,
    left: `calc(${x}% - ${orb.size / 2}px)`,
    top: `calc(${y}% - ${orb.size / 2}px)`,
    transition: `left ${0.8 + i * 0.2}s cubic-bezier(0.25, 0.46, 0.45, 0.94), top ${0.8 + i * 0.2}s cubic-bezier(0.25, 0.46, 0.45, 0.94)`,
  }
}

onMounted(() => {
  window.addEventListener('mousemove', handleMouseMove)
  setTimeout(() => { isLoaded.value = true }, 100)
})

onUnmounted(() => {
  window.removeEventListener('mousemove', handleMouseMove)
})
</script>

<style scoped>
.hero {
  position: relative;
  background: var(--hero-bg);
  padding: calc(var(--navbar-height) + var(--space-2xl)) 0 calc(var(--space-3xl) + 12vh);
  overflow: hidden;
  min-height: 90vh;
  display: flex;
  align-items: center;
}

/* Subtle mesh grid */
.hero__mesh {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(var(--hero-mesh-color) 1px, transparent 1px),
    linear-gradient(90deg, var(--hero-mesh-color) 1px, transparent 1px);
  background-size: 60px 60px;
  mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black, transparent);
  pointer-events: none;
}

/* Cursor-following orbs */
.hero__orbs-cursor {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
}

.hero__cursor-orb {
  position: absolute;
  will-change: left, top;
}

.hero__cursor-orb-inner {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  filter: blur(40px);
  animation: float-orb 8s infinite ease-in-out alternate;
}

@keyframes float-orb {
  0% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(250px, -200px) scale(1.15); }
  66% { transform: translate(-220px, 250px) scale(0.85); }
  100% { transform: translate(-280px, -150px) scale(1.1); }
}

/* Wrapper */
.hero__wrapper {
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

/* Liquid glass card */
.hero__glass {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-xl);
  max-width: 680px;
  width: 100%;
  animation: glass-in 0.7s cubic-bezier(0.16, 1, 0.3, 1) both;
}

@keyframes glass-in {
  from {
    opacity: 0;
    transform: translateY(40px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/* Title */
.hero__title {
  font-size: 2rem;
  font-weight: 800;
  line-height: 1.2;
  color: var(--text-primary);
}

@media (min-width: 768px) {
  .hero__title {
    font-size: 3rem;
  }
}

.hero__title-gradient {
  display: block;
  background: linear-gradient(135deg, #C6FD01, #7DD33B, #34D399);
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

/* Search */
.hero__search {
  width: 100%;
  max-width: 480px;
  animation: fade-in-up 0.5s ease 0.3s both;
}

@keyframes fade-in-up {
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Responsive */
@media (max-width: 480px) {
  .hero {
    min-height: 80vh;
    padding-top: calc(var(--navbar-height) + var(--space-xl));
  }

  .hero__glass {
    padding: var(--space-2xl) var(--space-lg);
    border-radius: var(--radius-lg);
  }

  .hero__title {
    font-size: 1.6rem;
  }

  .hero__cursor-orb-inner {
    filter: blur(35px);
  }
}
</style>
