<!--
* @Author       : huchaomin peter@qingcongai.com
* @Date         : 2023-10-08 15:13:29
 * @LastEditors  : huchaomin peter@qingcongai.com
 * @LastEditTime : 2023-10-10 10:02:14
* @Description  :
-->
<script setup lang="ts">
/* eslint-disable vue/no-mutating-props */
import { type VForm, type VSelect, type VTextField } from 'vuetify/components'
import rules, { type ValidationRule } from '@/config/rules'

type SelectPropsType = InstanceType<typeof VSelect>['$props']
type TextFieldPropsType = InstanceType<typeof VTextField>['$props']

interface PropsType {
  rules?: string | string[] | ValidationRule | ValidationRule[] | Array<string | ValidationRule>
  [propName: string]: any
}

interface ItemType {
  component?: string | Component // 组件名称
  model: string // 组件 v-model 绑定的值
  props?: PropsType // 组件属性
}

interface SlotType {
  slot: string
}

const props = withDefaults(
  defineProps<{
    formData: any
    items: Array<ItemType | SlotType>
  }>(),
  {},
)
const form = ref<InstanceType<typeof VForm> | null>(null)

function setItemRules(rs: NonNullable<PropsType['rules']>): ValidationRule[] {
  const arr = Array.isArray(rs) ? rs : [rs]
  return _.flatten(
    arr.map((r) => {
      if (typeof r === 'string' && rules[r] !== undefined) {
        return rules[r]
      }
      return r
    }),
  )
}

const computedItems = computed(() => {
  return props.items.map((item) => {
    if ((item as SlotType).slot !== undefined) {
      return item
    }
    return {
      ...item,
      props: {
        ...((item as ItemType).props ?? {}),
        rules: setItemRules((item as ItemType).props?.rules ?? []),
      },
    }
  })
})

function validate(): Promise<void> {
  return new Promise((resolve) => {
    form.value!.validate().then(({ valid }) => {
      if (valid) {
        resolve()
      }
    })
  })
}

defineExpose({
  form,
  validate,
})
</script>
<template>
  <VForm ref="form">
    <template v-for="item in computedItems" :key="item.slot ?? item.model">
      <slot v-if="(item as SlotType).slot" :name="(item as SlotType).slot"></slot>
      <VSelect
        v-else-if="(item as ItemType).component === 'VSelect'"
        v-bind="(item as ItemType).props as SelectPropsType"
        v-model="formData[(item as ItemType).model]"
      ></VSelect>
      <VTextField
        v-else-if="(item as ItemType).component === undefined"
        v-bind="(item as ItemType).props as TextFieldPropsType"
        v-model="formData[(item as ItemType).model]"
      ></VTextField>
      <Component
        :is="(item as ItemType).component"
        v-else
        v-model="formData[(item as ItemType).model]"
        v-bind="(item as ItemType).props"
      ></Component>
    </template>
  </VForm>
</template>
