<!--
* @Author       : huchaomin peter@qingcongai.com
* @Date         : 2023-10-08 15:13:29
 * @LastEditors  : huchaomin peter@qingcongai.com
 * @LastEditTime : 2023-10-12 10:44:33
* @Description  :
-->
<script setup lang="ts">
/* eslint-disable vue/no-mutating-props */
import { type VForm, type VSelect, type VTextField, type VTextarea } from 'vuetify/components'
import rules, { type ValidationRule, type CustomerValidationRule } from '@/config/rules'

type SelectPropsType = InstanceType<typeof VSelect>['$props']
type TextFieldPropsType = InstanceType<typeof VTextField>['$props']
type TextareaPropsType = InstanceType<typeof VTextarea>['$props']

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

export type ItemsType = Array<ItemType | SlotType>

const props = withDefaults(
  defineProps<{
    formData: any
    items: ItemsType
  }>(),
  {},
)
const form = ref<InstanceType<typeof VForm> | null>(null)

function setItemRules(rs: NonNullable<PropsType['rules']>): ValidationRule[] {
  const arr = Array.isArray(rs) ? rs : [rs]
  return _.flatten(
    arr.map((r) => {
      if (typeof r === 'string') {
        if (rules[r] !== undefined) {
          return rules[r] as ValidationRule[]
        }
        if (r.includes(':')) {
          const [ruleName, ...ruleArg] = r.split(':')
          return (rules[ruleName] as CustomerValidationRule)(...ruleArg)
        }
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
      <VTextarea
        v-else-if="(item as ItemType).component === 'VTextarea'"
        v-bind="(item as ItemType).props as TextareaPropsType"
        v-model="formData[(item as ItemType).model]"
      ></VTextarea>
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
