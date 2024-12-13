<template>
  <div class="course mx-center">
    <!-- 搜索模块 -->
    <div class="course-search">
      <div class="search-tag">
        <img src="@/assets/images/logo-course2.png" width="96" height="60" alt="">
        <!-- <img src="https://www.imooc.com/static/img/course/course-top.png" width="96" height="60" alt=""> -->
      </div>
      <course-search :title.sync="title" />
    </div>

    <!-- 导航模块 -->
    <course-nav v-if="navList.length" ref="courseNav" :list="navList" :params.sync="params" />
    
    <!-- 课程列表 -->
    <course-list :list="courseList" :sort.sync="sort" />

    <!-- 分页 -->
    <pagination :total="total" :page.sync="page" :size="size" @change="handlePaginationChange" />
  </div>
</template>
<script>
import CourseSearch from './search.vue'
import CourseNav from './nav.vue'
import CourseList from './list.vue'
import Pagination from 'components/pagination/pagination.vue'
import { getLessonNav, getLessonList } from 'api'
export default {
  data () {
    return {
      sort: '',
      title: '',
      params: {},
      navList: [],
      courseList: [],
      page: 1,
      size: 18,
      total: 0
    }
  },
  mounted () {
    this.getCourseNavList()
    this.getCourseListData()
  },
  watch: {
    params () {
      this.page = 1
      this.getCourseListData()
    },
    title () {
      this.page = 1
      this.getCourseListData()
    },
    sort () {
      this.getCourseListData()
    },
    $route () {
      this.getCourseListData()
    }
  },
  methods: {
    // 导航值更新事件
    handleNavChange (params) {
      this.params = params
      this.getCourseListData()
    },
    // 分页值更新
    handlePaginationChange (page) {
      this.page = page
      this.getCourseListData()
    },
    // 收藏or取消收藏点击事件
    handleCollectClick (item, index) {
      this.courseList[index].isLike = !this.courseList[index].isLike
    },
    // 获取课程导航信息
    getCourseNavList () {
      getLessonNav().then(res => {
        let { data } = res
        this.navList = data
        
        if (this.$route.query.pcode) {
          this.params.category = this.$route.query.code
          this.params.direction = this.$route.query.pcode
          this.$nextTick(() => {
            this.$refs.courseNav.initData(this.params)
          })
        }
      }).catch(() => {
        this.navList = []
      })
    },
    // 获取课程信息接口
    getCourseListData () {
      const params = {
        title: this.title,
        categoryPCode: this.params.direction,
        categoryCode: this.params.category,
        courseType: this.$route.query.courseType || 1,
        status: 1,
        page: {
          size: this.size,
          current: this.page,
        },
      }
      if(this.sort === 'time') params.page.orders = [ {
        "column": "create_time",
        "asc": false
      }]
      if(this.sort === 'persons') params.page.orders = [ {
        "column": "study_count",
        "asc": false
      }]

      getLessonList(params).then(res => {
        let { data } = res
        this.courseList = data.records
        this.total = data.total
      }).catch(() => {
        this.courseList = []
        this.total = 0
        this.$message.error('接口异常')
      })
    }
  },
  components: {
    CourseSearch,
    CourseNav,
    CourseList,
    Pagination
  }
}
</script>
<style lang="stylus" scoped>
  @import '~assets/stylus/variables.styl';
  .course
    padding-top: 20px;
    .course-search
      padding: 12px 0;
      border-bottom: 1px solid $border-second-color;
      .search-tag
        display: inline-block;
        & > img:nth-child(2)
          margin-left: 16px;
</style>
