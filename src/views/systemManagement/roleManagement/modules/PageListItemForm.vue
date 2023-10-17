<!--
 * @Author       : huchaomin peter@qingcongai.com
 * @Date         : 2023-09-07 13:54:24
 * @LastEditors  : huchaomin peter@qingcongai.com
 * @LastEditTime : 2023-10-17 15:32:23
 * @Description  :
-->
<script setup lang="ts">
import { type UnwrapNestedRefs } from 'vue'
import { ChineseReg } from '@/config/regs'
import { roleDuplicateCheck, roleAdd, roleUpdate } from '@/api/sys'
const type = ref('add')
const form = ref<RefCForm>(null)
const formData: UnwrapNestedRefs<Record<string, any>> = reactive({
  roleName: '',
  roleCode: '',
  description: '',
  id: '',
})

function validateRoleCode(value: string): Promise<string | boolean> {
  return new Promise((resolve) => {
    if (ChineseReg.test(value)) {
      resolve('不能包含中文')
    } else {
      $api(roleDuplicateCheck, {
        tableName: 'sys_role',
        fieldName: 'role_code',
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
      model: 'roleName',
      props: {
        label: '角色名称',
        rules: ['required', 'minLength:2', 'maxLength:30'],
        autofocus: true,
      },
    },
    {
      model: 'roleCode',
      props: {
        label: '角色编码',
        rules: ['required', 'minLength:4', 'maxLength:64', validateRoleCode],
        disabled: type.value === 'edit',
      },
    },
    {
      model: 'description',
      component: 'VTextarea',
      props: {
        label: '描述',
        rules: ['maxLength:126'],
      },
    },
  ]
})

const config = computed(() => {
  if (type.value === 'add') {
    return {
      url: roleAdd,
    }
  }
  return {
    url: roleUpdate,
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
