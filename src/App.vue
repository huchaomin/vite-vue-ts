<script setup lang="ts">
const commonStore = useCommonStore()
const notifyStore = useNotifyStore()
const dialogStore = useDialogStore()

$confirm('title', 'text')
</script>
<template>
  <VApp>
    <RouterView></RouterView>
    <VOverlay
      :model-value="commonStore.loading"
      class="align-start justify-center b_filter"
    >
      <VProgressLinear
        color="primary"
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
      v-bind="dialog[1].dialogProps"
      @update:model-value="(val) => dialogStore.update(val, dialog[0])"
    >
      <Component
        :is="dialog[1].component"
        v-bind="dialog[1].componentProps"
        @vue:mounted="
          (vnode: VNode) => dialogStore.setComponentRef(dialog[0], vnode)
        "
        @vue:unmounted="() => dialogStore.deleteComponentRef(dialog[0])"
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
