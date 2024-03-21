<script setup>
import CategoryButton from '@/components/CategoryButton.vue';
import CategoryFilters from '@/components/CategoryFilters.vue';
import { store } from '@/store';
import CategoryPanel from '@/components/CategoryPanel.vue';
import ReportCard from '@/components/ReportCard.vue';
import { watch } from 'vue';

// effects
watch(store, (newStore) => {
  console.log(newStore);
  if (newStore.getCategory()) {
    window.scrollTo({
      top: '155',
      left: '0',
      behavior: 'smooth',
    });
  }
});
</script>

<template>
  <div v-if="!store.getCategory()">
    <div class="pt-12 lg:pt-16 xl:pt-20">
      <div class="u-container">
        <div class="flex flex-col gap-y-8 md:flex-row md:gap-x-12 md:items-center lg:gap-x-16 xl:gap-x-24">
          <div class="md:w-1/2">
            <h1 class="font-bold text-4xl lg:text-5xl">Transparencia</h1>
            <p class="mt-7 font-light">
              El Municipio de Monterrey, en cumplimiento a la Ley de
              Transparencia y Acceso a la Información Pública, pone a
              disposición del público en general, de acuerdo con sus facultades,
              atribuciones y funciones, la información de los siguientes temas,
              documentos y políticas.
            </p>
          </div>
          <div class="md:w-1/2">
            <img src="/images/home/banner.jpg" alt="banner" />
          </div>
        </div>
      </div>
    </div>
    <div class="pt-12">
      <div class="u-container">
        <div class="bg-white py-6 px-10 rounded-[5px] u-shadow">
          <h4 class="font-bold text-[13px]">Filtros</h4>
          <CategoryFilters class="mt-4" :has-categories="false" />
        </div>
      </div>
    </div>
    <div v-if="!store.getSearch()" class="py-12 lg:py-16 xl:py-20">
      <div class="u-container">
        <p class="font-light">
          Con el firme compromiso de mantenerla actualizada en este micrositio
          de Transparencia del Portal Oficial de Internet y a través de la
          Plataforma Nacional de Transparencia, en el siguiente enlace
          electrónico
          <a class="font-medium text-indigo-dye" href="https://www.plataformadetransparencia.org.mx/"
            target="_blank">Plataforma Nacional de Transparencia.</a>
        </p>
        <div class="mt-12">
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <CategoryButton v-for="{ id, src_image, label, link } in store.getStructureData()" :key="id"
              :icon-src="src_image" id="inicio" :label="label" :link="link" />
          </div>
        </div>
      </div>
    </div>
    <div v-if="!store.getSearch()" class="py-12 lg:py-16 xl:py-20 bg-carolina-blue bg-opacity-[5.35%]">
      <div class="u-container">
        <div class="flex flex-col gap-y-8 md:flex-row md:items-center md:gap-x-12 lg:gap-x-16 xl:gap-x-20">
          <div class="md:w-4/12">
            <img src="/images/home/information-access.jpg" alt="information access" />
          </div>
          <div class="md:w-8/12">
            <h2 class="font-semibold text-xl lg:text-2xl">
              El acceso a la información es tu derecho
            </h2>
            <ul class="mt-6 space-y-5">
              <li class="flex items-start gap-x-2.5">
                <img class="translate-y-2" src="/images/icons/check.svg" alt="check icon" />
                <p class="font-light">
                  Acude o contacta a la Unidad de Transparencia del Municipio de
                  Monterrey de tu interés
                  <a class="inline-block text-indigo-dye font-semibold"
                    href="https://www.monterrey.gob.mx/transparencia/Oficial/conoce_tu_enlace.asp"
                    target="_blank">(consulta el directorio)</a>, en ellas tenemos a disposición equipos de cómputo para
                  la
                  consulta de información y presentación de solicitudes, además
                  podrán apoyar en tu consulta.
                </p>
              </li>
              <li class="flex items-start gap-x-2.5">
                <img class="translate-y-2" src="/images/icons/check.svg" alt="check icon" />
                <p class="font-light">
                  Si detectas omisiones en la información que deba estar
                  publicada conforme a la
                  <a class="text-indigo-dye font-semibold"
                    href="http://www.hcnl.gob.mx/trabajo_legislativo/leyes/leyes/ley_de_transparencia_y_acceso_a_la_informacion_publica_del_estado_de_nuevo_leon/"
                    target="_blank">Ley de Transparencia</a>
                  repórtalas al correo
                  <a class="text-indigo-dye font-semibold underline"
                    href="mailto:transparencia.soporte@monterrey.gob.mx">transparencia.soporte@monterrey.gob.mx</a>
                  para subsanarlas a la brevedad.
                </p>
              </li>
              <li class="flex items-start gap-x-2.5">
                <img class="translate-y-2" src="/images/icons/check.svg" alt="check icon" />
                <p class="font-light">
                  Si deseas presentar una denuncia por Incumplimiento a las
                  Obligaciones de Transparencia ante el
                  <a class="text-indigo-dye font-semibold" href="https://infonl.mx/" target="_blank">Instituto Estatal
                    de Transparencia, Acceso a la Información
                    y Protección de Datos Personales (antes COTAI)”</a>. consulta los
                  <a class="text-indigo-dye font-semibold"
                    href="https://infonl.mx/acceso-a-la-informacion/denuncia-por-incumplimiento/"
                    target="_blank">requisitos y procedimiento</a>
                  para llevarla a cabo. Esto con fundamento en los artículos
                  cuarto fracción II y décimo primero fracción V de
                  <a class="text-indigo-dye font-semibold"
                    href="https://www.cotai.org.mx/descargas/mn/Lineamientos%20Tecnicos%20generales%202021.pdf"
                    target="_blank">Lineamientos técnicos para la publicación, homologación y
                    estandarización de la información de las obligaciones
                    establecidas en el Título Quinto de la Ley de Transparencia
                    y Acceso a la Información Pública del Estado de Nuevo León,
                    que deben de difundir los sujetos obligados del Estado de
                    Nuevo León en los portales de internet y en la Plataforma
                    Nacional de Transparencia.</a>
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div v-if="!store.getSearch()" class="py-12 bg-white-2">
      <div class="u-container">
        <div class="flex flex-wrap justify-center xl:flex-nowrap gap-5">
          <div class="xl:w-1/6 max-w-[184px] h-[100px]">
            <a class="grid place-items-center p-5 bg-white h-full rounded-[10px] u-shadow" href="/">
              <img src="/images/home/logo-plataforma-nacional-de-transparencia.svg"
                alt="logo plataforma nacional de transparencia" />
            </a>
          </div>
          <div class="xl:w-1/6 max-w-[184px] h-[100px]">
            <a class="grid place-items-center p-5 bg-white h-full rounded-[10px] u-shadow" href="/">
              <img src="/images/home/logo-datos-personales-derechos-arco.svg"
                alt="logo datos personales derechos arco" />
            </a>
          </div>
          <div class="xl:w-1/6 max-w-[184px] h-[100px]">
            <a class="grid place-items-center p-5 bg-white h-full rounded-[10px] u-shadow" href="/">
              <img src="/images/home/logo-transparencia-ante-la-contingencia.svg"
                alt="logo transparencia ante la contingencia" />
            </a>
          </div>
          <div class="xl:w-1/6 max-w-[184px] h-[100px]">
            <a class="grid place-items-center p-5 bg-white h-full rounded-[10px] u-shadow" href="/">
              <img src="/images/home/logo-consejo-municipal-monterrey.svg" alt="logo consejo municipal monterrey" />
            </a>
          </div>
          <div class="xl:w-1/6 max-w-[184px] h-[100px]">
            <a class="grid place-items-center p-5 bg-white h-full rounded-[10px] u-shadow" href="/">
              <img src="/images/home/logo-consejo-ciudadano-monterrey.svg" alt="logo consejo ciudadano monterrey" />
            </a>
          </div>
          <div class="xl:w-1/6 max-w-[184px] h-[100px]">
            <a class="grid place-items-center p-5 bg-white h-full rounded-[10px] u-shadow" href="/">
              <img src="/images/home/logo-aviso-de-privacidad.svg" alt="logo aviso de privacidad" />
            </a>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="py-12 lg:py-16 xl:py-20">
      <div class="u-container">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <ReportCard :key="`report-${i + 1}`" v-for="(report, i) in store.filteredReports(false).slice(0, 9)"
            :report="report" />
        </div>
        <p v-if="store.filteredReports().length === 0" class="text-xs">
          No se encontraron reportes con <b>{{ store.getSearch() }}</b>
        </p>
      </div>
    </div>
  </div>
  <CategoryPanel v-else />
</template>
