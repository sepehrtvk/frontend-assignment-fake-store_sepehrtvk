<script setup lang="ts">
import { useId } from 'vue'
import { SORT_KEYS, type SortKey } from '../model/filters'

const LABELS: Record<SortKey, string> = {
  'count-asc': 'تعداد: کم به زیاد',
  'count-desc': 'تعداد: زیاد به کم',
  'rate-desc': 'رتبه: زیاد به کم',
  'rate-asc': 'رتبه: کم به زیاد',
}

defineProps<{ sort: SortKey | '' }>()
const emit = defineEmits<{ select: [SortKey] }>()

const name = useId()
</script>

<template>
  <fieldset class="grid gap-3">
    <legend class="sr-only">مرتب سازی محصولات</legend>
    <label
      v-for="key in SORT_KEYS"
      :key="key"
      class="flex items-center justify-between gap-3 text-xs"
      :class="sort === key ? 'text-body font-medium' : 'text-muted'"
    >
      {{ LABELS[key] }}
      <input
        :name="name"
        type="radio"
        class="accent-brand size-4"
        :checked="sort === key"
        @change="emit('select', key)"
      />
    </label>
  </fieldset>
</template>
