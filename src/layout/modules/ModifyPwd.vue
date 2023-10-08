<!--
 * @Author       : huchaomin peter@qingcongai.com
 * @Date         : 2023-09-07 13:54:24
 * @LastEditors  : huchaomin peter@qingcongai.com
 * @LastEditTime : 2023-10-08 11:06:35
 * @Description  :
-->
<script setup lang="ts">
import { updatePassword } from '@/api/sys'
import rules from '@/config/rules'
const userStore = useUserStore()
const formData = reactive({
  oldpassword: '',
  password: '',
  confirmpassword: '',
})
function handleSubmit(): Promise<void> {
  return new Promise((resolve, reject) => {
    $confirm('确定要修改密码吗？').then(async () => {
      const { data } = await $api(updatePassword, {
        username: userStore.userInfo.username,
        ...formData,
      })
      if (data.value === null) {
        reject()
      } else {
        resolve()
      }
    })
  })
}

function sameAsPrev(value: string | null): string | true {
  if (value === formData.password) {
    return true
  }
  return '两次输入的密码不一致'
}
defineExpose({
  handleSubmit,
})
</script>
<template>
  <VForm ref="form" @submit.prevent="handleSubmit">
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
