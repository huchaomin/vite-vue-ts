<script setup lang="ts">
import { qcAssetList } from '@/api/qcasset';

const form = ref(null);
const initialFormData = {
  assetPkgName: '',
  assetSeller: null,
  assetPkgStatus: null,
};
const formData = reactive({ ...initialFormData });
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
    scopedSlots: { customRender: 'action' },
  },
];
const tableData = ref([]);
const pagination = reactive({
  current: 1,
  pageSize: 10,
  total: 0,
  showTotal: true,
});
function query(): void {
  const obj = {};
  for (const key in formData) {
    if (formData[key] !== null && formData[key] !== '') {
      obj[key] = formData[key];
    }
  }
  $api(qcAssetList, {
    column: 'createTime',
    order: 'desc',
    pageNo: pagination.current,
    pageSize: pagination.pageSize,
    ...obj,
  }).then(res => {
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
</script>
<template>
  <v-form ref="form" @submit.prevent="query">
    <v-row class="py-3">
      <v-col cols="2">
        <v-text-field
          v-model="formData.assetPkgName"
          label="资产包名称"
        ></v-text-field>
      </v-col>
      <v-col cols="2">
        <v-select
          v-model="formData.assetSeller"
          :items="assetSeller"
          label="出包方"
        ></v-select>
      </v-col>
      <v-col cols="2">
        <v-select
          v-model="formData.assetPkgStatus"
          :items="assetPkgStatus"
          label="资产包状态"
        ></v-select>
      </v-col>
      <v-col cols="2">
        <v-btn
          type="submit"
          size="large"
        >
          查询
        </v-btn>
        <v-btn
          size="large"
          variant="outlined"
          class="ml-6"
          @click="reset"
        >
          重置
        </v-btn>
      </v-col>
    </v-row>
  </v-form>
  <v-card>
    <v-card-text class="pa-0">
      <a-table
        :columns="columns"
        :data="tableData"
        :pagination="pagination"
      >
      </a-table>
    </v-card-text>
  </v-card>
</template>
