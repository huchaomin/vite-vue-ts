<script setup lang="ts">
import MyClue from './myClue/Index.vue';
const tab = ref('one');
</script>
<template>
  <v-tabs
    v-model="tab"
  >
    <v-tab value="one">
      我的线索
    </v-tab>
    <v-tab value="two">
      我的尽调
    </v-tab>
    <v-tab value="three">
      已立项
    </v-tab>
  </v-tabs>
  <v-window v-model="tab">
    <v-window-item value="one">
      <my-clue></my-clue>
    </v-window-item>

    <v-window-item value="two">
      Two
    </v-window-item>

    <v-window-item value="three">
      Three
    </v-window-item>
  </v-window>
</template>
