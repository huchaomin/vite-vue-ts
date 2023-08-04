<script setup lang="ts">
const formData = reactive({
  assetPkgName: '',
  assetProjName: '',
  assetSeller: null,
  assetProdType: null,
  sellerUsername: '',
  sellerUserphone: '',
  sellerUserdesc: '',
});
const assetSeller = $dicStore('qcpg_asset_company,company_name,id');
const assetProdType = $dicStore('asset_prod_type');
</script>
<template>
  <v-form
    ref="form"
    class="c-grid"
    @submit.prevent=""
  >
    <v-text-field
      v-model="formData.assetPkgName"
      label="资产包名称"
    ></v-text-field>

    <v-text-field
      v-model="formData.assetProjName"
      label="项目名称"
    ></v-text-field>

    <v-select
      v-model="formData.assetSeller"
      :items="assetSeller"
      label="出包方"
    ></v-select>

    <v-select
      v-model="formData.assetProdType"
      :items="assetProdType"
      label="产品类型"
    ></v-select>

    <v-text-field
      v-model="formData.sellerUsername"
      label="联系人"
    ></v-text-field>

    <v-text-field
      v-model="formData.sellerUserphone"
      label="联系方式"
    ></v-text-field>

    <v-text-field
      v-model="formData.sellerUserdesc"
      label="联系人描述"
    ></v-text-field>
  </v-form>
</template>
