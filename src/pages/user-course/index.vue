<template>
  <div class="user-course">
    <!-- 头部 -->
    <course-header />

    <!-- 内容部分 -->
    <div class="m-center">
      <div class="user-course-content">
        <div class="nav-container">
          <ul>
            <li
              v-for="(nav,index) in navList"
              :key="index"
              class="nav-item"
              :class="{active: currentNavIndex == index}"
              @click="handleNavClick(nav,index)"
            >
              {{ nav.title }}
            </li>
          </ul>
        </div>
        <div class="content-container">
          <component :is="componentName" :list="currentList" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import CourseHeader from './header.vue'
export default {
  data () {
    return {
      currentNavIndex: 0,
      userCourse: {},
      navList: []
    }
  },
  created () {
    this.currentNavIndex = this.$route.query.nav || 0
    // 初始化导航数据
    this.navList = [
      { title: '我的课程',  componentName: 'Course' },
      { title: '考试', componentName: 'Exam' }, 
      { title: '证书', componentName: 'CertificateInfo' }, 
      { title: '笔记', componentName: 'CourseNote' }, 

      // { title: '笔记', code: 2, componentName: 'Question', key: 'question' },
      // { title: '打卡', code: 2, componentName: 'Article', key: 'article' }
    ]

  },
  watch: {
    $route () {
      this.currentNavIndex = this.$route.query.nav || 0
    }
  },
  methods: {
    // 导航点击
    handleNavClick (item, index) {
      this.currentNavIndex = index
    }
  },
  computed: {
    componentName () {
      return this.navList[this.currentNavIndex].componentName
    },
    currentList () {
      let currNav = this.navList[this.currentNavIndex]
      return this.userCourse[currNav.key] || []
    }
  },
  components: {
    CourseHeader,
    Course: () => import('./course.vue'),
    Exam: () => import('./exam.vue'),
    CertificateInfo: () => import('./certificateInfo.vue'),
    CourseNote: () => import('./courseNote.vue'),

    Question: () => import('./question.vue'),
    Article: () => import('./article.vue')
  }
}
</script>
<style lang="stylus" scoped>
  .user-course
    margin-bottom: 50px;
    .user-course-content
      display: flex;
      align-items: flex-start;
      margin-top: 40px;
      .nav-container
        flex: 0 0 172px;
        width: 172px;
        .nav-item
          position: relative;
          margin-bottom: 8px;
          padding-left: 30px;
          height: 48px;
          line-height: 48px;
          font-size: 16px;
          color: #787d82;
          cursor: pointer;
          &:last-child
            margin-bottom: 0;
          &.active
            background-color: rgba(240,20,20,0.8);
            border-radius: 4px;
            color: #fff;
            &::after
              display: block;
              content: '';
              position: absolute;
              right: 0;
              top: 0;
              width: 0;
              height: 0;
              border-top: 24px solid #fff;
              border-bottom: 24px solid #fff;
              border-left: 15px solid transparent;
          .iconfont
            display: inline-block;
            vertical-align: middle;
            margin-right: 10px;
            font-size: 25px;
      .content-container
        margin-left: 50px;
        flex: 1;
</style>