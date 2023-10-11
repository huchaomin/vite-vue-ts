<!--
 * @Author       : huchaomin peter@qingcongai.com
 * @Date         : 2023-09-26 14:29:00
 * @LastEditors  : huchaomin peter@qingcongai.com
 * @LastEditTime : 2023-10-11 16:12:24
 * @Description  :
-->
<script setup lang="ts">
import { roleList } from '@/api/sys'

const config = reactive({
  urls: {
    list: roleList,
  },
  initialFormData: {
    roleName: '',
  },
  formItems: [
    {
      model: 'roleName',
      props: {
        label: '角色名称',
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
      scopedSlots: { customRender: 'action' },
    },
  ] as TableColumns,
})
</script>
<template>
  <CPageList :config="config"></CPageList>
</template>
