<script setup lang="ts">
import BasicData from './BasicData.vue';
const visible = ref(false);
defineExpose({
  visible,
});
</script>

<template>
  <CDialog
    v-model="visible"
    width="884"
  >
    <BasicData></BasicData>
  </CDialog>
</template>
