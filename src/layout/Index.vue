<template>
  <a-layout>
    <a-layout-header>Header</a-layout-header>
    <a-layout>
      <a-layout-sider
        collapsible
        :width="250"
      >
        Sider
        <template #trigger>
          <a-button type="primary">
            <template #icon>
              <icon-plus></icon-plus>
            </template>
          </a-button>
        </template>
      </a-layout-sider>
      <a-layout>
        <a-layout-content>
          <router-view></router-view>
        </a-layout-content>
        <a-layout-footer>Footer</a-layout-footer>
      </a-layout>
    </a-layout>
  </a-layout>
</template>
