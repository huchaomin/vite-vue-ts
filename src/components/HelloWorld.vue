<script setup lang="ts">
import useCommonStore from '@/store/modules/common';

const commonStore = useCommonStore();

defineProps<{ msg: string }>();

</script>

<template>
  <h1 class="title">
    {{ msg }}
  </h1>
  <button
    type="button"
    @click="commonStore.increment"
  >
    count is {{ commonStore.count }}
  </button>
</template>

<style lang="scss" scoped>
  .title{
    position: relative;
    top: 50%;
    color: $primary;
    font-weight: bold;
    font-size: 24px;
    font-family: 'Courier New', Courier, monospace;
  }
</style>
