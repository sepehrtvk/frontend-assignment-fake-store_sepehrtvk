<script setup lang="ts">
import { computed } from 'vue'
import AppIcon from '~/shared/ui/AppIcon.vue'
import { splitByMatch } from '~/shared/lib/highlight'
import FadeInImage from '~/shared/ui/FadeInImage.vue'
import type { Product } from '../model/product.types'

const props = defineProps<{ product: Product; highlight?: string }>()

const title = computed(() => splitByMatch(props.product.title, props.highlight ?? ''))
</script>

<template>
  <NuxtLink
    :to="`/products/${product.id}`"
    class="border-line bg-surface rounded-card focus-visible:outline-brand group hover:shadow-title/10 grid content-start gap-3 border p-2 pb-4 transition duration-300 ease-out hover:-translate-y-1 hover:shadow-lg focus-visible:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-2 motion-reduce:transition-none motion-reduce:hover:translate-y-0 motion-reduce:focus-visible:translate-y-0"
  >
    <div
      class="bg-sunken rounded-chip aspect-247/170 overflow-hidden"
      :style="{ viewTransitionName: `product-${product.id}` }"
    >
      <FadeInImage
        :src="product.image"
        :alt="product.title"
        loading="lazy"
        class="size-full object-contain p-4 group-hover:scale-105 motion-reduce:group-hover:scale-100"
      />
    </div>

    <p
      dir="ltr"
      lang="en"
      class="text-title line-clamp-2 min-h-12 px-2 text-right text-sm leading-6 font-bold"
    >
      <template v-for="(part, index) in title" :key="index">
        <mark v-if="part.match" class="bg-brand-soft text-brand rounded-sm">{{ part.text }}</mark>
        <template v-else>{{ part.text }}</template>
      </template>
    </p>

    <p class="text-muted flex items-center justify-between px-2 text-[13px]">
      <span class="text-title font-bold">{{ product.price }}</span>
      <span>رتبه {{ product.rate }}</span>
    </p>

    <span
      class="border-line rounded-chip text-brand group-hover:border-brand mx-2 flex items-center justify-center gap-2 border-[1.5px] px-4 py-3 text-sm font-bold transition-colors"
    >
      مشاهده جزئیات
      <AppIcon
        name="chevron"
        class="rotate-90 transition-transform duration-300 group-hover:-translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
      />
    </span>
  </NuxtLink>
</template>
