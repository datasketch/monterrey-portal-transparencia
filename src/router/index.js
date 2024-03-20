// import Vue from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import jsonData from '@/data/processed/structure.json';
import slugify from 'slugify';

function generateRoutes(data, prefix) {
  return data.map((item) => {
    const path = `${prefix}/${slugify(item.label, { lower: true })}`;
    return {
      path,
      name: item.label,
      component: () => import('@/views/CategoryView.vue'),
      props: {
        id: item.id,
        label: item.label,
        children:
          (item.children &&
            item.children.reduce((prev, { id, label, reports }) => {
              return [...prev, { id, label, reports }];
            }, [])) ||
          [],
      },
      children: item.children ? generateRoutes(item.children, path) : [],
    };
  });
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
