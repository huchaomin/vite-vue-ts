<!--
 * @Author       : huchaomin peter@qingcongai.com
 * @Date         : 2023-09-26 14:29:00
 * @LastEditors  : huchaomin peter@qingcongai.com
 * @LastEditTime : 2023-10-17 18:15:07
 * @Description  :
-->
<script setup lang="ts">
import { dictList, dictDelete } from '@/api/sys'
import PageListItemForm from './modules/PageListItemForm.vue'
import DictSetting from './modules/DictSetting.vue'

const pageListRef = ref<RefCPageList>(null)

function setDict(row: CellRenderParams['row']): void {
  const { componentRef, dialogRef } = $dialog(
    {
      title: '字典列表',
      width: 1000,
      hideAfterConfirm: false,
      onConfirm: async () => {
        await componentRef.value!.handleSubmit()
        dialogRef.value!.hide()
      },
    },
    DictSetting,
  )
  nextTick(() => {
    componentRef.value!.init(row)
  })
}

const config = reactive({
  urls: {
    list: dictList,
    delete: dictDelete,
  },
  initialFormData: {
    dictName: '',
    dictCode: '',
    column: 'createTime',
    order: 'desc',
  },
  formItems: [
    {
      model: 'dictName',
      props: {
        label: '字典名称',
      },
    },
    {
      model: 'dictCode',
      props: {
        label: '字典编号',
      },
    },
  ],
  pageListItemForm: markRaw(PageListItemForm),
  btns: [
    {
      text: '新建字典',
      type: 'primary',
      onClick: () => {
        pageListRef.value?.handle({
          type: 'add',
        })
      },
    },
  ],
  columns: [
    {
      title: '字典名称',
      field: 'dictName',
    },
    {
      title: '字典编号',
      field: 'dictCode',
    },
    {
      title: '描述',
      field: 'description',
    },
    {
      title: '操作',
      field: 'c-action',
      fixed: 'right',
      cellRender: {
        name: 'c:btns',
        children: [
          {
            text: '编辑',
            onClick: ({ row }: CellRenderParams) => {
              pageListRef.value?.handle({
                type: 'edit',
                row,
              })
            },
          },
          {
            text: '字典配置',
            onClick: ({ row }: CellRenderParams) => {
              setDict(row)
            },
          },
        ],
      },
    },
  ] as TableColumns,
})
</script>
<template>
  <CPageList ref="pageListRef" :config="config"></CPageList>
</template>
