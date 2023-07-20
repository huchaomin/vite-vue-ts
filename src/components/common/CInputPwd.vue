<template>
  <a-input-password
    placeholder="请输入密码"
    :max-length="100"
  >
    <template
      v-for="key in Object.keys($slots)"
      :key="key"
      #[key]
    >
      <slot :name="key"></slot>
    </template>
  </a-input-password>
</template>
