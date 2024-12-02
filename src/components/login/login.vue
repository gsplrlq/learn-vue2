<template>
  <div class="login-way">
    <el-form ref="loginForm" :model="loginForm" :rules="rules">
      <el-form-item prop="username">
        <el-input ref="username" v-model.trim="loginForm.username" placeholder="请输入手机号" clearable />
      </el-form-item>
      <el-form-item v-if="index === 0 && flag" prop="code">
        <el-input ref="code" v-model.trim="loginForm.code" placeholder="请输入密码" show-code />
      </el-form-item>
      <el-form-item v-if="index === 1 || !flag" prop="code" class="code-item">
        <el-input v-model.trim="loginForm.code" placeholder="请输入验证码" :maxlength="6" />

        <el-button class="code-item-btn" type="text" :disabled="!loginForm.username || second !== totalSecond" @click="getCode">
          {{ second === totalSecond ? '获取验证码' : second + `s 重新发送` }}
        </el-button>
      </el-form-item>
      <el-form-item class="auto-login-item">
        <template v-if="flag">
          <el-checkbox v-model="loginForm.auto">
            七天内自动登录
          </el-checkbox>
          <div class="auto-login-btn-box">
            <span>找回密码</span>
          </div>
        </template>
        <template v-else>
          <el-checkbox v-model="loginForm.argement">
            同意
          </el-checkbox>
          <span class="agreement">《注册协议》</span>
        </template>
      </el-form-item>
    </el-form>
    <button
      class="login-btn"
      :class="{'is-loading': isLoading || !flag && !loginForm.argement}"
      @click="handleValidateForm"
    >
      {{ btnText }}
    </button>
  </div>
</template>
<script>
// import crypto from 'crypto-js'
import { mapMutations } from 'vuex'
// import { userLogin, userRegister } from 'api/user.js'
import { sendSmsCode, verifySmsCode, userLogin, userRegister } from 'api'

export default {
  props: {
    index: Number,
    flag: Boolean
  },
  data () {
    // const checkcode = (rule, value, callback) => {
    //   if (!value) {
    //     callback(new Error('请再次输入密码'))
    //   } else if (value !== this.loginForm.code) {
    //     callback(new Error('两次输入的密码不一致'))
    //   } else {
    //     callback()
    //   }
    // }
    const rules = {
      username: [
        { required: true, message: '请输入手机号', trigger: 'blur' }
      ],
      code: [
        { required: true, message: '请输入' + this.index === 0 && this.flag ? '密码' : '验证码', trigger: 'blur' }
      ],
      // ckcode: [
      //   { required: true, message: '请再次输入密码', trigger: 'blur' },
      //   { validator: checkcode, trigger: 'blur' }
      // ]
    }
    return {
      isLoading: false,
      rules: rules,
      loginForm: {
        username: '15802920105',
        code: 'Aa123456',
        auto: true,
        argement: false
      },
      totalSecond: 60,
      second: 60,
      timer: null
    }
  },
  mounted () {
    // 自动聚焦
    const usernameRef = this.$refs.username
    const codeRef = this.$refs.code
    if (!this.loginForm.username) {
      usernameRef.focus()
    } else if (!this.loginForm.code) {
      codeRef.focus()
    }
    // 监听enter事件
    window.addEventListener('keyup', this.handleListenKeyup)
  },
  methods: {
    async getCode () {
      // 当前目前没有定时器开着，且 totalSecond 和 second 一致 (秒数归位) 才可以倒计时
      if (!this.timer && this.second === this.totalSecond) {
        // 发送请求，获取验证码
        const params = {
          "option": 1,
          "phone": this.loginForm.username,
          "type": "client"
        }
        await sendSmsCode(params)
        this.$message.success(`发送成功`)

        // 开启倒计时
        this.timer = setInterval(() => {
          this.second--

          if (this.second <= 0) {
            clearInterval(this.timer)
            this.timer = null // 重置定时器 id
            this.second = this.totalSecond // 归位
          }
        }, 1000)

        // 发送请求，获取验证码
      }
    },
    // 表单校验
    handleValidateForm () {
      if (this.isLoading || (!this.flag && !this.loginForm.argement)) {
        return false
      }
      this.$refs['loginForm'].validate((valid) => {
        if (valid) {
          if(this.index === 1 || !this.flag) {
            const params = {
              "option": 1,
              "phone": this.loginForm.username,
              "type": "client",
              "code": this.loginForm.code,
            }
            verifySmsCode(params).then(res => {
              res.data && this.handleBtnClick()
            })
          } else this.handleBtnClick()
        }
      })
    },
    // 按钮点击
    handleBtnClick () {
      let params = {
        mobile: this.loginForm.username,
        code: this.loginForm.code
      }
      // 判断是登陆还是注册
      let func = userRegister
      let tips = '注册'
      if(this.flag) {
        func = userLogin
        tips = '登录'
        params.type = this.index === 0 ? 'pwdLogin' : 'smsCodeLogin'
      }
      this.isLoading = true
      func(params).then(res => {
        this.isLoading = false
        let { data } = res
        this.$message.success(`${tips}成功`)
        this.loginForm = {}
        data._id = '67345953cce63d545c57c2a7'
        // 缓存用户数据
        this.setUserInfo(data)
        // 关闭弹窗
        this.setShowLogin(false)
      }).catch(() => {
        this.isLoading = false
      })
    },
    // 监听页面enter事件
    handleListenKeyup (e) {
      if (e.keyCode === 13) {
        this.handleValidateForm()
      }
    },
    // vuex
    ...mapMutations('login', {
      'setUserInfo': 'SET_USER_INFO',
      'setShowLogin': 'SET_SHOW_LOGIN'
    })
  },
  watch: {
    index () {
      this.$refs.loginForm.resetFields()
      this.loginForm = {
        username: '',
        code: '',
        auto: true,
        argement: false
      }
    },
    flag () {
      this.$refs.loginForm.resetFields()
      this.loginForm = {
        username: '',
        code: '',
        auto: true,
        argement: false
      }
    }
  },
  computed: {
    btnText () {
      let text = ''
      if (this.flag) {
        text = this.isLoading ? '登录中...' : '登录'
      } else {
        text = this.isLoading ? '注册中...' : '注册'
      }
      return text
    }
  },
  beforeDestroy () {
    window.removeEventListener('keyup', this.handleListenKeyup)
  }
}
</script>
<style lang="stylus" scoped>
  @import '~assets/stylus/login-form.styl';
</style>
