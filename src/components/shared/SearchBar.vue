<template>
  <div class="search-bar" :class="{ 'search-bar--focused': isFocused }">
    <svg class="search-bar__icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
    <input
      ref="inputRef"
      type="text"
      class="search-bar__input"
      :placeholder="placeholder"
      :value="modelValue"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      @focus="isFocused = true"
      @blur="isFocused = false"
      id="search-input"
    />
    <button
      v-if="modelValue"
      class="search-bar__clear"
      @click="$emit('update:modelValue', ''); $emit('clear')"
      id="search-clear"
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  modelValue: string
  placeholder?: string
}>()

defineEmits(['update:modelValue', 'clear'])

const isFocused = ref(false)
const inputRef = ref<HTMLInputElement | null>(null)

defineExpose({ focus: () => inputRef.value?.focus() })
</script>

<style scoped>
.search-bar {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  background: var(--search-bg);
  backdrop-filter: blur(12px);
  border: 1px solid var(--search-border);
  border-radius: var(--radius-xl);
  padding: 0.6rem var(--space-lg);
  transition: all var(--transition-base);
  max-width: 500px;
  width: 100%;
  box-shadow: 0 2px 10px var(--card-shadow);
}

.search-bar--focused {
  border-color: var(--primary-start);
  box-shadow: 0 0 0 3px rgba(198, 253, 1, 0.1), 0 4px 16px var(--card-shadow);
  background: var(--search-bg-focus);
}

.search-bar__icon {
  color: var(--text-muted);
  flex-shrink: 0;
}

.search-bar__input {
  flex: 1;
  background: none;
  border: none;
  outline: none;
  color: var(--text-primary);
  font-size: 0.95rem;
  padding: var(--space-xs) 0;
}

.search-bar__input::placeholder {
  color: var(--text-muted);
}

.search-bar__clear {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  color: var(--text-muted);
  transition: all var(--transition-fast);
  flex-shrink: 0;
}

.search-bar__clear:hover {
  background: var(--glass-bg);
  color: var(--text-primary);
}
</style>
