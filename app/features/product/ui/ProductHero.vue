<script setup lang="ts">
import type { Product } from '~/features/catalog/model/product.types'

defineProps<{ product: Product }>()
</script>

<template>
  <section class="bg-surface rounded-card grid gap-6 p-6">
    <h1 dir="ltr" lang="en" class="text-title text-right text-xl font-bold">
      {{ product.title }}
    </h1>

    <img
      :src="product.image"
      :alt="product.title"
      class="bg-sunken rounded-chip max-h-[420px] w-full object-contain p-6"
    />
  </section>
</template>
