<script lang="ts" setup>
import rules from '@/constant/rules'
import { randomImage } from '@/api/sys'
import { type VForm } from 'vuetify/components'
import { type VxeGridPropTypes } from 'vxe-table'

const userStore = useUserStore()
const router = useRouter()
const route = useRoute()
const appName = APP_NAME

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
  if (!valid) return
  const loginResult = await userStore.login({
    ...formData,
    checkKey: captchaTime.value,
  })
  if (loginResult === null) {
    formData.captcha = ''
    getCaptcha()
  } else {
    $notify('登录成功！')
    const redirect = route.query.redirect as string
    const name = router.hasRoute(redirect) ? redirect : 'index'
    router.replace({ name })
  }
}

const columns: VxeGridPropTypes.Columns = [
  { type: 'seq' },
  { type: 'radio' },
  { type: 'checkbox' },
  { field: 'name', title: 'Name', slots: { default: 'name' } },
  { field: 'sex', title: 'Sex', showHeaderOverflow: true },
  { field: 'address', title: 'Address', showOverflow: true },
]
const data = [
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
    address:
      'GuangzhouGuangzhouGuangzhouGuangzhouGuangzhouGuangzhouGuangzhouGuangzhouGuangzhouGuangzhouGuangzhouGuangzhou',
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
]
</script>

<template>
  <div
    class="auth_wrapper d-flex align-center justify-end overflow-hidden pa-4"
  >
    <video class="video" src="~video/login.mp4" autoplay loop muted></video>
    <img class="logo" src="~img/logo_login.png" />
    <VCard class="pa-4" width="448">
      <template #title>
        <div class="d-flex align-center">
          <img style="width: 86px" src="~img/robot.png" />
          <span class="text-h5 pl-6">{{ appName }}</span>
        </div>
      </template>
      <VCardText>
        <VDefaultsProvider
          :defaults="{
            VTextField: {
              density: 'comfortable',
            },
          }"
        >
          <VForm ref="form" @submit.prevent="handleSubmit">
            <VTextField
              v-model="formData.username"
              :rules="rules.username"
              autofocus
              placeholder="请输入用户名"
              label="帐户名"
            ></VTextField>
            <VTextField
              v-model="formData.password"
              :rules="rules.password"
              label="密码"
              placeholder="请输入密码"
              autocomplete
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
                  <img v-else src="~img/code_error.png" />
                </a>
              </VCol>
            </VRow>
            <VBtn block type="submit" size="large">登录</VBtn>
          </VForm>
        </VDefaultsProvider>
      </VCardText>
    </VCard>
  </div>
  <CTable :columns="columns" :data="data">
    <template #name="{ row }">
      <span>自定义插槽模板 {{ row.name }}</span>
    </template>
  </CTable>
</template>
<style lang="scss" scoped>
.auth_wrapper {
  position: relative;
  min-height: 100%;

  .logo {
    position: absolute;
    top: 18px;
    left: 25px;
    width: 200px;
  }
}

.video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
}

.v-card {
  margin-right: 7%;
  border-radius: 15px;
  opacity: 0.95;
}
</style>
