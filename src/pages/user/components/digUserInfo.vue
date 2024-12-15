<template>
  <div>
    <!-- 账号绑定信息弹窗 -->
    <mooc-dialog title="修改账号信息" :visible.sync="dialogVisible" width="600px">
      <el-form ref="editForm" :model="editForm" :rules="rules" label-width="80px" label-position="right">
        <el-form-item v-if="type === 1" label="昵称" prop="userName">
          <el-input v-model.trim="editForm.userName" placeholder="请输入昵称"></el-input>
        </el-form-item>
        <el-form-item v-if="type === 2" label="手机号" prop="mobile">
          <el-input v-model.trim="editForm.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item v-if="type === 2" label="验证码" prop="code" class="code-item">
          <el-input v-model.trim="editForm.code" placeholder="请输入验证码" :maxlength="6" />

          <el-button class="code-item-btn" type="text" :disabled="!editForm.mobile || second !== totalSecond" @click="getCode">
            {{ second === totalSecond ? '获取验证码' : second + `s 重新发送` }}
          </el-button>
        </el-form-item>
        <el-form-item v-if="type === 3" label="密码" prop="password">
          <el-input v-model.trim="editForm.password" type="password" show-password placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item v-if="type === 3" label="确认密码" prop="ckpassword">
          <el-input v-model.trim="editForm.ckpassword" type="password" show-password placeholder="请再次输入密码"></el-input>
        </el-form-item>
        <el-form-item v-if="type === 0" label="头像" prop="avatar">
          <upload-avatar v-model="editForm.avatar"></upload-avatar>
        </el-form-item>
        <!-- <el-form-item label="微信账号" prop="wechat">
          <el-input v-model.trim="editForm.wechat" placeholder="请输入微信账号"></el-input>
        </el-form-item> -->
      </el-form>
      <template slot="footer">
        <mooc-button size="small" @click="dialogVisible = false">关闭</mooc-button>
        <mooc-button size="small" type="primary" :disable="isLoading" @click="handleValidateForm">保存</mooc-button>
      </template>
    </mooc-dialog>
  </div>
</template>
<script>
import { 
  updateUserAvatar,
  updateUserPhone,
  updateUserPwd,
  updateUserName 
} from 'api'
import { sendSmsCode, getUserInfo } from 'api'
import { mapActions, mapMutations } from 'vuex'

import uploadAvatar from "components/upload-avatar/index.vue";

export default {
  name: 'XXX', // XXX
  props: {
    data: {
      type: Object || String
    }
  },
  computed: {

  },
  components: {
    uploadAvatar
  },
  data () {
    return {
      type: '',
      rules: [],
      dialogVisible: false,
      isLoading: false,
      editForm: {
        userName: '',
        mobile: '',
        code: '',
        password: '',
        ckpassword: '',
        avatar: ''
      },
      totalSecond: 60,
      second: 60,
      timer: null
    }
  },
  methods: {
    open (type) {
      this.type = type
      switch (type) {
        case 0: this.rules = {
          avatar: [
            { required: true, message: '头像不能为空', trigger: 'change' }
          ]
        }; break;
        case 1: this.rules = {
          userName: [
            { required: true, message: '请输入昵称', trigger: 'blur' }
          ]
        }; break;
        case 2: this.rules = {
          mobile: [
            { required: true, message: '请输入手机号', trigger: 'blur' }
          ],
          code: [
            { required: true, message: '请输入验证码', trigger: 'blur' }
          ],
        }; break;
        case 3: this.rules = {
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' }
          ],
          ckpassword: [
            { required: true, message: '请再次输入密码', trigger: 'blur' },
            { validator: (rule, value, callback) => {
              if (!value) {
                callback(new Error('请再次输入密码'))
              } else if (value !== this.editForm.password) {
                callback(new Error('两次输入的密码不一致'))
              } else {
                callback()
              }
            }, trigger: 'blur' }
          ]
        }; break;
      
        default: break;
      }

      this.dialogVisible = true
      this.editForm = {
        userName: '',
        mobile: '',
        code: '',
        password: '',
        ckpassword: '',
        avatar: this.data.avatar,
      }
      this.$nextTick(() => {
        this.$refs.editForm.resetFields()
      })
    },
    async getCode () {
      // 当前目前没有定时器开着，且 totalSecond 和 second 一致 (秒数归位) 才可以倒计时
      if (!this.timer && this.second === this.totalSecond) {
        // 发送请求，获取验证码
        const params = {
          "option": 5,
          "phone": this.editForm.mobile,
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
    // 校验账号绑定信息
    handleValidateForm () {
      this.$refs.editForm.validate(valid => {
        if (valid) {
          this.handleSaveClick()
        }
      })
    },
    // 保存账号绑定信息
    handleSaveClick () {
      this.isLoading = true
      const parmas = Object.assign({}, this.editForm)
      let url = ''
      switch (this.type) {
        case 0: url = updateUserAvatar; break;
        case 1: url = updateUserName; break;
        case 2: url = updateUserPhone; break;
        case 3: url = updateUserPwd; break;
          
        default:
          break;
      }
      url(parmas).then(() => {
        this.isLoading = false
        this.$message.success('修改成功')
        this.getUserInfoData()
        this.dialogVisible = false
        
        // 修改成功后，退出登录，调整到首页弹窗登录框
        if(this.type === 3 || this.type === 2) {
          setTimeout(() => {
            this.logout()
            this.$router.replace('/home')
            this.showLogin(true)
          }, 500)
        }
      }).catch(() => {
        // this.$message.error('接口异常')
        // this.isLoading = false
      })
    },
    // 获取用户详细信息
    getUserInfoData () {
      getUserInfo().then(res => {
        let { data } = res
        data._id = '67345953cce63d545c57c2a7'
        this.setUserInfo(data)
      }).catch(() => {
      })
    },
    
    // vuex
    ...mapActions({
      'logout': 'login/logout'
    }),
    ...mapMutations({
      'setUserInfo': 'login/SET_USER_INFO',
      'showLogin': 'login/SET_SHOW_LOGIN' 
    })
  },
}
</script>
<style scoped>
.code-item {
  position: relative;
}
.code-item .code-item-btn {
  position: absolute;
  right: 20px;
}
</style>