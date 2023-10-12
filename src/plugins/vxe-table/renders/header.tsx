/*
 * @Author       : huchaomin peter@qingcongai.com
 * @Date         : 2023-10-12 14:10:53
 * @LastEditors  : huchaomin peter@qingcongai.com
 * @LastEditTime : 2023-10-12 16:24:24
 * @Description  :
 */
import { type RendererOptions } from 'vxe-table'

type HeaderType = RendererOptions['renderHeader']

const renderMap: Record<string, HeaderType> = {
  default: (_, params) => {
    const { column } = params
    return column.title
  },
}

export default renderMap
