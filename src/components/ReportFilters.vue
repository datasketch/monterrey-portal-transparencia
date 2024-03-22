<template>
  <div class="flex flex-col md:flex-row gap-5">
    <div class="md:w-11/12">
      <input @input="inputHanlerChange" @keydown="(e) => e.code === 'Enter' && getSearch(this.search)"
        class="w-full border border-eerie-black/15 focus:outline-none py-1.5 px-3.5 rounded-[5px] disabled:cursor-not-allowed"
        type="text" placeholder="Palabra clave" />
    </div>
    <div class="md:w-1/12">
      <button :class="!this.search && 'bg-opacity-60'" :disabled="!this.search" @click="getSearch(this.search)"
        class="bg-indigo-dye rounded-[5px] py-4 md:py-0 w-full h-full grid place-items-center disabled:cursor-not-allowed">
        <img src="/images/icons/arrow-right.svg" alt="arrow right icon" />
      </button>
    </div>
  </div>
</template>
<script>
import { ref } from 'vue';

export default {
  setup() {
    const search = ref('')
    return {
      search
    }
  },
  emits: ['click'],
  methods: {
    getSearch(str) {
      this.$emit('click', str)
    },
    inputHanlerChange(e) {
      const value = e.target.value
      if (value !== '') {
        this.search = value
      } else {
        this.search = ''
        this.getSearch(this.search)
      }
    }
  }
}
</script>