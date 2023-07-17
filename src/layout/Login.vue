<template>
  <div class="login-wrapper">
    <div class="header">
      <svg-icon
        name="logo"
      ></svg-icon>
      <span>资产评估管理系统</span>
    </div>
    <a-form
      :model="form"
      :style="{ width: '400px' }"
      layout="vertical"
      @submit="handleSubmit"
    >
      <a-form-item
        field="name"
        tooltip="Please enter username"
        label="Username"
      >
        <a-input
          v-model="form.name"
          size="large"
          placeholder="please enter your username..."
        ></a-input>
      </a-form-item>
      <a-form-item
        field="post"
        label="Post"
      >
        <a-input
          v-model="form.post"
          size="large"
          placeholder="please enter your post..."
        ></a-input>
      </a-form-item>
      <a-form-item field="isRead">
        <a-checkbox v-model="form.isRead">
          I have read the manual
        </a-checkbox>
      </a-form-item>
      <a-form-item>
        <a-button html-type="submit">
          Submit
        </a-button>
      </a-form-item>
    </a-form>
    {{ form }}
    <div class="footer">
      Copyright &copy; 2023 擎聪科技 出品
    </div>
  </div>
</template>

<script lang="ts" setup>

const form = reactive({
  name: '',
  post: '',
  isRead: false,
});
const handleSubmit = () => {
};

</script>
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
