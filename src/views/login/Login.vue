<template>
  <div class="login">
    <div class="login-con">
      <div class="title">
        <p>欢迎登陆</p>
      </div>
      <div class="form-con">
        <a-form :model="loginForm" :rules="rules" @finish="onFinish">
          <a-form-item name="username" :wrapper-col="{span: 24}">
            <a-input v-model:value="loginForm.username" placeholder="请输入用户名">
              <template v-slot:addonBefore>
                <o-icon type="icondenglu-xuanzhong"></o-icon>
              </template>
            </a-input>
          </a-form-item>
          <a-form-item name="password" :wrapper-col="{span: 24}">
            <a-input-password v-model:value="loginForm.password" placeholder="请输入密码">
              <template v-slot:addonBefore>
                <o-icon type="icondenglu-mima"></o-icon>
              </template>
            </a-input-password>
          </a-form-item>
          <div class="checked-con">
            <a-checkbox v-model:checked="checked">记住账号</a-checkbox>
            <a href="http://www.baidu.com" target="_blank">忘记密码</a>
          </div>
          <a-form-item :wrapper-col="{span: 24}" v-bind="{validateStatus: 'error', help: errorInfo}">
            <a-button type="primary" html-type="submit" block :loading="loading">登录</a-button>
          </a-form-item>
        </a-form>
      </div>
    </div>
    <div class="footer-wrap">
      <p>copyright@2019&nbsp;XX科技&nbsp;All&nbsp;Rights&nbsp;Reserved</p>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, reactive, ref, Ref, onMounted } from 'vue'
  import { useRouter, Router } from 'vue-router'
  import { pendingEffect } from '@/util/pendingEffect'
  import { login } from '@/api/user'
  import { localCache, LOCAL_USERNAME } from '@/common/storage'
  import { setToken, setUsername } from '@/common/auth'
  import { homeName } from '@/config'

  interface LoginForm {
    username: string;
    password: string;
  }

  interface LoginRules {
    username: any[];
    password: any[];
  }

  export default defineComponent({
    name: 'login',
    setup () {
      const router: Router = useRouter()

      const loginForm: LoginForm = reactive({
        username: '',
        password: ''
      })

      const checked: Ref<boolean> = ref(false)
      const loading: Ref<boolean> = ref(false)
      const errorInfo: Ref<string> = ref('')

      const rules: LoginRules = {
        username: [{
          required: true,
          message: '账号不能为空'
        }],
        password: [{
          required: true,
          message: '密码不能为空'
        }]
      }

      onMounted(() => {
        const username: string | undefined = localCache.get(LOCAL_USERNAME)
        if (username) {
          loginForm.username = username
          checked.value = true
        }
      })

      function submit (): Promise<void> {
        const _data: Api.User.Login = {
          username: loginForm.username,
          password: loginForm.password,
        }
        return login(_data)
          .then((res) => {
            if (res.actionResult === '1') {
              if (res.data.token) {
                if (checked.value) {
                  localCache.set(LOCAL_USERNAME, loginForm.username)
                } else {
                  localCache.remove(LOCAL_USERNAME)
                }
                setUsername(loginForm.username)
                setToken(res.data.token)
                router.push({ name: homeName })
              }
            } else {
              errorInfo.value = res.message
            }
          })
          .catch(() => {
            errorInfo.value = '网络错误！'
          })
      }

      const onFinish: Function = pendingEffect(loading, submit)

      return {
        loginForm,
        checked,
        loading,
        errorInfo,
        rules,
        onFinish
      }
    }
  })
</script>

<style scoped lang="scss">
  .login {
    width: 100%;
    height: 100%;
    background-image: url('~@/assets/images/login-bg.png');
    background-color: $background;
    background-size: cover;
    background-position: 50%;
    position: relative;

    .login-con {
      position: absolute;
      right: 160px;
      top: 50%;
      width: 340px;
      background: $white;
      border-radius: 4px;
      transform: translateY(-60%);

      .title {
        padding: 14px 16px;
        border-bottom: 1px solid $border;

        p {
          font-weight: 700;
        }
      }

      .form-con {
        padding: 16px;

        .checked-con {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 18px;
        }
      }
    }

    .footer-wrap {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;

      p {
        padding: 10px;
        text-align: center;
        color: #EEE;
      }
    }
  }
</style>
