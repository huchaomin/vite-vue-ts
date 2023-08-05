import { type RouteRecordRaw } from 'vue-router'
import Index from '@/layout/Index.vue'

export default [
  {
    path: '/',
    name: 'index',
    component: Index,
    children: [
      {
        path: 'assetManagement',
        name: 'assetManagement',
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
    ],
  },
] as RouteRecordRaw[]