<template>
  <div class="video-detail">
    <!-- 头部 -->
    <video-header :base="courseDetail" />

    <!-- 内容部分 -->
    <video-content ref="content" :course-detail="courseDetail" />
  </div>
</template>
<script>
import VideoHeader from './header.vue'
import VideoContent from './content.vue'
import { getLessonDetail, joinClass } from 'api'
export default {
  name: 'XXX', // XXX
  components: {
    VideoHeader,
    VideoContent
  },
  data () {
    return {
      courseDetail: {}
    }
  },
  mounted () {
    this.joinClass()
  },
  methods: {
    joinClass () {
      joinClass({ courseId: this.$route.params.id }).then((res) => {
        // this.$message.success('加入班级成功')
        // this.$router.push(`/video/${this.$route.params.id}?videoId=${this.courseDetail.videoId}&class=${res.data}`)

        this.getCourseDetailData(res.data)
      })
    },
    // 获取课程详情
    getCourseDetailData (classId) {
      getLessonDetail(this.$route.params.id).then(res => {
        res.data.classId = classId
        res.data.hasStudy = true

        this.courseDetail = res.data
        this.$refs.content.getChapter()
        // getLessonChapter({'courseId': this.$route.params.id}).then(res2 => {
        //   res.data.chapter = res2.data

        // })
      }).catch (() => {
        this.courseDetail = {}
      })
    }
  },
}
</script>
<style scoped>

</style>