import { user, login, logout } from '@/api/sys'
import { type RouteRecordRaw } from 'vue-router'
import allRoutes from '@/constant/routes'
import router from '@/router'

function getRouterIdsFromBack(menu: []): string[] {
  const arr: string[] = []
  const fn: (list: []) => void = (list) => {
    list.forEach((item: any) => {
      if (item.id !== undefined) {
        arr.push(item.id)
      }
      if (Array.isArray(item.children)) {
        fn(item.children)
      }
    })
  }
  fn(menu)
  return arr
}

function filterRouters(menu: []): RouteRecordRaw[] {
  const ids = getRouterIdsFromBack(menu)
  const fn: (
    arr: RouteRecordRaw[],
    parent: RouteRecordRaw | null,
  ) => RouteRecordRaw[] = (arr, parent) => {
    return arr.filter((item, index) => {
      if (item.children !== undefined) {
        item.children = fn(item.children, item)
      }
      if (parent !== null) {
        item.meta = {
          ...(item.meta ?? {}),
          parentName: parent.name as string,
        }
      }
      const realChildren = (item.children ?? []).filter(
        (c: RouteRecordRaw) => c.meta?.customerRouter !== true,
      )
      const boolean =
        item.meta?.customerRouter === true || // 自定义路由不会有子路由
        ((item.children === undefined || realChildren.length > 0) &&
          (item.meta?.id === undefined || ids.includes(item.meta?.id)))
      if (boolean && parent !== null && index === 0) {
        parent.redirect = { name: item.name }
      }
      return boolean
    })
  }
  return fn(allRoutes, null)
}

export default defineStore(
  'user',
  () => {
    const token = ref('')
    const userInfo: Ref<{
      realname?: string
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
