<!--
 * @Author       : huchaomin peter@qingcongai.com
 * @Date         : 2023-09-26 14:29:00
 * @LastEditors  : huchaomin peter@qingcongai.com
 * @LastEditTime : 2023-10-10 10:10:59
 * @Description  :
-->
<script setup lang="ts">
const form = ref<InstanceType<CForm> | null>(null)
const formData = reactive({
  username: '',
})
const formItems = reactive([
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
  {
    slot: 'btn',
  },
])
</script>
<template>
  <div>
    <VCard>
      <VCardText class="pa-6 pb-0">
        <CForm ref="form" :form-data="formData" :items="formItems" class="c_grid">
          <template #btn>
            <div>
              <VBtn class="mr-2" @click="confirm">查询</VBtn>
              <VBtn variant="tonal" @click="cancel">重置</VBtn>
            </div>
          </template>
        </CForm>
      </VCardText>
    </VCard>
  </div>
</template>
