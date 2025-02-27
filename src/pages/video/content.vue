<template>
  <div>
    <div class="video m-center">
      <div class="main-content content-wrap">
        <!-- left -->
        <div class="left-area">
          <ThePlayer :playing-video="playObj" />
        </div>
        <!-- right -->
        <!-- <div class="right-area">
          <VideoList @update="update" />
        </div> -->
      </div>
    </div>
    
    <div class="course-detail-content">
      <!-- 导航部分 -->
      <div class="detail-nav">
        <ul class="m-center">
          <li
            v-for="(nav,index) in navList"
            :key="index"
            class="nav-item"
            :class="{active: index==currentNavIndex}"
            @click="currentNavIndex = index"
          >
            {{ nav.title }}
          </li>
        </ul>
      </div>

      <!-- 内容部分 -->
      <div class="detail-information m-center">
        <div class="information-left">
          <component :is="componentName" :catalog="courseDetail" />
        </div>
      </div>
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
import Aliplayer from "aliyun-aliplayer";
import ThePlayer from "components/video/ThePlayer.vue";
// import VideoList from "components/video/VideoList.vue";
// import { videoList } from "components/video/testVideoList";
import { getLessonChapter, getVideoAuth, createStudyHistory, createEvaluation, updateEvaluation } from "api";
import { setTimeout } from "core-js";
export default {
  name: 'XXX', // XXX
  props: {
    courseDetail: Object
  },
  components: {
    ThePlayer,
    // VideoList
    QuestionAnswer: () => import('components/question-answer/question-answer.vue'),
    Note: () => import('components/note/note.vue'),
    Comment: () => import('components/comment/comment.vue')
  },
  computed: {
    componentName () {
      return this.navList[this.currentNavIndex].componentName
    },
  },
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
      timer: null,
      player: null,
      playObj: {},
      videoList: [],

      currentNavIndex: 0,
      navList: [
        { title: '问答', componentName: 'question-answer' },
        { title: '笔记', componentName: 'note' },
        { title: '评价', componentName: 'comment' }
      ],

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
  methods: {
    createPlayer (playObj) {
      const { videoId, playauth } = playObj
      // 更多使用方法请参考接入文档：https://help.aliyun.com/zh/vod/developer-reference/integration
      this.player = new Aliplayer(
        {
          license: {
            domain: "bjsyrc.cn", // 申请 License 时填写的域名
            key: "EPSmMyEFEooJZm10S5cf853f03b2b4bd098e11931a4aeeb83" // 申请成功后，在控制台可以看到 License Key
          },
          id: "container",
          width: "100%",
          height: "485px",
          vid: videoId, // 如果是私有加密播放请传入 vid/playauth/encryptType
          playauth: playauth,
          // from: "vuedemo", // 仅在demo使用，正式环境请删除
          // 自定义组件请参考：https://video.aliyuncs.com/player/presentation/index.html?type=pictureAD
          components: [
            // {
            //   name: "StartADComponent",
            //   type: window.AliPlayerComponent.StartADComponent,
            //   args: [
            //     "https://img.alicdn.com/tfs/TB1byi8afDH8KJjy1XcXXcpdXXa-1920-514.jpg",
            //     "https://www.aliyun.com/product/vod",
            //     3,
            //   ],
            // },
            // {
            //   name: "MemoryPlayComponent",
            //   type: window.AliPlayerComponent.MemoryPlayComponent,
            //   args: [false, this.getTime, this.saveTime],
            // },
          ],
        },
        (player) => {
          //播放下一个视频
          player.on("ended", () => {
            clearTimeout(this.timer)
            console.log("播放结束");
            let index = this.videoList.findIndex(
              (item) => item.videoId === this.playObj.videoId,
            );
            if (index === -1) {
              return;
            }

            if (index === this.videoList.length - 1) {
              this.createHistory()
            }
            
            // if (index === this.videoList.length - 1 && !this.courseDetail.hasEvaluation) {
            const f = false
            if (f) {
              // 满意度测评
              createEvaluation({ courseId: this.$route.params.id })

              // 弹框进行满意度测评
              this.evaluationDialogVisible = true

              this.courseDetail.hasEvaluation = true
              return;
            }

            const nextVideo = this.videoList[index + 1];
            if(nextVideo) this.update(nextVideo);
          });
          player.on('ready', () => {
            player.seek(this.playObj.progress)
          });

          // 套餐付费课静止拖动
          // if(this.courseDetail.courseType === 2 && this.courseDetail.trainingPackage) {

          // 禁止拖动
          const flag = true
          if(flag) {
            let lastTime = 0;
            player.on('timeupdate', () => {
              if (!player.tag.seeking) {
                // 更新最近一次的播放位置
                lastTime = player.getCurrentTime();
              }
            })

            player.on('seeking', () => {
              var delta = player.getCurrentTime() - lastTime;
              if (Math.abs(delta) > 0.01) {
                console.log("Seeking is disabled");
                // 判断为拖动，自动跳回原来的位置
                // (iOS QQ浏览器无效，因为QQ浏览器不支持获取和修改currentTime属性)
                player.tag.currentTime = lastTime;
              }
            });

            player.on('ended', () => {
                lastTime = 0;
            });
          }
        },
      );
    },
    // 存储当前播放时间
    saveTime (memoryVideo, currentTime) {
      localStorage.setItem(memoryVideo, currentTime);
    },
    // 获取此视频上次播放时间
    getTime (memoryVideo) {
      return localStorage.getItem(memoryVideo);
    },
    //点击右侧列表视频切换
    update (video) {
      this.playObj = video;
      this.player.dispose(); //销毁

      this.$nextTick(() => {
        this.$router.push({ path: this.$route.path, query: { videoId: video.videoId, class: this.$route.query.class} })
        this.getVideo();
      });
    },
    getChapter () {
      getLessonChapter({courseId: this.$route.params.id}).then(res => {
        this.videoList = []
        res.data.forEach(d => {
          this.videoList = this.videoList.concat(...d.chapterList)
        });
        this.playObj = this.videoList.find(v => v.videoId === this.$route.query.videoId)
        this.getVideo()
      })
    },
    getVideo () {
      getVideoAuth({ videoId: this.playObj.videoId, courseId: this.$route.params.id }).then(res => {
        this.playObj.playauth = res.data
        this.createPlayer(this.playObj);

        this.startTimer()
      }).catch(() => {
        setTimeout(() => {
          this.$router.go(-1);
        }, 3000);
      })
    },
    startTimer () {
      this.timer = setTimeout(() => {
        this.createHistory()
        this.startTimer()
      }, 5000);
    },
    createHistory () {
      createStudyHistory({
        "courseId": Number(this.$route.params.id),
        "chapterId": this.playObj.id,
        "fileId": this.playObj.fileId,
        "progress": this.player.getCurrentTime(),
        "classId": Number(this.$route.query.class) || null
      })
    },
    submitEvaluation () {
      this.$refs['form'].validate((valid) => {
        if (!valid) return

        updateEvaluation({ courseId: this.$route.params.id, ...this.evaluationForm }).then(() => {
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
  mounted () {
    if(!this.$route.query.videoId) {
      return this.$message.error('视频异常，无法播放，请联系管理员')
    }
    this.getChapter()
  },
  destroyed () {
    clearTimeout(this.timer)
  }
}
</script>

<style scoped>
.course-detail-content .detail-nav {
  position: relative;
  height: 68px;
  line-height: 68px;
  box-shadow: 0 4px 8px 0 rgba(7,17,27,0.15);
}
.course-detail-content .detail-nav .nav-item {
  position: relative;
  display: inline-block;
  margin-right: 80px;
  font-size: 16px;
  color: #1c1f21;
  font-weight: 700;
  cursor: pointer;
}
.course-detail-content .detail-nav .nav-item.active {
  color: #B70005;
}
.course-detail-content .detail-nav .nav-item.active::after {
  content: '';
  display: block;
  margin: -15px auto 0px;
  width: 16px;
  height: 3px;
  border-radius: 15px;
  background-color: #B70005;
}
.course-detail-content .detail-information {
  margin-top: 36px;
  margin-bottom: 36px;
  display: flex;
  align-items: top;
}
.course-detail-content .detail-information .information-left {
  flex: 1;
}
.course-detail-content .detail-information .information-right {
  margin-left: 32px;
  flex: 0 0 320px;
  width: 320px;
}
.course-detail-content .detail-information .information-right > div {
  margin-bottom: 36px;
}

</style>
<style scoped>
.video {
  min-height: 500px;
}
.main-content {
  width: var(--content-width);
  margin: 0 auto;
  height: 100%;
}

.left-area {
  padding: 20px;
  flex: 2;
}
.right-area {
  flex: 1;
}

@media (min-width: 768px) {
  .content-wrap {
    display: flex;
  }
}
@media (max-width: 768px) {
  .main-content {
    width: 100%;
    padding: 0 20px;
  }
  .main-content .left-area {
    width: 100%;
  }
  .main-content .right-area {
    width: 100%;
  }
}
</style>
