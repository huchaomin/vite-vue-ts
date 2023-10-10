<!--
 * @Author       : huchaomin peter@qingcongai.com
 * @Date         : 2023-09-26 14:29:00
 * @LastEditors  : huchaomin peter@qingcongai.com
 * @LastEditTime : 2023-10-10 19:12:30
 * @Description  :
-->
<script setup lang="ts">
import { userList } from '@/api/sys'
import { type VxeGridPropTypes } from 'vxe-table'

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

const columns: VxeGridPropTypes.Columns = [
  { type: 'seq' },
  { type: 'radio' },
  { type: 'checkbox' },
  { field: 'name', title: 'Name', slots: { default: 'name' } },
  { field: 'sex', title: 'Sex', showHeaderOverflow: true },
  { field: 'address', title: 'Address', showOverflow: true },
]
const data = [
  {
    id: 10001,
    name: 'Test1',
    role: 'Develop',
    sex: 'Man',
    age: 28,
    address: 'test abc',
  },
  {
    id: 10002,
    name: 'Test2',
    role: 'Test',
    sex: 'Women',
    age: 22,
    address:
      'GuangzhouGuangzhouGuangzhouGuangzhouGuangzhouGuangzhouGuangzhouGuangzhouGuangzhouGuangzhouGuangzhouGuangzhou',
  },
  {
    id: 10003,
    name: 'Test3',
    role: 'PM',
    sex: 'Man',
    age: 32,
    address: 'Shanghai',
  },
  {
    id: 10004,
    name: 'Test4',
    role: 'Designer',
    sex: 'Women',
    age: 24,
    address: 'Shanghai',
  },
]
</script>
<template>
  <div>
    <VCard>
      <VCardText class="pa-6 pb-0">
        <CForm
          ref="form"
          :form-data="formData"
          :items="formItems"
          class="c_grid"
          @submit.prevent="query"
        >
          <template #btn>
            <div>
              <VBtn type="submit">查询</VBtn>
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
        <CTable :columns="columns" :data="data">
          <template #name="{ row }">
            <span>自定义插槽模板 {{ row.name }}</span>
          </template>
        </CTable>
      </VCardText>
    </VCard>
  </div>
</template>
