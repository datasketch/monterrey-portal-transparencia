<!-- eslint-disable vue/multi-word-component-names -->

<script setup>
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/vue";
import { PlusIcon, MinusIcon } from "@heroicons/vue/24/solid";
import { ref, toRaw } from "vue";
import { store } from "@/store";

defineProps({
  id: {
    type: String,
    required: true,
  },
  items: {
    type: Array,
    required: false,
  },
  isSubcategory: {
    type: Boolean,
    default: false,
    required: false,
  },
});

const disclosure = ref([]);

function hideOther(id) {
  disclosure.value.filter((_, i) => i !== id).forEach((c) => c());
}

function accordionHandlerClick(idx, { id, label }, reports) {
  hideOther(idx);
  store.setBreadcrumbs({ id, label });
  if (toRaw(reports).length === 0) {
    store.resetReports();
  } else {
    store.setReports(reports);
  }
}
</script>

<template>
  <Disclosure
    :key="item.id"
    v-for="(item, idx) in items"
    v-slot="{ open, close }"
  >
    <DisclosureButton
      :ref="(_) => (disclosure[idx] = close)"
      class="flex items-center justify-between text-left p-2 w-full duration-300"
      :data-reports="item.reports"
      @click="
        () =>
          accordionHandlerClick(idx, { id, label: item.label }, item.reports)
      "
      :class="(open && 'bg-white') || (isSubcategory && 'bg-[#3D697D]')"
    >
      <p
        class="first-letter:uppercase duration-300"
        :class="open ? 'text-indigo-dye' : 'text-white'"
      >
        {{ item.label }}
      </p>
      <PlusIcon class="flex-shrink-0 h-6 w-6 text-white" v-show="!open" />
      <MinusIcon class="flex-shrink-0 h-6 w-6 text-indigo-dye" v-show="open" />
    </DisclosureButton>
    <DisclosurePanel>
      <Accordion
        :key="item.id"
        :items="item.children"
        :is-subcategory="true"
        :id="item.id"
      />
    </DisclosurePanel>
  </Disclosure>
</template>
