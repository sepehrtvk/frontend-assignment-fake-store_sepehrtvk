<script setup lang="ts">
import SiteFooter from '~/features/site/ui/SiteFooter.vue'
import SiteHeader from '~/features/site/ui/SiteHeader.vue'
</script>

<template>
  <NuxtRouteAnnouncer />
  <SiteHeader />
  <NuxtPage />
  <SiteFooter />
</template>
