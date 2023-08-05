<script setup lang="ts">
const commonStore = useCommonStore()

const notifications = ref<Map<string, string>>(new Map())

function addNotification(): void {
  const notificationId = self.crypto.randomUUID()
  const notificationMessage = new Date().toString()

  notifications.value.set(notificationId, notificationMessage)
  setTimeout(() => {
    removeNotification(notificationId)
  }, 2000)
}

function removeNotification(notificationId: string): void {
  notifications.value.delete(notificationId)
}
</script>
<template>
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
      <VAlert v-for="notification in notifications" :key="notification[0]">
        {{ notification[1] }}
      </VAlert>
    </VSlideYTransition>
  </div>
  <VBtn @click="addNotification">New notification</VBtn>
</template>
<style lang="scss" scoped>
.notificationContainer {
  position: fixed;
  top: 10px;
  right: 10px;
  z-index: $snackbar-z-index;
  display: grid;
  grid-gap: 0.5em;
}
</style>
