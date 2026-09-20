<script setup lang="ts">
import { icons, type IconName } from './icons'

withDefaults(defineProps<{ name: IconName; size?: number }>(), { size: 16 })
</script>

<template>
  <component
    :is="icons[name]"
    :width="size"
    :height="size"
    aria-hidden="true"
    focusable="false"
    class="shrink-0"
  />
</template>
