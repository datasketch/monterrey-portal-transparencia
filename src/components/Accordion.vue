<!-- eslint-disable vue/multi-word-component-names -->

<script setup>
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/vue";
import { PlusIcon, MinusIcon } from "@heroicons/vue/24/solid";
import { ref } from "vue";
import { store } from "@/store";

defineProps({
  items: {
    type: Array,
    required: false
  },
  isSubcategory: {
    type: Boolean,
    default: false,
    required: false,
  }
})

const disclosure = ref([])

function hideOther(id) {
  disclosure.value.filter((_, i) => i !== id).forEach(c => c())
}

function accordionHandlerClick(event, idx) {
  const buttonElement = event.target.closest("button");
  const id = buttonElement.getAttribute("data-id");
  store.setBreadcrumbs(id)
  hideOther(idx)
}
</script>

<template>
  <Disclosure :key="item.id" v-for="(item, idx) in items" v-slot="{ open, close }">
    <DisclosureButton :ref="_ => (disclosure[idx] = close)"
      class="flex items-center justify-between text-left p-2 w-full duration-300"
      @click="(e) => accordionHandlerClick(e, idx)" :class="open && 'bg-white' || isSubcategory && 'bg-[#3D697D]'"
      :data-id="item.label">
      <p class="first-letter:uppercase duration-300" :class="open ? 'text-indigo-dye' : 'text-white'">
        {{ item.label }}
      </p>
      <PlusIcon class="flex-shrink-0 h-6 w-6 text-white" v-show="!open" />
      <MinusIcon class="flex-shrink-0 h-6 w-6 text-indigo-dye" v-show="open" />
    </DisclosureButton>
    <DisclosurePanel>
      <Accordion :key="item.id" :items="item.children" :is-subcategory="true" />
    </DisclosurePanel>
  </Disclosure>
</template>