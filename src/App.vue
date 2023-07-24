<script setup lang="ts">
const commonStore = useCommonStore();
</script>
<template>
  <router-view></router-view>
  <v-overlay
    :model-value="commonStore.loading"
    class="align-center justify-center"
  >
    <v-progress-circular
      color="primary"
      indeterminate
      size="64"
    ></v-progress-circular>
  </v-overlay>
</template>
