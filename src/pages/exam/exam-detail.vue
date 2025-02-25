<template>
  <div class="content m-center">
    <div class="exam">
      <div class="name">{{ examData.name }}</div>
      <div class="time">{{ examData.duration }}分钟</div>

      <template v-if="!result">
        <el-form class="list" label-position="top" :model="form">
          <el-form-item v-for="(item, index) in examData.singleChoiceList" :key="index" :label="`(单选) ${index + 1}: ${item.content}`">
            <el-radio-group v-for="(q, qI) in item.questionOptions" :key="qI" v-model="form[item.id]" style="margin-right: 20px;">
              <el-radio :label="q.key">{{ q.key }}：{{ q.value }}</el-radio>
            </el-radio-group>
          </el-form-item>
  
          <el-form-item v-for="(item, index) in examData.multipleChoicesList" :key="examData.singleChoiceList.length + index" :label="`(多选) ${examData.singleChoiceList.length + index + 1}: ${item.content}`">
            <el-checkbox-group v-model="form[item.id]">
              <el-checkbox v-for="(q, qI) in item.questionOptions" :key="qI" :label="q.key">{{ q.key }}：{{ q.value }}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
  
          <el-form-item v-for="(item, index) in examData.judgmentList" :key="examData.singleChoiceList.length + examData.multipleChoicesList.length + index" :label="`(判断) ${examData.singleChoiceList.length + examData.multipleChoicesList.length + index + 1}: ${item.content}`">
            <el-radio-group v-for="(q, qI) in item.questionOptions" :key="qI" v-model="form[item.id]" style="margin-right: 20px;">
              <el-radio :label="q.key">{{ q.key }}：{{ q.value }}</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
  
        <div class="btn" @click="submit">提交考试</div>
      </template>
      <template v-else>
        <div class="scores">{{ result.scores }}</div>
        <div class="result" :class="result.examResult">{{ result.examResult === 'qualified' ? '合格' : '不合格' }}</div>
        <div>
          <el-button type="primary" @click="toDetail">查看考试详情</el-button>
          <el-button type="danger" @click="exit">退出考试</el-button>
        </div>
      </template>
    </div>

    <el-dialog
      title="满意度测评"
      top="5vh"
      :visible.sync="evaluationDialogVisible"
      width="1000px"
    > 
      <el-form ref="form" :model="evaluationForm" label-width="420px" label-position="left" :rules="rules">
        <div v-for="item in formList" :key="item.prop">
          <el-form-item :label="item.label" :prop="item.prop">
            <el-radio-group v-model="evaluationForm[item.prop]" @change="contentChange(evaluationForm[item.prop], item.prop2)">
              <el-radio v-for="r in ratingArr" :key="r" :label="r">{{ r }}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item v-if="ValidityShow(evaluationForm[item.prop])" :label="`请填写理由和建议：`" :prop="item.prop2">
            <el-input v-model="evaluationForm[item.prop2]" type="textarea"></el-input>
          </el-form-item>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <!-- <el-button @click="evaluationDialogVisible = false">取消</el-button> -->
        <el-button type="primary" @click="submitEvaluation">提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { getExamDetail, putExam, updateEvaluation } from 'api'
