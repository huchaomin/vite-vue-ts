<script setup lang="ts">
import test from '@/views/assetManagement/myClue/Index.vue'
import { useEventBus } from '@vueuse/core'
const commonStore = useCommonStore()
const notifyStore = useNotifyStore()
const dialogStore = useDialogStore()

const bus = useEventBus<string>('routeMounted')
bus.on(() => {
  document.getElementById('waiting')?.remove()
  setTimeout(() => {
    document.getElementById('app')!.style.opacity = '1'
  }, 100)
})

$dialog(
  {
    width: 1200,
  },
  test,
)
</script>
<template>
  <VApp>
    <RouterView></RouterView>
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
    <div class="notification_container">
      <VSlideYTransition group>
        <VAlert
          v-for="notification in notifyStore.collection"
          :key="notification[0]"
          v-bind="notification[1]"
        ></VAlert>
      </VSlideYTransition>
    </div>
    <CDialog
      v-for="dialog in dialogStore.collection"
      :key="dialog[0]"
      v-bind="dialog[1].dialogPE"
      @update:model-value="(val) => dialogStore.update(val, dialog[0])"
      @vue:mounted="
        (vnode: VNode) => dialogStore.setDialogRef(dialog[0], vnode)
      "
    >
      <Component
        :is="dialog[1].component"
        v-bind="dialog[1].componentPE"
        @vue:mounted="
          (vnode: VNode) => dialogStore.setComponentRef(dialog[0], vnode)
        "
      ></Component>
    </CDialog>
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
