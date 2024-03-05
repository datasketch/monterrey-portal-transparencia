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
  <ul class="flex items-center gap-x-2">
    <li
      class="text-[13px] font-medium"
      v-bind:key="index"
      v-for="({ id, label }, index) in store.getBreadcrumbs()"
    >
      <div
        class="flex items-center gap-x-2"
        v-if="index + 1 !== store.getBreadcrumbs().length"
      >
        <button
          class="text-eerie-black/40 first-letter:uppercase"
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
