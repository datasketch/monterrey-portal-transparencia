<template>
  <div :key="$route.fullPath" class="py-12">
    <div class="u-container">
      <BreadCrumbs :items="breadcrumb" />
      <div class="mt-8 md:mt-12 lg:mt-16">
        <div class="flex flex-col md:flex-row gap-y-8 gap-x-16">
          <div v-if="reports.length === 0" class="block w-full md:max-w-[347px]">
            <div class="bg-indigo-dye p-4 rounded-[5px]">
              <CategoryNavigation :items="items" />
            </div>
          </div>
          <div class="w-full">
            <h2 class="text-2xl lg:text-3xl font-semibold first-letter:uppercase">
              {{ label }}
            </h2>
            <div v-if="reports.length > 0" class="mt-12">
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <ReportCard v-for="(report, i) in reports" :key="`report-${i + 1}`" :report="report" />
              </div>
            </div>
            <p v-else class="mt-4 text-sm">
              Da clic en alguna de las opciones de la izquierda, para ver los
              reportes asociados.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BreadCrumbs from '@/components/BreadCrumbs.vue';
import CategoryNavigation from '@/components/CategoryNavigation.vue';
import ReportCard from '@/components/ReportCard.vue';

export default {
  components: { BreadCrumbs, CategoryNavigation, ReportCard },
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
    },
    reports: {
      type: Array
    }
  }
}
</script>
