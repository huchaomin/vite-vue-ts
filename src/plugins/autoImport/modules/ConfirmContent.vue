<script setup lang="ts">
withDefaults(
  defineProps<{
    content: string
  }>(),
  {},
)
</script>
<template>
  {{ content }}
</template>
