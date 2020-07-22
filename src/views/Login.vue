<template>
  <div class="login">
    <div class="login__form">
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        size="medium"
        label-width="0"
      >
        <el-form-item prop="account">
          <el-input
            v-model.trim="form.account"
            placeholder="请输入帐号"
          ></el-input>
        </el-form-item>
        <el-form-item prop="pwd">
          <el-input
            placeholder="请输入密码"
            v-model.trim="form.pwd"
            show-password
          ></el-input>
        </el-form-item>
      </el-form>
      <el-button
        class="login__submit"
        type="primary"
        size="medium"
        @click="onSubmit"
      >登录</el-button>
    </div>
  </div>
</template>

<script>
import { COOKIE_KEY, COOKIE_TIME } from '@utils/constants'
import { login } from '@/api/login/login'

export default {
  name: 'Login',
  data () {
    return {
      form: {
        account: null, // 帐号
        pwd: null, // 密码
      },
      rules: {
        account: [
          { required: true, message: '请输入帐号', trigger: 'blue' },
          { min: 1, max: 32, message: '帐号最多32个字符', trigger: 'change' },
        ],
        pwd: [
          { required: true, message: '请输入密码', trigger: 'blue' },
          { min: 1, max: 32, message: '密码最多32个字符', trigger: 'change' },
        ],
      },
    }
  },
  methods: {
    /**
     * 登录
     */
    onSubmit () {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          // 验证成功
          // 登录请求
          const result = await login({
            account: this.form.account,
            pwd: this.form.pwd,
          })

          if (result) {
            console.log(result)
          }
          this.$cookies.set(COOKIE_KEY.userId, 'admin', COOKIE_TIME)
          this.$cookies.set(COOKIE_KEY.name, '陈柄昌', COOKIE_TIME)
          this.$router.push({ path: '/' })
        } else {
          // 验证失败
          this.$message({
            type: 'error',
            showClose: true, // 显示手动关闭按钮
            message: '输入内容有误',
            duration: 1000, // 延迟1秒后关闭
            customClass: 'common-toast',
          })
        }
      })
    },

  },
}
</script>

<style lang="scss">
  .login {
    display: flex;
    justify-content: center;
    height: 100%;

    &__form {
      width: 330px;
      margin-top: 250px;
    }

    &__submit {
      width: 100%;
    }
  }
</style>
