<script setup lang="ts">
import FilterPanel from './FilterPanel.vue'
import type { CategoryFacet } from '../model/categories'
import type { Filters } from '../model/filters'
import { count } from '~/shared/lib/format'
import AppDialog from '~/shared/ui/AppDialog.vue'
import IconButton from '~/shared/ui/IconButton.vue'
import PrimaryButton from '~/shared/ui/PrimaryButton.vue'

defineProps<{ filters: Filters; facets: CategoryFacet[]; results: number }>()
const emit = defineEmits<{ 'update:filters': [Filters] }>()

const open = defineModel<boolean>('open', { required: true })
</script>

<template>
  <AppDialog
    v-model:open="open"
    label="فیلتر و جستجو"
    from="bottom"
    class="bg-page mt-auto mb-0 w-full max-w-full rounded-t-4xl"
  >
    <div class="grid max-h-[85dvh] grid-rows-[auto_1fr_auto]">
      <div class="bg-surface flex items-center justify-between p-4">
        <span class="text-title font-bold">فیلترها</span>
        <IconButton
          name="close"
          label="بستن فیلترها"
          :size="20"
          class="text-muted"
          @click="open = false"
        />
      </div>

      <div class="overflow-y-auto p-4">
        <FilterPanel
          :filters="filters"
          :facets="facets"
          @update:filters="emit('update:filters', $event)"
        />
      </div>

      <div class="bg-surface p-4">
        <PrimaryButton class="rounded-control w-full text-sm" @click="open = false">
          نمایش {{ count(results) }} محصول
        </PrimaryButton>
      </div>
    </div>
  </AppDialog>
</template>
