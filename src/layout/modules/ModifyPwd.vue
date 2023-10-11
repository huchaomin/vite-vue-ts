<!--
 * @Author       : huchaomin peter@qingcongai.com
 * @Date         : 2023-09-07 13:54:24
 * @LastEditors  : huchaomin peter@qingcongai.com
 * @LastEditTime : 2023-10-09 17:28:06
 * @Description  :
-->
<script setup lang="ts">
import { updatePassword } from '@/api/sys'

const userStore = useUserStore()
const form = ref<RefCForm>(null)
const formData = reactive({
  oldpassword: '',
  password: '',
  confirmpassword: '',
})

const formItems = reactive([
  {
    model: 'oldpassword',
    props: {
      autofocus: true,
      rules: 'required',
      autocomplete: true,
      type: 'password',
      label: '旧密码',
    },
  },
  {
    model: 'password',
    props: {
      label: '新密码',
      type: 'password',
      rules: 'password',
    },
  },
  {
    model: 'confirmpassword',
    props: {
      label: '确认新密码',
      type: 'password',
      rules: ['required', sameAsPrev],
    },
  },
])
function handleSubmit(): Promise<void> {
  return new Promise((resolve) => {
    form.value!.validate().then(() => {
      $confirm('确定要修改密码吗？').then(async () => {
        const { data } = await $api(updatePassword, {
          username: userStore.userInfo.username,
          ...formData,
        })
        if (data.value !== null) {
          resolve()
        }
      })
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
  <CForm ref="form" :form-data="formData" :items="formItems"></CForm>
</template>
