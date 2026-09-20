<script setup lang="ts">
import AppIcon from '~/shared/ui/AppIcon.vue'

defineProps<{ title: string }>()
</script>

<template>
  <details open class="bg-surface rounded-card group p-6">
    <summary
      class="text-label flex list-none items-center justify-between text-[13px] font-medium [&::-webkit-details-marker]:hidden"
    >
      {{ title }}
      <AppIcon
        name="chevron"
        class="text-muted rotate-180 transition-transform group-open:rotate-0"
      />
    </summary>
    <div class="pt-6">
      <slot />
    </div>
  </details>
</template>