export default {
  name: 'ExamDetail',
  data () {
    const formList = [
      { label: '1. 本次培训课程内容，符合岗位技能需求，针对性强：', prop: 'content1', prop2: 'content1Suggestion' },
      { label: '2. 培训教师专业水平高，对教学内容阐述明确、具体、完整：', prop: 'content2', prop2: 'content2Suggestion' },
      { label: '3. 实训指导教师实操技能强，实训指导方法灵活：', prop: 'content3', prop2: 'content3Suggestion' },
      { label: '4. 有与培训规模相适应的理论教室、实训场地及设施设备：', prop: 'content4', prop2: 'content4Suggestion' },
      { label: '5. 培训机构的培训过程管理工作规范，要求严格：', prop: 'content5', prop2: 'content5Suggestion' },
      { label: '6. 培训时间和培训方式安排合理：', prop: 'content6', prop2: 'content6Suggestion' },
      { label: '7. 能够按照培训计划安排的内容和课时进行教学：', prop: 'content7', prop2: 'content7Suggestion' },
      { label: '8. 通过培训提高了技能，对你今后的工作有较大的帮助：', prop: 'content8', prop2: 'content8Suggestion' },
      { label: '9. 你对本次培训的总体评价：', prop: 'content9', prop2: 'content9Suggestion' }
    ]
    return {
      examData: {},
      form: {},
      durationTime: 0,
      timer: null,
      result: null,

      evaluationDialogVisible: false,
      formList,
      evaluationForm: {
        content1: "",
        content2: "",
        content3: "",
        content4: "",
        content5: "",
        content6: "",
        content7: "",
        content8: "",
        content9: "",
        content1Suggestion: "",
        content2Suggestion: "",
        content3Suggestion: "",
        content4Suggestion: "",
        content5Suggestion: "",
        content6Suggestion: "",
        content7Suggestion: "",
        content8Suggestion: "",
        content9Suggestion: ""
      },
      rules: {
        content1: [
          { required: true, message: '请选择评价', trigger: 'change' }
        ],
        content2: [
          { required: true, message: '请选择评价', trigger: 'change' }
        ],
        content3: [
          { required: true, message: '请选择评价', trigger: 'change' }
        ],
        content4: [
          { required: true, message: '请选择评价', trigger: 'change' }
        ],
        content5: [
          { required: true, message: '请选择评价', trigger: 'change' }
        ],
        content6: [
          { required: true, message: '请选择评价', trigger: 'change' }
        ],
        content7: [
          { required: true, message: '请选择评价', trigger: 'change' }
        ],
        content8: [
          { required: true, message: '请选择评价', trigger: 'change' }
        ],
        content9: [
          { required: true, message: '请选择评价', trigger: 'change' }
        ],
        
        content1Suggestion: [],
        content2Suggestion: [],
        content3Suggestion: [],
        content4Suggestion: [],
        content5Suggestion: [],
        content6Suggestion: [],
        content7Suggestion: [],
        content8Suggestion: [],
        content9Suggestion: []
      },
      ratingArr: ['满意', '比较满意', '一般', '比较不满意', '不满意']
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    getData () {
      getExamDetail(this.$route.params.id).then(res => {
        res.data.multipleChoicesList.forEach(m => {
          this.$set(this.form, m.id, []);
        });
        this.examData = res.data
        
        if(this.examData.duration > 0) {
          this.durationTime = this.examData.duration * 60
          this.startTimer()
        }

        // 满意度测评
        if (!this.examData.hasEvaluation) {
          // 满意度测评
          this.createEvaluation({ courseId: this.examData.courseId })

          // 弹框进行满意度测评
          this.evaluationDialogVisible = true

          this.examData.hasEvaluation = true
        }

      }).catch (() => {
        this.examData = {}
      })
    },
    startTimer () {
      this.timer = setTimeout(() => {
        this.durationTime -= 1
        if(this.durationTime === 0) {
          this.getClose()
          clearTimeout(this.timer)
        } else this.startTimer()
      }, 1000);
    },
    getClose () {
      let questionReqList = []
      for (const questionId in this.form) {
        const value = this.form[questionId];

        questionReqList.push({ questionId, userOptions: typeof value === 'string' ? [value] : value })
      }
      let params = {
        "examId": this.examData.id,
        "trainingPackageId": this.$route.query.trainingPackageId,
        "questionReqList": questionReqList
      }
      putExam(params).then(res => {
        this.$alert('考试时间已结束, 请退出本次考试。（并自动交卷）', '提醒', {
          confirmButtonText: '确定',
          callback: () => {
            // this.exit()
            let { data } = res
            this.result = data
          }
        });
      })

    },
    submit () {
      this.$confirm('确定提交本次考试，无法撤回，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let questionReqList = []
        for (const questionId in this.form) {
          const value = this.form[questionId];

          questionReqList.push({ questionId, userOptions: typeof value === 'string' ? [value] : value })
        }
        let params = {
          "examId": this.examData.id,
          "trainingPackageId": this.$route.query.trainingPackageId,
          "questionReqList": questionReqList
        }
        putExam(params).then(res => {
          let { data } = res
          this.result = data
          this.$message({
            type: 'success',
            message: '提交成功!'
          });
          clearTimeout(this.timer)
        })
      })
    },
    exit () {
      this.$router.replace({ path: "/exam" })
    },
    toDetail () {
      this.$router.replace({ path: "/exam/res/" + this.result.id})
    },

    submitEvaluation () {
      this.$refs['form'].validate((valid) => {
        if (!valid) return

        updateEvaluation({ courseId: this.examData.courseId, ...this.evaluationForm }).then(() => {
          this.$message.success(`提交成功`)
          this.evaluationDialogVisible = false
        })
      })
    },
    ValidityShow (field) {
      return field && field.includes('不满意')
    },
    contentChange (val, prop) {
      this.evaluationForm[prop] = ''

      if (val && val.includes('不满意')) {
        this.rules[prop] = [
          { required: true, message: '请填写理由和建议', trigger: 'change' }
        ]
      } else {
        this.rules[prop] = []
      }
    }
  },
  components: {
  },
  destroyed () {
    clearTimeout(this.timer)
  }
}
</script>

<style scoped>
.content {
  padding-top: 20px;
}
.exam {
  border: 2px solid #eee;
  padding: 40px 20px;
  border-radius: 15px;
  margin-bottom: 50px;
  display: flex;
  align-items: center;
  flex-flow: column;
}
.name {
  font-size: 34px;
  font-weight: 600;
  text-align: center;
  margin-bottom: 20px;
}
.time {
  font-size: 18px;
  color: #606266;
  text-align: center;
  margin-bottom: 20px;
}
.list {
  width: 100%;
}
.btn {
  width: 138px;
  height: 48px;
  text-align: center;
  line-height: 48px;
  background-color: #B70005;
  border-radius: 24px;
  color: #fff;
  cursor: pointer;
}

.scores {
  font-size: 90px;
  margin-bottom: 50px;
}
.result {
  font-size: 40px;
  margin-bottom: 50px;
  color: #B70005;
}
.result.qualified {
  color: green;
}
</style>
