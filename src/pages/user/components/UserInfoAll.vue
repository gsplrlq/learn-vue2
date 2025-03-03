<template>
  <div>
    <!-- 账号绑定信息弹窗 -->
    <mooc-dialog title="修改账号信息" :visible.sync="dialogVisible" width="1000px">
      <el-form ref="editForm" :model="editForm" :rules="rules" label-width="100px" label-position="right">
        <el-row>
          <el-col :span="12">
            <el-form-item label="昵称" prop="userName">
              <el-input v-model.trim="editForm.userName" placeholder="请输入昵称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="性别" prop="sex">
              <el-radio-group v-model="editForm.sex">
                <el-radio label="男">男</el-radio>
                <el-radio label="女">女</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="生日" prop="birthdate">
              <el-date-picker
                v-model="editForm.birthdate"
                style="width: 100%;"
                type="date"
                placeholder="请选择生日"
                value-format="yyyy-MM-dd"
                format="yyyy-MM-dd"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="身份证" prop="idCard">
              <el-input v-model.trim="editForm.idCard" placeholder="请输入身份证"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="户籍类型" prop="householdRegistrationType">
              <el-input v-model.trim="editForm.householdRegistrationType" placeholder="请输入户籍类型"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="现居住地" prop="currentHouseholdLocation">
              <el-input v-model.trim="editForm.currentHouseholdLocation" placeholder="请输入现居住地"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="户口所在地" prop="domicileLocation">
              <el-input v-model.trim="editForm.domicileLocation" placeholder="请输入户口所在地"></el-input>
            </el-form-item>
          </el-col>
          
          
          <el-col :span="12">
            <el-form-item label="学历" prop="education">
              <el-input v-model.trim="editForm.education" placeholder="请输入学历"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="毕业院校" prop="graduationSchool">
              <el-input v-model.trim="editForm.graduationSchool" placeholder="请输入毕业院校"></el-input>
            </el-form-item>
          </el-col>
          
          <el-col :span="12">
            <el-form-item label="专业" prop="major">
              <el-input v-model.trim="editForm.major" placeholder="请输入专业"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="人员类别" prop="personnelCategory">
              <el-input v-model.trim="editForm.personnelCategory" placeholder="请输入人员类别"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="工作单位" prop="company">
              <el-input v-model.trim="editForm.company" placeholder="请输入工作单位"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="是否有证书" prop="whetherCertificate">
              <el-radio-group v-model="editForm.whetherCertificate">
                <el-radio label="是">是</el-radio>
                <el-radio label="否">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="职业证书" prop="vocationalCertificate">
              <el-input v-model.trim="editForm.vocationalCertificate" placeholder="请输入职业证书"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="证书级别" prop="certificateLevel">
              <el-input v-model.trim="editForm.certificateLevel" placeholder="请输入证书级别"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="证书类型" prop="certificateType">
              <el-input v-model.trim="editForm.certificateType" placeholder="请输入证书类型"></el-input>
            </el-form-item>
          </el-col>
          
        </el-row>
      </el-form>
      <template slot="footer">
        <mooc-button size="small" @click="dialogVisible = false">关闭</mooc-button>
        <mooc-button size="small" type="primary" :disable="isLoading" @click="handleValidateForm">保存</mooc-button>
      </template>
    </mooc-dialog>
  </div>
</template>
<script>
import { getSelfInfo, updateUser } from 'api'

export default {
  name: 'XXX', // XXX
  data () {
    return {
      rules: {
        userName: [
          { required: true, message: '请输入昵称', trigger: 'blur' }
        ],
        idCard: [
          { required: true, message: '请输入身份证', trigger: 'blur' }
        ],
        currentHouseholdLocation: [
          { required: true, message: '请输入现居住地', trigger: 'blur' }
        ],
        graduationSchool: [
          { required: true, message: '请输入毕业院校', trigger: 'blur' }
        ],
        major: [
          { required: true, message: '请输入专业', trigger: 'blur' }
        ],
        personnelCategory: [
          { required: true, message: '请输入人员类别', trigger: 'blur' }
        ],
        certificateType: [
          { required: true, message: '请输入证书类型', trigger: 'blur' }
        ],
        sex: [
          { required: true, message: '请选择性别', trigger: 'change' }
        ],
        birthdate: [
          { required: true, message: '请选择生日', trigger: 'change' }
        ],
        householdRegistrationType: [
          { required: true, message: '请输入户籍类型', trigger: 'blur' }
        ],
        domicileLocation: [
          { required: true, message: '请输入户口所在地', trigger: 'blur' }
        ],
        education: [
          { required: true, message: '请输入学历', trigger: 'blur' }
        ],
      },
      dialogVisible: false,
      isLoading: false,
      editForm: {
        "userName": "",
        "idCard": "",
        "mobile": "",
        "avatar": "",
        "currentHouseholdLocation": "",
        "graduationSchool": "",
        "major": "",
        "personnelCategory": "",
        "company": "",
        "whetherCertificate": "",
        "vocationalCertificate": "",
        "certificateLevel": "",
        "certificateType": "",
        "sex": "",
        "birthdate": "",
        "householdRegistrationType": "",
        "domicileLocation": "",
        "education": ""
      },
      totalSecond: 60,
      second: 60,
      timer: null
    }
  },
  methods: {
    open () {
      getSelfInfo().then(res => {
        this.dialogVisible = true
        this.editForm = res.data

        this.$nextTick(() => {
          this.$refs.editForm.resetFields()
        })
      }).catch(() => {
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
      const parmas = Object.assign({}, this.editForm)

      updateUser(parmas).then(() => {
        this.isLoading = false
        this.$message.success('修改成功')
        this.dialogVisible = false
      })
    },
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