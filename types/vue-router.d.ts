import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    title?: string
    id?: string
    parentName?: string // 父级路由名称
    customerRouter?: boolean // 是否是自定义路由
    hideInMenu?: boolean // 是否在菜单中隐藏
  }
}
