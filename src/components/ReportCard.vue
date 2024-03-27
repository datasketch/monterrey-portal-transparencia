<script setup>
import { ref } from 'vue'
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from '@headlessui/vue'
import { LinkIcon, XMarkIcon } from '@heroicons/vue/24/solid';

defineProps({
  report: {
    type: Object,
    required: true
  }
});

const isOpen = ref(false)

function closeModal() {
  isOpen.value = false
}
function openModal() {
  isOpen.value = true
}
</script>
<template>
  <div class="bg-white p-5 border border-eerie-black/15 rounded-[5px]">
    <h3 v-if="report.title" class="font-medium line-clamp-1">
      {{ report.title }}
    </h3>
    <p class="mt-2 line-clamp-3" v-if="report.description && (report.description !== report.title)">{{
      report.description
    }}</p>
    <p v-if="report.start_year" class="mt-6 text-[13px]">
      {{ report.start_year }}
    </p>
    <p v-if="report.start_month" class="text-[13px]">
      {{ report.start_month }}
    </p>
    <div class="mt-3 flex justify-between">
      <div>
        <button class="text-indigo-dye font-medium text-sm" @click="openModal">Leer más</button>
      </div>
      <div v-if="report.link">
        <a class="inline-flex items-center gap-x-2 text-sm" :href="report.link" target="_blank">
          <p class="text-indigo-dye font-medium">Descargar</p>
          <img src="/images/icons/download.svg" alt="download icon" />
        </a>
      </div>
      <div v-if="report.external_link_name && report.external_link">
        <a class="inline-flex items-center gap-x-2 text-sm" :href="report.external_link" target="_blank">
          <p class="text-indigo-dye font-medium">Enlace externo</p>
          <LinkIcon class="h-4 text-indigo-dye" />
        </a>
      </div>
    </div>
  </div>
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" @close="closeModal" class="relative z-10">
      <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0" enter-to="opacity-100"
        leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 bg-black/25" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div class="flex min-h-full items-center justify-center p-4 text-center">
          <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100" leave="duration-200 ease-in" leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95">
            <DialogPanel
              class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
              <div class="flex items-center justify-between">
                <DialogTitle as="h3" class="text-lg font-medium leading-6 text-gray-900">
                  {{ report.title }}
                </DialogTitle>
                <button type="button" @click="closeModal">
                  <XMarkIcon class="h-6" />
                </button>
              </div>
              <div class="mt-4 space-y-2">
                <p v-if="report.conservation_of_information">Conservación de la información: {{
      report.conservation_of_information }}</p>
                <p v-if="report.periodicity_of_information">Periodicidad de la información: {{
      report.periodicity_of_information }}</p>
                <p v-if="report.start_year">Año de inicio: {{ report.start_year }}</p>
                <p v-if="report.end_year">Año de finalización: {{ report.end_year }}</p>
                <p v-if="report.start_month">Mes de inicio: {{ report.start_month }}</p>
                <p v-if="report.end_month">Mes de finalización: {{ report.end_month }}</p>
                <p v-if="report.start_quarter">Trimestre de inicio: {{ report.start_quarter }}</p>
                <p v-if="report.end_quarter">Trimestre de finalización: {{ report.end_quarter }}</p>
                <p v-if="report.bimester">Bimestre: {{ report.bimester }}</p>
                <p v-if="report.biweekly">Quincena: {{ report.biweekly }}</p>
                <p v-if="report.date">Fecha: {{ report.date }}</p>
                <p v-if="report.responsible">Responsable: {{ report.responsible }}</p>
                <p v-if="report.record_number">Número de acta: {{ report.record_number }}</p>
                <p v-if="report.session_number">Número de sesion: {{ report.session_number }}</p>
                <a v-if="report.external_link_name && report.external_link" :href="report.external_link">Enlace externo:
                  {{
      report.external_link_name }}</a>
                <p v-if="report.observation">Observación: {{ report.observation }}</p>
                <p v-if="report.errata">Fé de erratas: {{ report.errata }}</p>
                <p v-if="report.assistence_type">Tipo de asistencia: {{ report.assistence_type }}</p>
                <a v-if="report.name_of_the_public_citizen_consultation && report.link_of_the_public_citizen_consultation"
                  :href="report.link_of_the_public_citizen_consultation">Nombre de la consulta ciudadana pública: {{
      report.name_of_the_public_citizen_consultation }}</a>
                <p v-if="report.gazette_type">Tipo de gaceta: {{ report.gazette_type }}</p>
                <p v-if="report.gazette_number">Número de gaceta: {{ report.gazette_number }}</p>
                <p v-if="report.section_number">Número de sesion: {{ report.section_number }}</p>
                <p v-if="report.district">Distrito: {{ report.district }}</p>
                <p v-if="report.plan_or_program">Plan o programa: {{ report.plan_or_program }}</p>
                <p v-if="report.norm">Norma: {{ report.norm }}</p>
                <p v-if="report.topic">Topic: {{ report.topic }}</p>
                <p v-if="report.document_format">Documento formato: {{ report.document_format[0] }}</p>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
