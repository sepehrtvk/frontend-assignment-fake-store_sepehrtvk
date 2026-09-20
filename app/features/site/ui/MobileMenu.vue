<script setup lang="ts">
import AppDialog from '~/shared/ui/AppDialog.vue'
import AppIcon from '~/shared/ui/AppIcon.vue'
import IconButton from '~/shared/ui/IconButton.vue'
import { navLinks } from './site.nav'

const open = defineModel<boolean>('open', { required: true })
</script>

<template>
  <AppDialog v-model:open="open" label="فهرست اصلی" class="bg-surface w-full rounded-b-[32px]">
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
      <ul class="grid gap-1 p-4">
        <li v-for="link in navLinks" :key="link.label">
          <NuxtLink
            v-if="link.to"
            :to="link.to"
            class="text-body hover:bg-sunken flex items-center gap-3 rounded-[12px] p-3 text-sm font-bold"
            active-class="text-brand"
          >
            <AppIcon :name="link.icon" />
            {{ link.label }}
          </NuxtLink>
          <span v-else class="text-muted flex items-center gap-3 p-3 text-sm">
            <AppIcon :name="link.icon" />
            {{ link.label }}
          </span>
        </li>
      </ul>
    </nav>
  </AppDialog>
</template>
