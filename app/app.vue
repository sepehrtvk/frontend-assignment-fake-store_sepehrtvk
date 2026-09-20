<script setup lang="ts">
import SiteFooter from '~/features/site/ui/SiteFooter.vue'
import SiteHeader from '~/features/site/ui/SiteHeader.vue'
</script>

<template>
  <NuxtRouteAnnouncer />
  <NuxtLoadingIndicator color="#e20054" />
  <a
    href="#main"
    class="bg-brand focus:rounded-chip sr-only text-white focus:not-sr-only focus:absolute focus:z-10 focus:m-4 focus:px-4 focus:py-3 focus:text-sm focus:font-bold"
  >
    پرش به محصولات
  </a>
  <SiteHeader />
  <NuxtPage />
  <SiteFooter />
</template>
