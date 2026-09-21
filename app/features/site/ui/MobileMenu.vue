<script setup lang="ts">
import AppDialog from '~/shared/ui/AppDialog.vue'
import AppIcon from '~/shared/ui/AppIcon.vue'
import IconButton from '~/shared/ui/IconButton.vue'
import SiteLink from './SiteLink.vue'
import { navLinks } from './site.nav'

const open = defineModel<boolean>('open', { required: true })
</script>

<template>
  <AppDialog
    v-model:open="open"
    label="فهرست اصلی"
    from="top"
    class="bg-surface mt-0 mb-auto w-full max-w-full rounded-b-[32px]"
  >
    <div class="border-line flex items-center justify-between border-b p-4">
      <span class="text-title font-bold">فهرست</span>
      <IconButton
        name="close"
        label="بستن فهرست"
        :size="20"
        class="text-muted"
        @click="open = false"
      />
    </div>

    <nav>
      <ul class="text-body grid gap-1 p-4 text-sm font-bold">
        <li v-for="link in navLinks" :key="link.label" class="p-3">
          <SiteLink :to="link.to" :current="link.current" @click="open = false">
            <AppIcon :name="link.icon" />
            {{ link.label }}
          </SiteLink>
        </li>
      </ul>
    </nav>
  </AppDialog>
</template>
