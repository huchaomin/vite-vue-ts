/*
 * @Author       : huchaomin iisa_peter@163.com
 * @Date         : 2023-08-06 09:42:59
 * @LastEditors  : huchaomin peter@qingcongai.com
 * @LastEditTime : 2023-10-17 16:24:03
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
    },
    children: [
      {
        path: 'userManagement',
        name: 'userManagement',
        meta: {
          title: '用户管理',
          id: 'system/UserList',
        },
      },
      {
        path: 'roleManagement',
        name: 'roleManagement',
        meta: {
          title: '角色管理',
          id: 'system/RoleUserList',
        },
      },
      {
        path: 'dictManagement',
        name: 'dictManagement',
        meta: {
          title: '数据字典',
          id: 'system/DictList',
        },
      },
    ],
  },
] as RouteRecordRaw[]
