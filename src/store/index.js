import { reactive } from "vue";
import structureData from "@/data/processed/structure.json";

export const store = reactive({
    // data
    structureData,

    // states
    category: '',
    breadcrumbs: ['Inicio'],
    selectedCategoryData: null,

    // get and set

    // data
    getStructureData() {
        return this.structureData
    },

    getDataByCategory() {
        return this.structureData.filter(({ label }) => label === this.category)
    },

    // category
    setCategory(value) {
        this.category = value
    },
    getCategory() {
        return this.category
    },

    // breadcrumbs
    setBreadcrumbs(value) {
        this.breadcrumbs.push(value)
    },
    getBreadcrumbs() {
        return this.breadcrumbs
    },

    // methods
    reset() {
        this.category = '',
            this.breadcrumbs = ['Inicio']
    }

})