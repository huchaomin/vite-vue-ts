<!--
 * @Author       : huchaomin peter@qingcongai.com
 * @Date         : 2023-09-26 14:29:00
 * @LastEditors  : huchaomin peter@qingcongai.com
 * @LastEditTime : 2023-10-18 17:16:20
 * @Description  :
-->
<script setup lang="ts">
import { type apiConfig } from '@/plugins/autoImport/$api'
import { type ItemsType } from '@/components/global/CForm.vue'
import { type VBtn } from 'vuetify/components'
import type PageListItemForm from '@/views/systemManagement/roleManagement/modules/PageListItemForm.vue' // 随笔引入一个组件的类型，有没有更好的方法？

interface PageListConfigType {
  urls: Record<string, apiConfig>
  initialFormData: Record<string, any>
  formItems: ItemsType
  pageListItemForm: typeof PageListItemForm
  btns?: Array<InstanceType<typeof VBtn>['$props']>
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

function handle({
  type,
  title,
  width = 400,
  row,
}: {
  type: 'add' | 'edit'
  title?: string
  width?: number
  row?: CellRenderParams['row']
}): void {
  const config = {
    add: {
      title: '新增',
    },
    edit: {
      title: '编辑',
    },
  }
  const { componentRef, dialogRef } = $dialog(
    {
      title: title ?? config[type].title,
      width,
      hideAfterConfirm: false,
      noneCardTextPb: true,
      onConfirm: async () => {
        await componentRef.value!.handleSubmit()
        dialogRef.value!.hide()
        reset()
      },
    },
    props.config.pageListItemForm,
  )
  if (type !== 'add') {
    nextTick(() => {
      componentRef.value!.setFormData(row)
    })
  }
}

async function handleDelete({ row }: CellRenderParams): Promise<void> {
  await $confirm('确认删除吗？')
  const { data } = await $api(props.config.urls.delete, {
    id: row.id,
  })
  if (data.value === null) return
  query()
}

const columns = computed(() => {
  const arr = [...([{ type: 'seq' }] as TableColumns), ...props.config.columns]
  if (props.config.urls.delete !== undefined) {
    const cAction = arr.find((item) => item.field === 'c-action')
    const deleteBtnConfig = {
      text: '删除',
      onClick: handleDelete,
    }
    if (cAction === undefined) {
      arr.push({
        title: '操作',
        field: 'c-action',
        fixed: 'right',
        cellRender: {
          name: 'c:btns',
          children: [deleteBtnConfig],
        },
      })
    } else {
      arr.splice(arr.indexOf(cAction), 1, {
        ...cAction,
        cellRender: {
          ...cAction.cellRender,
          children: [...(cAction.cellRender!.children as []), deleteBtnConfig],
        },
      })
    }
  }
  return arr
})

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

defineExpose({
  handle,
  query,
  reset,
})
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
        <VBtn v-for="(btn, index) in config.btns" :key="index" v-bind="btn"></VBtn>
      </div>
      <div class="flex-fill overflow-y-auto mb-4">
        <CTable :columns="columns" :data="tableData" sync-parent-height>
          <template
            v-for="k in Object.keys($slots).filter((key) => key.startsWith('table-'))"
            :key="k"
            #[k.slice(6)]="slotScope"
          >
            <slot :name="k" v-bind="slotScope"></slot>
          </template>
        </CTable>
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
