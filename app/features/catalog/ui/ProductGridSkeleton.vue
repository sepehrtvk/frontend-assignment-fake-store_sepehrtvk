<template>
  <div role="status" aria-busy="true">
    <span class="sr-only">در حال دریافت محصولات</span>
    <ul class="grid gap-x-4 gap-y-6 sm:grid-cols-2 lg:grid-cols-3" aria-hidden="true">
      <li
        v-for="n in 6"
        :key="n"
        class="border-line bg-surface rounded-card grid gap-3 border p-2 pb-4"
      >
        <div
          class="bg-sunken rounded-chip aspect-[247/170] animate-pulse motion-reduce:animate-none"
        ></div>
        <div class="bg-sunken mx-2 h-4 animate-pulse rounded motion-reduce:animate-none"></div>
        <div
          class="bg-sunken rounded-chip mx-2 h-10 animate-pulse motion-reduce:animate-none"
        ></div>
      </li>
    </ul>
  </div>
</template>
