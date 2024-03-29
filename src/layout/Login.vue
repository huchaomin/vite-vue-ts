<!--
 * @Author       : huchaomin iisa_peter@163.com
 * @Date         : 2023-06-24 17:50:14
 * @LastEditors  : huchaomin peter@qingcongai.com
 * @LastEditTime : 2023-10-10 19:12:36
 * @Description  :
-->
<script lang="ts" setup>
import { randomImage } from '@/api/sys'
import rules from '@/config/rules'
import { type VForm } from 'vuetify/components'

const userStore = useUserStore()
const router = useRouter()
const route = useRoute()
const appName = APP_NAME
const bus = useEventBus<string>('routeMounted')
onMounted(() => {
  bus.emit('routeMounted')
})

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
    const redirect = route.query.redirect as string
    const name = router.hasRoute(redirect) ? redirect : 'index'
    router.replace({ name })
  }
}
</script>

<template>
  <div class="auth_wrapper d-flex align-center justify-end overflow-hidden pa-4 bg-white">
    <!-- <img class="login_bg" src="~/img/login_bg.svg" alt="login_bg" /> -->
    <img class="logo" src="~img/logo.svg" />
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
              :rules="rules.required"
              autofocus
              placeholder="请输入用户名"
              label="帐户名"
            ></VTextField>
            <VTextField
              v-model="formData.password"
              :rules="rules.required"
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
                  <img v-if="captchaUrl" :src="captchaUrl" />
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
</template>
<style lang="scss" scoped>
.auth_wrapper {
  position: relative;
  min-height: inherit;

  .logo {
    position: absolute;
    top: 18px;
    left: 25px;
    width: 200px;
  }
}

.login_bg {
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  min-height: 100%;
  transform: translateY(-50%);
}

.v-card {
  margin-right: 7%;
  border-radius: 15px;
  opacity: 0.95;
}
</style>
