<script setup lang="ts">
export interface PropsType {
  modelValue: boolean
  prependIcon?: string | undefined
  title?: string
  width?: string | number
  showClose?: boolean
  showCancel?: boolean
  showConfirm?: boolean
  hideAfterCancel?: boolean
  hideAfterConfirm?: boolean
}

const props = withDefaults(defineProps<PropsType>(), {
  prependIcon: undefined,
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
    <VCard :prepend-icon="prependIcon">
      <template #title>
        <span>{{ title }}</span>
        <VBtn
          v-if="showClose"
          icon="mdi-close"
          size="small"
          variant="text"
          class="icon_close"
          @click="cancel"
        ></VBtn>
      </template>
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
<style lang="scss" scoped>
/* stylelint-disable-next-line selector-class-pattern */
:deep(.v-card-title) {
  height: 44px;
  font-size: 1.43rem;
  line-height: 44px !important;
}

.icon_close {
  position: absolute;
  right: 14px;
}
</style>
