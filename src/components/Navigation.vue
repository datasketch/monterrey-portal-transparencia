<template>
    <RouterLink class="flex items-center gap-x-2 justify-between text-left p-2 w-full duration-300"
        v-for="({ path, name }, i) in items" :id="i" :to="path">
        <p class="text-white">{{ name }}</p>
        <div class="flex-shrink-0">
            <ArrowRightIcon class="h-5 text-white" />
        </div>
    </RouterLink>
</template>
<script>
import { ArrowRightIcon } from "@heroicons/vue/24/solid";
import { RouterLink } from "vue-router"

export default {
    props: {
        items: {
            type: Array,
            required: false,
        }
    },
    components: { ArrowRightIcon }
}
</script>