<script setup lang="ts">
import { type RouteRecordRaw } from 'vue-router'

withDefaults(
  defineProps<{
    model: RouteRecordRaw[]
    level?: number
  }>(),
  {
    level: 0,
  },
)
const route = useRoute()
function defaultOpened(children: RouteRecordRaw[]): boolean {
  const find: (arr: RouteRecordRaw[]) => boolean = (arr) => {
    for (let i = 0; i < arr.length; i++) {
      const item = arr[i]
      if (item.name === route.name) {
        return true
      }
      if (item.children && item.children?.length > 0) {
        if (find(item.children)) {
          return true
        }
      }
    }
    return false
  }
  return find(children)
}
</script>
<script lang="ts">
export default {
  name: 'MenuNode',
}
</script>
<template>
  <VList
    v-for="item in model"
    :key="item.name"
    :opened="defaultOpened(item.children ?? []) ? [item.name] : undefined"
    density="default"
    class="pa-0"
  >
    <VListGroup
      v-if="item.children && item.children.length > 0"
      :value="item.name"
    >
      <template #activator="{ props }">
        <VListItem
          v-bind="props"
          :style="{
            paddingLeft: `${level * 30 + 16}px !important`,
          }"
          :title="item.meta?.title"
        ></VListItem>
      </template>
      <MenuNode :model="item.children" :level="level + 1"></MenuNode>
    </VListGroup>
    <VListItem
      v-else
      :to="{ name: item.name }"
      exact
      :active="route.name === item.name"
      active-class="text-primary"
      :title="item.meta?.title"
      :style="{
        paddingLeft: `${(level + 1) * 30 + 16}px !important`,
      }"
    ></VListItem>
  </VList>
</template>
