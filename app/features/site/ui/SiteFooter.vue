<script setup lang="ts">
import enamad from '~/assets/images/enamad.png'
import samandehi from '~/assets/images/samandehi.png'
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

const badges = [
  { src: samandehi, alt: 'نشان ملی ثبت رسانه‌های دیجیتال', height: 'h-13' },
  { src: enamad, alt: 'نماد اعتماد الکترونیکی', height: 'h-14.5' },
]
</script>

<template>
  <footer class="bg-surface mt-12 rounded-t-4xl">
    <div
      class="mx-auto grid max-w-318 grid-cols-2 gap-x-6 gap-y-10 px-4 pt-10 pb-11 lg:flex lg:justify-between lg:px-20 lg:pe-29"
    >
      <p class="text-label hidden text-[13px] leading-6 font-medium lg:block lg:self-end lg:pb-4">
        هفت روز هفته از ۸ صبح تا ۱۲ شب پاسخگو هستیم
      </p>

      <div v-for="column in columns" :key="column.title" class="grid content-start gap-6">
        <p class="text-body text-xl leading-6 font-bold">{{ column.title }}</p>
        <ul class="text-body grid justify-items-start gap-3 text-[13px] leading-6 font-medium">
          <li v-for="item in column.items" :key="item">
            <SiteLink to="/">{{ item }}</SiteLink>
          </li>
        </ul>
      </div>

      <div class="grid content-start gap-6">
        <p class="text-body text-xl leading-6 font-bold">شبکه‌های اجتماعی</p>
        <ul class="text-body grid justify-items-start gap-4 text-sm leading-6 font-medium">
          <li v-for="social in socials" :key="social.label">
            <SiteLink to="/" class="gap-3">
              <AppIcon :name="social.icon" :size="24" class="text-brand" />
              {{ social.label }}
            </SiteLink>
          </li>
        </ul>
      </div>
    </div>

    <div class="bg-sunken">
      <div
        class="mx-auto grid max-w-318 justify-items-center gap-6 px-4 py-8 lg:grid-cols-[1fr_auto_1fr] lg:items-start lg:px-20 lg:pt-9 lg:pb-6"
      >
        <div class="grid justify-items-center gap-4 lg:col-start-2">
          <p class="text-label max-w-80 text-center text-[13px] leading-6">
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

        <ul class="flex items-center gap-4 lg:col-start-3 lg:justify-self-end">
          <li
            v-for="badge in badges"
            :key="badge.alt"
            class="bg-surface rounded-badge grid size-18 place-items-center"
          >
            <img
              :src="badge.src"
              :alt="badge.alt"
              :class="badge.height"
              class="w-auto"
              loading="lazy"
            />
          </li>
        </ul>
      </div>
    </div>
  </footer>
</template>
