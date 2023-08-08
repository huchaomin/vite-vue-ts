import { createRouter, createWebHistory, START_LOCATION } from 'vue-router'
import Index from '@/layout/Index.vue'

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
      component: Index,
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
        const name = to.name!
        if (router.hasRoute(name)) {
          if (from === START_LOCATION && to.meta.customerRouter === true) {
            next({ name: to.meta.parentName as string })
          } else {
            next()
          }
        } else {
          next({ name: 'notFound' })
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
    if (from.name !== null && from.name !== undefined) {
      to.query = { redirect: from.name as string }
    }
  }
})

export default router
