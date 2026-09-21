<script setup lang="ts">
import { computed, ref } from 'vue'
import { fetchProducts, fetchProductsInCategories } from '~/features/catalog/api/products.api'
import { countCategories } from '~/features/catalog/model/categories'
import {
  activeFilterCount,
  applyFilters,
  isFiltered,
  parseFilters,
  toQuery,
  type Filters,
} from '~/features/catalog/model/filters'
import AppliedFilters from '~/features/catalog/ui/AppliedFilters.vue'
import FilterPanel from '~/features/catalog/ui/FilterPanel.vue'
import FilterSheet from '~/features/catalog/ui/FilterSheet.vue'
import ProductGrid from '~/features/catalog/ui/ProductGrid.vue'
import ProductGridSkeleton from '~/features/catalog/ui/ProductGridSkeleton.vue'
import { count } from '~/shared/lib/format'
import AlertBanner from '~/shared/ui/AlertBanner.vue'
import AppIcon from '~/shared/ui/AppIcon.vue'
import EmptyState from '~/shared/ui/EmptyState.vue'
import PrimaryButton from '~/shared/ui/PrimaryButton.vue'

const route = useRoute()
const router = useRouter()

const filters = computed(() => parseFilters(route.query))
const categories = computed(() => filters.value.categories)

const {
  data: all,
  status: allStatus,
  error: allError,
  refresh: refreshAll,
} = await useAsyncData('products', fetchProducts, {
  getCachedData: (key, nuxtApp, { cause }) =>
    cause === 'refresh:manual' ? undefined : nuxtApp.payload.data[key],
})

const {
  data: scoped,
  status: scopedStatus,
  error: scopedError,
  refresh: refreshScoped,
} = await useAsyncData(
  () => `products:${categories.value.join(',')}`,
  () =>
    categories.value.length ? fetchProductsInCategories(categories.value) : Promise.resolve(null),
  {
    getCachedData: (key, nuxtApp, { cause }) =>
      cause === 'refresh:manual' ? undefined : nuxtApp.payload.data[key],
  },
)

const loading = computed(() => allStatus.value === 'pending' || scopedStatus.value === 'pending')
const error = computed(() => allError.value ?? scopedError.value)
const source = computed(() => (categories.value.length ? scoped.value : all.value) ?? [])
const facets = computed(() => countCategories(all.value ?? []))
const visible = computed(() => applyFilters(source.value, filters.value))
const active = computed(() => activeFilterCount(filters.value))

const sheetOpen = ref(false)

useSeoMeta({
  title: 'لیست محصولات',
  description: 'فهرست محصولات فروشگاه با جستجو، فیلتر دسته بندی و مرتب سازی بر اساس امتیاز.',
})

function update(next: Filters) {
  router.push({ query: toQuery(next) })
}

function retry() {
  return Promise.all([refreshAll(), refreshScoped()])
}
</script>

<template>
  <main
    id="main"
    class="mx-auto grid max-w-[1360px] gap-6 px-4 py-6 lg:grid-cols-[266px_minmax(0,1fr)] lg:px-10"
  >
    <FilterPanel
      class="hidden lg:sticky lg:top-6 lg:grid lg:max-h-[calc(100dvh-3rem)] lg:self-start lg:overflow-y-auto lg:overscroll-contain"
      :filters="filters"
      :facets="facets"
      @update:filters="update"
    />

    <div class="grid content-start gap-4">
      <button
        type="button"
        class="bg-surface rounded-card text-label focus-visible:outline-brand flex items-center justify-between gap-2 p-4 text-[13px] font-medium focus-visible:outline-2 focus-visible:outline-offset-2 lg:hidden"
        aria-haspopup="dialog"
        :aria-expanded="sheetOpen"
        @click="sheetOpen = true"
      >
        فیلتر و جستجو
        <span
          v-if="active"
          class="bg-brand rounded-badge grid size-6 place-items-center text-xs text-white"
        >
          {{ count(active) }}
        </span>
        <AppIcon v-else name="sort" class="text-muted" />
      </button>

      <FilterSheet
        v-model:open="sheetOpen"
        :filters="filters"
        :facets="facets"
        :results="visible.length"
        @update:filters="update"
      />

      <AlertBanner v-if="error" :message="error.message">
        <template #action>
          <PrimaryButton class="rounded-chip text-sm" :disabled="loading" @click="retry">
            {{ loading ? 'در حال تلاش دوباره' : 'تلاش دوباره' }}
          </PrimaryButton>
        </template>
      </AlertBanner>

      <template v-else>
        <AppliedFilters :filters="filters" @update:filters="update" />

        <p aria-live="polite" class="sr-only">
          {{ loading ? '' : `${count(visible.length)} محصول پیدا شد` }}
        </p>

        <ProductGridSkeleton v-if="loading" />
        <EmptyState
          v-else-if="!visible.length"
          title="محصولی پیدا نشد"
          :hint="
            isFiltered(filters)
              ? 'عبارت جستجو یا فیلترها را تغییر دهید، یا همه را بردارید.'
              : 'فروشگاه در حال حاضر محصولی ندارد.'
          "
        />
        <ProductGrid v-else :products="visible" />
      </template>
    </div>
  </main>
</template>
