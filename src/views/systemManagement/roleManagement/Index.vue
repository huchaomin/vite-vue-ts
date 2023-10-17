<!--
 * @Author       : huchaomin peter@qingcongai.com
 * @Date         : 2023-09-26 14:29:00
 * @LastEditors  : huchaomin peter@qingcongai.com
 * @LastEditTime : 2023-10-17 15:59:55
 * @Description  :
-->
<script setup lang="ts">
import { roleList, roleDelete } from '@/api/sys'
import PageListItemForm from './modules/PageListItemForm.vue'

const pageListRef = ref<RefCPageList>(null)

const config = reactive({
  urls: {
    list: roleList,
    delete: roleDelete,
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
  pageListItemForm: markRaw(PageListItemForm),
  btns: [
    {
      text: '新建角色',
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
        ],
      },
    },
  ] as TableColumns,
})
</script>
<template>
  <CPageList ref="pageListRef" :config="config"></CPageList>
</template>
