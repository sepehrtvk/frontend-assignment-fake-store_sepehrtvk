<script setup lang="ts">
withDefaults(defineProps<{ type?: 'button' | 'submit' }>(), { type: 'button' })
</script>

<template>
  <button
    :type="type"
    class="bg-brand focus-visible:outline-brand flex items-center justify-center gap-2 px-4 py-3 font-bold text-white transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-60"
  >
    <slot />
  </button>
</template>
