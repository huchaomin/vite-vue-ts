<script setup lang="ts">
import LeftDrawer from './LeftDrawer.vue';
</script>
<template>
  <v-layout>
    <v-app-bar
      title="资产评估管理系统"
      :elevation="0"
      :border="true"
    ></v-app-bar>
    <left-drawer></left-drawer>
    <v-main>
      <div class="pa-4 overflow-y-auto" style="height: calc((100vh - 64px));">
        <router-view></router-view>
      </div>
    </v-main>
  </v-layout>
</template>
