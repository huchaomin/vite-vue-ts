<script setup lang="ts">
const commonStore = useCommonStore()
const userStore = useUserStore()

function logout(): void {
  $confirm('确定要退出登录吗？').then(() => {
    userStore.logout()
  })
}
</script>
<template>
  <VAppBar flat density="comfortable">
    <template #prepend>
      <VAppBarNavIcon
        @click="commonStore.drawerOpen = !commonStore.drawerOpen"
      ></VAppBarNavIcon>
    </template>
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
