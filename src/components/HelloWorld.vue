<script setup lang="ts">
defineProps<{ msg: string }>()
</script>

<template>
  <h1 class="title">
    {{ msg }}
  </h1>
  <ASpace size="large">
    <IconRefresh :style="{ fontSize: '32px' }" spin></IconRefresh>
    <IconSync :style="{ fontSize: '32px' }" spin></IconSync>
    <IconFaceSmileFill
      :style="{ fontSize: '32px' }"
      :rotate="180"
    ></IconFaceSmileFill>
    <SvgIcon name="setting" style="font-size: 32px"></SvgIcon>
  </ASpace>
</template>

<style lang="scss" scoped>
.title {
  position: relative;
  top: 50%;
  font-family: 'Courier New', Courier, monospace;
  font-size: 24px;
  font-weight: bold;
  color: $primary;
}
</style>
