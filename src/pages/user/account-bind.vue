<template>
  <div class="account-bind">
    <!-- <p ref="loginRecord" class="last-login-record">
      <span>上次登录时间：{{ userinfo.lastLoginTime }}</span>
      <span>地点：{{ userinfo.lastLoginCity }}</span>
      <span class="record-btn" @click="handleRecordClick">查看最近操作记录</span>
      <i class="iconfont" @click="handleCloseRecord">&#xe619;</i>
    </p> -->
    <dl>
      <dt class="bind-title">
        账号信息
        <!-- <span class="bind-rate">完成 <strong>5/5</strong></span> -->
        <!-- <mooc-button class="bind-btn" size="mini" round @click="handleEditClick">
          <i class="iconfont">&#xe600;</i>编辑
        </mooc-button> -->
      </dt>
      <dd class="bind-item">
        <i class="el-icon el-icon-user"></i>
        <div class="bind-introduction">
          <p class="bind-title">
            <span class="bind-type">用户</span>
            {{ userinfo.nickName }}
          </p>
          <p class="bind-subtitle">用户昵称</p>
        </div>
        <el-button type="text" @click="handleEditClick(1)">修改</el-button>
      </dd>
      <dd class="bind-item">
        <i class="iconfont">&#xe61a;</i>
        <div class="bind-introduction">
          <p class="bind-title">
            <span class="bind-type">手机</span>
            {{ userinfo.mobile }}
          </p>
          <p class="bind-subtitle">可用手机号加密码登录</p>
        </div>
        <el-button type="text" @click="handleEditClick(2)">修改</el-button>
      </dd>
      <dd class="bind-item">
        <i class="el-icon el-icon-postcard"></i>
        <div class="bind-introduction">
          <p class="bind-title">
            <span class="bind-type">身份证</span>
            {{ userinfo.idCard }}
          </p>
          <p class="bind-subtitle">用户身份证号</p>
        </div>
        <el-button type="text" @click="handleEditClick(4)">修改</el-button>
      </dd>
      <dd class="bind-item">
        <i class="el-icon el-icon-location-information"></i>
        <div class="bind-introduction">
          <p class="bind-title">
            <span class="bind-type">地址</span>
            <!-- {{ addresscode }} -->
            {{ userinfo.currentHouseholdLocation }}
          </p>
          <p class="bind-subtitle">用户详细地址: 详细地址</p>
        </div>
        <el-button type="text" @click="handleEditClick(5)">修改</el-button>
      </dd>
      <dd class="bind-item">
        <i class="iconfont">&#xe61e;</i>
        <div class="bind-introduction">
          <p class="bind-title">
            <span class="bind-type">密码</span>
          </p>
          <p class="bind-subtitle">用于保护账号信息和登录安全</p>
        </div>
        <el-button type="text" @click="handleEditClick(3)">修改</el-button>
      </dd>
      <!-- <dd class="bind-item">
        <i class="iconfont">&#xe646;</i>
        <div class="bind-introduction">
          <p class="bind-title">
            <span class="bind-type">微信</span>
            {{ userinfo.wechat }}
          </p>
          <p class="bind-subtitle">可用第三方微信账号快速登录</p>
        </div>
      </dd> -->
    </dl>

    <UserInfo ref="userInfo" :data="userinfo"></UserInfo>
  </div>
</template>
<script>
import { codeToText } from 'element-china-area-data'
import UserInfo from "./components/digUserInfo.vue";
export default {
  props: {
    userinfo: {
      type: Object
    }
  },
  components: {
    UserInfo
  },
  data () {
    return {
      codeToText,
    }
  },
  computed: {
    addresscode () {
      let str = ''
      if (this.userinfo.addressCode) {
        this.userinfo.addressCode.forEach(code => {
          str += this.codeToText[code]
        })
      }
      return str
      // return codeToText[this.userinfo.addresscode]
    }
  },
  methods: {
    // 关闭记录
    // handleCloseRecord () {
    //   const loginRecord = this.$refs.loginRecord
    //   loginRecord.style.height = 0
    //   loginRecord.style.opacity = 0
    // },
    // // 记录点击
    // handleRecordClick () {
    //   this.$emit('componentClick', 'record')
    // },
    // 编辑账号绑定信息
    handleEditClick (type) {
      this.$refs.userInfo.open(type)
    },
  },
  beforeDestroy () {
    clearTimeout(this.timer)
    this.timer = null
  }
}
</script>

<style lang="stylus" scoped>
  .account-bind
    .last-login-record
      margin-bottom: 20px;
      padding: 0 20px;
      height: 40px;
      line-height: 40px;
      background-color: #fff4e5;
      transition: all 0.1s linear;
      opacity: 1;
      font-size: 12px;
      color: #f56108;
      & > span:not(:first-child) {
        margin-left: 10px;
      }
      .iconfont
        float: right;
        margin-right: -10px;
        padding: 0 10px;
        cursor: pointer;
        font-size: 12px;
      .record-btn
        color: #008cc8;
        cursor: pointer;
    .bind-title
      position: relative;
      height: 40px;
      line-height: 40px;
      font-size: 16px;
      font-weight: 700;
      color: #333;
      .bind-rate
        margin-left: 15px;
        font-size: 12px;
        color: #93999f;
        &>strong
          font-weight: 700;
          color: #ef1514
      .bind-btn
        float: right;
        border: none;
        font-size: 15px;
    .bind-item
      position: relative;
      display: flex;
      align-items: center;
      height: 88px;
      padding: 0 15px;
      border-top: 1px solid #d0d6d9;
      .iconfont
        flex: 0 0 60px
        width: 60px;
        height: 100%;
        line-height: 88px;
        margin-right: 20px;
        font-size: 36px;
        color: #d9dde1;
        text-align: center;
      .el-icon
        flex: 0 0 60px
        width: 60px;
        height: 100%;
        line-height: 88px;
        margin-right: 20px;
        font-size: 36px;
        color: #d9dde1;
        text-align: center;
      .bind-introduction
        flex: 1;
        position: relative;
        .bind-title
          font-size: 14px;
          color: #2b333b;
          font-weight: 400;
          .bind-type
            font-size: 16px;
            font-weight: 700;
            color: #333;
        .bind-subtitle
          font-size: 14px;
          color: #93999f;
    >>> .mooc-dialog
      .mooc-dialog-body
        padding: 30px 30px 30px 20px;
</style>
