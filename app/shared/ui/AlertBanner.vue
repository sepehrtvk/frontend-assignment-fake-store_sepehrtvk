<script setup lang="ts">
defineProps<{ message: string }>()
</script>

<template>
  <div
    role="alert"
    class="bg-brand-soft text-brand rounded-card flex flex-wrap items-center justify-between gap-4 p-6"
  >
    <p class="text-sm font-bold">{{ message }}</p>
    <slot name="action" />
  </div>
</template>
