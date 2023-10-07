<!--
 * @Author       : huchaomin peter@qingcongai.com
 * @Date         : 2023-10-07 11:30:40
 * @LastEditors  : huchaomin peter@qingcongai.com
 * @LastEditTime : 2023-10-07 16:33:32
 * @Description  :
-->
<script setup lang="ts">
const value = ref(1)
</script>
<template>
  <div>
    <div>角色管理</div>
    <input v-model="value" />
  </div>
</template>
