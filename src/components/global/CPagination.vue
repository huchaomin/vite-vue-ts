<!--
 * @Author       : huchaomin peter@qingcongai.com
 * @Date         : 2023-10-11 11:17:22
 * @LastEditors  : huchaomin peter@qingcongai.com
 * @LastEditTime : 2023-10-11 14:20:06
 * @Description  :
-->
<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    currentPage: number
    pageSize: number
    pageSizes?: number[]
    total: number
  }>(),
  {
    pageSizes: () => [10, 20, 50, 100],
  },
)

const emit = defineEmits<{
  (event: 'update:currentPage', payload: number): void
  (event: 'update:pageSize', payload: number): void
}>()

const current = computed({
  get: () => props.currentPage,
  set: (val) => {
    emit('update:currentPage', val)
  },
})
const currentPageSize = computed({
  get: () => props.pageSize,
  set: (val) => {
    emit('update:pageSize', val)
  },
})
const pageSizesOptions = computed(() =>
  props.pageSizes.map((item) => ({
    label: `${item}条/页`,
    value: item,
  })),
)
const max = computed(() => Math.ceil(props.total / props.pageSize))
</script>
<template>
  <div v-if="total > 0" class="d-flex align-center justify-end">
    <VSelect
      v-model="currentPageSize"
      :items="pageSizesOptions"
      class="flex-0-0"
      hide-details
    ></VSelect>
    <VPagination v-model="current" :total-visible="8" :length="max" class="mx-2"></VPagination>
    <span>共 {{ total }} 条</span>
  </div>
</template>
<style lang="scss" scoped>
.v-select {
  width: 120px;
}

:deep(.v-pagination__list) {
  gap: 4px;
}
</style>
