<template>
  <a-input
    placeholder="请输入"
    :max-length="100"
  >
    <template
      v-for="key in Object.keys($slots)"
      :key="key"
      #[key]
    >
      <slot :name="key"></slot>
    </template>
  </a-input>
</template>
