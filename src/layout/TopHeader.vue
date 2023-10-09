<!--
 * @Author       : huchaomin peter@qingcongai.com
 * @Date         : 2023-09-01 09:32:24
 * @LastEditors  : huchaomin peter@qingcongai.com
 * @LastEditTime : 2023-10-09 16:08:49
 * @Description  :
-->
<script setup lang="ts">
import ModifyPwd from './modules/ModifyPwd.vue'
const commonStore = useCommonStore()
const userStore = useUserStore()

function logout(): void {
  $confirm('确定要退出登录吗？').then(() => {
    userStore.logout()
  })
}

function modifyPwd(): void {
  const { componentRef, dialogRef } = $dialog(
    {
      title: '修改密码',
      width: 400,
      hideAfterConfirm: false,
      onConfirm: async () => {
        await componentRef.value!.handleSubmit()
        dialogRef.value!.hide()
        await userStore.clearSession()
      },
    },
    ModifyPwd,
  )
}
</script>
<template>
  <VAppBar flat density="comfortable" class="pl-1">
    <template #prepend>
      <VAppBarNavIcon
        color="inherit"
        @click="commonStore.drawerOpen = !commonStore.drawerOpen"
      ></VAppBarNavIcon>
    </template>
    <template #append>
      <VBtn prepend-icon="mdi-account-circle-outline" size="large" height="100%" color="inherit">
        {{ userStore.userInfo.realname }}
        <VMenu open-on-hover activator="parent">
          <VList>
            <VListItem title="退出登录" @click="logout"></VListItem>
            <VListItem title="修改密码" @click="modifyPwd"></VListItem>
          </VList>
        </VMenu>
      </VBtn>
    </template>
  </VAppBar>
</template>
