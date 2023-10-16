/*
 * @Author       : huchaomin peter@qingcongai.com
 * @Date         : 2023-10-12 13:57:42
 * @LastEditors  : huchaomin peter@qingcongai.com
 * @LastEditTime : 2023-10-16 16:13:47
 * @Description  :
 */
import { type RendererOptions } from 'vxe-table'
import { VBtn } from 'vuetify/components'

type CellRenderType = RendererOptions['renderDefault'] | RendererOptions['renderCell']

export type CellRenderParamsType = Parameters<NonNullable<CellRenderType>>[1]

// renderDefault 和 renderCell类型其实是一样的
const renderMap: Record<string, CellRenderType> = {
  default: (_, params) => {
    const { row, column } = params
    return row[column.field]
  },
  btns: (renderOpts, params) => {
    const { children } = renderOpts
    return children!.map((item: any) => {
      const { onClick } = item
      const props = {
        size: 'small',
        variant: 'tonal',
        ...item,
        onClick: () => {
          onClick(params)
        },
      }
      return <VBtn {...props}></VBtn>
    })
  },
}

export default renderMap
