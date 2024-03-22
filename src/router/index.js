import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import jsonData from '@/data/processed/structure.json';
import slugify from 'slugify';

const toSlug = (label) => slugify(label, { lower: true });

function generateRoutes(data, prefix = '', bc = []) {
  return data.reduce((result, item) => {
    const slug = toSlug(item.label);
    const path = `${prefix}/${slug}`;
    const breadcrumb = [...bc, { label: item.label, slug: path }];
    const reports = item.reports || [];
    const set = [
      {
        path,
        component: () => import('@/views/CategoryView.vue'),
        props: {
          id: item.id,
          label: item.label,
          breadcrumb,
          reports,
          items:
            item.children && Array.isArray(item.children)
              ? item.children.reduce((prev, { id, label, order, reports }) => {
                  return [
                    ...prev,
                    {
                      id,
                      label,
                      order,
                      reports,
                      slug: `${path}/${toSlug(label)}`,
                    },
                  ];
                }, [])
              : [],
        },
      },
    ];
    if (
      item.children &&
      Array.isArray(item.children) &&
      item.children.length > 0
    ) {
      set.push(...generateRoutes(item.children, path, breadcrumb));
    }
    return [...result, ...set];
  }, []);
}

const routes = generateRoutes(jsonData, '');

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView,
    },
    ...routes,
  ],
});

export default router;
