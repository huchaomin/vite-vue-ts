<script setup lang="ts">
import { updatePassword } from '@/api/sys'
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
defineExpose({
  handleSubmit,
})
</script>
<template>
  <VForm ref="form" @submit.prevent="handleSubmit">
    <VTextField
      v-model="formData.oldpassword"
      autofocus
      autocomplete
      type="password"
      label="旧密码"
    ></VTextField>
    <VTextField
      v-model="formData.password"
      label="新密码"
      autocomplete
      type="password"
    ></VTextField>
    <VTextField
      v-model="formData.confirmpassword"
      label="确认新密码"
      autocomplete
      type="password"
    ></VTextField>
  </VForm>
</template>
