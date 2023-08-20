<script setup lang="ts">
import {
  type VxeGridPropTypes,
  type VxeTableDataRow,
  type VxeTableInstance,
} from 'vxe-table'

const props = withDefaults(
  defineProps<{
    columns: VxeGridPropTypes.Columns
    data: VxeTableDataRow[]
  }>(),
  {},
)

const xTable = ref<VxeTableInstance<VxeTableDataRow> | null>(null)

const processedColumns = computed(() => {
  return props.columns.map((column) => {
    if (column.type === 'checkbox') {
      column.width = 58
      column.slots = {
        header: 'checkbox_header',
        checkbox: 'checkbox_default',
      }
    }
    return column
  })
})

const toggleAllCheckboxEvent: () => void = () => {
  xTable.value!.toggleAllCheckboxRow()
}

const toggleCheckboxEvent: (row: VxeTableDataRow) => void = (row) => {
  xTable.value!.toggleCheckboxRow(row)
}
</script>
<template>
  <VxeGrid ref="xTable" :columns="processedColumns" :data="data">
    <template v-for="k in Object.keys($slots)" :key="k" #[k]="slotScope">
      <slot :name="k" v-bind="slotScope"></slot>
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
  </VxeGrid>
</template>