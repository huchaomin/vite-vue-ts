/*
 * @Author       : huchaomin peter@qingcongai.com
 * @Date         : 2023-07-14 13:58:40
 * @LastEditors  : huchaomin peter@qingcongai.com
 * @LastEditTime : 2023-09-26 18:05:16
 * @Description  :
 */
import { createRouter, createWebHistory, START_LOCATION, type RouteRecordRaw } from 'vue-router'
import Index from '@/layout/Index.vue'

const parentRoute: RouteRecordRaw = {
  path: '/',
  name: 'index',
  component: Index,
  children: [
    {
      path: ':catchAll(.*)*',
      component: () => import('@/layout/NotFound.vue'),
      name: 'notFound',
      meta: {
        title: '404',
        hideInMenu: true,
      },
    },
  ],
}
const router = createRouter({
  history: createWebHistory(),
  routes: [
    parentRoute,
    {
      path: '/login',
      name: 'login',
      component: () => import('@/layout/Login.vue'),
      meta: {
        title: '登录',
      },
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
        if (from === START_LOCATION && meta.id === undefined && name !== 'notFound') {
          next({ name: meta.parentName as string })
        } else {
          next({ name: name as string })
        }
      })
      .catch((e) => {
        console.log(e)
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
    if (![null, undefined, 'notFound'].includes(from.name as string)) {
      to.query.redirect = from.name as string
    }
  }
})

export { parentRoute }

export default router
