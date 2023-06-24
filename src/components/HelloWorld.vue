<script setup lang="ts">
import { ref } from 'vue'

defineProps<{ msg: string }>()

const count = ref(0)
</script>

<template>
  <h1 class="title">
    {{ msg }}
  </h1>

  <button
    type="button"
    @click="count++"
  >
    count is {{ count }}
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
