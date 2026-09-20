<script setup lang="ts">
import { fetchProduct } from '~/features/catalog/api/products.api'
import BreadcrumbTrail from '~/features/product/ui/BreadcrumbTrail.vue'
import ProductHero from '~/features/product/ui/ProductHero.vue'
import ProductSpecs from '~/features/product/ui/ProductSpecs.vue'

const route = useRoute()
const id = Number(route.params.id)

const { data: product } = await useAsyncData(`product:${id}`, () =>
  Number.isInteger(id) ? fetchProduct(id) : Promise.resolve(null),
)

if (!product.value) {
  throw createError({ statusCode: 404, statusMessage: 'این محصول پیدا نشد', fatal: true })
}

useSeoMeta({
  title: product.value.title,
  description: product.value.description,
  ogTitle: product.value.title,
  ogDescription: product.value.description,
  ogImage: product.value.image,
})
</script>

<template>
  <main v-if="product" class="mx-auto grid max-w-[1360px] gap-6 px-4 py-6 lg:px-10">
    <BreadcrumbTrail :title="product.title" />
    <ProductHero :product="product" />
    <ProductSpecs :product="product" />
  </main>
</template>
