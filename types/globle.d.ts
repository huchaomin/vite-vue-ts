/*
 * @Author       : huchaomin peter@qingcongai.com
 * @Date         : 2023-07-17 08:55:35
 * @LastEditors  : huchaomin peter@qingcongai.com
 * @LastEditTime : 2023-10-16 16:17:34
 * @Description  :
 */

import type CForm from '@/components/global/CForm.vue'
import type CPageList from '@/components/global/CPageList.vue'

import { type VxeGridPropTypes } from 'vxe-table'

import { type CellRenderParamsType } from '@/plugins/vxe-table/renders/cell'

// 为什么加这个 https://juejin.cn/post/7224051399256096829
//  https://juejin.cn/post/6898710177969602574
export {} // 为了让这个声明文件变成模块声明文件，而不是一个全局声明文件
// declare const API_PREFIX: string // 如果是全局声明文件(不需要上面) 就是这么写

// https://www.tslang.cn/docs/handbook/declaration-merging.html 局部声明文件拓展全局变量
declare global {
  const API_PREFIX: string
  const APP_NAME: string
  const PROJECT_NAME: string
  type RequiredPartialKeys<T, K extends keyof T> = {
    [P in K]-?: T[P]
  } & Pick<T, Exclude<keyof T, K>>
  type OptionalPartialKeys<T, K extends keyof T> = {
    [P in K]?: T[P]
  } & Pick<T, Exclude<keyof T, K>>
  type AllowRefValue<T> = {
    [P in keyof T]: MaybeRef<T[P]>
  }
  type RefCForm = InstanceType<typeof CForm> | null
  type RefCPageList = InstanceType<typeof CPageList> | null
  type TableColumns = VxeGridPropTypes.Columns
  type CellRenderParams = CellRenderParamsType
}
