<script setup lang="ts">
withDefaults(defineProps<{ type?: 'button' | 'submit' }>(), { type: 'button' })
</script>

<template>
  <button
    :type="type"
    class="border-line text-brand hover:border-brand focus-visible:outline-brand flex items-center justify-center gap-2 border-[1.5px] px-4 py-3 font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
  >
    <slot />
  </button>
</template>
