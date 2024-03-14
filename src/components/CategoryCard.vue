<script setup>
defineProps({
  title: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
  publicationDate: {
    type: String,
    required: false,
  },
  month: {
    type: String,
    required: false,
  },
  year: {
    type: String,
    required: false,
  },
  link: {
    type: String,
    required: false,
  },
});
</script>
<template>
  <div class="bg-white p-5 border border-eerie-black/15 rounded-[5px]">
    <h3 v-if="title" class="font-medium">
      {{ title }}
    </h3>
    <p class="mt-2" v-if="description">{{ description }}</p>
    <p v-if="publicationDate" class="mt-6 text-[13px]">
      {{ publicationDate }}
    </p>
    <p class="mt-2" v-if="month">Mes: {{ month }}</p>
    <p v-if="year">Año: {{ year }}</p>
    <div class="mt-3 flex justify-end" v-if="link">
      <a class="inline-flex items-center gap-x-2" :href="link" target="_blank">
        <p class="text-indigo-dye font-medium">Descargar</p>
        <img src="/images/icons/download.svg" alt="download icon" />
      </a>
    </div>
  </div>
</template>
