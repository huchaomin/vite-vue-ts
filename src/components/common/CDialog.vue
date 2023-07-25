<script setup lang="ts">
const props = withDefaults(defineProps<{
  modelValue: boolean
  title?: string
}>(), {
  title: '提示',
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
    width="700"
  >
    <v-card :title="title">
      <v-card-text>
        <slot></slot>
      </v-card-text>
      <div class="v-card-actions justify-end">
        <v-btn
          variant="tonal"
          @click="visible = false"
        >
          取消
        </v-btn>
        <v-btn>
          确认
        </v-btn>
      </div>
    </v-card>
  </v-dialog>
</template>
