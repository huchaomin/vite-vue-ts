<script setup lang="ts">
import AddOrEditModal from './AddOrEditModal.vue';
import { qcAssetList, qcAssetListExport } from '@/api/qcasset';
import { downloadBlob } from '@/utils/index';

const form = ref(null);
const initialFormData: Record<string, any> = {
  assetPkgName: '',
  assetSeller: null,
  assetPkgStatus: null,
};
const formData: Record<string, any> = reactive({ ...initialFormData });
const assetSeller = $dicStore('qcpg_asset_company,company_name,id');
const assetPkgStatus = $dicStore('asset_pkg_status');

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
    fixed: 'right',
    width: 147,
  },
];
const tableData = ref([]);
const pagination = reactive({
  current: 1,
  pageSize: 10,
  total: 0,
  showTotal: true,
});
function getQueryParams(): Record<string, any> {
  const obj: Record<string, any> = {
    column: 'createTime',
    order: 'desc',
    pageNo: pagination.current,
    pageSize: pagination.pageSize,
  };
  for (const key in formData) {
    if (formData[key] !== null && formData[key] !== '') {
      obj[key] = formData[key];
    }
  }
  return obj;
}
function query(): void {
  $api(qcAssetList, getQueryParams()).then(res => {
    console.log(res);
    if (res.data.value !== null) {
      const { result } = res.data.value;
      tableData.value = result.records;
      pagination.total = result.total;
    }
  });
}
query();
function reset(): void {
  for (const key in initialFormData) {
    formData[key] = initialFormData[key];
  }
  query();
}
function exportExcel(): void {
  $api(qcAssetListExport, getQueryParams()).then(res => {
    downloadBlob(res.data.value, '资产包列表.xlsx');
  });
}
const addOrEditModal: Ref<InstanceType<typeof AddOrEditModal> | null> = ref(null);
function add(): void {
  if (addOrEditModal.value !== null) {
    addOrEditModal.value.visible = true;
  }
}
</script>
<template>
  <v-form
    ref="form"
    class="pt-3 c-grid"
    @submit.prevent="query"
  >
    <v-text-field
      v-model="formData.assetPkgName"
      label="资产包名称"
    ></v-text-field>
    <v-select
      v-model="formData.assetSeller"
      :items="assetSeller"
      label="出包方"
    ></v-select>
    <v-select
      v-model="formData.assetPkgStatus"
      :items="assetPkgStatus"
      label="资产包状态"
    ></v-select>
    <div>
      <v-btn
        type="submit"
        size="large"
      >
        查询
      </v-btn>
      <v-btn
        size="large"
        variant="tonal"
        class="ml-2"
        @click="reset"
      >
        重置
      </v-btn>
    </div>
  </v-form>
  <div class="pb-3">
    <v-btn @click="add">
      新增
    </v-btn>
    <v-btn
      variant="tonal"
      class="ml-2"
      @click="exportExcel"
    >
      导出excel
    </v-btn>
  </div>
  <v-card>
    <v-card-text class="pa-0">
      <a-table
        :columns="columns"
        :data="tableData"
        :pagination="pagination"
        :stripe="true"
      >
      </a-table>
    </v-card-text>
  </v-card>
  <AddOrEditModal ref="addOrEditModal"></AddOrEditModal>
</template>
