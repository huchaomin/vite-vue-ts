<script setup lang="ts">
const commonStore = useCommonStore();
</script>
<template>
  <router-view></router-view>
  <v-overlay
    :model-value="commonStore.loading"
    class="align-start justify-center"
  >
    <v-progress-linear
      color="primary"
      indeterminate
      height="2"
      style="width: 100vw"
    ></v-progress-linear>
  </v-overlay>
</template>
