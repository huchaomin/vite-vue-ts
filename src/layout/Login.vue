<script lang="ts" setup>
import { getRandomImage } from '@/api/sys';

const form = reactive({
  name: '',
  post: '',
  isRead: false,
});
const handleSubmit = () => {
};

function refreshRandomImage() {
  $api(getRandomImage, {
    timestamp: new Date().getTime(),
  }).then((res: any) => {
    console.log('res', res);
  }).catch((err: any) => {
    console.log('err', err);
  });
}
refreshRandomImage();

</script>
<template>
  <div class="login-wrapper">
    <div class="header">
      <svg-icon name="logo"></svg-icon>
      <span>资产评估管理系统</span>
    </div>
    <a-form
      :model="form"
      :style="{ width: '400px' }"
      layout="vertical"
      @submit="handleSubmit"
    >
      <a-form-item field="name">
        <a-input
          v-model="form.name"
          size="large"
          placeholder="请输入帐户名 / admin"
        >
          <template #prefix>
            <icon-user></icon-user>
          </template>
        </a-input>
      </a-form-item>
      <a-form-item
        field="post"
      >
        <a-input
          v-model="form.post"
          size="large"
          placeholder="密码 / 123456"
        >
          <template #prefix>
            <icon-lock></icon-lock>
          </template>
        </a-input>
      </a-form-item>
      <a-row>
        <a-col :span="16">
          <a-form-item>
            <a-input
              size="large"
              placeholder="请输入验证码"
            >
              <template #prefix>
                <icon-face-smile-fill></icon-face-smile-fill>
              </template>
            </a-input>
          </a-form-item>
        </a-col>
        <a-col
          :span="8"
          style="text-align: right"
        >
          <a
            href="#"
            @click.prevent="refreshRandomImage"
          >
            <img
              v-if="requestCodeSuccess"
              :src="randCodeImage"
            />
            <img
              v-else
              src="~img/checkcode.png"
            />
          </a>
        </a-col>
      </a-row>
    </a-form>
    {{ form }}
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
    background: #f0f2f5 url("img/background.svg") no-repeat 50%;
    background-size: 100%;
  }

  .footer{
    margin-top: 50px;
    font-size: 14px;
    color: rgb(0 0 0 / 45%);
  }
</style>
