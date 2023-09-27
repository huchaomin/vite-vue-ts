<!--
 * @Author       : huchaomin peter@qingcongai.com
 * @Date         : 2023-08-09 13:42:11
 * @LastEditors  : huchaomin peter@qingcongai.com
 * @LastEditTime : 2023-09-26 17:44:39
 * @Description  :
-->
<script setup lang="ts">
import { type RouteRecordRaw } from 'vue-router'
const route = useRoute()

withDefaults(
  defineProps<{
    model: RouteRecordRaw[]
    level?: number
  }>(),
  {
    level: 0,
  },
)
</script>
<script lang="ts">
export default {
  name: 'MenuNode',
}
</script>
<template>
  <template v-for="item in model" :key="item.name">
    <VListGroup v-if="item.children && item.children.length > 0" :value="item.name">
      <template #activator="{ props }">
        <VListItem v-bind="props" :title="item.meta?.title">
          <template v-if="item.meta?.icon" #prepend>
            <VIcon :icon="`mdi-${item.meta.icon}`"></VIcon>
          </template>
        </VListItem>
      </template>
      <MenuNode :model="item.children" :level="level + 1"></MenuNode>
    </VListGroup>
    <VListItem
      v-else-if="item.meta?.hideInMenu !== true"
      :to="{ name: item.name }"
      exact
      :active="route.name === item.name"
      active-class="text-primary"
      :title="item.meta?.title"
    ></VListItem>
  </template>
</template>
