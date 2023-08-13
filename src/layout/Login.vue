<script lang="ts" setup>
import rules from '@/constant/rules'
import { randomImage, login } from '@/api/sys'
import { type VForm } from 'vuetify/components'
import { type VxeGridProps } from 'vxe-table'

const userStore = useUserStore()
const router = useRouter()
const route = useRoute()

const formData = reactive({
  username: '',
  password: '',
  captcha: '',
})

const isPasswordVisible = ref(false)

const captchaTime = ref(0)
function getCaptchaTime(): number {
  const time = new Date().getTime()
  captchaTime.value = time
  return time
}

const { execute: getCaptcha, data: captchaUrl } = $api(randomImage, {
  timestamp: getCaptchaTime(),
})
getCaptcha()

const form: Ref<InstanceType<typeof VForm> | null> = ref(null)
async function handleSubmit(): Promise<void> {
  const { valid } = await form.value!.validate()
  if (valid) {
    const { data } = await $api(login, {
      ...formData,
      checkKey: captchaTime.value,
    })
    if (data.value !== null) {
      userStore.token = data.value.result.token
      $notify('登录成功！')
      userStore.getRoutersAndAuth().then(() => {
        const redirect = route.query.redirect as string
        const name = router.hasRoute(redirect) ? redirect : 'index'
        router.replace({ name })
      })
    } else {
      formData.captcha = ''
      getCaptcha()
    }
  }
}

interface UserVO {
  id: number
  name: string
  role: string
  sex: string
  age: number
  address: string
}
const gridOptions = reactive<VxeGridProps<UserVO>>({
  border: true,
  tooltipConfig: {
    showAll: true,
    enterable: true,
  },
  columns: [
    { type: 'seq', width: 50 },
    { type: 'radio', width: 50 },
    { type: 'checkbox', width: 50 },
    { field: 'name', title: 'Name', slots: { default: 'name' } },
    { field: 'sex', title: 'Sex', showHeaderOverflow: true },
    { field: 'address', title: 'Address', showOverflow: true },
  ],
  data: [
    {
      id: 10001,
      name: 'Test1',
      role: 'Develop',
      sex: 'Man',
      age: 28,
      address: 'test abc',
    },
    {
      id: 10002,
      name: 'Test2',
      role: 'Test',
      sex: 'Women',
      age: 22,
      address: 'Guangzhou',
    },
    {
      id: 10003,
      name: 'Test3',
      role: 'PM',
      sex: 'Man',
      age: 32,
      address: 'Shanghai',
    },
    {
      id: 10004,
      name: 'Test4',
      role: 'Designer',
      sex: 'Women',
      age: 24,
      address: 'Shanghai',
    },
  ],
})
</script>

<template>
  <div class="auth_wrapper d-flex align-center justify-center pa-4">
    <VCard class="pa-4" width="448">
      <VCardItem class="justify-center">
        <VCardTitle class="text-2xl font-weight-bold">
          资产评估管理系统
        </VCardTitle>
      </VCardItem>

      <VCardText class="pt-2">
        <p class="mb-0 text-center">擎聪科技</p>
      </VCardText>

      <VCardText>
        <VForm ref="form" @submit.prevent="handleSubmit">
          <VTextField
            v-model="formData.username"
            :rules="rules.username"
            autofocus
            placeholder="admin"
            density="comfortable"
            label="帐户名"
          ></VTextField>
          <VTextField
            v-model="formData.password"
            :rules="rules.password"
            label="密码"
            placeholder="123456"
            autocomplete
            density="comfortable"
            :type="isPasswordVisible ? 'text' : 'password'"
            :append-inner-icon="isPasswordVisible ? 'mdi-eye-off' : 'mdi-eye'"
            @click:append-inner="isPasswordVisible = !isPasswordVisible"
          ></VTextField>
          <VRow>
            <VCol :cols="8">
              <VTextField
                v-model="formData.captcha"
                :rules="rules.captcha"
                label="验证码"
                density="comfortable"
                placeholder="请输入验证码"
              ></VTextField>
            </VCol>
            <VCol :cols="4">
              <a
                href="#"
                class="d-flex align-stretch justify-end"
                style="height: 44px"
                @click.prevent="() => getCaptcha()"
              >
                <img v-if="captchaUrl" :src="captchaUrl.result" />
                <img v-else src="~img/checkcode.png" />
              </a>
            </VCol>
          </VRow>
          <VBtn block type="submit" size="large">登录</VBtn>
        </VForm>
      </VCardText>
    </VCard>
  </div>
  <VxeGrid v-bind="gridOptions">
    <template #name="{ row }">
      <span>自定义插槽模板 {{ row.name }}</span>
    </template>
  </VxeGrid>
</template>
<style lang="scss" scoped>
.auth_wrapper {
  height: 100%;
  background: url('img/background.svg') no-repeat 50%;
  background-size: 100%;
}
</style>
