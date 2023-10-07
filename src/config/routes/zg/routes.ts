/*
 * @Author       : huchaomin iisa_peter@163.com
 * @Date         : 2023-08-06 09:42:59
 * @LastEditors  : huchaomin peter@qingcongai.com
 * @LastEditTime : 2023-10-07 10:48:28
 * @Description  :
 */
import { type RouteRecordRaw } from 'vue-router'

// 路由name必填，方便remove
export default [
  {
    path: 'systemManagement',
    name: 'systemManagement',
    meta: {
      title: '系统管理',
      id: 'd7d6e2e4e2934f2c9385a623fd98c6f3',
    },
    children: [
      {
        path: 'userManagement',
        name: 'userManagement',
        component: () => import('@/views/systemManagement/userManagement/Index.vue'),
        meta: {
          title: '用户管理',
          id: '3f915b2769fc80648e92d04e84ca059d',
        },
      },
    ],
  },
] as RouteRecordRaw[]
