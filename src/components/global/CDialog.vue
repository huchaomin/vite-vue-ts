<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    modelValue: boolean
    title?: string
  }>(),
  { title: '提示' },
)
const emit = defineEmits(['update:modelValue', 'cancel', 'confirm'])

const visible = computed({
  get: () => props.modelValue,
  set: (val) => {
    emit('update:modelValue', val)
  },
})
</script>

<template>
  <VDialog v-model="visible" width="700">
    <VCard :title="title">
      <VCardText>
        <slot></slot>
      </VCardText>
      <div class="v-card-actions justify-end">
        <VBtn variant="tonal" @click="visible = false">取消</VBtn>
        <VBtn>确认</VBtn>
      </div>
    </VCard>
  </VDialog>
</template>
