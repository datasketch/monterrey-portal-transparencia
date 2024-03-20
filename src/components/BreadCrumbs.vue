<template>
  <ul class="flex items-center gap-x-2 overflow-y-scroll u-no-scroll">
    <li class="text-[13px] font-medium flex-shrink-0">
      <RouterLink class="text-eerie-black/40 first-letter:uppercase flex-shrink-0" to="/">
        <div class="flex items-center gap-x-2">
          <RouterLink class="text-eerie-black/40 first-letter:uppercase flex-shrink-0" to="/">
            Inicio
          </RouterLink>
          <img src=" /images/icons/chevron-right.svg" alt="chevron right" />
        </div>
      </RouterLink>
    </li>
    <li class="text-[13px] font-medium flex-shrink-0" :key="index" v-for="({ path, name }, index) in items">
      <div class="flex items-center gap-x-2" v-if="index + 1 !== items.length">
        <RouterLink class="text-eerie-black/40 first-letter:uppercase flex-shrink-0" :to="path">
          {{ name }}
        </RouterLink>
        <img src=" /images/icons/chevron-right.svg" alt="chevron right" />
      </div>
      <p v-else class="first-letter:uppercase">
        {{ name }}
      </p>
    </li>
  </ul>
</template>
<script>
import { RouterLink } from 'vue-router';

export default {
  props: {
    items: {
      type: Array,
      required: true
    }
  }
}
</script>
