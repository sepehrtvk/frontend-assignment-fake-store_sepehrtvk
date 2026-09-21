<script setup lang="ts">
import { ref, watch } from 'vue'
import AppIcon from '~/shared/ui/AppIcon.vue'
import IconButton from '~/shared/ui/IconButton.vue'
import MobileMenu from './MobileMenu.vue'
import SiteLink from './SiteLink.vue'
import { navLinks } from './site.nav'

const route = useRoute()
const menuOpen = ref(false)

watch(
  () => route.fullPath,
  () => {
    menuOpen.value = false
  },
)
</script>

<template>
  <header class="bg-surface rounded-b-[32px]">
    <div
      class="mx-auto flex h-18 max-w-[1360px] items-center justify-between gap-4 px-4 lg:h-30 lg:px-10"
    >
      <div class="flex items-center gap-4">
        <IconButton
          name="menu"
          label="باز کردن فهرست"
          :size="20"
          class="border-line text-brand size-10 rounded-[8px] border-[1.5px] lg:hidden"
          aria-haspopup="dialog"
          :aria-expanded="menuOpen"
          @click="menuOpen = true"
        />
        <NuxtLink
          to="/"
          :aria-current="undefined"
          class="text-title flex items-center gap-2 text-lg font-bold"
        >
          <AppIcon name="box" :size="24" class="text-brand" />
          فروشگاه
        </NuxtLink>
      </div>

      <nav class="hidden lg:block">
        <ul class="text-title flex items-center gap-8 text-[13px] font-medium">
          <li v-for="link in navLinks" :key="link.label">
            <SiteLink :to="link.to" :current="link.current">
              <AppIcon :name="link.icon" />
              {{ link.label }}
            </SiteLink>
          </li>
        </ul>
      </nav>

      <span
        class="border-line text-brand grid size-10 place-items-center rounded-[8px] border-[1.5px] lg:hidden"
      >
        <AppIcon name="phone" :size="20" />
      </span>
      <span
        class="bg-brand rounded-chip hidden items-center gap-2 px-4 py-3 text-sm font-bold text-white lg:flex"
      >
        <AppIcon name="phone" />
        تماس
      </span>
    </div>

    <MobileMenu v-model:open="menuOpen" />
  </header>
</template>
