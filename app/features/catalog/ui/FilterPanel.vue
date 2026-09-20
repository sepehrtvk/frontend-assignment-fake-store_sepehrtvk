<script setup lang="ts">
import CategoryOptions from './CategoryOptions.vue'
import FilterCard from './FilterCard.vue'
import SearchBox from './SearchBox.vue'
import SortOptions from './SortOptions.vue'
import type { CategoryFacet } from '../model/categories'
import { toggleCategory, type Filters, type SortKey } from '../model/filters'

const props = defineProps<{ filters: Filters; facets: CategoryFacet[] }>()
const emit = defineEmits<{ 'update:filters': [Filters] }>()

function search(term: string) {
  emit('update:filters', { ...props.filters, search: term })
}

function sort(key: SortKey) {
  emit('update:filters', { ...props.filters, sort: key })
}

function toggle(category: string) {
  emit('update:filters', toggleCategory(props.filters, category))
}
</script>

<template>
  <div class="grid gap-4">
    <FilterCard title="فیلتر و جستجو">
      <SearchBox :search="filters.search" @submit="search" />
    </FilterCard>

    <FilterCard title="مرتب سازی">
      <SortOptions :sort="filters.sort" @select="sort" />
    </FilterCard>

    <FilterCard title="دسته بندی">
      <CategoryOptions :facets="facets" :categories="filters.categories" @toggle="toggle" />
    </FilterCard>
  </div>
</template>
