<!-- <script lang="ts" setup>
import { randomImage, login } from '@/api/sys';
import type Form from '@arco-design/web-vue/es/Form';

const formData = reactive({
  username: '',
  password: '',
  captcha: '',
});

const captchaTime = ref(0);
function getCaptchaTime(): number {
  const time = new Date().getTime();
  captchaTime.value = time;
  return time;
}

const { execute: getCaptcha, data: captchaUrl } = $api(randomImage, {
  timestamp: getCaptchaTime(),
});
getCaptcha();

const form: Ref<InstanceType<typeof Form> | null> = ref(null);
function handleSubmit(): void {
  form.value?.validate(async (err) => {
    if (err === undefined) {
      const { data } = await $api(login, {
        ...formData,
        checkKey: captchaTime.value,
      });
      if (data.value !== null) {
        $notify('登录成功！');
      } else {
        getCaptcha();
      }
    }
  });
}

</script>
<template>
  <div class="login-wrapper">
    <div class="header">
      <svg-icon name="logo"></svg-icon>
      <span>资产评估管理系统</span>
    </div>
    <a-form
      ref="form"
      :model="formData"
      :style="{ width: '400px' }"
      layout="vertical"
      @submit="handleSubmit"
    >
      <a-form-item
        hide-asterisk
        :rules="[{ required:true,message:'请输入用户名!' },{ minLength:5,message:'用户名过短' }]"
        field="username"
      >
        <c-input
          v-model="formData.username"
          size="large"
          placeholder="请输入帐户名 / admin"
        >
          <template #prefix>
            <icon-user></icon-user>
          </template>
        </c-input>
      </a-form-item>
      <a-form-item
        hide-asterisk
        field="password"
        :rules="[{ required:true,message:'请输入密码!' },{ minLength:5,message:'密码过短' }]"
      >
        <c-input-pwd
          v-model="formData.password"
          size="large"
          placeholder="密码 / 123456"
        >
          <template #prefix>
            <icon-lock></icon-lock>
          </template>
        </c-input-pwd>
      </a-form-item>
      <a-row>
        <a-col :span="16">
          <a-form-item
            hide-asterisk
            :rules="[{ required:true,message:'请输入验证码!' },{ length:4,message:'验证码必须为4位' }]"
            field="captcha"
          >
            <c-input
              v-model="formData.captcha"
              size="large"
              placeholder="请输入验证码"
            >
              <template #prefix>
                <icon-face-smile-fill></icon-face-smile-fill>
              </template>
            </c-input>
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a
            href="#"
            class="captcha-wrapper"
            @click.prevent="() => getCaptcha()"
          >
            <img v-if="captchaUrl" :src="captchaUrl.result" />
            <img v-else src="~img/checkcode.png" />
          </a>
        </a-col>
      </a-row>
      <a-form-item>
        <c-btn
          html-type="submit"
          long
          size="large"
          @click.prevent="handleSubmit"
        >
          登 录
        </c-btn>
      </a-form-item>
    </a-form>
    <div class="footer">
      Copyright &copy; 2023 擎聪科技 出品
    </div>
  </div>
</template>

<style lang="less" scoped>
  .header{
    display: flex;
    align-items: center;

    svg{
      font-size: 80px;
    }

    span{
      margin-left: 14px;
      font-size: 33px;
      font-weight: bold;
    }
  }

  .login-wrapper{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    height: 100%;
    background: url("img/background.svg") no-repeat 50%;
    background-size: 100%;
  }

  .captcha-wrapper{
    display: block;
    margin-top: 8px;
    text-align: right;
  }

  .footer{
    margin-top: 50px;
    font-size: 14px;
    color: rgb(0 0 0 / 45%);
  }
</style> -->

<script setup lang="ts">

const form = ref({
  email: '',
  password: '',
  remember: false,
});

const isPasswordVisible = ref(false);
</script>

<template>
  <div class="auth-wrapper d-flex align-center justify-center pa-4">
    <VCard
      class="auth-card pa-4 pt-7"
      max-width="448"
    >
      <VCardItem class="justify-center">
        <template #prepend>
          <div class="d-flex">
            <div
              class="d-flex text-primary"
            ></div>
          </div>
        </template>

        <VCardTitle class="text-2xl font-weight-bold">
          sneat
        </VCardTitle>
      </VCardItem>

      <VCardText class="pt-2">
        <h5 class="text-h5 mb-1">
          Welcome to sneat! 👋🏻
        </h5>
        <p class="mb-0">
          Please sign-in to your account and start the adventure
        </p>
      </VCardText>

      <VCardText>
        <VForm @submit.prevent="$router.push('/')">
          <VRow>
            <!-- email -->
            <VCol cols="12">
              <VTextField
                v-model="form.email"
                autofocus
                placeholder="johndoe@email.com"
                label="Email"
                type="email"
              ></VTextField>
            </VCol>

            <!-- password -->
            <VCol cols="12">
              <VTextField
                v-model="form.password"
                label="Password"
                placeholder="············"
                :type="isPasswordVisible ? 'text' : 'password'"
                :append-inner-icon="isPasswordVisible ? 'mdi-eye-off' : 'mdi-eye'"
                @click:append-inner="isPasswordVisible = !isPasswordVisible"
              ></VTextField>

              <!-- remember me checkbox -->
              <div class="d-flex align-center justify-space-between flex-wrap mt-1 mb-4">
                <VCheckbox
                  v-model="form.remember"
                  label="Remember me"
                ></VCheckbox>
              </div>
              <!-- login button -->
              <VBtn
                block
                type="submit"
              >
                Login
              </VBtn>
            </VCol>
          </VRow>
        </VForm>
      </VCardText>
    </VCard>
  </div>
</template>

<style lang="scss">
.layout-blank {
  .auth-wrapper {
    min-block-size: calc(var(--vh, 1vh) * 100);
  }

  .auth-card {
    z-index: 1 !important;
  }
}

.auth-title {
  font-size: 28px;
  font-weight: 700;
}

.auth-v1-top-shape,
.auth-v1-bottom-shape {
  position: absolute;
}

.auth-v1-top-shape {
  block-size: 148px;
  inline-size: 148px;
  inset-block-start: -2.5rem;
  inset-inline-end: -2.5rem;
}

.auth-v1-bottom-shape {
  block-size: 240px;
  inline-size: 240px;
  inset-block-end: -4.5rem;
  inset-inline-start: -3rem;
}

.auth-illustration {
  z-index: 1;
}

@media (min-width: 960px) {
  .skin--bordered {
    .auth-card-v2 {
      border-inline-start: 1px solid rgba(var(--v-border-color), var(--v-border-opacity)) !important;
    }
  }
}
</style>
