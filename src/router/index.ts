import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from 'vue-router';
import Index from '@/layout/Index.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/layout/Login.vue'),
  },
  {
    path: '/',
    name: 'index',
    component: Index,
    redirect: {
      name: 'assetPkgManagement',
    },
    children: [
      {
        path: 'assetPkgManagement',
        name: 'assetPkgManagement',
        component: () => import('@/views/assetPkgManagement/Index.vue'),
      },
    ],
  },
  {
    path: '/:catchAll(.*)*',
    component: Index,
    children: [
      {
        path: '',
        name: 'notFound',
        component: () => import('@/layout/NotFound.vue'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// router.beforeEach((to, _from, next) => {
// if (to.name === 'login') {
//   next();
//   return;
// }
// const userStore = useUserStore();

// TODO
// if (userStore.token) {
//   next();
// if (routerStore.allRouters.length > 0) {
//   next();
//   return;
// }
// userStore.getUserInfo().then(() => userStore.userInfoChange().then(() => {
//   const current = findRouterByPath(to.path);
//   if (current) {
//     let { name } = current;
//     if (from === START_LOCATION && menuBelong.has(name)) {
//       name = menuBelong.get(name);
//     }
//     next({ name });
//   } else {
//     next({ name: 'NotFound' });
//   }
// })).catch(() => {
//   next(false);
// });
// } else {
//   next({ name: 'login' });
// }
// });

router.afterEach((to, from) => {
  const { name, meta } = to;
  if (meta.title) {
    document.title = meta.title;
  }
  if (name === 'login') {
    to.query = { redirect: from.name as string }; // START_LOCATION 时 from.name 为 undefined
  }
});

export default router;
