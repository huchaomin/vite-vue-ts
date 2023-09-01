<script setup lang="ts">
import LeftDrawer from './LeftDrawer.vue'
import TopHeader from './TopHeader.vue'
</script>
<template>
  <VLayout>
    <LeftDrawer></LeftDrawer>
    <TopHeader></TopHeader>
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
