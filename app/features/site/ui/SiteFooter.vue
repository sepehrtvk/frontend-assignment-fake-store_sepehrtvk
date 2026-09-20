<script setup lang="ts">
import AppIcon from '~/shared/ui/AppIcon.vue'
import type { IconName } from '~/shared/ui/icons'

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

const bottomSocials: IconName[] = ['telegram', 'instagram', 'twitter', 'youtube', 'linkedin']
</script>

<template>
  <footer class="bg-surface mt-12 rounded-t-[32px]">
    <div
      class="mx-auto grid max-w-[1360px] gap-10 px-4 py-12 lg:grid-cols-[1fr_auto_auto_auto] lg:px-10"
    >
      <p class="text-label text-[13px] lg:order-last">
        هفت روز هفته از ۸ صبح تا ۱۲ شب پاسخگو هستیم
      </p>

      <div v-for="column in columns" :key="column.title" class="grid content-start gap-4">
        <p class="text-body text-xl font-bold">{{ column.title }}</p>
        <ul class="text-body grid gap-2">
          <li v-for="item in column.items" :key="item" class="text-[13px]">{{ item }}</li>
        </ul>
      </div>

      <div class="grid content-start gap-4">
        <p class="text-body text-xl font-bold">شبکه‌های اجتماعی</p>
        <ul class="text-body grid gap-2">
          <li
            v-for="social in socials"
            :key="social.label"
            class="flex items-center gap-2 text-[13px]"
          >
            <AppIcon :name="social.icon" :size="24" class="text-brand" />
            {{ social.label }}
          </li>
        </ul>
      </div>
    </div>

    <div class="bg-sunken">
      <div
        class="text-label mx-auto grid max-w-[1360px] justify-items-center gap-6 px-4 py-8 text-center text-[13px] lg:px-10"
      >
        <p>
          تمامی حقوق مادی و معنوی این وبسایت متعلق به آن می‌باشد و هر گونه کپی‌برداری پیگرد قانونی
          دارد.
        </p>
        <ul class="flex items-center gap-4">
          <li v-for="icon in bottomSocials" :key="icon" class="text-brand">
            <AppIcon :name="icon" :size="24" />
          </li>
        </ul>
      </div>
    </div>
  </footer>
</template>
