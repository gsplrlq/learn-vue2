<template>
  <div class="login-container">
    <div class="login-mask" @click="handleMaskClick" />
    <div class="login-main">
      <div class="login-tab">
        <template v-if="loginFlag">
          <span
            v-for="(item,index) in loginTabs"
            :key="index"
            class="login-tab-item"
            :class="{active: index==currentTabIndex}"
            @click="currentTabIndex = index"
          >{{ item }}</span>
        </template>
        <span v-else class="login-tab-item">快速注册</span>

        <span class="login-close iconfont" @click="handleMaskClick">&#xe619;</span>
      </div>
      <component :is="componentName" :index="currentTabIndex" :flag="loginFlag" @close="handleMaskClick" />
      <div v-show="componentName!='qrcode-way'" class="three-login-way">
        <span class="phone-login" @click="loginFlag = !loginFlag">{{ threeTitle }}</span>
        <span class="three-way-item">
          <!-- <i class="iconfont weibo">&#xe653;</i> -->
          <!-- <i class="iconfont wechart">&#xe646;</i> -->
          <!-- <i class="iconfont qq">&#xe6a0;</i> -->
        </span>
      </div>
      <!-- <div v-if="currentTabIndex == 0" class="qrcode-way" :style="getQrcodeBackground" @click="handleQrcodeClick" /> -->
    </div>
  </div>
</template>
<script>
import LoginWay from './login.vue'
import QrcodeWay from './qrcode.vue'
import { mapMutations, mapGetters } from 'vuex'
export default {
  data () {
    return {
      loginFlag: true,
      loginTabs: ['账号登录', '验证码登录'],
      currentTabIndex: 0,
      componentName: 'login-way'
    }
  },
  created () {
    this.loginFlag = !(this.loginAction === 'register')
  },
  methods: {
    // 遮罩点击
    handleMaskClick () {
      this.currentTabIndex = 0
      this.loginFlag = true
      this.$emit('maskClick')
    },
    // 二维码点击事件
    handleQrcodeClick () {
      this.componentName = this.componentName === 'qrcode-way' ? 'login-way' : 'qrcode-way'
    },
    // vuex
    ...mapMutations({
      'setShowLogin': 'login/SET_SHOW_LOGIN'
    })
  },
  computed: {
    getQrcodeBackground () {
      let background = this.componentName === 'qrcode-way' ? 'pcLogin.png' : 'erweima.png'
      return {
        background: `url('https://www.imooc.com/static/img/${background}') no-repeat 0 0`
      }
    },
    threeTitle () {
      return this.loginFlag ? '快速注册' : '返回账号登录'
    },
    // vuex
    ...mapGetters(['loginAction'])
  },
  components: {
    LoginWay,
    QrcodeWay
  }
}
</script>

<style lang="stylus" scoped>
  @import '~assets/stylus/mixin.styl';
  $red = #f20d0d;
  .login-container
    z-index: 333;
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    .login-mask
      mask(rgba(0,0,0,0.6), 1000);
    .login-main
      z-index: 100000;
      position: absolute;
      left: 50%;
      top: 50%;
      padding: 10px 0 30px;
      width: 384px;
      transform: translate(-50%, -50%);
      background-color: #fff;
      border-radius: 12px;
      min-height: 300px;
      .login-tab
        position: relative;
        padding: 0 20px 25px;
        .login-close
          float: right;
          display: inline-block;
          padding: 0 10px;
          line-height: 50px;
          font-size: 24px;
          color: #787d82;
          cursor: pointer;
          &:hover
            transform: scale(1.2);
            color:$red;
        .login-tab-item
          display: inline-block;
          width: 90px;
          font-size: 16px;
          line-height: 50px;
          color: #1c1f21;
          text-align: center;
          font-weight: 700;
          cursor: pointer;
          &.active
            color: $red;
            &::after
              content: '';
              display: block;
              margin: 0 auto;
              width: 16px;
              height: 4px;
              border-radius: 4px;
              background-color: $red; 
      .three-login-way
        margin-top: 22px;
        padding: 0 32px;
        .phone-login
          cursor: pointer;
          display: inline-block;
          vertical-align: middle;
          margin-right: 24px;
          padding-left: 24px;
          padding-right: 24px;
          border-right: 1px solid #1a1C1F21
          line-height: 24px;
          font-size: 14px;
          color: #f20d0d;
        .three-way-item
          display: inline-block;
          vertical-align: middle;
          line-height: 24px;
          .iconfont
            margin: 0 12px;
            display: inline-block;
            vertical-align: middle;
            color: #b5b9bc;
            font-size: 24px;
            cursor: pointer;
            &.weibo:hover
              color: #f20d0d;
            &.wechart:hover
              color: #00B33B;
            &.qq:hover
              color: #0088CC;
      .qrcode-way
        position: absolute;
        bottom: 0;
        right: 0;
        width: 60px;
        height: 60px;
        background:url('https://www.imooc.com/static/img/erweima.png') no-repeat 0 0;
        border-bottom-right-radius: 12px;
        cursor: pointer; 
</style>
