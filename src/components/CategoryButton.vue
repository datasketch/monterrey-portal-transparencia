<template>
  <RouterLink v-if="!link"
    class="bg-white text-left p-4 rounded-[10px] u-shadow-2 hover:bg-indigo-dye hover:text-white duration-300"
    :to="{ path: labelToSlug(label) }">
    <div class="flex items-center gap-x-4">
      <div class="flex-shrink-0">
        <div class="w-10 h-10 bg-indigo-dye rounded-[10px] grid place-items-center">
          <img :src="iconSrc" :alt="label + ' image'" />
        </div>
      </div>
      <div>
        <p class="leading-tight">
          {{ label }}
        </p>
      </div>
    </div>
  </RouterLink>
  <a class="block bg-white text-left p-4 rounded-[10px] u-shadow-2 hover:bg-indigo-dye hover:text-white duration-300"
    :href="link" target="_blank" v-else>
    <div class="flex items-center gap-x-4">
      <div class="flex-shrink-0">
        <div class="w-10 h-10 bg-indigo-dye rounded-[10px] grid place-items-center">
          <img :src="iconSrc" :alt="label + ' image'" />
        </div>
      </div>
      <div>
        <p class="leading-tight">
          {{ label }}
        </p>
      </div>
    </div>
  </a>
</template>
<script>
import slugify from 'slugify';

export default {
  props: {
    id: {
      type: String,
      required: true
    },
    iconSrc: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    link: {
      typeof: String,
      required: false,
    },
  },
  methods: {
    labelToSlug(str) {
      return slugify(str, { lower: true })
    }
  }
}
</script>
