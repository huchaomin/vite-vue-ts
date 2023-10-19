<!--
 * @Author       : huchaomin peter@qingcongai.com
 * @Date         : 2023-10-17 17:17:57
 * @LastEditors  : huchaomin peter@qingcongai.com
 * @LastEditTime : 2023-10-18 22:47:12
 * @Description  :
-->
<script setup lang="ts">
import { dictItemList, dictItemDelete } from '@/api/sys'

const { height } = useWindowSize()
const tableMaxHeight = computed(() => {
  return height.value - 260
})

const tableData: Ref<any[]> = ref([])
let id = ''
async function query(): Promise<null | undefined> {
  const { data } = await $api(dictItemList, {
    dictId: id,
    pageNo: 1,
    pageSize: 1000,
  })
  if (data.value === null) return
  tableData.value = data.value.records
}

async function init(row: CellRenderParams['row']): Promise<void> {
  id = row.id
  query()
}

const columns = [
  {
    title: '名称',
    field: 'itemText',
    cellRender: {
      name: 'e:textField',
    },
  },
  {
    title: '数据值',
    field: 'itemValue',
  },
  {
    title: '是否启用',
    field: 'status',
    cellRender: {
      name: 'c:switch',
      props: {
        trueValue: 1,
        falseValue: 0,
      },
    },
  },
  {
    title: '描述',
    field: 'description',
    cellRender: {
      name: 'e:textField',
    },
  },
  {
    title: '操作',
    field: 'c-action',
    cellRender: {
      name: 'c:btns',
      children: [
        {
          text: '删除',
          onClick: async ({ row }: CellRenderParams) => {
            await $confirm('确认删除吗？')
            const { data } = await $api(dictItemDelete, {
              id: row.id,
            })
            if (data.value === null) return
            query()
          },
        },
      ],
    },
  },
]

function add(): void {
  tableData.value.push({
    itemText: '',
    itemValue: '',
    status: 1,
    description: '',
  })
}

defineExpose({
  init,
})
</script>
<template>
  <VBtn class="mb-4" @click="add">新增</VBtn>
  <CTable
    :columns="columns"
    :data="tableData"
    :max-height="tableMaxHeight"
    keep-source
    :edit-config="{
      trigger: 'manual',
      mode: 'row',
      showStatus: true,
    }"
  ></CTable>
</template>
