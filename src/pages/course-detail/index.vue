<template>
  <div class="course-detail">
    <!-- 头部 -->
    <course-header :base="courseDetail" />

    <!-- 内容部分 -->
    <course-content :data="courseDetail" />
  </div>
</template>
<script>
import CourseHeader from './header.vue'
import CourseContent from './content.vue'
import { getLessonDetail, getLessonChapter } from 'api'
export default {
  name: 'CourseDetail',
  data () {
    return {
      courseDetail: {
        base: {}
      }
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
  components: {
    CourseHeader,
    CourseContent
  }
}
</script>
