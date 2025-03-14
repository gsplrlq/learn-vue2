<template>
  <div class="sign-in-page">
    <header class="header">
      <img height="45" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJ4AAACgCAMAAADKKyWUAAAAt1BMVEX///+3AAW2AASxAACzAAC1AAHimpzMTE+uAAD56un79vbHOz+6Eha6CxDRXmLqs7TYeHvquLm3AAO/IyfYd3q9FhvOVVnWcHL45+jOU1a+GyDei47Ua27inJ3MT1LEMDXJREe9FRnhl5nptbe5CQ7afH+/HiLuxsfXc3Xgk5b56+vQWV3CKi7lpKbdiIrKR0vnq6zbgIL99/bvycrswMHsvL3TZWjFNzr9+/v029vy0dLekJL24OGF63ubAAAEnklEQVR42u3cjVLaQBSG4ex3zgFq0erBP7SCWK2gKGj9bXv/19WQRElCaGNwZa37dsYxSzp9ZumYXcAEPp/vb90Mj1ebzWYvauu53nNb6Xpb4UC2/PHetO9RezN9L3pg8hd73wdZ3bhB4lDc+JrhNRlq3AnS+J3S7TYA41AAXbjMExq4zAMdpXifPO//4tXc/r9Xez+z53mvzcNTpYaSYVTuZTwwJUn0iBqFZIdMNDSNYVSoaqKleQBzd38j6uaeo5FQ0jr5Fg2dHkZDClBz88tG0s0Ywp9PN6p1aVhL8tSwjIOnOqRGJ7rL56G7RJxd9twzeDuo2qOg7OwJ3QbP1WNL+hq9xvETuxNMu94jAbWDyt2xluOB+kGKR5MhHgVZXjjUCtJjBCzEqxFK8uRshkc3OZ5ml2QrIovyuCRPhkGeJ6tBfvaEdoNpt4S34vHnWV5zhserK8G0L41l8niWJ6vXaR7BOMZbyfCM53me583lbVfnHdjncf16t6gs5KzolJV9+zwIJF+IPl7J8D6zFAW1zBOoFMTH11kezdFZ5alRQUEiM7OHooxlHhQFGbjBM2oKk1meKco2z3ie53me53meSzwATEVJlndPRTHs8jTUtfpfC9p5yPB+3RWdc2h7vafg86ByF36vYYd35jbP8dnzPM/zPM/zvIo8t5cEWB22qtYTtb3eg3D1rK+Ww0y1EGaZFwZTNTVqm1c+l3Zqnud5b8BToWoxE8M2D9w66cftvKjw9M3cNvzgtXn6qtfcA8feU6tZ56nbPMdnD9R2m+f47HmeGzzXtkKeR2tOfxKD7tzmfXV6G869diesnRQe1EeHRY1G9Xonrh41Gg1FbfMgVC0OU2OZt1D64V8leM3fdnGbZ2Wn5jIPikWy/eRCwj/VEgBqmScAU/Xs/9zj4fhoMOkoqTbpoLjkoVp8zsX2G1xzr4LKnZJ93np13obbvG9k/93wTSu8Tx+Et+55nud575B34vJVwyzCu7XOE7qszruxzoNsnbfTbZfvfCiw/64QV07wnjaSnud5/xNPTXFagqTWeVriRQAI5qRL+VB6EkwUuEHFsW2egIdH+5eT9nP9umLEurXBfmGDEdu+aoD2g3lRwvsZzOkHLe9VginvdHkrFtDJP3k/5q73PK8Ez83F/BPv1POWxwPAnSDVIc/wzmd5A5u8sxRPc/9ITzTPG055U7FtXhKEHnOvqeZ4u4w87+FYyvFoLm+jBG/28wotnuG1yeR5O4RFrxrjMjw11A1SdUiQux/LVTzEKd4FKYyahXhtNiVmj+/Sl+kuxQsx6QVJj/UGJJ695yd7LQZjkSVBjUptJKV1331qj1igIU+BZLTFBCM6ORHdZEhCXcyTZqdeWGfEMU+6nXryHnj0Na7TGZKYMjwIT8MkE2KAzJCazJAi4alwHFH0hZ4OOdRFITqifMxAKV6I0YJNgE6/zx5kv9UyOwn9AHeQe0Ge5xrP8TtnviOegzf2zPKc0hXwxLhzw2XN8VZYgNAHB4p5jdvshgLuFOp4NUj3sNcgZ2JqSH7dNV7f6ff7my9pfV7hIxXbjDo5uA58vuX2B0mI88W6GGeCAAAAAElFTkSuQmCC" alt="logo">
      <img height="45" src="@/assets/images/logo_text-Bw18naUB.png" alt="logo">
    </header>
    <h1>线下培训满意度测评</h1>
    <template v-if="success">
      <p class="success-message">提交成功</p>
    </template>
    <template v-else>
      <div class="form-group">
        <span for="course-name">课程名称：</span>
        {{ courseName }}
      </div>
      <div class="form-group">
        <span for="course-name">培训名称：</span>
        {{ trainingCourseName }}
      </div>

      <el-form ref="form" :model="evaluationForm" label-position="top" :rules="rules">
        <el-form-item label="手机号：" prop="mobile">
          <el-input v-model="evaluationForm.mobile" type="text" placeholder="请输入手机号"></el-input>
        </el-form-item>
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

      <button @click="submitForm">提交</button>
    </template>
  </div>
</template>

<script>
import { getSignIn, submitEvaluation } from 'api';
export default {
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
      courseName: '',
      trainingCourseName: '',
      phoneNumber: '',
      success: false,
      formList,
      evaluationForm: {
        mobile: "",
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
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { pattern: /^1[3456789]\d{9}$/, message: '请输入正确的手机号', trigger: 'blur' }
        ],
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
    };
  },
  methods: {
    submitForm () {
      this.$refs['form'].validate((valid) => {
        if (!valid) return

        submitEvaluation({
          trainingCourseId: this.$route.params.id,
          ...this.evaluationForm
        }).then(() => {
          this.success = true;
        });
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
  mounted () {
    getSignIn(this.$route.params.id).then(res => {
      this.courseName = res.data.courseName;
      this.trainingCourseName = res.data.trainingCourseName;
    });
  }
};
</script>

<style scoped>
.sign-in-page {
  padding: 20px;
  font-family: Arial, sans-serif;
}

h1 {
  text-align: center;
  font-size: 28px;
  margin-bottom: 20px;
}

.form-group {
  /* text-align: center; */
  margin-bottom: 15px;
  font-size: 18px;
  display: flex;
  align-items: center;
}

label {
  display: block;
  margin-bottom: 5px;
  width: 120px;
}

input {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

.success-message {
  padding: 110px;
  text-align: center;
  color: green;
  font-size: 28px;
}
</style>