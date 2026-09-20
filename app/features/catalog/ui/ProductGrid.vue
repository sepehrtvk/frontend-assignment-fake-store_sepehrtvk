<script setup lang="ts">
import ProductCard from './ProductCard.vue'
import type { Product } from '../model/product.types'

defineProps<{ products: Product[] }>()
</script>

<template>
  <ul class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
    <li v-for="product in products" :key="product.id" class="grid">
      <ProductCard :product="product" />
    </li>
  </ul>
</template>
