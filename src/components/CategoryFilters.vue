<script setup>
import { store } from '@/store';
import { ref } from 'vue';
const searchValue = ref('');

defineProps({
  hasCategories: {
    type: Boolean,
    default: false,
    required: false,
  },
});
</script>

<template>
  <div class="flex flex-col md:flex-row gap-5">
    <div class="md:w-11/12">
      <input
        @input="
          (e) =>
            e.target.value === ''
              ? store.resetSearch()
              : (searchValue = e.target.value)
        "
        @keydown="(e) => e.key === 'Enter' && store.setSearch(searchValue)"
        class="w-full border border-eerie-black/15 focus:outline-none py-1.5 px-3.5 rounded-[5px] disabled:cursor-not-allowed"
        type="text"
        placeholder="Palabra clave"
      />
    </div>
    <div class="md:w-1/12">
      <button
        @click="() => store.setSearch(searchValue)"
        class="bg-indigo-dye rounded-[5px] py-4 md:py-0 w-full h-full grid place-items-center disabled:cursor-not-allowed"
      >
        <img src="/images/icons/arrow-right.svg" alt="arrow right icon" />
      </button>
    </div>
  </div>
</template>
