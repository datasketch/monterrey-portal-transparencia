<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { RouterLink } from "vue-router";
</script>
<template>
  <footer class="bg-anti-flash-white">
    <div class="u-container">
      <div class="py-12 lg:py-16">
        <div
          class="flex flex-col lg:flex-row lg:justify-between gap-y-8 md:gap-y-12"
        >
          <div class="lg:w-5/12 flex-shrink-0">
            <div class="text-center lg:text-left">
              <RouterLink class="inline-block" to="/">
                <img src="/images/logo-footer.svg" alt="logo footer" />
              </RouterLink>
            </div>
          </div>
          <div
            class="lg:w-7/12 flex flex-col gap-y-8 md:flex-row md:gap-x-16 lg:gap-x-24 xl:gap-x-32"
          >
            <div class="md:w-1/2">
              <h4 class="font-bold text-[13px]">Contacto</h4>
              <p class="text-[13px] font-light mt-1">
                Palacio Municipal, Zaragoza S/N Col. Centro. C.P 64000
              </p>
              <div class="h-[0.5px] w-full bg-eerie-black/40 mt-3">&nbsp;</div>
              <div class="flex items-center gap-x-2 mt-4">
                <img src="/images/icons/phone.svg" alt="phone" />
                <p class="font-light text-[13px]">(81) 8130-6565</p>
              </div>
            </div>
            <div class="md:w-1/2">
              <h4 class="font-bold text-[13px]">Participa</h4>
              <p class="text-[13px] font-light mt-1">
                Envía tus comentarios y propuestas de mejora y visualización de
                la información.
              </p>
              <div class="h-[0.5px] w-full bg-eerie-black/40 mt-3">&nbsp;</div>
              <div class="flex items-center gap-x-2 mt-4">
                <a
                  class="inline-flex gap-x-2 items-center"
                  href="mailto:transparencia.soporte@monterrey.gob.mx"
                >
                  <img src="/images/icons/email.svg" alt="email" />
                  <p class="underline font-light text-[13px]">
                    transparencia.soporte@monterrey.gob.mx
                  </p>
                </a>
              </div>
              <ul class="mt-4 flex items-center gap-x-4">
                <li>
                  <a
                    class="inline-grid place-items-center w-8 h-8 border border-eerie-black rounded-full"
                    href="/"
                    target="_blank"
                  >
                    <img src="/images/icons/facebook.svg" alt="facebook icon" />
                  </a>
                </li>
                <li>
                  <a
                    class="inline-grid place-items-center w-8 h-8 border border-eerie-black rounded-full"
                    href="/"
                    target="_blank"
                  >
                    <img src="/images/icons/twitter.svg" alt="twitter icon" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="py-4 border-t border-t-eerie-black/40">
        <img
          class="mx-auto"
          src="/images/powered-by-datasketch.svg"
          alt="powered by datasketch"
        />
      </div>
    </div>
  </footer>
</template>
