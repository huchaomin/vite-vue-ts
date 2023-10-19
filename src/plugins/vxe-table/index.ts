/*
 * @Author       : huchaomin peter@qingcongai.com
 * @Date         : 2023-08-25 14:35:00
 * @LastEditors  : huchaomin peter@qingcongai.com
 * @LastEditTime : 2023-10-19 11:02:57
 * @Description  :
 */
import { type App } from 'vue'
import { config, Grid, Table, Tooltip, Edit, Validator } from 'vxe-table'
import '@/assets/css/_vxe-table.scss'
import './renders/index'

config({
  zIndex: 9999, // 全局 zIndex 起始值，如果项目的的 z-index 样式值过大时就需要跟随设置更大，避免被遮挡
  // version: 0, // 版本号，对于某些带数据缓存的功能有用到，上升版本号可以用于重置数据
  // loadingText: '加载中...', // 全局loading提示内容，如果为null则不显示文本
  table: {
    // keepSource: false, // 保持原始数据
    // emptyText: '暂无数据',
    size: 'medium', // medium、small、mini
    minHeight: 132,
    showOverflow: 'tooltip',
    showHeaderOverflow: 'tooltip',
    showFooterOverflow: 'tooltip',
    stripe: true,
    border: 'full',
    columnConfig: {
      minWidth: 100, // width 生效时该属性不生效
      // maxWidth: 500, // 无效：该属性虽然在column中定义了，但是不会从该处继承 4.5.12
      resizable: true,
    },
    resizableConfig: {
      minWidth: 100,
    },
    rowConfig: {
      isHover: true,
    },
    tooltipConfig: {
      enterable: true,
    },

    //   sortConfig: {
    //     remote: false,
    //     trigger: 'default',
    //     orders: ['asc', 'desc', null],
    //     sortMethod: null
    //   },
    //   filterConfig: {
    //     remote: false,
    //     filterMethod: null
    //   },
    //   expandConfig: {
    //     trigger: 'default',
    //     showIcon: true
    //   },
    //   treeConfig: {
    //     rowField: 'id',
    //     parentField: 'parentId',
    //     children: 'children',
    //     hasChild: 'hasChild',
    //     mapChildren: '_X_ROW_CHILD',
    //     indent: 20,
    //     showIcon: true
    //   },

    //   menuConfig: {
    //     visibleMethod () {}
    //   },
    editConfig: {
      showIcon: false,
      showStatus: true,
      showUpdateStatus: true,
      showInsertStatus: true,
    },
    //   importConfig: {
    //     modes: ['insert', 'covering']
    //   },
    //   exportConfig: {
    //     modes: ['current', 'selected']
    //   },
    //   customConfig: {
    //    storage: false
    //   },
    //   area-config: {
    //     multiple: false
    //   },
    //   scrollX: {
    //     gt: 60
    //   },
    //   scrollY: {
    //     gt: 100
    //   },
  },
  grid: {
    size: 'medium',
    //   zoomConfig: {
    //     escRestore: true
    //   },
    //   pagerConfig: {
    //     perfect: false
    //   },
    //   toolbarConfig: {
    //     perfect: false
    //   },
    //   proxyConfig: {
    //     autoLoad: true,
    //     message: true,
    //     props: {
    //       list: null, // 用于列表，读取响应数据
    //       result: 'result', // 用于分页，读取响应数据
    //       total: 'page.total' // 用于分页，读取总条数
    //     }
    //     beforeItem: null,
    //     beforeColumn: null,
    //     beforeQuery: null,
    //     afterQuery: null,
    //     beforeDelete: null,
    //     afterDelete: null,
    //     beforeSave: null,
    //     afterSave: null
    //   }
  },
  icon: {
    // loading
    // LOADING: 'vxe-icon-spinner roll vxe-loading--default-icon',

    // table
    TABLE_SORT_ASC: 'vxe-icon-caret-up',
    TABLE_SORT_DESC: 'vxe-icon-caret-down',
    TABLE_FILTER_NONE: 'vxe-icon-funnel',
    TABLE_FILTER_MATCH: 'vxe-icon-funnel',
    // TABLE_EDIT: 'vxe-icon-edit',
    TABLE_HELP: 'vxe-icon-question-circle-fill',
    TABLE_TREE_LOADED: 'vxe-icon-spinner roll',
    TABLE_TREE_OPEN: 'vxe-icon-caret-right rotate90',
    TABLE_TREE_CLOSE: 'vxe-icon-caret-right',
    TABLE_EXPAND_LOADED: 'vxe-icon-spinner roll',
    TABLE_EXPAND_OPEN: 'vxe-icon-arrow-right rotate90',
    TABLE_EXPAND_CLOSE: 'vxe-icon-arrow-right',
    // TABLE_CHECKBOX_CHECKED: 'vxe-icon-checkbox-checked',
    // TABLE_CHECKBOX_UNCHECKED: 'vxe-icon-checkbox-unchecked',
    // TABLE_CHECKBOX_INDETERMINATE: 'vxe-icon-checkbox-indeterminate',
    // TABLE_RADIO_CHECKED: 'vxe-icon-radio-checked',
    // TABLE_RADIO_UNCHECKED: 'vxe-icon-radio-unchecked',
  },
})

export default {
  install: (app: App): void => {
    app.use(Grid).use(Table).use(Tooltip).use(Edit).use(Validator)
  },
}
