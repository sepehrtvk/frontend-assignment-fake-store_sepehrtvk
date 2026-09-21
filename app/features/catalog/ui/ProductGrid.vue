<script setup lang="ts">
import ProductCard from './ProductCard.vue'
import type { Product } from '../model/product.types'

defineProps<{ products: Product[]; highlight?: string }>()
</script>

<template>
  <ul class="grid gap-x-4 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
    <li v-for="product in products" :key="product.id" class="grid">
      <ProductCard :product="product" :highlight="highlight" />
    </li>
  </ul>
</template>
