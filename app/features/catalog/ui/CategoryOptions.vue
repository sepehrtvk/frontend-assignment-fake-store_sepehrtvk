<script setup lang="ts">
import type { CategoryFacet } from '../model/categories'
import { count } from '~/shared/lib/format'

defineProps<{ facets: CategoryFacet[]; categories: string[] }>()
const emit = defineEmits<{ toggle: [string] }>()
</script>

<template>
  <fieldset class="grid gap-3">
    <legend class="sr-only">دسته بندی محصولات</legend>
    <label
      v-for="facet in facets"
      :key="facet.value"
      class="flex items-center gap-3 text-xs"
      :class="categories.includes(facet.value) ? 'text-body font-medium' : 'text-muted'"
    >
      <input
        type="checkbox"
        class="accent-brand size-4"
        :checked="categories.includes(facet.value)"
        @change="emit('toggle', facet.value)"
      />
      <span dir="ltr" lang="en" class="flex-1 text-right">{{ facet.value }}</span>
      <span
        class="rounded-badge grid size-6 place-items-center text-xs text-white"
        :class="categories.includes(facet.value) ? 'bg-brand' : 'bg-badge'"
      >
        {{ count(facet.count) }}
      </span>
    </label>
  </fieldset>
</template>
