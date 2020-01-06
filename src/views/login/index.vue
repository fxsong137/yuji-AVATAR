<template>
  <div class="login-container">
    <div class="title-container">
      <h3 class="title">羽迹AVATAR</h3>
    </div>
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" autocomplete="on" label-position="left">
      <div class="loginTitle">
        <svg-icon icon-class="phone" /><span>登录</span>
      </div>
      <div class="loginsection">
        <el-form-item prop="username">
          <span class="svg-container">
            <svg-icon icon-class="user" />
          </span>
          <el-input
            ref="username"
            v-model="loginForm.username"
            placeholder="请输入手机号"
            name="username"
            type="text"
            tabindex="5"
            autocomplete="on"
          />
        </el-form-item>

        <el-tooltip v-model="capsTooltip" content="Caps lock is On" placement="right" manual>
          <el-form-item prop="password">
            <span class="svg-container">
              <svg-icon icon-class="password" />
            </span>
            <el-input
              :key="passwordType"
              ref="password"
              v-model="loginForm.password"
              :type="passwordType"
              placeholder="请输入密码"
              name="password"
              tabindex="5"
              autocomplete="on"
              @keyup.native="checkCapslock"
              @blur="capsTooltip = false"
              @keyup.enter.native="handleLogin"
            />
            <!--
            @keyup.native 输入时每有新的字符串进入密码框就调用方法验证一次
            @keyup.enter.native 如果输入的时候按下回车就是直接调用登录方法
            -->
            <span class="show-pwd" @click="showPwd">
              <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
            </span>
            <el-button :type="register.authCodeColor" :disabled="register.authCodeType" @click.native.prevent="authCodeImpl">{{ register.authCodeTitle }}</el-button>
          </el-form-item>
        </el-tooltip>
        <div :class="register.nones?'tips':'nones'">
          <el-checkbox v-model="register.checked" />我已阅读并同意<span>羽迹AVATAR服务协议</span>和<span>羽迹AVATAR隐私声明协议</span>
        </div>
        <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:10px;background-color:rgba(1, 205, 154);border:0" @click.native.prevent="handleLogin">{{ register.msg }}</el-button>
        <div class="btmRegisters" @click="registers">{{ register.switchs }}<i class="el-icon-arrow-right" /></div>
      </div>

    </el-form>

    <el-dialog title="Or connect with" :visible.sync="showDialog">
      Can not be simulated on local, so please combine you own business simulation! ! !
      <br>
      <br>
      <br>
      <social-sign />
    </el-dialog>
  </div>
</template>

<script>

