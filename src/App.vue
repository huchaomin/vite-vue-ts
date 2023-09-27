<!--
 * @Author       : huchaomin iisa_peter@163.com
 * @Date         : 2023-06-22 14:22:27
 * @LastEditors  : huchaomin peter@qingcongai.com
 * @LastEditTime : 2023-09-26 14:35:21
 * @Description  :
-->
<script setup lang="ts">
import { useEventBus, useAnimate } from '@vueuse/core'
const commonStore = useCommonStore()
const notifyStore = useNotifyStore()
const dialogStore = useDialogStore()

const waiting = ref<HTMLElement | null>(document.getElementById('waiting'))
const app = ref<HTMLElement | null>()
const { play: waitingPlay, playState: waitingPlayState } = useAnimate(
  waiting,
  { opacity: 0 },
  { duration: 300 },
)
const { play: appPlay, playState: appPlayState } = useAnimate(
  app,
  { opacity: 1 },
  { duration: 800 },
)

watch(waitingPlayState, (val) => {
  if (val === 'finished') {
    waiting.value!.remove()
    app.value = document.getElementById('app') // 不能写在上面
    appPlay()
  }
})
watch(appPlayState, (val) => {
  if (val === 'finished') {
    app.value!.style.opacity = '1'
  }
})
const bus = useEventBus<string>('routeMounted')
bus.on(waitingPlay)
</script>
<template>
  <VApp>
    <RouterView></RouterView>
    <CDialog
      v-for="dialog in dialogStore.collection"
      :key="dialog[0]"
      v-bind="dialog[1].dialogPE"
      @update:model-value="(val) => dialogStore.update(val, dialog[0])"
      @vue:mounted="(vnode: VNode) => dialogStore.setDialogRef(dialog[0], vnode)"
    >
      <Component
        :is="dialog[1].component"
        v-bind="dialog[1].componentPE"
        @vue:mounted="(vnode: VNode) => dialogStore.setComponentRef(dialog[0], vnode)"
      ></Component>
    </CDialog>
    <VOverlay
      :model-value="commonStore.loading"
      class="align-start justify-center b_filter"
      attach="#app"
    >
      <VProgressLinear
        color="primary"
        bg-color="transparent"
        indeterminate
        height="2"
        style="width: 100vw"
      ></VProgressLinear>
    </VOverlay>
    <Teleport to="#app">
      <div class="notification_container">
        <VSlideYTransition group>
          <VAlert
            v-for="notification in notifyStore.collection"
            :key="notification[0]"
            v-bind="notification[1]"
          ></VAlert>
        </VSlideYTransition>
      </div>
    </Teleport>
  </VApp>
</template>
<style lang="scss" scoped>
.notification_container {
  position: fixed;
  top: 12px;
  right: 12px;
  z-index: $snackbar-z-index;
  display: grid;
  grid-gap: 12px;
}
</style>
