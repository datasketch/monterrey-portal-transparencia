<template>
  <div class="flex flex-col md:flex-row gap-5">
    <div class="md:w-7/12">
      <input
        class="w-full border border-eerie-black/15 focus:outline-none py-1.5 px-3.5 rounded-[5px]"
        type="text"
        placeholder="Palabra clave"
      />
    </div>
    <div class="md:w-2/12">
      <select
        class="w-full border border-eerie-black/15 focus:outline-none py-1.5 px-3.5 rounded-[5px] text-eerie-black/60"
        name="year"
        id="year"
      >
        <option selected value="">Año</option>
      </select>
    </div>
    <div class="md:w-2/12">
      <select
        class="w-full border border-eerie-black/15 focus:outline-none py-1.5 px-3.5 rounded-[5px] text-eerie-black/60"
        name="tag"
        id="tag"
      >
        <option selected value="">Tag</option>
      </select>
    </div>
    <div class="md:w-1/12">
      <button
        class="bg-indigo-dye rounded-[5px] py-4 md:py-0 w-full h-full grid place-items-center"
      >
        <img src="/images/icons/arrow-right.svg" alt="arrow right icon" />
      </button>
    </div>
  </div>
</template>
