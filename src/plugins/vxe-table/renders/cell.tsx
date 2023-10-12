/*
 * @Author       : huchaomin peter@qingcongai.com
 * @Date         : 2023-10-12 13:57:42
 * @LastEditors  : huchaomin peter@qingcongai.com
 * @LastEditTime : 2023-10-12 16:24:57
 * @Description  :
 */
import { type RendererOptions } from 'vxe-table'

type CellType = RendererOptions['renderDefault'] | RendererOptions['renderCell']

// renderDefault 和 renderCell类型其实是一样的
const renderMap: Record<string, CellType> = {
  default: (_, params) => {
    const { row, column } = params
    return row[column.field]
  },
}

export default renderMap
