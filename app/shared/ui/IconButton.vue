<script setup lang="ts">
import AppIcon from './AppIcon.vue'
import type { IconName } from './icons'

withDefaults(defineProps<{ name: IconName; label: string; size?: number }>(), { size: 16 })
</script>

<template>
  <button
    type="button"
    :aria-label="label"
    class="focus-visible:outline-brand grid place-items-center transition-opacity hover:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-2"
  >
    <AppIcon :name="name" :size="size" />
  </button>
</template>
