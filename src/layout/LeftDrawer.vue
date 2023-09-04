<script setup lang="ts">
import { useLayout } from 'vuetify'
import MenuNode from './MenuNode.vue'
const userStore = useUserStore()
const commonStore = useCommonStore()
const { mainStyles } = useLayout()
const headerHeight = computed(() => {
  return mainStyles.value['--v-layout-top']
})
</script>
<template>
  <VNavigationDrawer v-model="commonStore.drawerOpen">
    <div
      class="logo_wrapper d-flex align-center pa-2"
      :style="{ height: headerHeight }"
    >
      <img class="logo" src="~img/logo.png" />
      <span class="text-h6 pl-6">资产定价平台</span>
    </div>
    <div
      :style="{ height: `calc(100% - ${headerHeight})` }"
      class="overflow-y-auto"
    >
      <MenuNode :model="userStore.routersRaw[0].children!"></MenuNode>
    </div>
  </VNavigationDrawer>
</template>
<style lang="scss" scoped>
.logo_wrapper {
  img {
    height: 100%;
  }
}
</style>
