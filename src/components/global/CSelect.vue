<script setup lang="ts">
import { type VSelect } from 'vuetify/lib/components/VSelect/index.mjs'
const props = withDefaults(
  defineProps<{
    modelValue: VSelect['modelValue']
    items: VSelect['items']
    itemValue?: VSelect['itemValue']
    itemDisabled?: VSelect['itemDisabled']
    multiple?: VSelect['multiple']
    returnObject?: VSelect['returnObject']
    // 是否在多选时，prepend一个全选的选项
    // 不支持 Dot notation、valueComparator 等
    prependSelectAll?: boolean
  }>(),
  {
    itemValue: 'value',
    itemDisabled: 'disabled',
    multiple: false,
    returnObject: false,
    prependSelectAll: true,
  },
)
const emit =
  defineEmits<
    (event: 'update:modelValue', payload: VSelect['modelValue']) => void
  >()
const model = computed({
  get: () => props.modelValue,
  set: (val) => {
    emit('update:modelValue', val)
  },
})

const isStringItem = computed(() => {
  return typeof props.items[0] === 'string'
})
const notDisabledItems = computed(() => {
  if (isStringItem.value) {
    return props.items
  }
  return props.items.filter((item: any) => item[props.itemDisabled] !== true)
})
const hasSomeSelected = computed(() => {
  return props.modelValue.length > 0
})
const hasAllSelected = computed(() => {
  return props.modelValue.length === notDisabledItems.value.length
})
function toggleAll(): void {
  if (hasSomeSelected.value) {
    emit('update:modelValue', [])
  } else {
    const arr = notDisabledItems.value.map((item: any) =>
      isStringItem.value || props.returnObject === true
        ? toRaw(item)
        : item[props.itemValue as string],
    )
    emit('update:modelValue', arr)
  }
}
const slots = useSlots()
const slotKeys = computed(
  () => Object.keys(slots) as Array<keyof VSelect['$slots']>, // 解决 #[k]="slotScope" 时的类型问题,这里的类型比较严格，只能是 VSelect['$slots'] 中的 key
)
</script>
<template>
  <VSelect
    ref="select"
    v-model="model"
    :items="items"
    :item-value="itemValue"
    :multiple="multiple"
    :return-object="returnObject"
  >
    <template
      v-if="multiple && prependSelectAll && !('prepend-item' in $slots)"
      #prepend-item
    >
      <VListItem title="全部" @click="toggleAll">
        <template #prepend>
          <VCheckboxBtn
            :indeterminate="hasSomeSelected && !hasAllSelected"
            :model-value="hasSomeSelected"
          ></VCheckboxBtn>
        </template>
      </VListItem>
      <VDivider></VDivider>
    </template>
    <template v-for="k of slotKeys" :key="k" #[k]="slotScope">
      <slot :name="k" v-bind="slotScope || {}"></slot>
    </template>
  </VSelect>
</template>
