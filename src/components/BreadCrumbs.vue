<script setup>
import { store } from "@/store";

function breadcrumbsHandlerClick(value) {
  if (value === "Inicio") {
    // reset states
    store.reset();
  } else {
    // change category and breadcrumbs states
  }
}
</script>
<template>
  <ul class="flex items-center gap-x-2">
    <li
      class="text-[13px] font-medium"
      v-bind:key="index"
      v-for="(breadcrumb, index) in store.getBreadcrumbs()"
    >
      <div
        class="flex items-center gap-x-2"
        v-if="index + 1 !== store.getBreadcrumbs().length"
      >
        <button
          class="text-eerie-black/40 first-letter:uppercase"
          @click="breadcrumbsHandlerClick(breadcrumb)"
        >
          {{ breadcrumb }}
        </button>
        <img src="/images/icons/chevron-right.svg" alt="chevron right" />
      </div>
      <p v-else class="first-letter:uppercase">
        {{ breadcrumb }}
      </p>
    </li>
  </ul>
</template>
