<!--
 * @Author       : huchaomin peter@qingcongai.com
 * @Date         : 2023-09-26 14:29:00
 * @LastEditors  : huchaomin peter@qingcongai.com
 * @LastEditTime : 2023-10-11 15:38:14
 * @Description  :
-->
<script setup lang="ts">
import { type apiConfig } from '@/plugins/autoImport/$api'
import { type ItemsType } from '@/components/global/CForm.vue'

interface PageListConfigType {
  urls: Record<string, apiConfig>
  initialFormData: Record<string, any>
  formItems: ItemsType
  columns: TableColumns
}

const props = withDefaults(
  defineProps<{
    config: PageListConfigType
  }>(),
  {},
)

const form = ref<RefCForm>(null)
const formData = reactive({
  ...props.config.initialFormData,
})

const formItems = computed(() => {
  return [...props.config.formItems, { slot: 'btn' }]
})

const tableData = ref([])
const queryParams = ref({})
const pageSize = ref(10)
const pageNo = ref(1)
const total = ref(0)

async function query(): Promise<null | undefined> {
  queryParams.value = {
    ...formData,
    pageNo: pageNo.value,
    pageSize: pageSize.value,
  }
  const { data } = await $api(props.config.urls.list, queryParams.value)
  if (data.value === null) return null
  tableData.value = data.value.records
  total.value = data.value.total
}
query()

async function reset(): Promise<null | undefined> {
  Object.keys(formData).forEach((key) => {
    formData[key] = props.config.initialFormData[key]
  })
  pageSize.value = 10
  pageNo.value = 1
  return await query()
}

function pageSizeChange(val: number): void {
  pageNo.value = 1
  pageSize.value = val
  query()
}
function currentPageChange(val: number): void {
  pageNo.value = val
  query()
}
</script>
<template>
  <div class="d-flex flex-column h-100">
    <VCard class="pa-6 pb-0 flex-0-0">
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
    </VCard>
    <VCard class="pa-6 d-flex flex-column flex-fill">
      <div class="mb-4">
        <VBtn>新增</VBtn>
      </div>
      <div class="flex-fill overflow-y-auto mb-4">
        <CTable :columns="config.columns" :data="tableData" sync-parent-height></CTable>
      </div>
      <CPagination
        :current-page="pageNo"
        :page-size="pageSize"
        :total="total"
        @update:current-page="currentPageChange"
        @update:page-size="pageSizeChange"
      ></CPagination>
    </VCard>
  </div>
</template>
