import { createRouter, createWebHistory, START_LOCATION } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('@/layout/Login.vue'),
      meta: {
        title: '登录',
      },
    },
    {
      path: '/:catchAll(.*)*',
      component: () => import('@/layout/Index.vue'),
      name: 'notFound',
      children: [
        {
          path: '',
          name: '404',
          component: () => import('@/layout/NotFound.vue'),
          meta: {
            title: '404',
          },
        },
      ],
    },
  ],
})

router.beforeEach((to, from, next) => {
  if (to.name === 'login') {
    next()
    return
  }
  const userStore = useUserStore()
  if (userStore.token) {
    if (userStore.routersRaw.length > 0) {
      next()
      return
    }
    userStore
      .getRoutersAndAuth()
      .then(() => {
        const { name, meta } = router.resolve({ path: to.path }) // 此时路由还没注册，to.name 为 undefined
        if (from === START_LOCATION && meta.customerRouter === true) {
          next({ name: meta.parentName as string })
        } else {
          next({ name: name as string })
        }
      })
      .catch(() => {
        next(false)
      })
  } else {
    next({ name: 'login' })
  }
})

router.afterEach((to, from) => {
  const { name, meta } = to
  if (meta.title) {
    document.title = meta.title
  }
  if (name === 'login') {
    // START_LOCATION 时 from.name 为 undefined
    if (![null, undefined, '404'].includes(from.name as string)) {
      to.query.redirect = from.name as string
    }
  }
})

export default router
