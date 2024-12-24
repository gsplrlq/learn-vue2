<template>
  <div class="lesson">
    <!-- 搜索 -->
    <lesson-search :hot="hotList" :title.sync="title" />

    <!-- 导航 -->
    <lesson-nav v-if="navList.length" :list="navList" :params.sync="params" />

    <!-- 列表 -->
    <lesson-list :list="lessonList" :sort.sync="sort" @change="getLessonListData" />
    
    <!-- 分页 -->
    <pagination :total="total" :page.sync="page" :size="size" @change="handlePaginationChange" />
  </div>
</template>
<script>
import LessonSearch from './search.vue'
import LessonNav from './nav.vue'
import LessonList from './list.vue'
import Pagination from 'components/pagination/pagination.vue'
import { getHot } from 'api/common.js'
import { getLessonNav, getTrainList } from 'api'
import { ERR_OK } from 'api/config.js'
export default {
  data () {
    return {
      sort: '',
      title: '',
      params: {},
      page: 1,
      size: 15,
      total: 0,
      lessonList: [],
      navList: [],
      hotList: []
    }
  },
  mounted () {
    // this.getHotData()
    this.getLessonNavData()
    this.getLessonListData()
  },
  methods: {
    // 分页值更新
    handlePaginationChange (page) {
      this.page = page
      this.getLessonListData()
    },
    // 获取热搜词数据
    getHotData () {
      getHot().then(res => {
        let { code, data, msg } = res
        if (code === ERR_OK) {
          this.hotList = data
        } else {
          this.hotList = []
          this.$message.error(msg)
        }
      }).catch(() => {
        this.hotList = []
      })
    },
    // 获取导航数据
    getLessonNavData () {
      getLessonNav().then(res => {
        let { data } = res
        this.navList = data
      }).catch(() => {
        this.navList = []
      })
    },
    // 获取套餐数据
    getLessonListData () {
      const params = {
        title: this.title,
        categoryPCode: this.params.category,
        categoryCode: this.params.label,
        page: {
          size: this.size,
          current: this.page,
        }
      }
      getTrainList(params).then(res => {
        let { data } = res
        this.lessonList = data.records
        this.total = data.total
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
    sort () {
      this.getLessonListData()
    }
  },
  components: {
    LessonSearch,
    LessonNav,
    LessonList,
    Pagination
  }
}
</script>

 