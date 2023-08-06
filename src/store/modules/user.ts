import { user } from '@/api/sys'
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
        parent.redirect = { name: item.name } // TODO 看看parent是否一定要 component
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
    const routersRaw: Ref<RouteRecordRaw[]> = ref([])
    const auth = ref([])
    const allAuth = ref([])

    function getRoutersAndAuth(): Promise<any> {
      return new Promise((resolve, reject) => {
        $api(user).then(({ data }) => {
          const result = data.value?.result
          if (result === undefined) {
            reject()
          } else {
            routersRaw.value = filterRouters(result.menu)
            console.log(routersRaw.value)
            routersRaw.value.forEach((item) => {
              router.addRoute(item)
            })
            auth.value = result.auth
            allAuth.value = result.allAuth
            resolve(result)
          }
        })
      })
    }

    return {
      token,
      routersRaw,
      auth,
      allAuth,
      getRoutersAndAuth,
    }
  },
  {
    persist: {
      paths: ['token'],
    },
  },
)
