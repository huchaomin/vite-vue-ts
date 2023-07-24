<script setup lang="ts">
const commonStore = useCommonStore();
const visibility = ref(true);
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
      style="width: 100vw"
    ></v-progress-linear>
  </v-overlay>
  <v-snackbar
    v-model="visibility"
  >
    <v-alert
      type="success"
      text="Lorem ipsum dolor sit amet consectetur adipisicing elit."
    ></v-alert>
  </v-snackbar>
</template>
