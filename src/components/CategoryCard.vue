<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  publicationDate: {
    type: String,
    required: true,
  },
  tags: {
    type: Array,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
});
</script>
<template>
  <div class="bg-white p-5 border border-eerie-black/15 rounded-[5px]">
    <h3 class="font-medium">
      {{ title }}
    </h3>
    <p class="mt-6 text-[13px]">
      {{ publicationDate }}
    </p>
    <div class="mt-3 flex items-center justify-between">
      <ul class="flex items-center gap-x-1.5">
        <li
          v-bind:key="i"
          v-for="(tag, i) in tags"
          class="text-[10px] text-indigo-dye py-1 px-2 rounded-[10px] bg-indigo-dye/10"
        >
          {{ tag }}
        </li>
      </ul>
      <div>
        <a class="inline-flex items-center gap-x-2" href="/">
          <p class="text-indigo-dye font-medium">Descargar</p>
          <img src="/images/icons/download.svg" alt="download icon" />
        </a>
      </div>
    </div>
  </div>
</template>
