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
import { updateUserBinds } from 'api'
import uploadAvatar from "components/upload-avatar/index.vue";
export default {
  name: 'XXX', // XXX
  props: {
    data: {
      type: Object
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
        password: '',
        ckpassword: '',
        avatar: ''
      }
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
        password: '',
        ckpassword: '',
        avatar: this.data.avatar,
      }
      this.$nextTick(() => {
        this.$refs.editForm.resetFields()
      })
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
      const parmas = Object.assign({}, this.editForm, {
        id: this.data.id
      })
      updateUserBinds(parmas).then(() => {
        this.isLoading = false
        this.$message.success('修改成功')
        this.dialogVisible = false
        // 修改成功后，退出登录，调整到首页弹窗登录框
        this.timer = setTimeout(() => {
          this.logout()
          this.$router.replace('/home')
          this.showLogin(true)
        }, 500)
      }).catch(() => {
        this.$message.error('接口异常')
        this.isLoading = false
      })
    },
  },
}
</script>
<style scoped>

</style>