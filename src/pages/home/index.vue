<template>
  <div class="home">
    <!-- 背景阴影 -->
    <div class="bg-mask" :style="getBackgroundImage" />

    <!-- 导航和轮播 -->
    <div class="home-container m-center">
      <Nav />
      <!-- 316 -->
      <mooc-carousel :height="444" trigger="click" @change="handelCarouselChange">
        <mooc-carousel-item v-for="(item,index) in swiperList" :key="index">
          <img :src="item.imageUrl" class="swiper-img" :class="{'click': !!item.link}" @click.stop="toJump(item.link)">
        </mooc-carousel-item>
      </mooc-carousel>
      
      <!-- <Banner /> -->
    </div>

    <!--  实战导航 -->
    <course-list id="div1" :list="lessonData.hotCourseList" title="为／你／推／荐" type="recommend" :position="0" />

    <!-- 新上好课 -->
    <course-list id="div2" :list="lessonData.newCourseList" title="新／上／好／课" type="new" :position="1" />


    <!-- 猿问和手记 -->
    <!-- <Article :article="articleList" /> -->

    <!-- 精英讲师 -->
    <!-- <Teacher :teacher-list="teacherList" /> -->

    <!-- 全明星 -->
    <!-- <Student :allstar="allstar" /> -->

    <div class="sidebar">
      <ul class="sidebar-list-left">
        <li class="sidebar-item">
          <span class="sidebar-text" @click="scrollIntoView('#div1')">为／你／推／荐</span>
        </li>
        <li class="sidebar-item">
          <span class="sidebar-text" @click="scrollIntoView('#div2')">新／上／好／课</span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import Nav from './nav.vue'
// import Banner from './banner.vue'
import CourseList from './course-list.vue'
// import Article from './article.vue'
// import Teacher from './teacher.vue'
// import Student from './student.vue'
// import { postBannerList, getHomeCourse, getArticle, getTeacher, getAllStar } from 'api/home.js'
import { postBannerList, getHomeCourse } from 'api'
export default {
  name: 'Home',
  data () {
    return {
      swiperList: [],
      allstar: [],
      teacherList: [],
      articleList: {},
      currentSwiper: '',
      lessonData: {
        hotCourseList: [],
        newCourseList: []
      }
    }
  },
  created () {
    this.getBanner()
    this.getCourseList()
    // this.getArticleList()
    // this.getTeacherList()
    // this.getAllStarList()
  },
  methods: {
    scrollIntoView (id) {
      document.querySelector(id).scrollIntoView({
        behavior: "smooth"
      });
    },
    // 滚动轮播滚动完毕事件
    handelCarouselChange (index) {
      this.currentSwiper = this.swiperList[index].img
    },
    // 首页轮播信息
    getBanner () {
      postBannerList().then((res) => {
        this.swiperList = res.data
        if (this.swiperList.length > 0) {
          this.currentSwiper = this.swiperList[0].img
        }
      }).catch(() => {
        this.swiperList = []
        this.currentSwiper = ''
      })
    },
    // 获取课程信息
    getCourseList () {
      getHomeCourse().then(res => {
        let { data } = res
        this.lessonData = data
      }).catch(() => {
        this.lessonData = {}
        this.$message.error('接口异常')
      })
    },
    toJump (url) {
      if(!url) return
      
      window.open(url, '_blank');
    }
  },
  computed: {
    getBackgroundImage () {
      return {
        'background-image': `url(${this.currentSwiper})`
      }
    }
  },
  components: {
    Nav,
    // Banner,
    CourseList,
    // Article,
    // Teacher,
    // Student
  }
}
</script>
<style lang="stylus" scoped>
  @import '~assets/stylus/variables.styl';
  .home
    .sidebar-list-left
      z-index: 66;
      position: fixed;
      padding: 0 16px;
      left: 10px;
      top: 60%;
      transform: translateY(-50%);
      background-color: #fff;
      box-shadow: 0 4px 12px $shadow
      border-radius: 5px;
      .sidebar-item
        padding: 10px 16px;
        height: 60px;
        box-sizing: border-box;
        border-bottom: 1px solid #edf1f2;
        text-align: center;
        cursor: pointer;
        .sidebar-text
          font-size: 14px;
          line-height: 40px;
          color: $font-first-color;
          &:hover
            color: #f20d0d
    margin-top: 32px;
    min-height: 750px;
    .bg-mask
      position: absolute;
      top: 0;
      background-size: cover;
      transition: all 0.3s;
      width: 100%;
      height: 180px;
      opacity: 0.3;
      filter: blur(100px);
    .home-container
      position: relative;
      box-shadow: 0 12px 24px 0 $shadow;
      border-radius: 8px;
      .mooc-carousel
        position: absolute;
        left: 216px;
        top: 0;
        right: 0;
        >>> .mooc-carousel-indicators
          left: initial;
          right: 20px;
          transform: none;
        .swiper-img
          display: block;
          width: 100%;
          height: 444px;
          border-top-right-radius: 8px;
          &.click
            cursor: pointer;
</style>
