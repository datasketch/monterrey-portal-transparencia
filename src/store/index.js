import { reactive } from "vue";

export const store = reactive({
    // states
    category: '',
    breadcrumbs: ['Inicio'],

    // get and set

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