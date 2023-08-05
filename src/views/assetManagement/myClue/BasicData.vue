<script setup lang="ts">
const formData = reactive({
  assetPkgName: '',
  assetProjName: '',
  assetSeller: null,
  assetProdType: null,
  sellerUsername: '',
  sellerUserphone: '',
  sellerUserdesc: '',
})
const assetSeller = $dicStore('qcpg_asset_company,company_name,id')
const assetProdType = $dicStore('asset_prod_type')
</script>
<template>
  <VForm ref="form" class="c-grid" @submit.prevent="">
    <VTextField v-model="formData.assetPkgName" label="资产包名称"></VTextField>
    <VTextField v-model="formData.assetProjName" label="项目名称"></VTextField>
    <VSelect
      v-model="formData.assetSeller"
      :items="assetSeller"
      label="出包方"
    ></VSelect>
    <VSelect
      v-model="formData.assetProdType"
      :items="assetProdType"
      label="产品类型"
    ></VSelect>
    <VTextField v-model="formData.sellerUsername" label="联系人"></VTextField>
    <VTextField
      v-model="formData.sellerUserphone"
      label="联系方式"
    ></VTextField>
    <VTextField
      v-model="formData.sellerUserdesc"
      label="联系人描述"
    ></VTextField>
  </VForm>
</template>
