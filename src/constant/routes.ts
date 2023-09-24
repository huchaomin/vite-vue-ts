/*
 * @Author       : huchaomin iisa_peter@163.com
 * @Date         : 2023-08-06 09:42:59
 * @LastEditors  : huchaomin iisa_peter@163.com
 * @LastEditTime : 2023-09-24 15:28:43
 * @Description  :
 */
import { type RouteRecordRaw } from 'vue-router'

// 路由name必填，方便remove
export default [
  {
    path: '/',
    name: 'index',
    component: () => import('@/layout/Index.vue'),
    children: [
      {
        path: 'assetManagement',
        name: 'assetManagement',
        meta: {
          title: '资产管理',
          id: '1669646990771863553',
          icon: 'folder-cog',
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
            component: () =>
              import('@/views/assetManagement/myResearch/Index.vue'),
            meta: {
              title: '我的尽调',
              id: '1686993445465776129',
            },
          },
          {
            path: 'approvedProject',
            name: 'approvedProject',
            component: () =>
              import('@/views/assetManagement/approvedProject/Index.vue'),
            meta: {
              title: '已立项',
              id: '1686993599841329154',
            },
          },
        ],
      },
      {
        path: ':catchAll(.*)*',
        component: () => import('@/layout/NotFound.vue'),
        meta: {
          title: '404',
        },
        name: 'notFound',
      },
    ],
  },
] as RouteRecordRaw[]
