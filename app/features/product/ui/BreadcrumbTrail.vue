<script setup lang="ts">
import AppIcon from '~/shared/ui/AppIcon.vue'

defineProps<{ title: string }>()
</script>

<template>
  <nav aria-label="مسیر صفحه">
    <ol class="text-muted flex items-center gap-2 text-[13px]">
      <li class="flex">
        <NuxtLink to="/" aria-label="خانه" class="focus-visible:outline-brand">
          <AppIcon name="home" :size="18" />
        </NuxtLink>
      </li>
      <li aria-hidden="true" class="flex"><AppIcon name="breadcrumbArrow" :size="20" /></li>
      <li><NuxtLink to="/" class="focus-visible:outline-brand">لیست محصولات</NuxtLink></li>
      <li aria-hidden="true" class="flex"><AppIcon name="breadcrumbArrow" :size="20" /></li>
      <li aria-current="page" dir="ltr" lang="en" class="text-title truncate font-bold">
        {{ title }}
      </li>
    </ol>
  </nav>
</template>
