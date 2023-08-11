<script setup lang="ts">
const commonStore = useCommonStore()
const notifyStore = useNotifyStore()
</script>
<template>
  <VApp>
    <RouterView></RouterView>
    <VOverlay
      :model-value="commonStore.loading"
      class="align-start justify-center"
    >
      <VProgressLinear
        color="primary"
        indeterminate
        height="2"
        style="width: 100vw"
      ></VProgressLinear>
    </VOverlay>
    <div class="notificationContainer">
      <VSlideYTransition group>
        <VAlert
          v-for="notification in notifyStore.notifications"
          :key="notification[0]"
          v-bind="notification[1]"
        ></VAlert>
      </VSlideYTransition>
    </div>
  </VApp>
</template>
<style lang="scss" scoped>
.notificationContainer {
  position: fixed;
  top: 12px;
  right: 12px;
  z-index: $snackbar-z-index;
  display: grid;
  grid-gap: 12px;
}
</style>
