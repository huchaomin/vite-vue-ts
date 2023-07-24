<script setup lang="ts">
const visible = ref(false);
defineExpose({
  visible,
});
</script>

<template>
  <c-dialog
    v-model="visible"
  >
    hahahh
  </c-dialog>
</template>
