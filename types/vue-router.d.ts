/*
 * @Author       : huchaomin peter@qingcongai.com
 * @Date         : 2023-07-14 13:58:40
 * @LastEditors  : huchaomin peter@qingcongai.com
 * @LastEditTime : 2023-10-07 15:45:43
 * @Description  :
 */
import 'vue-router'
declare module 'vue-router' {
  interface RouteMeta {
    title?: string
    id?: string
    disabled?: boolean // 是否禁用
    parentName?: string // 父级路由名称
    hideInMenu?: boolean // 是否在菜单中隐藏
  }
}
