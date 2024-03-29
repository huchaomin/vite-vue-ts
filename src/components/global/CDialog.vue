<!--
 * @Author       : huchaomin peter@qingcongai.com
 * @Date         : 2023-08-25 14:35:00
 * @LastEditors  : huchaomin peter@qingcongai.com
 * @LastEditTime : 2023-10-18 17:18:06
 * @Description  :
-->
<script setup lang="ts">
import { type VCard } from 'vuetify/components'
declare type CardPropsType = InstanceType<typeof VCard>['$props']

const props = withDefaults(
  defineProps<{
    modelValue: boolean
    prependIcon?: CardPropsType['prependIcon']
    title?: string
    width?: number | string
    showClose?: boolean
    showCancel?: boolean
    showConfirm?: boolean
    hideAfterCancel?: boolean
    hideAfterConfirm?: boolean
    noneCardTextPb?: boolean
  }>(),
  {
    prependIcon: undefined,
    title: '提示',
    width: 680,
    showClose: true,
    showCancel: true,
    showConfirm: true,
    hideAfterCancel: true,
    hideAfterConfirm: true,
    noneCardTextPb: false,
  },
)
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
    hide()
  }
  emit('cancel')
}

function confirm(): void {
  if (props.hideAfterConfirm) {
    hide()
  }
  emit('confirm')
}

function hide(): void {
  emit('update:modelValue', false)
}

defineExpose({
  hide,
})
</script>

<template>
  <VDialog v-model="visible" :width="width" scrollable attach="#app">
    <VCard :prepend-icon="prependIcon">
      <template #title>
        <span>{{ title }}</span>
        <VBtn
          v-if="showClose"
          icon="mdi-close"
          size="small"
          variant="text"
          class="icon_close"
          color="inherit"
          @click="cancel"
        ></VBtn>
      </template>
      <VCardText :class="noneCardTextPb ? 'pb-0' : 'pb-4'">
        <slot></slot>
      </VCardText>
      <div v-if="showCancel || showConfirm" class="d-flex justify-end px-6 pb-4">
        <VBtn v-if="showCancel" variant="tonal" @click="cancel">取消</VBtn>
        <VBtn v-if="showConfirm" @click="confirm">确认</VBtn>
      </div>
    </VCard>
  </VDialog>
</template>
<style lang="scss" scoped>
$padding-x: 8px;

:deep(.v-card-item) {
  padding-top: 0 !important;
  padding-right: $padding-x !important;
}

:deep(.v-card-title) {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: $padding-x 0 !important;
  font-size: 1.2rem;
  font-weight: 600;
}
</style>
