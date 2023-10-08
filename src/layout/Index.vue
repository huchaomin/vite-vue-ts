<!--
 * @Author       : huchaomin iisa_peter@163.com
 * @Date         : 2023-08-06 09:42:59
 * @LastEditors  : huchaomin peter@qingcongai.com
 * @LastEditTime : 2023-10-07 17:01:31
 * @Description  :
-->
<script setup lang="ts">
import LeftDrawer from './LeftDrawer.vue'
import TopHeader from './TopHeader.vue'
const bus = useEventBus<string>('routeMounted')
function routeMounted(): void {
  bus.emit('routeMounted')
}
</script>
<template>
  <VLayout>
    <LeftDrawer></LeftDrawer>
    <TopHeader></TopHeader>
    <VMain>
      <div class="pa-4 overflow-y-auto" style="height: calc((100vh - var(--v-layout-top)))">
        <RouterView v-slot="{ Component }">
          <VFadeTransition mode="out-in">
            <KeepAlive :include="['userManagement']">
              <Component :is="Component" @vue:mounted="routeMounted"></Component>
            </KeepAlive>
          </VFadeTransition>
        </RouterView>
      </div>
    </VMain>
  </VLayout>
</template>
