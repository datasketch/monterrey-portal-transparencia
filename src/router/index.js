import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import jsonData from '@/data/processed/structure.json';
import slugify from 'slugify';

// function generateRoutes(data, prefix) {
//   return data.map((item) => {
//     const path = `${prefix}/${slugify(item.label, { lower: true })}`;
//     const routeName = slugify(path, { strict: true })
//     return {
//       path,
//       name: routeName,
//       component: () => import('@/views/CategoryView.vue'),
//       props: {
//         id: item.id,
//         label: item.label,
//         // routeName,
//         children:
//           (item.children &&
//             item.children.reduce((prev, { id, label, reports }) => {
//               return [...prev, { id, label, reports }];
//             }, [])) ||
//           [],
//       },
//       children: item.children ? generateRoutes(item.children, path) : [],
//     };
//   });
// }

const toSlug = (label) => slugify(label, { lower: true })

function generateRoutes(data, prefix = '', bc = []) {
  return data.reduce((result, item) => {
    const slug = toSlug(item.label)
    const path = `${prefix}/${slug}`;
    const breadcrumb = [...bc, { label: item.label, slug: path }]
    const set = [{
      path,
      component: () => import('@/views/CategoryView.vue'),
      props: {
        id: item.id,
        label: item.label,
        breadcrumb,
        items: item.children && Array.isArray(item.children) ? item.children.reduce((prev, { id, label, reports }) => {
          return [...prev,
            { id, label, reports, slug: `${path}/${toSlug(label)}` }
          ];
        }, []) : []
      }
    }]
    if (item.children && Array.isArray(item.children) && item.children.length > 0) {
      set.push(...generateRoutes(item.children, path, breadcrumb))
    }
    return [
      ...result,
      ...set
    ]
  }, [])
}

const routes = generateRoutes(jsonData, '');
console.log(routes);

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
