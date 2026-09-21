<script setup lang="ts">
import { ref } from 'vue'
import type { Product } from '~/features/catalog/model/product.types'
import AppDialog from '~/shared/ui/AppDialog.vue'
import IconButton from '~/shared/ui/IconButton.vue'

defineProps<{ product: Product }>()

const zoomed = ref(false)
</script>

<template>
  <section class="bg-surface rounded-card grid gap-6 p-6">
    <h1 dir="ltr" lang="en" class="text-title text-right text-xl font-bold">
      {{ product.title }}
    </h1>

    <div class="relative">
      <img
        :src="product.image"
        :alt="product.title"
        class="bg-sunken rounded-chip max-h-[420px] w-full object-contain p-6"
      />
      <IconButton
        name="zoom"
        label="بزرگ‌نمایی تصویر"
        :size="24"
        class="bg-title/70 absolute start-4 top-4 size-10 rounded-full text-white"
        @click="zoomed = true"
      />
    </div>

    <AppDialog v-model:open="zoomed" label="تصویر محصول" class="bg-surface rounded-card">
      <div class="relative p-4">
        <img
          :src="product.image"
          :alt="product.title"
          class="max-h-[85dvh] max-w-full object-contain"
        />
        <IconButton
          name="close"
          label="بستن تصویر"
          :size="20"
          class="bg-title/70 absolute end-4 top-4 size-10 rounded-full text-white"
          @click="zoomed = false"
        />
      </div>
    </AppDialog>
  </section>
</template>
