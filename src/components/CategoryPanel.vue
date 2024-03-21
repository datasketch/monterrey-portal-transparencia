<!-- eslint-disable vue/no-use-v-if-with-v-for -->

<script setup>
import BreadCrumbs from '@/components/BreadCrumbs.vue';
import CategoryFilters from '@/components/CategoryFilters.vue';
import { store } from '@/store';
import Accordion from '@/components/Accordion.vue';
import ReportCard from '@/components/ReportCard.vue';
</script>

<template>
  <div class="py-12">
    <div class="u-container">
      <BreadCrumbs />
      <div class="mt-8 md:mt-12 lg:mt-16">
        <div class="flex flex-col md:flex-row gap-y-8 gap-x-16">
          <div class="block w-full md:max-w-[347px]">
            <div class="bg-indigo-dye p-4 rounded-[5px]">
              <Accordion :key="category.id" v-for="category in store.getDataByCategory()" :items="category.children"
                :id="category.id" />
            </div>
          </div>
          <div class="w-full">
            <h2 class="text-2xl lg:text-3xl font-semibold first-letter:uppercase">
              {{ store.getCategory() }}
            </h2>
            <CategoryFilters v-if="store.getReports().length !== 0" class="mt-8" :has-categories="true" />
            <div class="mt-12">
              <div v-if="store.getReports().length !== 0" class="grid grid-cols-1 md:grid-cols-2 gap-5">
                <ReportCard :key="`report-${i + 1}`" v-for="(report, i) in store.filteredReports(true)"
                  :report="report" />
              </div>
              <p class="text-xs" v-else>
                Da clic en alguna de las opciones de la izquierda, para ver los
                reportes asociados.
              </p>
              <p v-if="store.filteredReports().length === 0" class="text-xs">
                No se encontraron reportes con <b>{{ store.getSearch() }}</b>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
