<template>
  <div class="lesson">
    <!-- 搜索 -->
    <lesson-search :title.sync="title" />

    <!-- 导航 -->
    <!-- <lesson-nav :list="navList" :params.sync="params" /> -->

    <!-- 列表 -->
    <lesson-list :list="lessonList" :sort.sync="sort" @change="getLessonListData" />
    
    <!-- 分页 -->
    <!-- <pagination :total="total" :page.sync="page" :size="size" @change="handlePaginationChange" /> -->
  </div>
</template>
<script>
import LessonSearch from './search.vue'
// import LessonNav from './nav.vue'
import LessonList from './list.vue'
// import Pagination from 'components/pagination/pagination.vue'
import { getExamList } from 'api'
export default {
  data () {
    return {
      sort: '',
      title: '',
      params: {},
      page: 1,
      size: 9999,
      total: 0,
      lessonList: [],
      navList: [
        {
          code: '',
          name: '全部',
          typeCategoryList: []
        },
        {
          code: 'public',
          name: '公开',
          typeCategoryList: []
        },
        {
          code: 'trainingPackage',
          name: '套餐',
          typeCategoryList: []
        },
      ],
    }
  },
  mounted () {
    this.getLessonListData()
  },
  methods: {
    // 分页值更新
    handlePaginationChange (page) {
      this.page = page
      this.getLessonListData()
    },
    // 获取套餐数据
    getLessonListData () {
      const params = {
        name: this.title,
        // examType: this.params.category,
        page: {
          size: this.size,
          current: this.page,
        },
        status: 1
      }
      getExamList(params).then(res => {
        let { data } = res
        this.lessonList = data.records
        this.total = data.records.length
      }).catch(() => {
        this.lessonList = []
        this.total = 0
      })
    }
  },
  watch: {
    params () {
      this.page = 1
      this.getLessonListData()
    },
    title () {
      this.page = 1
      this.getLessonListData()
    },
  },
  components: {
    LessonSearch,
    // LessonNav,
    LessonList,
    // Pagination
  }
}
</script>

 