<script setup lang="ts">
export interface PropsType {
  modelValue: boolean
  title?: string
  width?: string | number
  showClose?: boolean
  showCancel?: boolean
  showConfirm?: boolean
  hideAfterCancel?: boolean
  hideAfterConfirm?: boolean
}

const props = withDefaults(defineProps<PropsType>(), {
  title: '提示',
  width: 680,
  showClose: true,
  showCancel: true,
  showConfirm: true,
  hideAfterCancel: true,
  hideAfterConfirm: true,
})
const emit = defineEmits<{
  (event: 'update:modelValue', payload: boolean): void
  (event: 'confirm'): void
  (event: 'cancel'): void
}>()

const visible = computed({
  get: () => props.modelValue,
  set: (val) => {
    emit('update:modelValue', val)
  },
})

function cancel(): void {
  if (props.hideAfterCancel) {
    emit('update:modelValue', false)
  }
  emit('cancel')
}

function confirm(): void {
  if (props.hideAfterConfirm) {
    emit('update:modelValue', false)
  }
  emit('confirm')
}
</script>

<template>
  <VDialog v-model="visible" width="700">
    <VCard :title="title">
      <VCardText>
        <slot></slot>
      </VCardText>
      <div v-if="showCancel || showConfirm" class="v-card-actions justify-end">
        <VBtn v-if="showCancel" variant="tonal" @click="cancel">取消</VBtn>
        <VBtn v-if="showConfirm" @click="confirm">确认</VBtn>
      </div>
    </VCard>
  </VDialog>
</template>
