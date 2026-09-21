<script setup lang="ts">
import { onMounted, ref } from 'vue'

defineProps<{ src: string; alt: string }>()

const image = ref<HTMLImageElement>()
const waiting = ref(false)

onMounted(() => {
  const element = image.value
  if (element && !element.complete && element.naturalWidth === 0) waiting.value = true
})
</script>

<template>
  <img
    ref="image"
    :src="src"
    :alt="alt"
    class="transition duration-500 ease-out motion-reduce:transition-none"
    :class="{ 'opacity-0': waiting }"
    @load="waiting = false"
    @error="waiting = false"
  />
</template>
