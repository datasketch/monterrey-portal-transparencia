import { reactive } from "vue";
import structureData from "@/data/processed/structure.json";

export const store = reactive({
    // data
    structureData,

    // states
    category: '',
    breadcrumbs: [{ id: '', label: 'Inicio' }],
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
    setBreadcrumbs({ id, label }) {
        // validate id, if id exist in the breadcrumbsData, so modify the element
        const findBreadcrumbById = this.breadcrumbs.findIndex(breadcrumb => breadcrumb.id === id)

        if (findBreadcrumbById !== -1) {
            // if the label is equal to current array label, so delete item in the array breadcrumbs object
            const findBreadcrumbByLabel = this.breadcrumbs.findIndex(breadcrumb => breadcrumb.label === label)

            if (findBreadcrumbByLabel !== -1) {
                // delete breadcrumb
                this.breadcrumbs = this.breadcrumbs.slice(0, findBreadcrumbByLabel)
            } else {
                // modify breadcrumb
                this.breadcrumbs[findBreadcrumbById] = { id, label }
            }
        } else {
            // add breadcrumb
            this.breadcrumbs.push({ id, label })
        }
    },
    getBreadcrumbs() {
        return this.breadcrumbs
    },

    // methods
    reset() {
        this.category = '',
            this.breadcrumbs = [{ id: '', label: 'Inicio' }]
    }

})