/*
 * @Author       : huchaomin peter@qingcongai.com
 * @Date         : 2023-10-12 13:57:42
 * @LastEditors  : huchaomin peter@qingcongai.com
 * @LastEditTime : 2023-10-19 11:19:44
 * @Description  :
 */
import { type RendererOptions } from 'vxe-table'
import { VBtn, VSwitch, VTextField } from 'vuetify/components'

// renderDefault 和 renderCell类型其实是一样的
type CellRenderType =
  | RendererOptions['renderDefault']
  | RendererOptions['renderCell']
  | RendererOptions['renderEdit']

export type CellRenderParamsType = Parameters<NonNullable<CellRenderType>>[1]

type RenderFnType = (
  renderOpts: any,
  params: CellRenderParamsType,
) => ReturnType<NonNullable<CellRenderType>>

function getExtraFormItemProps(
  renderOpts: Parameters<RenderFnType>[0],
  params: CellRenderParamsType,
): Record<string, any> {
  const { props = {}, useVModel = true } = renderOpts
  const { row, column } = params
  return {
    hideDetails: true,
    'onUpdate:modelValue': (val: any) => {
      if (props['onUpdate:modelValue'] !== undefined) {
        props['onUpdate:modelValue'](val, params)
      }
      if (useVModel as boolean) {
        row[column.field] = val
      }
    },
  }
}

const renderMap: Record<string, RenderFnType> = {
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
  switch: (renderOpts, params) => {
    const { row, column } = params
    const { props = {} } = renderOpts
    const bind = {
      ...props,
      ...getExtraFormItemProps(renderOpts, params),
    }
    return <VSwitch {...bind} modelValue={row[column.field]}></VSwitch>
  },
  textField: (renderOpts, params) => {
    const { row, column } = params
    const { props = {} } = renderOpts
    const bind = {
      ...props,
      ...getExtraFormItemProps(renderOpts, params),
    }
    return <VTextField {...bind} modelValue={row[column.field]}></VTextField>
  },
}

export default renderMap
