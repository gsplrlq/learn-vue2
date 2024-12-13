<template>
  <div class="lesson-detail-contnet m-center">
    <!-- 导航数据 -->
    <ul class="nav-list">
      <li
        v-for="(nav,index) in navList"
        :key="index"
        class="nav-item"
        :class="{active: currentNavIndex == index}"
        @click="currentNavIndex=index"
      >
        <span v-if="nav.code==0" class="iconfont iconyuedu"></span>
        <span v-if="nav.code==1" class="iconfont">&#xe602;</span>
        <span v-if="nav.code==2" class="iconfont iconcourse"></span>
        <span>{{ nav.title }}</span>
      </li>
    </ul>

    <!-- 内容部分 -->
    <div class="lesson-information">
      <div class="info-left">
        <component :is="componentName" :data="data" />
      </div>
      <div class="info-right">
        <div class="price">¥ {{ data.amount }}</div>
        <router-link v-if="!data.bought" :to="{ path: '/cart/confirm/' + data.id, query: { type: 2 }}">
          <div class="tips-btn">点击购买</div>
        </router-link>
        <div v-else class="tips-btn-bought">已购买</div>

        <!-- <detail-score :score="data" /> -->
        <!-- <detail-teacher :teacher="data.teacher" /> -->
      </div>
    </div>
  </div>
</template>
<script>
// import DetailScore from './score.vue'
// import DetailTeacher from './teacher.vue'
export default {
  props: {
    data: {
      type: Object
    }
  },
  data () {
    return {
      currentNavIndex: 0,
      navList: []
    }
  },
  created () {
    // 初始化导航数据
    this.navList = [
      { title: '详情', code: 0, componentName: 'detail' },
      { title: '课程', code: 1, componentName: 'course' },
      { title: '考试', code: 2, componentName: 'exam' }
    ]
  },
  computed: {
    componentName () {
      return this.navList[this.currentNavIndex].componentName
    }
  },
  components: {
    // DetailScore,
    // DetailTeacher,
    Detail: () => import('./detail.vue'),
    Course: () => import('./course.vue'),
    Exam: () => import('./exam.vue'),
  }
}
</script>
<style lang="stylus" scoped>
  .lesson-detail-contnet
    margin-bottom: 40px;
    .nav-list
      margin-top: -60px;
      .nav-item
        display: inline-block;
        margin-right: 72px;
        padding: 12px 24px 16px;
        width: 124px;
        height: 60px;
        box-sizing: border-box;
        cursor: pointer;
        & > span
          display: inline-block;
          vertical-align: middle;
          color: rgba(255,255,255,1);
          font-size: 16px;
          &.iconfont
            margin-right: 10px;
            font-size: 32px;
            color: rgba(255,255,255,1);
        &.active
          background-color: #fff;
          border-radius: 4px 4px 0 0;
          & > span
            color: #2b333b;
            &.iconfont
              color: #f01414;
    .lesson-information
      margin-top: 24px;
      display: flex;
      align-items: flex-start;
      .info-left
        flex: 1;
        max-width: calc(100% - 300px);
      .info-right
        flex: 0 0 300px;
        margin-left: 40px;
        width: 300px;
        background-color: #fff;
        box-shadow: 0 8px 16px 0 rgba(7,17,27,.1);
        padding: 24px 32px 32px;
        border-radius: 12px;
        box-sizing: border-box;
        .price
          text-align: center;
          font-size: 40px;
          margin-bottom: 16px;
          color: #f20d0d;
        .tips-btn
          padding: 11px 32px;
          border-radius: 24px;
          background-color: #f20d0d;
          text-align: center;
          line-height: 24px;
          font-size: 16px;
          color: #fff;
          cursor: pointer;
          text-decoration: none;
          &:hover
            background-color: #c20a0a;
        .tips-btn-bought
          padding: 11px 32px;
          border-radius: 24px;
          border: 1px solid #f20d0d;
          text-align: center;
          line-height: 24px;
          font-size: 16px;
          color: #f20d0d;
          text-decoration: none;
</style>