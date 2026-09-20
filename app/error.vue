<script setup lang="ts">
import { computed } from 'vue'
import type { NuxtError } from '#app'
import SiteFooter from '~/features/site/ui/SiteFooter.vue'
import SiteHeader from '~/features/site/ui/SiteHeader.vue'
import EmptyState from '~/shared/ui/EmptyState.vue'
import PrimaryButton from '~/shared/ui/PrimaryButton.vue'

const props = defineProps<{ error: NuxtError }>()

const notFound = computed(() => props.error.statusCode === 404)

const title = computed(() => (notFound.value ? 'این محصول پیدا نشد' : 'مشکلی پیش آمد'))

const hint = computed(() =>
  notFound.value
    ? 'شاید حذف شده باشد یا نشانی را اشتباه وارد کرده باشید.'
    : 'لطفا چند لحظه بعد دوباره تلاش کنید.',
)
</script>

<template>
  <SiteHeader />

  <main class="mx-auto grid max-w-[1360px] justify-items-center gap-6 px-4 py-16 lg:px-10">
    <EmptyState class="w-full max-w-xl" :title="title" :hint="hint" />
    <PrimaryButton class="rounded-chip text-sm" @click="clearError({ redirect: '/' })">
      بازگشت به لیست محصولات
    </PrimaryButton>
  </main>

  <SiteFooter />
</template>
