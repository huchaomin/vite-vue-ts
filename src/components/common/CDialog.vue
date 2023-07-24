<script setup lang="ts">
const props = withDefaults(defineProps<{
  modelValue: boolean
  title?: string
  width?: string
}>(), {
  title: '提示',
  width: '700',
});
const emit = defineEmits(['update:modelValue', 'cancel', 'confirm']);

const visible = computed({
  get: () => props.modelValue,
  set: (val) => { emit('update:modelValue', val); },
});
</script>

<template>
  <v-dialog
    v-model="visible"
    :width="width"
  >
    <v-card :title="title">
      <v-card-text>
        <slot></slot>
      </v-card-text>
      <v-card-actions class="justify-end">
        <v-btn
          @click="visible = false"
        >
          取消
        </v-btn>
        <v-btn variant="outlined">
          确认
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
