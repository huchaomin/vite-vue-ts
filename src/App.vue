<script setup lang="ts">
const commonStore = useCommonStore()
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
</template>
