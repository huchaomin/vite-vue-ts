<!--
 * @Author       : huchaomin peter@qingcongai.com
 * @Date         : 2023-10-17 17:17:57
 * @LastEditors  : huchaomin peter@qingcongai.com
 * @LastEditTime : 2023-10-19 14:49:27
 * @Description  :
-->
<script setup lang="ts">
import { dictItemList, dictItemDelete } from '@/api/sys'
import PageListItemForm from './PageListItemForm.vue'

const { height } = useWindowSize()
const tableMaxHeight = computed(() => {
  return height.value - 260
})
const pageListRef = ref<RefCPageList>(null)

let id = ''
async function init(row: CellRenderParams['row']): Promise<void> {
  id = row.id
  query()
}

const config = reactive({
  urls: {
    list: dictItemList,
    delete: dictItemDelete,
  },
  initialFormData: {
    dictName: '',
    dictCode: '',
    column: 'createTime',
    order: 'desc',
  },
  formItems: [
    {
      model: 'dictName',
      props: {
        label: '字典名称',
      },
    },
    {
      model: 'dictCode',
      props: {
        label: '字典编号',
      },
    },
  ],
  pageListItemForm: markRaw(PageListItemForm),
  btns: [
    {
      text: '新增',
      type: 'primary',
      onClick: () => {
        pageListRef.value?.handle({
          type: 'add',
        })
      },
    },
  ],
  columns: [
    {
      title: '名称',
      field: 'itemText',
    },
    {
      title: '数据值',
      field: 'itemValue',
    },
    // {
    //   title: '操作',
    //   field: 'c-action',
    //   cellRender: {
    //     name: 'c:btns',
    //     children: [
    //       {
    //         text: '删除',
    //         onClick: async ({ row }: CellRenderParams) => {
    //           await $confirm('确认删除吗？')
    //           const { data } = await $api(dictItemDelete, {
    //             id: row.id,
    //           })
    //           if (data.value === null) return
    //           query()
    //         },
    //       },
    //     ],
    //   },
    // },
  ] as TableColumns,
  tableProps: {
    maxHeight: tableMaxHeight,
  },
})

defineExpose({
  init,
})
</script>
<template>
  <CPageList ref="pageListRef" :config="config"></CPageList>
</template>
