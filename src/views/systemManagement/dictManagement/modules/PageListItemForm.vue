<!--
 * @Author       : huchaomin peter@qingcongai.com
 * @Date         : 2023-10-17 16:27:05
 * @LastEditors  : huchaomin peter@qingcongai.com
 * @LastEditTime : 2023-10-17 17:07:18
 * @Description  :
-->
<script setup lang="ts">
import { type UnwrapNestedRefs } from 'vue'
import { ChineseReg } from '@/config/regs'
import { duplicateCheck, dictAdd, dictUpdate } from '@/api/sys'
const type = ref('add')
const form = ref<RefCForm>(null)
const formData: UnwrapNestedRefs<Record<string, any>> = reactive({
  dictName: '',
  dictCode: '',
  description: '',
  id: '',
})

function validateDictCode(value: string): Promise<string | boolean> {
  return new Promise((resolve) => {
    if (ChineseReg.test(value)) {
      resolve('不能包含中文')
    } else {
      $api(duplicateCheck, {
        tableName: 'sys_dict',
        fieldName: 'dict_code',
        fieldVal: value,
        dataId: formData.id,
      }).then(({ data, error }) => {
        if (data.value === null) {
          resolve(error.value.message)
        } else {
          resolve(true)
        }
      })
    }
  })
}

const formItems = computed(() => {
  return [
    {
      model: 'dictName',
      props: {
        label: '字典名称',
        rules: ['required', 'minLength:2', 'maxLength:30'],
        autofocus: true,
      },
    },
    {
      model: 'dictCode',
      props: {
        label: '字典编码',
        rules: ['required', 'minLength:4', 'maxLength:64', validateDictCode],
      },
    },
    {
      model: 'description',
      component: 'VTextarea',
      props: {
        label: '描述',
      },
    },
  ]
})

const config = computed(() => {
  if (type.value === 'add') {
    return {
      url: dictAdd,
    }
  }
  return {
    url: dictUpdate,
  }
})

function handleSubmit(): Promise<void> {
  return new Promise((resolve) => {
    form.value!.validate().then(async () => {
      const { data } = await $api(config.value.url, formData)
      if (data.value === null) return
      resolve()
    })
  })
}

function setFormData(row: CellRenderParams['row']): void {
  Object.keys(formData).forEach((key) => {
    formData[key] = row[key]
  })
  type.value = 'edit'
}

defineExpose({
  setFormData,
  handleSubmit,
})
</script>
<template>
  <CForm ref="form" :form-data="formData" :items="formItems"></CForm>
</template>
