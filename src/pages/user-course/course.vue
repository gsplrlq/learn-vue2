<template>
  <div class="free-course">
    <dl>
      <dt>
        <span
          v-for="(tab,index) in tabList"
          :key="index"
          :class="{active: currentTabIndex==index}"
          @click="handleTabClick(tab,index)"
        >{{ tab.title }}</span>
      </dt>
      <template v-if="lessonList.length">
        <dd v-for="(item,index) in lessonList" :key="index" class="course-item" @click="goCourse(item)">
          <div class="img-box">
            <img :src="item.imgUrl" alt="">
          </div>
          <div class="course-content">
            <p class="title">
              {{ item.title }}
            </p>
            <p class="learn">
              <span class="rate">已学 {{ getRate(item) }}%</span>
              <span class="duration">用时 {{ getTime(item) }}小时</span>
              <span v-if="item.chapterTitle" class="chapter">学习至 {{ item.chapterTitle }}</span>
            </p>
            <p class="other">
              <!-- <span>笔记{{ item.notes }}</span>
              <span>问答{{ item.questions }}</span>
              <span>评价{{ item.codes }}</span> -->
              <span class="learn-btn" @click.stop="goLearn(item)">继续学习</span>
            </p>
          </div>
        </dd>
      </template>
      <empty v-else message="暂无相关课程信息"></empty>
    </dl>

    <!-- 分页 -->
    <!-- <pagination
      v-if="lessonList.length"
      :page.sync="page"
      :total="total"
      @change="handlePaginationChange"
    ></pagination> -->
  </div>
</template>
<script>
// import Pagination from 'components/pagination/pagination.vue'
import Empty from 'components/empty/empty.vue'
import { getUserCourse } from 'api'
export default {
  data () {
    return {
      page: 1,
      total: 0,
      lessonList: [],
      currentTabIndex: 0,
      tabList: []
    }
  },
  created () {
    // 初始化选项卡数据
    this.tabList = [
      { title: '全部课程', type: '' },
      { title: '免费课', type: 1 },
      { title: '付费课', type: 2 }
    ]
  },
  mounted () {
    this.getUserCourseData()
  },
  methods: {
    // 选项卡点击事件
    handleTabClick (tab, index) {
      this.currentTabIndex = index
      this.getUserCourseData()
    },
    // 分页值更新
    handlePaginationChange (page) {
      this.page = page
      this.getUserCourseData()
    },
    // 获取用户课程信息
    getUserCourseData () {
      const params = {
        // page: 1,
        courseType: this.currentType
      }
      getUserCourse(params).then(res => {
        let { data } = res
        this.lessonList = data
      }).catch(() => {
        this.lessonList = []
      })
    },
    getRate (item) {
      return (item.progress / item.duration).toFixed(2) * 100
    },
    getTime (item) {
      return (item.progress / 3600).toFixed(0)
    },
    goCourse (item) {
      this.$router.push({ path: '/course/' + item.id })
    },
    goLearn (item) {
      this.$router.push({ path: '/video/' + item.id, query: { videoId: item.videoId }})
    }
  },
  computed: {
    currentType () {
      return this.tabList[this.currentTabIndex].type
    }
  },
  components: {
    // Pagination,
    Empty
  }
}
</script>
<style lang="stylus" scoped>
  .free-course
    dt
      border-bottom: 1px solid #d0d6d9;
      & > span
        margin-right: 48px;
        display: inline-block;
        vertical-align: middle;
        height: 48px;
        line-height: 48px;
        box-sizing: border-box;
        font-size: 14px;
        color: #787d82
        cursor: pointer;
        &:last-child
          margin-right: 0;
        &.active
          color: #f01414;
          border-bottom: 2px solid #f01414;
    .course-item
      display: flex;
      align-items: flex-start;
      padding: 30px 0;
      border-bottom: 1px solid #eff1f0;
      cursor: pointer;
      &:last-child
        border-bottom: none;
      .img-box
        flex: 0 0 200px;
        width: 200px;
        height: 113px;
        & > img
          display: block;
          width: 100%;
          height: 100%;
      .course-content
        flex: 1;
        margin-left: 30px;
        .title
          font-size: 18px;
          font-weight: 700;
          line-height: 30px;
          .status
            float: right;
            margin-right: 25px;
            font-size: 14px;
            color: #787d82;
        .learn
          padding: 10px 0 22px;
          & > span
            display: inline-block;
            vertical-align: middle;
            margin-right: 15px;
            color: #787d82;
            line-height: 20px;
            font-size: 14px;
            &:last-child
              margin-right: 0;
            &.rate
              color: #f01414;
        .other
          & > span
            margin-right: 100px;
            display: inline-block;
            vertical-align: middle;
            font-size: 14px;
            color: #787d82;
            &.learn-btn
              float: right;
              margin-right: 0;
              width: 104px;
              height: 36px;
              background-color: #f01414;
              border-radius: 18px;
              text-align: center;
              line-height: 36px;
              color: #fff;
              cursor: pointer;
</style>