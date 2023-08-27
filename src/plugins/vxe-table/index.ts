import { type App } from 'vue'
import { setup, Grid, Table } from 'vxe-table'
import '@/assets/css/_vxe-table.scss'

setup({
  // zIndex: 999, // 全局 zIndex 起始值，如果项目的的 z-index 样式值过大时就需要跟随设置更大，避免被遮挡
  // version: 0, // 版本号，对于某些带数据缓存的功能有用到，上升版本号可以用于重置数据
  // loadingText: '加载中...', // 全局loading提示内容，如果为null则不显示文本
  table: {
    // keepSource: false, // 保持原始数据
    // emptyText: '暂无数据',
    minHeight: 200,
    showOverflow: 'tooltip',
    showHeaderOverflow: 'tooltip',
    showFooterOverflow: 'tooltip',
    stripe: true,
    border: 'full',
    columnConfig: {
      minWidth: 100,
      resizable: true,
    },
    rowConfig: {
      isHover: true,
    },
    tooltipConfig: {
      showAll: true,
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
    //   editConfig: {
    //     mode: 'cell',
    //     showAsterisk: true
    //   },
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
    //   loading: {
    //     icon: 'vxe-icon-spinner roll',
    //     text: '加载中...'
    //   }
  },
  grid: {
    //   size: null,
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
    TABLE_EDIT: 'vxe-icon-edit',
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
    app.use(Grid).use(Table)
  },
}
