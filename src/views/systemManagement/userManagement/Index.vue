<!--
 * @Author       : huchaomin peter@qingcongai.com
 * @Date         : 2023-09-26 14:29:00
 * @LastEditors  : huchaomin peter@qingcongai.com
 * @LastEditTime : 2023-10-10 18:36:06
 * @Description  :
-->
<script setup lang="ts">
import { userList } from '@/api/sys'
const form = ref<InstanceType<CForm> | null>(null)
const initialFormData: Record<string, any> = {
  username: '',
  sex: null,
  realname: '',
  phone: '',
  status: null,
}
const formData = reactive({
  ...initialFormData,
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

const tableData = ref([])
const queryParams = ref({})
const pageSize = ref(10)
const pageNo = ref(1)
const total = ref(0)
const urls = {
  list: userList,
}

async function query(): Promise<null | undefined> {
  queryParams.value = {
    ...formData,
    pageNo: pageNo.value,
    pageSize: pageSize.value,
  }
  const { data } = await $api(urls.list, queryParams.value)
  if (data.value === null) return null
  tableData.value = data.value.records
  total.value = data.value.total
}
query()

async function reset(): Promise<null | undefined> {
  Object.keys(formData).forEach((key) => {
    formData[key] = initialFormData[key]
  })
  pageSize.value = 10
  pageNo.value = 1
  return await query()
}
</script>
<template>
  <div>
    <VCard>
      <VCardText class="pa-6 pb-0">
        <CForm ref="form" :form-data="formData" :items="formItems" class="c_grid">
          <template #btn>
            <div>
              <VBtn @click="query">查询</VBtn>
              <VBtn variant="tonal" @click="reset">重置</VBtn>
            </div>
          </template>
        </CForm>
      </VCardText>
    </VCard>
    <VCard>
      <VCardText class="pa-6">
        <div>
          <VBtn>新增</VBtn>
        </div>
      </VCardText>
    </VCard>
  </div>
</template>
