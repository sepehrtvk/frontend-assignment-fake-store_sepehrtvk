<script setup lang="ts">
import { computed } from 'vue'
import AppIcon from '~/shared/ui/AppIcon.vue'
import type { IconName } from '~/shared/ui/icons'
import { categoryLabel } from '../model/categories'
import { toggleCategory, type Filters, type SortKey } from '../model/filters'

const SORT_LABELS: Record<SortKey, string> = {
  'count-asc': 'تعداد: کم به زیاد',
  'count-desc': 'تعداد: زیاد به کم',
  'rate-desc': 'رتبه: زیاد به کم',
  'rate-asc': 'رتبه: کم به زیاد',
}

const props = defineProps<{ filters: Filters }>()
const emit = defineEmits<{ 'update:filters': [Filters] }>()

interface Chip {
  key: string
  label: string
  icon: IconName
  next: Filters
}

const chips = computed<Chip[]>(() => {
  const list: Chip[] = []

  if (props.filters.search) {
    list.push({
      key: 'search',
      label: props.filters.search,
      icon: 'search',
      next: { ...props.filters, search: '' },
    })
  }

  if (props.filters.sort) {
    list.push({
      key: 'sort',
      label: SORT_LABELS[props.filters.sort],
      icon: 'sort',
      next: { ...props.filters, sort: '' },
    })
  }

  for (const category of props.filters.categories) {
    list.push({
      key: `category:${category}`,
      label: categoryLabel(category),
      icon: 'category',
      next: toggleCategory(props.filters, category),
    })
  }

  return list
})
</script>

<template>
  <div
    v-if="chips.length"
    class="bg-surface rounded-card flex flex-wrap items-center justify-between gap-4 p-4"
  >
    <p class="text-body text-sm">فیلترهای اعمال شده</p>

    <ul class="flex flex-wrap items-center gap-2">
      <li v-for="chip in chips" :key="chip.key">
        <button
          type="button"
          class="bg-brand-soft rounded-chip text-body focus-visible:outline-brand flex items-center gap-2 px-3 py-2 text-[13px] focus-visible:outline-2 focus-visible:outline-offset-2"
          @click="emit('update:filters', chip.next)"
        >
          <AppIcon name="close" class="text-muted" />
          <span dir="auto">{{ chip.label }}</span>
          <AppIcon :name="chip.icon" class="text-brand" />
          <span class="sr-only">حذف فیلتر</span>
        </button>
      </li>

      <li>
        <button
          type="button"
          class="text-brand focus-visible:outline-brand px-3 py-2 text-[13px] font-bold underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2"
          @click="emit('update:filters', { search: '', categories: [], sort: '' })"
        >
          حذف همه فیلترها
        </button>
      </li>
    </ul>
  </div>
</template>
