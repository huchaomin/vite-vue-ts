<!--
 * @Author       : huchaomin peter@qingcongai.com
 * @Date         : 2023-09-26 14:29:00
 * @LastEditors  : huchaomin peter@qingcongai.com
 * @LastEditTime : 2023-10-16 13:58:37
 * @Description  :
-->
<script setup lang="ts">
import { roleList } from '@/api/sys'
import AddForm from './modules/AddForm.vue'

const pageListRef = ref<RefCPageList>(null)

function option(type: string): void {
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
      slots: { default: 'action' },
      cellRender: {
        name: 'c:default',
      },
    },
  ] as TableColumns,
})

const aa = ref('bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb')
</script>
<template>
  <CPageList ref="pageListRef" :config="config">
    <template #table-action>
      {{ aa }}
    </template>
  </CPageList>
</template>
