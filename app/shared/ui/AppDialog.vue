<script setup lang="ts">
import { ref, watch } from 'vue'

defineProps<{ label: string }>()

const open = defineModel<boolean>('open', { required: true })
const dialog = ref<HTMLDialogElement>()

watch(open, (isOpen) => {
  if (isOpen) dialog.value?.showModal()
  else if (dialog.value?.open) dialog.value.close()
})

function closeOnBackdrop(event: MouseEvent) {
  if (event.target === event.currentTarget) open.value = false
}
</script>

<template>
  <dialog
    ref="dialog"
    :aria-label="label"
    class="backdrop:bg-title/40 m-auto p-0 backdrop:backdrop-blur-[2px]"
    @click="closeOnBackdrop"
    @close="open = false"
  >
    <slot />
  </dialog>
</template>
