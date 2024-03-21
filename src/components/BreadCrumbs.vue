<script setup>
import { store } from "@/store";

function breadcrumbsHandlerClick({ id, label }) {
  if (label === "Inicio") {
    store.reset();
  } else {
    console.log(id);
    console.log(label);
  }
}
</script>
<template>
  <ul class="flex items-center gap-x-2 overflow-y-scroll u-no-scroll">
    <li
      class="text-[13px] font-medium flex-shrink-0"
      v-bind:key="index"
      v-for="({ id, label }, index) in store.getBreadcrumbs()"
    >
      <div
        class="flex items-center gap-x-2"
        v-if="index + 1 !== store.getBreadcrumbs().length"
      >
        <button
          class="text-eerie-black/40 first-letter:uppercase flex-shrink-0"
          @click="breadcrumbsHandlerClick({ id, label })"
        >
          {{ label }}
        </button>
        <img src="/images/icons/chevron-right.svg" alt="chevron right" />
      </div>
      <p v-else class="first-letter:uppercase">
        {{ label }}
      </p>
    </li>
  </ul>
</template>
