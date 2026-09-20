<script setup lang="ts">
import { computed } from 'vue'
import { fetchProducts } from '~/features/catalog/api/products.api'
import { countCategories } from '~/features/catalog/model/categories'
import { applyFilters, parseFilters, toQuery, type Filters } from '~/features/catalog/model/filters'
import AppliedFilters from '~/features/catalog/ui/AppliedFilters.vue'
import FilterPanel from '~/features/catalog/ui/FilterPanel.vue'
import ProductGrid from '~/features/catalog/ui/ProductGrid.vue'

const route = useRoute()
const router = useRouter()

const { data: products } = await useAsyncData('products', fetchProducts)

const filters = computed(() => parseFilters(route.query))
const facets = computed(() => countCategories(products.value ?? []))
const visible = computed(() => applyFilters(products.value ?? [], filters.value))

function update(next: Filters) {
  router.push({ query: toQuery(next) })
}
</script>

<template>
  <main class="mx-auto grid max-w-[1360px] gap-6 px-4 py-6 lg:grid-cols-[266px_1fr] lg:px-10">
    <FilterPanel
      class="hidden lg:block"
      :filters="filters"
      :facets="facets"
      @update:filters="update"
    />

    <div class="grid content-start gap-4">
      <AppliedFilters :filters="filters" @update:filters="update" />
      <ProductGrid :products="visible" />
    </div>
  </main>
</template>
