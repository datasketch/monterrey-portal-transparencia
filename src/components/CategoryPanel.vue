<!-- eslint-disable vue/no-use-v-if-with-v-for -->

<script setup>
import BreadCrumbs from "@/components/BreadCrumbs.vue";
import CategoryFilters from "@/components/CategoryFilters.vue";
import { store } from "@/store";
import CategoryCard from "@/components/CategoryCard.vue";
import Accordion from "@/components/Accordion.vue";
</script>

<template>
  <div class="py-12">
    <div class="u-container">
      <BreadCrumbs />
      <div class="mt-8 md:mt-12 lg:mt-16">
        <div class="flex gap-x-16">
          <div class="hidden lg:block lg:w-full lg:max-w-[347px]">
            <div class="bg-indigo-dye p-4 rounded-[5px]">
              <Accordion :key="category.id" v-for="category in store.getDataByCategory()" :items="category.children" />
            </div>
          </div>
          <div class="w-full">
            <h2 class="text-2xl lg:text-3xl font-semibold first-letter:uppercase">
              {{ store.getCategory() }}
            </h2>
            <CategoryFilters class="mt-8" />
            <div class="mt-12">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
                <CategoryCard v-bind:key="n" v-for="n in 12" title="Pacto Internacional de Derechos Civiles y Políticos"
                  publication-date="12 de Octubre, 2023" :tags="['Tratados', 'Normatividad']" link="/" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>