<script setup lang="ts">
import LeftDrawer from './LeftDrawer.vue'
</script>
<template>
  <VLayout>
    <VAppBar title="资产评估管理系统" :elevation="0" :border="true"></VAppBar>
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