import { validUsername } from '@/utils/validate'
// eslint-disable-next-line
let that
export default {
  name: 'Login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error('请输入账号'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length === 0) {
        callback(new Error('请输入密码'))
      } else if (value.length < 6) {
        callback(new Error('密码长度必须大于6位'))
      } else {
        callback()
      }
    }
    return {
      // 表单参数对象
      loginForm: {
        username: 'admin',
        password: '111111'
      },
      // 表单参数验证对象
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      passwordType: 'password',
      capsTooltip: false,
      loading: false,
      showDialog: false,
      redirect: undefined,
      otherQuery: {},
      register: {
        chioce: 1,
        msg: '登录',
        switchs: '立即注册',
        checked: false,
        nones: false,
        authCodeTitle: '获取验证码',
        authCodeType: false,
        authCodeColor: 'success'
      }
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        const query = route.query
        console.log(query)
        if (query) { // 存在地址
        // 将地址对象的URL参数赋予当前页面参数用于登录跳转
          this.redirect = query.redirect
          this.otherQuery = this.getOtherQuery(query)
        }
      },
      immediate: true
    }
  },
  created() {
    that = this
  },
  mounted() {
    if (this.loginForm.username === '') {
      this.$refs.username.focus()
    } else if (this.loginForm.password === '') {
      this.$refs.password.focus()
    }
  },
  methods: {
    // 密码输入下 每按一下进入一次
    checkCapslock: function({ shiftKey, key } = {}) {
      console.log(shiftKey + '-' + key)
      if (key && key.length === 1) {
        if (shiftKey && (key >= 'a' && key <= 'z') || !shiftKey && (key >= 'A' && key <= 'Z')) {
          this.capsTooltip = true
        } else {
          this.capsTooltip = false
        }
      }
      if (key === 'CapsLock' && this.capsTooltip === true) {
        this.capsTooltip = false
      }
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    },
    // 登录
    handleLogin: function() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          if (that.register.chioce === 1) {
            this.loading = true
            // 触发store状态管理中对应的actions方法 js名称+js里方法名称
            this.$store.dispatch('user/logins', this.loginForm).then(() => {
              this.$router.push({ path: this.redirect || '/', query: this.otherQuery })
              this.loading = false
            }).catch(() => {
              this.loading = false
            })
          } else { // 注册点击
            if (that.register.checked) {
              console.log('已点击')
            } else {
              that.$message({ message: '请同意条款协议', type: 'warning' })
              return
            }
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 注册
    registers: function() {
      if (that.register.chioce === 2) { // 如果是注册点击
        that.register.msg = '登录'
        that.register.switchs = '立即注册'
        that.register.nones = false
        that.register.chioce = 1
      } else if (that.register.chioce === 1) { // 如果是登录点击
        that.register.msg = '注册'
        that.register.switchs = '登录'
        that.register.nones = true
        that.register.chioce = 2
      }
    },
    // 获取验证码
    authCodeImpl: function() {
      var title = that.register.authCodeTitle
      that.register.authCodeColor = 'info'
      that.register.authCodeType = true
      let s = 5
      // eslint-disable-next-line
      let TimeDao = setInterval(getTimeNumber, 1000)// 定时器
      function getTimeNumber() {
        if (s === 0) {
          that.register.authCodeTitle = title
          that.register.authCodeColor = 'success'
          that.register.authCodeType = false
          clearInterval(TimeDao)
        } else {
          that.register.authCodeTitle = s
          s--
        }
      }
    }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#283443;//页面背景颜色
$light_gray:#4F4F50;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 2.35em;
    width: 85%;
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      // padding: 0.6em 0.25em 0.6em 0.75em;
      color: $light_gray;
      height: 100%;
      caret-color: $cursor;
      &:-webkit-autofill {
        box-shadow: 0 0 0px 50em $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }
  .el-form-item {
    border: 1px solid rgba(232, 232, 232, 1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
    background-color: #FFFFFF;
    .el-form-item__content {
    display: flex;

    align-items: center;
    }
  }
  .el-form-item:nth-of-type(2){
    border: 0;
    .el-form-item__content {
    border: 1px solid rgba(232, 232, 232, 1);
    border-radius:5px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    button{
      height: 2em;
      width: 6em;
      line-height: 2em;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      margin-right: 0.5em;
      margin-left: 0.5em;
      font-size: 1em;

    }
   }
  }

}
</style>

<style lang="scss" scoped>
$bg:#F5F6F7;
$dark_gray:#889aa4;
$light_gray:#000000;//页面标题字体颜色

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 25em;
    top: 8em ;
    height: 25em;
    margin: 0 auto;
    overflow: hidden;
    border:1px solid #FFFFFF;
    background-color:#FFFFFF;
    .loginTitle{
      display: flex;
      justify-content: center;
      align-items: center;
      position:absolute;
      left: 0;
      padding-top: 0.5em;
      height: 4em;
      text-align: center;
      line-height: 4em;
      width: 100%;
      border-bottom: 3px solid rgba(242,242,242, 1);
      .svg-icon{
        height: 2em;
        width: 2em;
        margin-right: 0.5em;
      }
      span{
        font-size: 1em;
      }
    }
    .loginsection{
       width: 21em;
       height: 24em;
       margin: 0 auto;
       padding-top: 5em;
       display: flex;
       flex-direction: column;
       justify-content: center;
       .tips{
         font-size: 5px;
         margin-bottom: 0.5em;
         label{
           margin-right: 10px;
         }
         span{
           color: #5EDAEF;
         }
       }
       .nones{
         display: none;
       }
       .btmRegisters{
         position: absolute;
         right: 0;
         bottom: 0.5em;
         font-size: 13px;
         font-weight: 400;
         cursor: pointer;
       }
       .btmRegisters:hover{
         color: rgba(26, 192, 221,1)
       }
    }
  }

  .svg-container {
    padding: 0.3em 0.25em 0.3em 0.75em;
    color: $dark_gray;
    vertical-align: middle;
    width: 1.5em;
    display: inline-block;
  }

  .title-container {
    position: relative;
    margin: 0 auto;
    top: 6.5em;
    .title {
      font-size: 1.3em;
      color: $light_gray;
      margin: 0px auto 2em auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    padding-right: 0.5em;
    padding-top: 0.35em;
    font-size: 0.8em;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }

  @media only screen and (max-width: 470px) {
    .thirdparty-button {
      display: none;
    }
  }
  //当屏幕宽度大于360px时
  @media screen and (min-width:360px){
    .login-form{
      width: 30em;
      .loginsection{
      width: 25em;
    }
    }
}
//当屏幕宽度大于450px时
@media screen and (min-width:450px){
    .login-form{
      width: 36em;
      .loginsection{
      width: 28em;
    }
    }
}
}
</style>
