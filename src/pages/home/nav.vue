<template>
  <div class="home-nav-container">
    <ul class="home-nav" @mouseleave="handleMouseLeave">
      <li
        v-for="(item,index) in navList"
        :key="index"
        class="nav-item"
        @mouseenter="handleMouseEnter(item)"
      >
        <span class="nav-title">{{ item.name }}</span>
        <span class="arr-right" />
      </li>
    </ul>
    <div
      @mouseenter="handleContentEnter"
      @mouseleave="handleContentLeave"
    >
      <nav-content v-show="showNavContent" :nav="current" />
    </div>
  </div>
</template>
<script>
import NavContent from './nav-content.vue'
import { getHomeCategoryList } from 'api'
export default {
  data () {
    return {
      navList: [],
      current: {},
      showNavContent: false
    }
  },
  mounted () {
    this.getHomeNavList()
  },
  methods: {
    // 导航鼠标移入
    handleMouseEnter (item) {
      this.showNavContent = true
      this.current = item
    },
    // 导航鼠标移除
    handleMouseLeave () {
      this.timer = setTimeout(() => {
        this.showNavContent = false
      }, 150)
    },
    // 导航内容鼠标移入
    handleContentEnter () {
      clearTimeout(this.timer)
    },
    // 导航内容鼠标移除
    handleContentLeave () {
      this.showNavContent = false
      this.current = {}
    },
    // 获取首页导航信息
    getHomeNavList () {
      getHomeCategoryList().then(res => {
        let { data } = res
        this.navList = data
        this.current = data[0]
      }).catch(() => {
        this.navList = []
        this.current = {}
      })
    }
  },
  components: {
    NavContent
  }
}
</script>

<style lang="stylus" scoped>
  @import '~assets/stylus/variables.styl';
  .home-nav-container
    position: relative;
    width: 216px;
    height: 555px;
    background-color:#2b333b;
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
    box-shadow: 0 12px 24px 0 $shadow;
    .home-nav
      position: absolute;
      left: 0;
      right: 0;
      top: 10px;
      .nav-item
        position: relative;
        margin-left: 12px;
        padding-left: 16px;
        height: 60px;
        line-height: 60px;
        font-size: 14px;
        color: rgba(255,255,255,0.6);
        cursor: pointer;
        .arr-right
          position: absolute;
          top: 50%;
          right: 10px;
          margin-top: -4px;
          display:inline-block;
          width: 0;
          height: 0;
          border: 4px solid rgba(255, 255, 255, 0.5);
          border-color: transparent transparent transparent rgba(255, 255, 255, 0.5);
        &:hover
          background-color: #6a7075;
          border-bottom-left-radius: 4px;
          border-top-left-radius: 4px;
          color: #fff;
</style>
