/*
 * @Author       : huchaomin peter@qingcongai.com
 * @Date         : 2023-07-17 09:54:59
 * @LastEditors  : huchaomin peter@qingcongai.com
 * @LastEditTime : 2023-10-07 16:54:14
 * @Description  :
 */
import { user, login, logout } from '@/api/sys'
import { type RouteRecordRaw } from 'vue-router'
import router, { parentRoute } from '@/router'
import routesConfig from '@/config/routes/listing'
const app = PROJECT_NAME
const { default: allRoutes } = (await routesConfig[`./${app}/routes.ts`]()) as {
  default: RouteRecordRaw[]
}
const { default: componentCorrespondence } = (await routesConfig[
  `./${app}/correspondence.ts`
]()) as {
  default: string[]
}

function getRouterComponentsFromBack(menu: []): string[] {
  const arr: string[] = []
  const fn: (list: []) => void = (list) => {
    list.forEach((item: any) => {
      if (item.component !== undefined) {
        arr.push(item.component)
      }
      if (Array.isArray(item.children)) {
        fn(item.children)
      }
    })
  }
  fn(menu)
  return arr
}

function cloneRouteRecordRaw(value: RouteRecordRaw): RouteRecordRaw {
  return _.cloneDeepWith(value, (val) => {
    if (typeof val.render === 'function') {
      return val
    }
  })
}

function filterRouters(menu: []): RouteRecordRaw[] {
  const componentKeys = getRouterComponentsFromBack(menu)
  const fn: (arr: RouteRecordRaw[], parent: RouteRecordRaw | null) => RouteRecordRaw[] = (
    arr,
    parent,
  ) => {
    return arr.filter((item) => {
      if (item.children !== undefined) {
        item.children = fn(item.children, item)
        if (item.children.length > 0) {
          item.redirect = { name: item.children[0].name }
        }
      }
      if (item.meta?.id !== undefined) {
        item.component = () =>
          componentCorrespondence[item.meta.id]().then((comp) => {
            return {
              ...comp.default,
              name: item.name,
            }
          })
      }
      const boolean = componentKeys.includes(item.meta?.id) || item.meta?.disabled === false
      if (parent !== null) {
        item.meta = {
          ...(item.meta ?? {}),
          parentName: parent.name as string,
        }
        parent.meta = {
          ...(parent.meta ?? {}),
          disabled: boolean ? false : parent.meta?.disabled ?? true,
        }
      }
      return boolean
    })
  }
  const parent = cloneRouteRecordRaw(parentRoute)
  parent.children!.unshift(...cloneRouteRecordRaw(allRoutes))
  return fn([parent], null)
}

export default defineStore(
  'user',
  () => {
    const token = ref('')
    const userInfo: Ref<{
      realname?: string
      username?: string
    }> = ref({})
    const routersRaw: Ref<RouteRecordRaw[]> = ref([])
    const auth = ref([])
    const allAuth = ref([])

    async function loginStart(loginData: any): Promise<null | undefined> {
      const { data } = await $api(login, loginData)
      if (data.value === null) return null
      token.value = data.value.result.token
      userInfo.value = data.value.result.userInfo
      return await getRoutersAndAuth()
    }

    async function logoutStart(): Promise<null | undefined> {
      const { data } = await $api(logout)
      if (data.value === null) return null
      $notify('退出登录成功！')
      await clearSession()
    }

    async function getRoutersAndAuth(): Promise<null | undefined> {
      const { data } = await $api(user)
      if (data.value === null) return null
      const result = data.value.result
      routersRaw.value = markRaw(filterRouters(result.menu))
      if (router.hasRoute('index')) {
        router.removeRoute('index')
      }
      routersRaw.value.forEach((item) => {
        router.addRoute(item)
      })
      auth.value = result.auth
      allAuth.value = result.allAuth
    }

    async function clearSession(): Promise<void> {
      token.value = ''
      userInfo.value = {}
      auth.value = []
      allAuth.value = []
      await router.push({ name: 'login' })
      routersRaw.value.forEach((item) => {
        router.removeRoute(item.name as string)
      })
      routersRaw.value = []
    }

    return {
      token,
      userInfo,
      routersRaw,
      auth,
      allAuth,
      login: loginStart,
      logout: logoutStart,
      getRoutersAndAuth,
      clearSession,
    }
  },
  {
    persist: {
      paths: ['token', 'userInfo'],
    },
  },
)
