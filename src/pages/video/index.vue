<template>
  <div class="video-detail">
    <!-- 头部 -->
    <video-header :base="courseDetail" />

    <!-- 内容部分 -->
    <video-content :course-detail="courseDetail" />
  </div>
</template>
<script>
import VideoHeader from './header.vue'
import VideoContent from './content.vue'
import { getLessonDetail, getLessonChapter } from 'api'
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
    this.getCourseDetailData()
  },
  methods: {
    // 获取课程详情
    getCourseDetailData () {
      getLessonDetail(this.$route.params.id).then(res => {
        getLessonChapter({'courseId': this.$route.params.id}).then(res2 => {
          res.data.chapter = res2.data
          this.courseDetail = res.data
        })
      }).catch (() => {
        this.courseDetail = {}
      })
    }
  },
}
</script>
<style scoped>

</style>