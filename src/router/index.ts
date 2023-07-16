import {
  createRouter,
  createWebHashHistory,
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
      name: 'Test',
    },
    children: [
      {
        path: 'test',
        name: 'test',
        component: () => import('@/views/Test.vue'),
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
  history: createWebHashHistory(),
  routes,
  strict: true, // 是否应该禁止尾部斜杠。默认为假
  scrollBehavior: () => ({ left: 0, top: 0 }),
});

router.beforeEach((to) => {
  const { meta } = to;
  if (meta.title) {
    document.title = meta.title;
  }
});

export default router;
