<script setup lang="ts">
const commonStore = useCommonStore()
const userStore = useUserStore()

function logout(): void {}
</script>
<template>
  <VAppBar flat :border="true" density="comfortable">
    <template #prepend>
      <VAppBarNavIcon
        @click="commonStore.drawerOpen = !commonStore.drawerOpen"
      ></VAppBarNavIcon>
    </template>
    <VAppBarTitle>资产评估管理系统</VAppBarTitle>
    <template #append>
      <VBtn
        prepend-icon="mdi-account-circle-outline"
        size="large"
        height="100%"
        color="inherit"
      >
        {{ userStore.userInfo.realname }}
        <VMenu open-on-hover activator="parent">
          <VList>
            <VListItem title="退出登录" @click="logout"></VListItem>
          </VList>
        </VMenu>
      </VBtn>
    </template>
  </VAppBar>
</template>
