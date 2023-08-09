<script setup lang="ts">
import LeftDrawer from './LeftDrawer.vue'
const commonStore = useCommonStore()
</script>
<template>
  <VLayout>
    <VAppBar flat :border="true" density="compact">
      <template #prepend>
        <VAppBarNavIcon
          @click="commonStore.drawerOpen = !commonStore.drawerOpen"
        ></VAppBarNavIcon>
      </template>
      <VAppBarTitle>资产评估管理系统</VAppBarTitle>
      <template #append>
        <VBtn icon="mdi-dots-vertical"></VBtn>
      </template>
    </VAppBar>
    <LeftDrawer></LeftDrawer>
    <VMain>
      <div
        class="pa-4 overflow-y-auto"
        style="height: calc((100vh - var(--v-layout-top)))"
      >
        <RouterView></RouterView>
      </div>
    </VMain>
  </VLayout>
</template>
