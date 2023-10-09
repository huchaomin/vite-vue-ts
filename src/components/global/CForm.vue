<!--
 * @Author       : huchaomin peter@qingcongai.com
 * @Date         : 2023-10-08 15:13:29
 * @LastEditors  : huchaomin peter@qingcongai.com
 * @LastEditTime : 2023-10-08 17:21:45
 * @Description  :
-->
<script setup lang="ts">
import { type VForm } from 'vuetify/components'
interface ItemType {
  component: string
}
withDefaults(
  defineProps<{
    items: ItemType[]
  }>(),
  {},
)
const form = ref<InstanceType<typeof VForm> | null>(null)
</script>
<template>
  <VForm ref="form">
    <VTextField
      v-model="formData.oldpassword"
      autofocus
      :rules="rules.required"
      autocomplete
      type="password"
      label="旧密码"
    ></VTextField>
    <VTextField
      v-model="formData.password"
      label="新密码"
      type="password"
      :rules="rules.password"
    ></VTextField>
    <VTextField
      v-model="formData.confirmpassword"
      label="确认新密码"
      type="password"
      :rules="[...rules.required, sameAsPrev]"
    ></VTextField>
  </VForm>
</template>
