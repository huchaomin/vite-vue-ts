<!--
* @Author       : huchaomin peter@qingcongai.com
* @Date         : 2023-10-08 15:13:29
 * @LastEditors  : huchaomin peter@qingcongai.com
 * @LastEditTime : 2023-10-09 18:20:03
* @Description  :
-->
<script setup lang="ts">
/* eslint-disable vue/no-mutating-props */
import { type VForm } from 'vuetify/components'
import rules, { type ValidationRule } from '@/config/rules'

interface PropsType {
  rules:
    | string
    | string[]
    | ValidationRule
    | ValidationRule[]
    | Array<string | ValidationRule>
    | undefined
  [propName: string]: any
}

interface ItemType {
  component?: string | Component // 组件名称
  model: string // 组件 v-model 绑定的值
  props?: PropsType // 组件属性
}

const props = withDefaults(
  defineProps<{
    formData: any
    items: ItemType[]
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
    return {
      ...item,
      props: {
        ...(item.props ?? {}),
        rules: setItemRules(item.props?.rules ?? []),
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
    <template v-for="(item, index) in computedItems">
      <template v-if="typeof item.component === 'string' || item.component === undefined">
        <VTextField :key="index" v-model="formData[item.model]" v-bind="item.props"></VTextField>
      </template>
      <Component
        :is="item.component"
        v-else
        :key="index"
        v-model="formData[item.model]"
        v-bind="item.props"
      ></Component>
    </template>
  </VForm>
</template>
