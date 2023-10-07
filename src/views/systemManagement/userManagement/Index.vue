<!--
 * @Author       : huchaomin peter@qingcongai.com
 * @Date         : 2023-09-26 14:29:00
 * @LastEditors  : huchaomin peter@qingcongai.com
 * @LastEditTime : 2023-10-07 17:02:09
 * @Description  :
-->
<script setup lang="ts">
const value = ref(2)
</script>
<template>
  <div>
    <div>用户管理</div>
    <input v-model="value" />
  </div>
</template>
