<template>
  <div class="content m-center">
    <div class="exam">
      <div class="name">{{ examData.examName }}</div>
      <div class="time">得分: {{ examData.scores }}</div>
      <div v-if="examData.trainingPackageName" class="time">{{ examData.trainingPackageName }}</div>

      <el-form class="list" label-position="top" :model="form" disabled>
        <el-form-item v-for="(item, index) in examData.singleChoiceList" :key="index" :label="`(单选) ${index + 1}: ${item.content}`">
          <div v-for="(q, qI) in item.questionOptions" :key="qI">
            <el-radio-group v-model="form[item.id]" style="margin-right: 20px;">
              <el-radio :label="q.key">{{ q.key }}：{{ q.value }}</el-radio>
            </el-radio-group>
          </div>
          <div>试题答案: {{ item.correctAnswer[0] }}</div>
          <div>试题解析: {{ item.parse }}</div>
        </el-form-item>

        <el-form-item v-for="(item, index) in examData.multipleChoicesList" :key="examData.singleChoiceList.length + index" :label="`(多选) ${examData.singleChoiceList.length + index + 1}: ${item.content}`">
          <el-checkbox-group v-model="form[item.id]">
            <el-checkbox v-for="(q, qI) in item.questionOptions" :key="qI" :label="q.key">{{ q.key }}：{{ q.value }}</el-checkbox>
          </el-checkbox-group>
          <div>试题答案: {{ item.correctAnswer.join('，') }}</div>
          <div>试题解析: {{ item.parse }}</div>
        </el-form-item>

        <el-form-item v-for="(item, index) in examData.judgmentList" :key="examData.singleChoiceList.length + examData.multipleChoicesList.length + index" :label="`(判断) ${examData.singleChoiceList.length + examData.multipleChoicesList.length + index + 1}: ${item.content}`">
          <div v-for="(q, qI) in item.questionOptions" :key="qI">
            <el-radio-group v-model="form[item.id]" style="margin-right: 20px;">
              <el-radio :label="q.key">{{ q.key }}：{{ q.value }}</el-radio>
            </el-radio-group>
          </div>
          <div>试题答案: {{ item.correctAnswer[0] }}</div>
          <div>试题解析: {{ item.parse }}</div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { getExamResult } from 'api'
export default {
  name: 'ExamResult',
  data () {
    return {
      examData: {},
      form: {},
      timer: null

    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    getData () {
      getExamResult(this.$route.params.id).then(res => {
        res.data.singleChoiceList.forEach(m => {
          this.form[m.id] = m.userOptions[0]
        });
        res.data.judgmentList.forEach(m => {
          this.form[m.id] = m.userOptions[0]
        });
        res.data.multipleChoicesList.forEach(m => {
          this.form[m.id] = m.userOptions
        });
        this.examData = res.data
      }).catch (() => {
        this.examData = {}
      })
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
</style>
