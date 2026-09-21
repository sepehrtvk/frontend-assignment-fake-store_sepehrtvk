<script setup lang="ts">
defineProps<{ to: string; current?: boolean }>()
</script>

<template>
  <NuxtLink
    :to="to"
    :aria-current="current ? 'page' : undefined"
    :class="{ 'text-brand': current }"
    class="hover:text-brand focus-visible:outline-brand relative inline-flex items-center gap-2 transition-colors duration-200 after:absolute after:inset-x-0 after:-bottom-1 after:h-px after:origin-right after:scale-x-0 after:bg-current after:transition-transform after:duration-300 hover:after:scale-x-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:after:scale-x-100 motion-reduce:transition-none motion-reduce:after:transition-none"
  >
    <slot />
  </NuxtLink>
</template>
