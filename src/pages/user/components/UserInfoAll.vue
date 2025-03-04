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
            <el-form-item label="户籍性质" prop="householdRegistrationType">
              <el-select v-model="editForm.householdRegistrationType" style="width: 100%;" placeholder="请选择户籍性质">
                <el-option label="本市农村" value="本市农村"></el-option>
                <el-option label="本市城镇" value="本市城镇"></el-option>
                <el-option label="外省农村" value="外省农村"></el-option>
                <el-option label="外省城镇" value="外省城镇"></el-option>
              </el-select>
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
              <el-select v-model="editForm.education" style="width: 100%;" placeholder="请选择学历">
                <el-option label="初中" value="初中"></el-option>
                <el-option label="高中" value="高中"></el-option>
                <el-option label="中专" value="中专"></el-option>
                <el-option label="中技" value="中技"></el-option>
                <el-option label="大专" value="大专"></el-option>
                <el-option label="本科" value="本科"></el-option>
                <el-option label="硕士" value="硕士"></el-option>
                <el-option label="博士" value="博士"></el-option>
                <el-option label="博士后" value="博士后"></el-option>
                <el-option label="MBA" value="MBA"></el-option>
                <el-option label="EMBA" value="EMBA"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="毕业院校" prop="graduationSchool">
              <el-input v-model.trim="editForm.graduationSchool" placeholder="请输入毕业院校"></el-input>
            </el-form-item>
          </el-col>

          <!-- <el-col :span="12">
            <el-form-item label="证件类型" prop="idCardType">
              <el-select v-model="editForm.idCardType" placeholder="请选择证件类型">
                <el-option label="身份证" value="身份证"></el-option>
                <el-option label="港澳居民来往内地通行证" value="港澳居民来往内地通行证"></el-option>
                <el-option label="台湾居民来往内地通行证" value="台湾居民来往内地通行证"></el-option>
                <el-option label="港澳居民居住证" value="港澳居民居住证"></el-option>
                <el-option label="台湾居民居住证" value="台湾居民居住证"></el-option>
                <el-option label="其他" value="其他"></el-option>
              </el-select>
            </el-form-item>
          </el-col> -->

          <el-col :span="12">
            <el-form-item label="专业" prop="major">
              <el-input v-model.trim="editForm.major" placeholder="请输入专业"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="人员类别" prop="personnelCategory">
              <el-select v-model="editForm.personnelCategory" style="width: 100%;" placeholder="请选择人员类别">
                <el-option label="在职人员" value="在职人员"></el-option>
                <el-option label="就业援助对象" value="就业援助对象"></el-option>
                <el-option label="高校毕业生" value="高校毕业生"></el-option>
                <el-option label="应届高校毕业生" value="应届高校毕业生"></el-option>
                <el-option label="残疾人" value="残疾人"></el-option>
                <el-option label="退役军人" value="退役军人"></el-option>
                <el-option label="失业人员" value="失业人员"></el-option>
                <el-option label="青年失业者" value="青年失业者"></el-option>
                <el-option label="去产能、纾解外迁或长期停产停工人员" value="去产能、纾解外迁或长期停产停工人员"></el-option>
                <el-option label="来京务工人员" value="来京务工人员"></el-option>
                <el-option label="转业干部、退役军人、随军家属等优抚人" value="转业干部、退役军人、随军家属等优抚人"></el-option>
                <el-option label="银发人员（退休人员）" value="银发人员（退休人员）"></el-option>
                <el-option label="低收入农户" value="低收入农户"></el-option>
                <el-option label="其他" value="其他"></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="工作单位" prop="company">
              <el-input v-model.trim="editForm.company" placeholder="请输入工作单位"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="是否有证书" prop="whetherCertificate">
              <el-radio-group v-model="editForm.whetherCertificate" @change="editForm.certificateLevel = editForm.vocationalCertificate = editForm.certificateType = ''; $refs.editForm.clearValidate(['vocationalCertificate','certificateLevel','certificateType'])">
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
              <el-select v-model="editForm.certificateLevel" style="width: 100%;" placeholder="请选择证书级别">
                <el-option label="高级技师（一级）" value="高级技师（一级）"></el-option>
                <el-option label="技师（二级）" value="技师（二级）"></el-option>
                <el-option label="高级工（三级）" value="高级工（三级）"></el-option>
                <el-option label="中级工（四级）" value="中级工（四级）"></el-option>
                <el-option label="初级工（五级）" value="初级工（五级）"></el-option>
              </el-select>
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
  computed: {
    rules () {
      const d = {
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
          { required: true, message: '请选择人员类别', trigger: 'change' }
        ],
        // certificateType: [
        //   { required: true, message: '请输入证书类型', trigger: 'blur' }
        // ],
        sex: [
          { required: true, message: '请选择性别', trigger: 'change' }
        ],
        birthdate: [
          { required: true, message: '请选择生日', trigger: 'change' }
        ],
        householdRegistrationType: [
          { required: true, message: '请选择户籍性质', trigger: 'change' }
        ],
        domicileLocation: [
          { required: true, message: '请输入户口所在地', trigger: 'blur' }
        ],
        education: [
          { required: true, message: '请选择学历', trigger: 'change' }
        ],
      }
      if(this.editForm.whetherCertificate === '是') {
        d.certificateLevel = [
          { required: true, message: '请选择证书级别', trigger: 'change' }
        ]
        d.vocationalCertificate = [
          { required: true, message: '请输入职业证书', trigger: 'blur' }
        ]
        d.certificateType = [
          { required: true, message: '请输入证书类型', trigger: 'blur' }
        ]
      }
      return d
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