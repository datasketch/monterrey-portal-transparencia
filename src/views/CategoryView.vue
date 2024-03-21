<template>
  <div :key="$route.fullPath" class="py-12">
    <div class="u-container">
      <BreadCrumbs :items="breadcrumb" />
      <div class="mt-8 md:mt-12 lg:mt-16">
        <div class="flex flex-col md:flex-row gap-y-8 gap-x-16">
          <div class="block w-full md:max-w-[347px]">
            <div class="bg-indigo-dye p-4 rounded-[5px]">
              <CategoryNavigation :items="items" />
            </div>
          </div>
          <div class="w-full">
            <h2 class="text-2xl lg:text-3xl font-semibold first-letter:uppercase">
              {{ label }}
            </h2>
            <div class="mt-12">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BreadCrumbs from '@/components/BreadCrumbs.vue';
import CategoryNavigation from '@/components/CategoryNavigation.vue';

export default {
  components: { BreadCrumbs, CategoryNavigation },
  props: {
    id: {
      type: String,
      required: true
    },
    label: {
      type: String
    },
    items: {
      type: Array,
      required: true
    },
    breadcrumb: {
      type: Array
    }
  },
  data() {
    return {
      categoryObj: this.$route.matched[this.$route.matched.length - 1],
      matches: this.$route.matched
    }
  }
}
</script>
