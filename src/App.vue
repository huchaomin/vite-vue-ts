<script setup lang="ts">
const commonStore = useCommonStore();
</script>
<template>
  <a-spin
    :loading="commonStore.loading"
    style="display: block;height: 100%;"
  >
    <router-view></router-view>
  </a-spin>
</template>
