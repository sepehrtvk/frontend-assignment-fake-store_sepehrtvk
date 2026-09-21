<script setup lang="ts">
import { ref, watch } from 'vue'

withDefaults(defineProps<{ label: string; from?: 'top' | 'bottom' | 'center' }>(), {
  from: 'center',
})

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
    :data-from="from"
    class="m-auto p-0"
    @click="closeOnBackdrop"
    @close="open = false"
  >
    <slot />
  </dialog>
</template>
