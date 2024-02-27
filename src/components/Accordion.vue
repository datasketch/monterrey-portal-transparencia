<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/vue";
import { PlusIcon, MinusIcon } from "@heroicons/vue/24/solid";

defineProps({
  label: {
    type: String,
    required: true,
  },
  isChildren: {
    type: Boolean,
    default: false,
    required: false,
  },
});
</script>
<template>
  <Disclosure v-slot="{ open }">
    <DisclosureButton
      class="flex items-center justify-between p-2 w-full duration-300"
      :class="open && 'bg-white'"
    >
      <p class="duration-300" :class="open ? 'text-indigo-dye' : 'text-white'">
        {{ label }}
      </p>
      <PlusIcon class="h-6 w-6 text-white" v-show="!open" />
      <MinusIcon class="h-6 w-6 text-indigo-dye" v-show="open" />
    </DisclosureButton>
    <DisclosurePanel>
      <slot></slot>
    </DisclosurePanel>
  </Disclosure>
</template>
