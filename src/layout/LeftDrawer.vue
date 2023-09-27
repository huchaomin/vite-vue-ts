<script setup lang="ts">
import { useLayout } from 'vuetify'
import MenuNode from './modules/MenuNode.vue'
const route = useRoute()
const userStore = useUserStore()
const commonStore = useCommonStore()
const { mainStyles } = useLayout()
const appName = APP_NAME
const headerHeight = computed(() => {
  return mainStyles.value['--v-layout-top']
})

const defaultOpened = computed(() => {
  return route.matched.map((item) => item.name)
})
</script>
<template>
  <VNavigationDrawer v-model="commonStore.drawerOpen">
    <div class="logo_wrapper d-flex align-center px-4 py-2" :style="{ height: headerHeight }">
      <img class="logo" src="~img/logo.png" />
      <span class="text-h6 pl-6">{{ appName }}</span>
    </div>
    <VList
      :opened="defaultOpened"
      :style="{ height: `calc(100% - ${headerHeight})` }"
      class="overflow-y-auto pa-0"
      density="default"
    >
      <MenuNode :model="userStore.routersRaw[0].children!"></MenuNode>
    </VList>
  </VNavigationDrawer>
</template>
<style lang="scss" scoped>
.logo_wrapper {
  img {
    height: 100%;
  }
}
</style>
