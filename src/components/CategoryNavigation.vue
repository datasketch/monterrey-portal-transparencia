<template>
  <RouterLink class="flex items-center gap-x-2 justify-between text-left p-2 w-full duration-300"
    v-for="({ id, label, slug }) in items" :key="id" :to="slug">
    <p class="text-white">{{ label }}</p>
    <div class="flex-shrink-0">
      <ArrowRightIcon class="h-5 text-white" />
    </div>
  </RouterLink>
</template>

<script>
import { ArrowRightIcon } from "@heroicons/vue/24/solid";

export default {
  props: {
    items: {
      type: Array,
      required: false,
    }
  },
  components: { ArrowRightIcon }
}
</script>