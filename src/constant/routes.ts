/*
 * @Author       : huchaomin iisa_peter@163.com
 * @Date         : 2023-08-06 09:42:59
 * @LastEditors  : huchaomin peter@qingcongai.com
 * @LastEditTime : 2023-09-26 14:29:15
 * @Description  :
 */
import { type RouteRecordRaw } from 'vue-router'

// 路由name必填，方便remove
export default [
  {
    path: 'assetManagement',
    name: 'assetManagement',
    meta: {
      title: '资产管理',
      id: '1669646990771863553',
    },
    children: [
      {
        path: 'myClue',
        name: 'myClue',
        component: () => import('@/views/assetManagement/myClue/Index.vue'),
        meta: {
          title: '我的线索',
          id: '1686984823780302849',
        },
      },
      {
        path: 'myResearch',
        name: 'myResearch',
        component: () => import('@/views/assetManagement/myResearch/Index.vue'),
        meta: {
          title: '我的尽调',
          id: '1686993445465776129',
        },
      },
      {
        path: 'approvedProject',
        name: 'approvedProject',
        component: () => import('@/views/assetManagement/approvedProject/Index.vue'),
        meta: {
          title: '已立项',
          id: '1686993599841329154',
        },
      },
    ],
  },
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
