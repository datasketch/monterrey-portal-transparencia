<script setup>
import { store } from "@/store";

defineProps({
  iconSrc: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
});

function categoryHandlerClick(event) {
  const buttonElement = event.target.closest("button");
  const id = buttonElement.getAttribute("data-id");
  store.setCategory(id);
  store.setBreadcrumbs(id);
}
</script>

<template>
  <button
    class="bg-white text-left p-4 rounded-[10px] u-shadow-2 hover:bg-indigo-dye hover:text-white duration-300"
    :data-id="label"
    @click="categoryHandlerClick"
  >
    <div class="flex items-center gap-x-4">
      <div class="flex-shrink-0">
        <div
          class="w-10 h-10 bg-indigo-dye rounded-[10px] grid place-items-center"
        >
          <img :src="iconSrc" :alt="label + ' image'" />
        </div>
      </div>
      <div>
        <p class="leading-tight">
          {{ label }}
        </p>
      </div>
    </div>
  </button>
</template>
