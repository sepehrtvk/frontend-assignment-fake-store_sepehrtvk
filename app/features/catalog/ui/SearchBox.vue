<script setup lang="ts">
import { ref, watch } from 'vue'
import AppIcon from '~/shared/ui/AppIcon.vue'
import IconButton from '~/shared/ui/IconButton.vue'
import PrimaryButton from '~/shared/ui/PrimaryButton.vue'

const props = defineProps<{ search: string }>()
const emit = defineEmits<{ submit: [string] }>()

const query = ref(props.search)

watch(
  () => props.search,
  (value) => {
    query.value = value
  },
)

function submit() {
  emit('submit', query.value.trim())
}

function clear() {
  query.value = ''
  emit('submit', '')
}
</script>

<template>
  <form class="grid gap-4" @submit.prevent="submit">
    <div
      class="bg-sunken border-line-strong rounded-control focus-within:border-brand flex items-center gap-2 border px-4 py-2 transition-colors"
    >
      <AppIcon name="search" class="text-brand" />
      <input
        v-model="query"
        type="search"
        aria-label="جستجوی محصولات"
        placeholder="نام محصول"
        class="placeholder:text-placeholder text-body min-w-0 flex-1 bg-transparent py-1 text-[13px] outline-none [&::-webkit-search-cancel-button]:hidden"
      />
      <IconButton
        v-if="query"
        name="close"
        label="پاک کردن جستجو"
        class="text-muted"
        @click="clear"
      />
    </div>

    <PrimaryButton type="submit" class="rounded-control text-xs">جستجو</PrimaryButton>
  </form>
</template>
