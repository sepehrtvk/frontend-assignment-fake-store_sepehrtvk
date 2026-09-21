<script setup lang="ts">
import AppIcon from '~/shared/ui/AppIcon.vue'
import type { IconName } from '~/shared/ui/icons'
import SiteLink from './SiteLink.vue'

const columns: { title: string; items: string[] }[] = [
  {
    title: 'دسترسی سریع',
    items: ['درباره ما', 'بلاگ', 'تماس با ما', 'خدمات پس از فروش'],
  },
  {
    title: 'راهنمای سایت',
    items: ['قوانین و مقررات', 'دریافت مشاوره', 'انتقادات و پیشنهادات'],
  },
]

const socials: { label: string; icon: IconName }[] = [
  { label: 'تلگرام', icon: 'telegram' },
  { label: 'اینستاگرام', icon: 'instagram' },
  { label: 'لینکدین', icon: 'linkedin' },
]

const bottomSocials: { label: string; icon: IconName }[] = [
  { label: 'تلگرام', icon: 'telegram' },
  { label: 'اینستاگرام', icon: 'instagram' },
  { label: 'توییتر', icon: 'twitter' },
  { label: 'یوتیوب', icon: 'youtube' },
  { label: 'لینکدین', icon: 'linkedin' },
]
</script>

<template>
  <footer class="bg-surface mt-12 rounded-t-4xl">
    <div
      class="mx-auto grid max-w-340 gap-10 px-4 py-12 lg:grid-cols-[1fr_auto_auto_auto] lg:px-10"
    >
      <p class="text-label text-[13px] lg:order-last">
        هفت روز هفته از ۸ صبح تا ۱۲ شب پاسخگو هستیم
      </p>

      <div v-for="column in columns" :key="column.title" class="grid content-start gap-4">
        <p class="text-body text-xl font-bold">{{ column.title }}</p>
        <ul class="text-body grid justify-items-start gap-2 text-[13px]">
          <li v-for="item in column.items" :key="item">
            <SiteLink to="/">{{ item }}</SiteLink>
          </li>
        </ul>
      </div>

      <div class="grid content-start gap-4">
        <p class="text-body text-xl font-bold">شبکه‌های اجتماعی</p>
        <ul class="text-body grid justify-items-start gap-2 text-[13px]">
          <li v-for="social in socials" :key="social.label">
            <SiteLink to="/">
              <AppIcon :name="social.icon" :size="24" class="text-brand" />
              {{ social.label }}
            </SiteLink>
          </li>
        </ul>
      </div>
    </div>

    <div class="bg-sunken">
      <div
        class="text-label mx-auto grid max-w-340 justify-items-center gap-6 px-4 py-8 text-center text-[13px] lg:px-10"
      >
        <p>
          تمامی حقوق مادی و معنوی این وبسایت متعلق به آن می‌باشد و هر گونه کپی‌برداری پیگرد قانونی
          دارد.
        </p>
        <ul class="flex items-center gap-4">
          <li v-for="social in bottomSocials" :key="social.label">
            <NuxtLink
              to="/"
              :aria-label="social.label"
              :aria-current="undefined"
              class="text-brand focus-visible:outline-brand block transition duration-200 hover:-translate-y-0.5 hover:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-2 motion-reduce:transition-none"
            >
              <AppIcon :name="social.icon" :size="24" />
            </NuxtLink>
          </li>
        </ul>
      </div>
    </div>
  </footer>
</template>
