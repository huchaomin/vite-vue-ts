<script setup lang="ts">
import LeftDrawer from './LeftDrawer.vue';
</script>
<template>
  <v-layout>
    <v-app-bar title="资产评估管理系统"></v-app-bar>
    <left-drawer></left-drawer>
    <v-main>
      <div class="ma-4">
        <router-view></router-view>
      </div>
    </v-main>
  </v-layout>
</template>
