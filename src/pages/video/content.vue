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
  </div>
</template>
<script>
import Aliplayer from "aliyun-aliplayer";
import ThePlayer from "components/video/ThePlayer.vue";
// import VideoList from "components/video/VideoList.vue";
// import { videoList } from "components/video/testVideoList";
import { getLessonChapter, getVideoAuth, createStudyHistory } from "api";
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
      ]
    }
  },
  methods: {
    createPlayer (playObj) {
      const { videoId, playauth } = playObj
      // 更多使用方法请参考接入文档：https://help.aliyun.com/zh/vod/developer-reference/integration
      this.player = new Aliplayer(
        {
          license: {
            domain: "bygo.com.cn", // 申请 License 时填写的域名
            key: "dPILC3rone23P1ceY60f52b892d57401cbda16286710f7673" // 申请成功后，在控制台可以看到 License Key
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
            let index = this.videoList.findIndex(
              (item) => item.videoId === this.playObj.videoId,
            );
            if (index === -1 || index === this.videoList.length - 1) {
              return;
            }
            this.update(this.videoList[index + 1]);
          });
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
      this.$router.push({ path: this.$route.path, query: { videoId: video.videoId} })
      this.getVideo()
        // this.createPlayer(video); //创建
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
      getVideoAuth({ videoId: this.playObj.videoId }).then(res => {
        this.playObj.playauth = res.data
        this.createPlayer(this.playObj);
        this.playObj.progress && this.player.seek(this.playObj.progress)

        this.startTimer()
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
        "courseId": this.$route.params.id,
        "chapterId": this.playObj.id,
        "fileId": this.playObj.fileId,
        "progress": this.player.getCurrentTime()
      })
    }
  },
  mounted () {
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
  color: #f20d0d;
}
.course-detail-content .detail-nav .nav-item.active::after {
  content: '';
  display: block;
  margin: -15px auto 0px;
  width: 16px;
  height: 3px;
  border-radius: 15px;
  background-color: #f20d0d;
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
