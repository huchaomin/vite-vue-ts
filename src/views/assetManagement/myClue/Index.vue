<script setup lang="ts">
import AddOrEditModal from './AddOrEditModal.vue'
import { qcAssetList, qcAssetListExport } from '@/api/qcasset'
import { downloadBlob } from '@/utils/index'

const form = ref(null)
const initialFormData: Record<string, any> = {
  assetPkgName: '',
  assetSeller: null,
  assetPkgStatus: null,
}
const formData: Record<string, any> = reactive({ ...initialFormData })
const assetSeller = $dicStore('qcpg_asset_company,company_name,id')
const assetPkgStatus = $dicStore('asset_pkg_status')

const columns = [
  {
    title: '资产包名称',
    dataIndex: 'assetPkgName',
  },
  {
    title: '项目名称',
    dataIndex: 'assetProjName',
  },
  {
    title: '出包方',
    dataIndex: 'assetSeller_dictText',
  },
  {
    title: '产品类型',
    dataIndex: 'assetProdType_dictText',
  },
  {
    title: '联系人',
    dataIndex: 'sellerUsername',
  },
  {
    title: '联系方式',
    dataIndex: 'sellerUserphone',
  },
  {
    title: '联系人描述',
    dataIndex: 'sellerUserdesc',
  },
  {
    title: '资产包状态',
    dataIndex: 'assetPkgStatus_dictText',
  },
  {
    title: '创建人',
    dataIndex: 'createBy',
  },
  {
    title: '创建日期',
    dataIndex: 'createTime',
  },
  {
    title: '操作',
    dataIndex: 'action',
    // fixed: 'right',
    width: 147,
  },
]
const tableData = ref([])
const pagination = reactive({
  current: 1,
  pageSize: 10,
  total: 0,
  showTotal: true,
})
function getQueryParams(): Record<string, any> {
  const obj: Record<string, any> = {
    column: 'createTime',
    order: 'desc',
    pageNo: pagination.current,
    pageSize: pagination.pageSize,
  }
  for (const key in formData) {
    if (formData[key] !== null && formData[key] !== '') {
      obj[key] = formData[key]
    }
  }
  return obj
}
function query(): void {
  $api(qcAssetList, getQueryParams()).then((res) => {
    console.log(res)
    if (res.data.value !== null) {
      const { result } = res.data.value
      tableData.value = result.records
      pagination.total = result.total
    }
  })
}
query()
function reset(): void {
  for (const key in initialFormData) {
    formData[key] = initialFormData[key]
  }
  query()
}
function exportExcel(): void {
  $api(qcAssetListExport, getQueryParams()).then((res) => {
    downloadBlob(res.data.value, '资产包列表.xlsx')
  })
}
const addOrEditModal: Ref<InstanceType<typeof AddOrEditModal> | null> =
  ref(null)
function add(): void {
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
  addOrEditModal.value!.visible = true
}
const aaa = ref([])
const gather = []
for (let i = 0; i < 50; i++) {
  gather.push(`选项${i}`)
}
const items = reactive(gather)
</script>
<template>
  <VForm ref="form" class="pt-3 c_grid" @submit.prevent="query">
    <VTextField v-model="formData.assetPkgName" label="资产包名称"></VTextField>
    <VSelect
      v-model="formData.assetSeller"
      :items="assetSeller"
      label="出包方"
    ></VSelect>
    <VSelect
      v-model="formData.assetPkgStatus"
      :items="assetPkgStatus"
      chips
      label="资产包状态"
    ></VSelect>
    <CSelect
      v-model="aaa"
      label="Select"
      chips
      :items="items"
      multiple
    ></CSelect>
    <div>
      <VBtn type="submit">查询</VBtn>
      <VBtn variant="tonal" class="ml-2" @click="reset">重置</VBtn>
    </div>
  </VForm>
  <div class="pb-3">
    <VBtn @click="add">新增</VBtn>
    <VBtn variant="tonal" class="ml-2" @click="exportExcel">导出excel</VBtn>
  </div>
  <VCard>
    <VCardText class="pa-0">
      <ATable
        :columns="columns"
        :data="tableData"
        :pagination="pagination"
        :stripe="true"
      ></ATable>
    </VCardText>
  </VCard>
  <AddOrEditModal ref="addOrEditModal"></AddOrEditModal>
</template>
