/*
 * @Author       : huchaomin peter@qingcongai.com
 * @Date         : 2023-10-12 14:00:56
 * @LastEditors  : huchaomin peter@qingcongai.com
 * @LastEditTime : 2023-10-19 09:34:54
 * @Description  :
 */
import { renderer } from 'vxe-table'
import headerRenders from './header'
import cellRenders from './cell'

const headerRendersKeys = Object.keys(headerRenders)
const cellRendersKeys = Object.keys(cellRenders)

// h-c-e-f(header-cell-edit-footer)
headerRendersKeys.forEach((h) => {
  cellRendersKeys.forEach((c) => {
    // footer
    // console.log('cellRender', `${h}-${c}-default-default`)
    renderer.mixin({
      [`${h}-${c}-default-default`]: {
        renderHeader(renderOpts, params) {
          return headerRenders[h]!(renderOpts, params)
        },
        renderDefault(renderOpts, params) {
          return cellRenders[c]!(renderOpts, params)
        },
      },
    })
    cellRendersKeys.forEach((e) => {
      // console.log('editRender', `e-${h}-${c}-${e}-default`)
      renderer.mixin({
        [`e-${h}-${c}-${e}-default`]: {
          renderHeader(renderOpts, params) {
            return headerRenders[h]!(renderOpts, params)
          },
          renderCell(renderOpts, params) {
            return cellRenders[c]!(renderOpts, params)
          },
          renderEdit(renderOpts, params) {
            return cellRenders[e]!(renderOpts, params)
          },
        },
      })
    })
  })
})
