<script setup lang="ts">
import { ref, watch } from 'vue'

defineProps<{ label: string }>()

const open = defineModel<boolean>('open', { required: true })
const dialog = ref<HTMLDialogElement>()

watch(open, (isOpen) => {
  if (isOpen) dialog.value?.showModal()
  else if (dialog.value?.open) dialog.value.close()
})
</script>

<template>
  <dialog
    ref="dialog"
    :aria-label="label"
    class="bg-surface backdrop:bg-title/40 m-0 max-h-dvh max-w-none p-0 backdrop:backdrop-blur-[2px]"
    @close="open = false"
  >
    <slot />
  </dialog>
</template>
