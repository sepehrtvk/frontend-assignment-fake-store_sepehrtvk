<script setup lang="ts">
import AppIcon from '~/shared/ui/AppIcon.vue'
import type { Product } from '../model/product.types'

defineProps<{ product: Product }>()
</script>

<template>
  <NuxtLink
    :to="`/products/${product.id}`"
    class="border-line bg-surface rounded-card focus-visible:outline-brand group grid content-start gap-3 border p-2 pb-4 focus-visible:outline-2 focus-visible:outline-offset-2"
  >
    <img
      :src="product.image"
      :alt="product.title"
      loading="lazy"
      class="bg-sunken rounded-chip aspect-[247/170] w-full object-contain p-4"
    />

    <p
      dir="ltr"
      lang="en"
      class="text-title line-clamp-2 min-h-12 px-2 text-right text-sm font-bold"
    >
      {{ product.title }}
    </p>

    <p class="text-muted flex items-center justify-between px-2 text-[13px]">
      <span class="text-title font-bold">{{ product.price }}</span>
      <span>رتبه {{ product.rate }}</span>
    </p>

    <span
      class="border-line rounded-chip text-brand group-hover:border-brand mx-2 flex items-center justify-center gap-2 border-[1.5px] px-4 py-3 text-sm font-bold transition-colors"
    >
      مشاهده جزئیات
      <AppIcon name="chevron" class="rotate-90" />
    </span>
  </NuxtLink>
</template>
