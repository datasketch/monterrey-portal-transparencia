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
            <div class="my-6 space-y-4" v-if="label === 'Obligaciones de transparencia'">
              <p>
                En atención al Acuerdo de Instalación de la Unidad de Transparencia y Comité de Transparencia de la
                Administración Pública Centralizada del Municipio de Monterrey, se hace de su conocimiento que a partir
                del 01 de febrero de 2022 comenzó en operaciones la Unidad de Transparencia de la Administración Pública
                Centralizada, con ello la difusión de la información será más sencilla para la ciudadanía de acuerdo con
                sus facultades, atribuciones y funciones, la información de los siguientes temas, documentos y
                políticas.
              </p>
              <p>
                Consulta la información generada durante el periodo 2015 a enero 2022, por las extintas unidades de
                transparencia de las dependencias del municipio de monterrey, en <a class="text-indigo-dye underline"
                  href="https://www.monterrey.gob.mx/transparencia/Oficial/Index_InformacionPublica.asp"
                  target="_blank">Información
                  histórica</a>.
              </p>
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
    }
  }
}
</script>
