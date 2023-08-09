<script setup lang="ts">
import MenuNode from './MenuNode.vue'
const userStore = useUserStore()
const commonStore = useCommonStore()
</script>
<template>
  <VNavigationDrawer v-model="commonStore.drawerOpen">
    <MenuNode :model="userStore.routersRaw[0].children!"></MenuNode>
  </VNavigationDrawer>
</template>
