<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { RouterLink } from "vue-router";
</script>

<template>
  <header>
    <div class="py-4">
      <div class="u-container">
        <div class="flex items-center justify-between">
          <RouterLink to="/">
            <img class="w-full" src="/images/logo.svg" alt="logo" />
          </RouterLink>
          <div class="flex items-center gap-x-5">
            <button>
              <img src="/images/icons/search.svg" alt="search icon" />
            </button>
            <button>
              <img src="/images/icons/rubik.svg" alt="rubik icon" />
            </button>
            <button>
              <img src="/images/icons/account.svg" alt="account icon" />
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="bg-indigo-dye py-4 lg:py-6">
      <div class="u-container">
        <nav>
          <ul class="flex items-center justify-end gap-x-8">
            <li>
              <RouterLink
                class="text-white font-medium text-sm md:text-base"
                to="/"
                >Inicio</RouterLink
              >
            </li>
            <li>
              <RouterLink
                class="text-white font-medium text-sm md:text-base"
                to="/"
                >Gobierno</RouterLink
              >
            </li>
            <li>
              <RouterLink
                class="text-white font-medium text-sm md:text-base"
                to="/"
                >Tramites y servicios</RouterLink
              >
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </header>
</template>
