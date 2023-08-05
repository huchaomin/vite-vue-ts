<script lang="ts" setup>
const props = defineProps({
  name: {
    type: String,
    required: true,
  },
})
</script>
<template>
  <svg aria-hidden="true">
    <use :href="`#icon-${props.name}`" />
  </svg>
</template>
<style scoped>
svg {
  width: 1em;
  height: 1em;
  fill: currentcolor;
  stroke: currentcolor;
}
</style>
