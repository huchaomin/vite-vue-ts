<!--
 * @Author       : huchaomin iisa_peter@163.com
 * @Date         : 2023-08-20 10:01:45
 * @LastEditors  : huchaomin peter@qingcongai.com
 * @LastEditTime : 2023-10-19 09:33:57
 * @Description  :
-->
<script setup lang="ts">
import {
  type VxeTablePropTypes,
  type VxeTableDataRow,
  type VxeTableInstance,
  type VxeColumnProps,
} from 'vxe-table'

const props = withDefaults(
  defineProps<{
    columns: TableColumns
    checkboxConfig?: VxeTablePropTypes.CheckboxConfig // 不能写在全局配置，全局配置只能传空对象
    radioConfig?: VxeTablePropTypes.RadioConfig
    syncParentHeight?: boolean // 是否和外层容器高度同步
  }>(),
  {
    checkboxConfig: () => ({}),
    radioConfig: () => ({}),
    syncParentHeight: false,
  },
)

const xTable = ref<VxeTableInstance<VxeTableDataRow> | null>(null)

const processedCheckboxConfig = computed(() => {
  const has: boolean = props.columns.some((column) => column.type === 'checkbox')
  return has
    ? {
        highlight: true,
        trigger: 'row',
        ...props.checkboxConfig,
      }
    : {}
})
const processedRadioConfig = computed(() => {
  const has: boolean = props.columns.some((column) => column.type === 'radio')
  return has
    ? {
        highlight: true,
        trigger: 'row',
        ...props.radioConfig,
      }
    : {}
})
const processedColumns = computed(() => {
  return props.columns.map((column) => {
    if (['seq', 'checkbox', 'radio'].includes(column.type as string)) {
      column.width = 58 // vxe-cell 会减2px
      column.resizable = false
      column.align = 'center'
    }
    if (column.type === 'checkbox') {
      column.slots = {
        header: 'checkbox_header',
        checkbox: 'checkbox_default',
      }
    }
    if (column.type === 'radio') {
      column.slots = {
        radio: 'radio',
      }
    }
    if (column.cellRender !== undefined) {
      // slot 和 render 同时存在的话slot优先级更高
      const name = column.cellRender.name
      const obj: Record<string, string> = {}
      let isEdit = false
      name!.split('-').forEach((item: string) => {
        const arr = item.split(':')
        obj[arr[0]] = arr[1]
        if (arr[0] === 'e') {
          isEdit = true
        }
      })
      const flagArr = ['h', 'c', 'e', 'f']
      const realName = flagArr
        .map((flag) => {
          return obj[flag] ?? 'default'
        })
        .join('-')
      if (isEdit) {
        column.editRender = {
          ...(column.cellRender as VxeColumnProps['editRender']),
          name: `e-${realName}`,
        }
        delete column.cellRender
      } else {
        column.cellRender = {
          ...column.cellRender,
          name: realName,
        }
      }
    }
    return column
  })
})

const otherProps = computed(() => {
  const { syncParentHeight } = props
  const obj: {
    height?: VxeTablePropTypes.Height
    'auto-resize'?: VxeTablePropTypes.AutoResize
  } = {}
  if (syncParentHeight) {
    obj.height = 'auto'
    obj['auto-resize'] = true
  }
  return obj
})

const toggleAllCheckboxEvent: () => void = () => {
  xTable.value!.toggleAllCheckboxRow()
}

const toggleCheckboxEvent: (row: VxeTableDataRow) => void = (row) => {
  xTable.value!.toggleCheckboxRow(row)
}

const setSelectRow: (row: VxeTableDataRow) => void = (row: VxeTableDataRow) => {
  xTable.value!.setRadioRow(row)
}

const debouncedRefreshColumn = useDebounceFn(() => {
  xTable.value?.refreshColumn()
}, 500)

function updateColumnMinWidth(el: HTMLElement | null, slotScope: any): void {
  const { $table, column } = slotScope
  const { width, maxWidth, minWidth } = column
  if (width !== undefined) return
  const elWidth = (el?.offsetWidth ?? 0) + 24
  const currentWidth = $table.getColumnWidth(column)
  if (maxWidth === undefined) {
    if (elWidth > currentWidth) {
      column.minWidth = elWidth
    }
  } else {
    if (elWidth > currentWidth && elWidth < maxWidth) {
      column.minWidth = elWidth
    } else if (maxWidth < currentWidth) {
      column.minWidth = maxWidth
    }
  }
  console.log(column.minWidth, currentWidth, minWidth)
  if (column.minWidth > currentWidth && column.minWidth !== minWidth) {
    debouncedRefreshColumn()
  }
}
</script>
<template>
  <VxeGrid
    ref="xTable"
    :columns="processedColumns"
    :checkbox-config="processedCheckboxConfig"
    :radio-config="processedRadioConfig"
    v-bind="otherProps"
  >
    <!-- 越前，权重越高 -->
    <template v-for="k in Object.keys($slots)" :key="k" #[k]="slotScope">
      <span :ref="(el) => updateColumnMinWidth(el as HTMLElement | null, slotScope)">
        <slot v-bind="slotScope" :name="k"></slot>
      </span>
    </template>
    <template #checkbox_header="{ checked, indeterminate }">
      <VCheckbox
        :model-value="checked"
        :indeterminate="indeterminate"
        hide-details
        density="comfortable"
        @update:model-value="toggleAllCheckboxEvent"
      ></VCheckbox>
    </template>
    <template #checkbox_default="{ row, checked, indeterminate }">
      <VCheckbox
        :model-value="checked"
        :indeterminate="indeterminate"
        hide-details
        density="comfortable"
        @update:model-value="toggleCheckboxEvent(row)"
      ></VCheckbox>
    </template>
    <template #radio="{ row, checked }">
      <VRadio
        density="comfortable"
        :model-value="checked"
        @update:model-value="setSelectRow(row)"
      ></VRadio>
    </template>
    <template #loading>
      <VProgressLinear color="primary" indeterminate height="2"></VProgressLinear>
    </template>
    <template #empty>
      <SvgIcon name="empty" style="font-size: 50px"></SvgIcon>
    </template>
  </VxeGrid>
</template>
<style lang="scss" scoped>
:deep(.vxe-loading--warpper) {
  top: 0;
  transform: none;
}
</style>
