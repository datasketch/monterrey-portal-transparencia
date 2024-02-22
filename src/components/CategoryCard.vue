<script setup>
defineProps({
  iconSrc: String,
  label: String,
});
</script>

<template>
  <div
    class="bg-white p-4 rounded-[10px] u-shadow-2 hover:bg-indigo-dye hover:text-white duration-300"
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
  </div>
</template>
