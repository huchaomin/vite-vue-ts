<script lang="ts" setup>
import rules from '@/constant/rules';
import { randomImage, login } from '@/api/sys';
import { type VForm } from 'vuetify/components';

const userStore = useUserStore();

const formData = reactive({
  username: '',
  password: '',
  captcha: '',
});

const isPasswordVisible = ref(false);

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

const form: Ref<InstanceType<typeof VForm> | null> = ref(null);
async function handleSubmit(): Promise<void> {
  const { valid } = await form.value?.validate() as { valid: boolean };
  if (valid) {
    const { data } = await $api(login, {
      ...formData,
      checkKey: captchaTime.value,
    });
    if (data.value !== null) {
      userStore.token = data.value.result.token;
      $notify('登录成功！');
    } else {
      formData.captcha = '';
      getCaptcha();
    }
  }
}
</script>

<template>
  <div class="auth-wrapper d-flex align-center justify-center pa-4">
    <VCard
      class="auth-card pa-4 pt-7"
      width="448"
    >
      <VCardItem class="justify-center">
        <VCardTitle class="text-2xl font-weight-bold">
          资产评估管理系统
        </VCardTitle>
      </VCardItem>

      <VCardText class="pt-2">
        <p class="mb-0 text-center">
          擎聪科技
        </p>
      </VCardText>

      <VCardText>
        <VForm ref="form" @submit.prevent="handleSubmit">
          <v-text-field
            v-model="formData.username"
            :rules="rules.username"
            autofocus
            placeholder="admin"
            label="请输入帐户名"
          ></v-text-field>

          <v-text-field
            v-model="formData.password"
            :rules="rules.password"
            label="请输入密码"
            placeholder="123456"
            :type="isPasswordVisible ? 'text' : 'password'"
            :append-inner-icon="isPasswordVisible ? 'mdi-eye-off' : 'mdi-eye'"
            @click:append-inner="isPasswordVisible = !isPasswordVisible"
          ></v-text-field>

          <v-row align="center">
            <v-col :cols="16">
              <v-text-field
                v-model="formData.captcha"
                :rules="rules.captcha"
                label="请输入验证码"
                placeholder="请输入验证码"
              >
              </v-text-field>
            </v-col>
            <a-col :cols="8">
              <a
                href="#"
                class="captcha-wrapper"
                @click.prevent="() => getCaptcha()"
              >
                <img v-if="captchaUrl" :src="captchaUrl.result" />
                <img v-else src="~img/checkcode.png" />
              </a>
            </a-col>
          </v-row>
          <VBtn
            block
            type="submit"
          >
            登录
          </VBtn>
        </VForm>
      </VCardText>
    </VCard>
  </div>
</template>
<style lang="scss" scoped>
  .auth-wrapper{
    height: 100%;
    background: url("img/background.svg") no-repeat 50%;
    background-size: 100%;
  }
</style>
