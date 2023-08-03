<script setup lang="ts">

defineProps<{ msg: string }>();

</script>

<template>
  <h1 class="title">
    {{ msg }}
  </h1>
  <a-space size="large">
    <icon-refresh
      :style="{fontSize:'32px'}"
      spin
    ></icon-refresh>
    <icon-sync
      :style="{fontSize:'32px'}"
      spin
    ></icon-sync>
    <icon-face-smile-fill
      :style="{fontSize:'32px'}"
      :rotate="180"
    ></icon-face-smile-fill>
    <svg-icon
      name="setting"
      style="font-size: 32px;"
    ></svg-icon>
  </a-space>
</template>

<style lang="scss" scoped>
  .title{
    position: relative;
    top: 50%;
    font-family: 'Courier New', Courier, monospace;
    font-size: 24px;
    font-weight: bold;
    color: $primary;
  }
</style>
