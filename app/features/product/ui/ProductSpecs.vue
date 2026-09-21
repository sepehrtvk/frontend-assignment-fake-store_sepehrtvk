<script setup lang="ts">
import { computed } from 'vue'
import type { Product } from '~/features/catalog/model/product.types'
import { count, price, rate } from '~/shared/lib/format'

const props = defineProps<{ product: Product }>()

const rows = computed(() => [
  { label: 'قیمت', value: price(props.product.price), english: false },
  { label: 'توضیحات', value: props.product.description, english: true },
  { label: 'دسته بندی', value: props.product.category, english: true },
  { label: 'رتبه', value: rate(props.product.rate), english: false },
  { label: 'تعداد', value: count(props.product.count), english: false },
])
</script>

<template>
  <section class="bg-surface rounded-card grid gap-6 p-6">
    <h2 class="text-title text-xl font-bold">مشخصات فنی</h2>

    <dl class="grid gap-3 md:grid-cols-[172px_1fr]">
      <template v-for="row in rows" :key="row.label">
        <dt class="bg-sunken rounded-chip text-label p-4 text-sm">{{ row.label }}</dt>
        <dd
          class="bg-sunken rounded-chip text-body p-4 text-sm"
          :dir="row.english ? 'ltr' : undefined"
          :lang="row.english ? 'en' : undefined"
          :class="row.english && 'text-right'"
        >
          {{ row.value }}
        </dd>
      </template>
    </dl>
  </section>
</template>
