<!--
 * @Author       : huchaomin peter@qingcongai.com
 * @Date         : 2023-09-26 14:29:00
 * @LastEditors  : huchaomin peter@qingcongai.com
 * @LastEditTime : 2023-10-16 16:23:43
 * @Description  :
-->
<script setup lang="ts">
import { roleList } from '@/api/sys'
import AddForm from './modules/AddForm.vue'

const pageListRef = ref<RefCPageList>(null)

function option(type: string, row?: CellRenderParams['row']): void {
  const { componentRef, dialogRef } = $dialog(
    {
      title: type === 'add' ? '新增' : '编辑',
      width: 400,
      hideAfterConfirm: false,
      onConfirm: async () => {
        await componentRef.value!.handleSubmit()
        dialogRef.value!.hide()
        pageListRef.value!.reset()
      },
    },
    AddForm,
  )
  if (type === 'edit') {
    nextTick(() => {
      componentRef.value!.setFormData(row)
    })
  }
}

const config = reactive({
  urls: {
    list: roleList,
  },
  initialFormData: {
    roleName: '',
    column: 'createTime',
    order: 'desc',
  },
  formItems: [
    {
      model: 'roleName',
      props: {
        label: '角色名称',
      },
    },
  ],
  btns: [
    {
      text: '新建角色',
      type: 'primary',
      onClick: () => {
        option('add')
      },
    },
  ],
  columns: [
    {
      title: '角色编码',
      field: 'roleCode',
    },
    {
      title: '角色名称',
      field: 'roleName',
    },
    {
      title: '创建时间',
      field: 'createTime',
    },
    {
      title: '操作',
      field: 'action',
      cellRender: {
        name: 'c:btns',
        children: [
          {
            text: '编辑',
            onClick: ({ row }: CellRenderParams) => {
              option('edit', row)
            },
          },
        ],
      },
      fixed: 'right',
    },
  ] as TableColumns,
})
</script>
<template>
  <CPageList ref="pageListRef" :config="config"></CPageList>
</template>
