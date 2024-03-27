<template>
  <div :key="$route.fullPath" class="py-12">
    <div class="u-container">
      <BreadCrumbs :items="breadcrumb" />
      <div class="mt-8 md:mt-12 lg:mt-16">
        <div class="flex flex-col md:flex-row gap-y-8 gap-x-16">
          <div v-if="reports.length === 0" class="block w-full md:max-w-[347px]">
            <div class="bg-indigo-dye p-4 rounded-[5px]">
              <CategoryNavigation :items="navigation" />
            </div>
          </div>
          <div class="w-full">
            <h2 class="text-2xl lg:text-3xl font-semibold first-letter:uppercase">
              {{ label }}
            </h2>
            <div class="my-6 space-y-4" v-if="description">
              {{ description }}
            </div>
            <div v-if="reports.length > 0" class="mt-6">
              <ReportFilters @click="handleGetSearch" />
              <div class="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <ReportCard v-for="(report, i) in filteredReports" :key="`report-${i + 1}`" :report="report" />
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
import ReportFilters from '@/components/ReportFilters.vue';
import { ref } from 'vue';
import _ from 'lodash'

export default {
  components: { BreadCrumbs, CategoryNavigation, ReportCard, ReportFilters },
  setup() {
    const search = ref('')
    return {
      search
    }
  },
  props: {
    id: {
      type: String,
      required: true
    },
    label: {
      type: String
    },
    description: {
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
  },
  computed: {
    filteredReports() {
      return _.orderBy(this.reports, ['start_year', 'title'], ['desc', 'asc']).filter((report) => report?.title?.toLowerCase().includes(this?.search?.toLowerCase()) || report?.description?.toLowerCase().includes(this?.search?.toLowerCase()))
    },
    navigation() {
      return _.orderBy(this.items, ['order', 'label'], ['asc', 'asc'])
    }
  },
  methods: {
    handleGetSearch(str) {
      this.search = str
    },
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth' // Optional: smooth scrolling animation
      });
    }
  },
  mounted() {
    this.scrollToTop();
  }
}
</script>
