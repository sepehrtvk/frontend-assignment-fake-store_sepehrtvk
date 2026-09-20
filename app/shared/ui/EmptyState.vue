<script setup lang="ts">
import AppIcon from './AppIcon.vue'

defineProps<{ title: string; hint?: string }>()
</script>

<template>
  <div
    class="border-line-strong bg-surface rounded-card text-muted grid justify-items-center gap-3 border-2 border-dashed p-12 text-center"
  >
    <AppIcon name="box" :size="32" />
    <p class="text-title font-bold">{{ title }}</p>
    <p v-if="hint" class="text-sm">{{ hint }}</p>
  </div>
</template>
