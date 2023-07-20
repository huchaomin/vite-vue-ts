<template>
  <a-button type="primary">
    <template
      v-for="key in Object.keys($slots)"
      :key="key"
      #[key]
    >
      <slot :name="key"></slot>
    </template>
  </a-button>
</template>
