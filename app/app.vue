<script setup lang="ts">
import SiteFooter from '~/features/site/ui/SiteFooter.vue'
import SiteHeader from '~/features/site/ui/SiteHeader.vue'
</script>

<template>
  <NuxtRouteAnnouncer />
  <NuxtLoadingIndicator color="#e20054" />
  <SiteHeader />
  <NuxtPage />
  <SiteFooter />
</template>
