<!--
 * @Author       : huchaomin peter@qingcongai.com
 * @Date         : 2023-09-26 14:29:00
 * @LastEditors  : huchaomin peter@qingcongai.com
 * @LastEditTime : 2023-10-11 16:42:21
 * @Description  :
-->
<script setup lang="ts">
import { userList } from '@/api/sys'

const config = reactive({
  urls: {
    list: userList,
  },
  initialFormData: {
    username: '',
    sex: null,
    realname: '',
    phone: '',
    status: null,
  },
  formItems: [
    {
      model: 'username',
      props: {
        label: '账号',
      },
    },
    {
      component: 'VSelect',
      model: 'sex',
      props: {
        label: '性别',
        items: $dicStore('sex'),
      },
    },
    {
      model: 'realname',
      props: {
        label: '真实名字',
      },
    },
    {
      model: 'phone',
      props: {
        label: '手机号码',
      },
    },
    {
      component: 'VSelect',
      model: 'status',
      props: {
        label: '用户状态',
        items: $dicStore('user_status', ['1', '2']),
      },
    },
  ],
  columns: [
    {
      title: '用户账号',
      field: 'username',
    },
    {
      title: '用户姓名',
      field: 'realname',
    },
    {
      title: '性别',
      field: 'sex_dictText',
    },
    {
      title: '生日',
      field: 'birthday',
    },
    {
      title: '手机号码',
      field: 'phone',
    },
    {
      title: '部门',
      field: 'orgCodeTxt',
    },
    {
      title: '负责部门',
      field: 'departIds_dictText',
    },
    {
      title: '状态',
      field: 'status_dictText',
    },
  ] as TableColumns,
})
</script>
<template>
  <CPageList :config="config"></CPageList>
</template>
