<script setup lang="ts">
import MenuNode from './MenuNode.vue'
const userStore = useUserStore()
</script>
<template>
  <VNavigationDrawer>
    <MenuNode :model="userStore.routersRaw[0].children!"></MenuNode>
  </VNavigationDrawer>
</template>
