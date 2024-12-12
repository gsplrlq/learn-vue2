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
  </div>
</template>
<script>
import { getExamDetail, putExam } from 'api'
export default {
  name: 'ExamDetail',
  data () {
    return {
      examData: {},
      form: {},
      durationTime: 0,
      timer: null,
      result: null
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
      this.$alert('考试时间已结束, 请退出本次考试。（并自动交卷）', '提醒', {
        confirmButtonText: '确定',
        callback: () => {
          this.exit()
        }
      });
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
          "trainingPackageId": this.examData.trainingPackageId,
          "trainingPackageName": this.examData.trainingPackageName,
          "questionReqList": questionReqList
        }
        putExam(params).then(res => {
          let { data } = res
          this.result = data
          this.$message({
            type: 'success',
            message: '提交成功!'
          });
        })
      })
    },
    exit () {
      this.$router.replace({ path: "/exam" })
    },
    toDetail () {
      this.$router.replace({ path: "/exam/res/" + this.result.id})
    }
  },
  components: {
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
  background-color: #f20d0d;
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
  color: #f20d0d;
}
.result.qualified {
  color: green;
}
</style>
