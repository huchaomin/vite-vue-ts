import {
  createRouter,
  createWebHistory,
} from 'vue-router';

const router = createRouter({
  history: createWebHistory(),
  routes: [],
});

router.beforeEach((to, _from, next) => {
  if (to.name === 'login') {
    next();
    return;
  }
  const userStore = useUserStore();

  if (userStore.token) {
    next();
    if (userStore.menu.length > 0) {
      next();
      return;
    }
    userStore.getMenuAndAuth().then(() => {
      next();
      // const current = findRouterByPath(to.path);
      // if (current) {
      //   let { name } = current;
      //   if (from === START_LOCATION && menuBelong.has(name)) {
      //     name = menuBelong.get(name);
      //   }
      //   next({ name });
      // } else {
      //   next({ name: 'NotFound' });
      // }
    }).catch(() => {
      next(false);
    });
  } else {
    next({ name: 'login' });
  }
});

router.afterEach((to, from) => {
  const { name, meta } = to;
  if (meta.title) {
    document.title = meta.title;
  }
  if (name === 'login') {
    // START_LOCATION 时 from.name 为 undefined
    if (from.name !== null && from.name !== undefined) {
      to.query = { redirect: from.name as string };
    }
  }
});

export default router;
