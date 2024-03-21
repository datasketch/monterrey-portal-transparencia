import { reactive } from 'vue';
import structureData from '@/data/processed/structure.json';
import reportsData from '@/data/processed/reports.json';

export const store = reactive({
  // data
  structureData,
  reportsData,

  // states
  category: '',
  breadcrumbs: [{ id: '', label: 'Inicio' }],
  reports: [],
  // filters
  search: '',

  // get and set

  // data
  getStructureData() {
    return this.structureData;
  },

  getDataByCategory() {
    return this.structureData.filter(({ label }) => label === this.category);
  },

  // category
  setCategory(value) {
    this.category = value;
  },
  getCategory() {
    return this.category;
  },

  // breadcrumbs
  setBreadcrumbs({ id, label }) {
    // validate id, if id exist in the breadcrumbsData, so modify the element
    const findBreadcrumbById = this.breadcrumbs.findIndex(
      (breadcrumb) => breadcrumb.id === id
    );

    if (findBreadcrumbById !== -1) {
      // if the label is equal to current array label, so delete item in the array breadcrumbs object
      const findBreadcrumbByLabel = this.breadcrumbs.findIndex(
        (breadcrumb) => breadcrumb.label === label
      );

      if (findBreadcrumbByLabel !== -1) {
        // delete breadcrumb
        this.breadcrumbs = this.breadcrumbs.slice(0, findBreadcrumbByLabel);
      } else {
        // modify breadcrumb
        this.breadcrumbs[findBreadcrumbById] = { id, label };
        this.breadcrumbs = this.breadcrumbs.slice(0, findBreadcrumbById + 1);
      }
    } else {
      // add breadcrumb
      this.breadcrumbs.push({ id, label });
    }
  },
  getBreadcrumbs() {
    return this.breadcrumbs;
  },

  //   reports
  setReports(reports) {
    // reset
    this.resetReports();
    this.reports.push(...reports);
  },
  getReports() {
    return this.reports;
  },
  resetReports() {
    return (this.reports = []);
  },
  filteredReports(hasCategory) {
    let filteredData;
    if (!hasCategory) {
      filteredData = this.reportsData;
    } else {
      filteredData = this.reports;
    }
    if (this.search) {
      filteredData = filteredData.filter(
        (report) =>
          report?.title?.toLowerCase().includes(this.search.toLowerCase()) ||
          report?.description?.toLowerCase().includes(this.search.toLowerCase())
      );
    }
    return filteredData;
  },

  // search
  setSearch(value) {
    this.search = value;
    this.filteredReports();
  },
  getSearch() {
    return this.search;
  },
  resetSearch() {
    this.search = '';
  },

  // reset
  reset() {
    (this.category = ''),
      (this.breadcrumbs = [{ id: '', label: 'Inicio' }]),
      (this.reports = []),
      (this.search = '');
  },
});
