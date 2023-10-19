/*
 * @Author       : huchaomin peter@qingcongai.com
 * @Date         : 2023-10-12 13:57:42
 * @LastEditors  : huchaomin peter@qingcongai.com
 * @LastEditTime : 2023-10-19 09:28:33
 * @Description  :
 */
import { type RendererOptions } from 'vxe-table'
import { VBtn, VSwitch, VTextField } from 'vuetify/components'

type CellRenderType =
  | RendererOptions['renderDefault']
  | RendererOptions['renderCell']
  | RendererOptions['renderEdit']

export type CellRenderParamsType = Parameters<NonNullable<CellRenderType>>[1]

// renderDefault 和 renderCell类型其实是一样的 TODO CellRenderType从写
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
  switch: (renderOpts: any, params) => {
    const { row, column } = params
    const { props = {}, useVModel = true } = renderOpts
    const bind = {
      ...props,
      'onUpdate:modelValue': (val: any) => {
        // TODO 抽出来
        if (props['onUpdate:modelValue'] !== undefined) {
          props['onUpdate:modelValue'](val, params)
        }
        if (useVModel as boolean) {
          row[column.field] = val
        }
      },
    }
    return <VSwitch {...bind} modelValue={row[column.field]}></VSwitch>
  },
  textField: (renderOpts: any, params) => {
    const { row, column } = params
    const { props = {}, useVModel = true } = renderOpts
    const bind = {
      ...props,
      'onUpdate:modelValue': (val: any) => {
        if (props['onUpdate:modelValue'] !== undefined) {
          props['onUpdate:modelValue'](val, params)
        }
        if (useVModel as boolean) {
          row[column.field] = val
        }
      },
    }
    return <VTextField {...bind} modelValue={row[column.field]}></VTextField>
  },
}

export default renderMap
