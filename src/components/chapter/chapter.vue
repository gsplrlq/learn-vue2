<template>
  <div class="chapter">
    <div v-if="catalog.courseContent" class="chapter-introduce" v-html="catalog.courseContent"></div>
    <div v-for="(item,index) in catalog.chapter" :key="index" class="chapter-item">
      <h2 class="chapter-title">
        {{ item.title }}
      </h2>
      <p class="chapter-desc">
        {{ item.introduction }}
      </p>
      <ul>
        <li v-for="(term, index) in item.chapterList" :key="index" class="term-item" :class="{'disabled': catalog.courseType === 2}" @click="toLearn(term, catalog)">
          <p>
            <span class="iconfont play">&#xe615;</span>
            <span>{{ term.title }}({{ term.duration | filterSecond }})</span>
            <span class="right">
              <i v-if="term.percent == 100" class="iconfont complete">&#xe60f;</i>
              <span v-else-if="term.percent > 0 && term.percent < 100" class="doning">
                最近学习
                <i class="iconfont">&#xe601;</i>
              </span>
              <i v-else class="iconfont ready">&#xe6e8;</i>
            </span>
          </p>
        </li>
      </ul>
    </div>
    <p class="complete-info">
      <i class="iconfont">&#xe786;</i>
      本课程已完结
    </p>
  </div>
</template>
<script>
import { normalSeconds } from 'utils/utils.js'
export default {
  props: {
    catalog: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  filters: {
    filterSecond (val) {
      return normalSeconds(val)
    }
  },
  methods: {
    toLearn (lastest, course) {
      if(course.courseType === 2) return

      this.$router.push({ path: '/video/' + course.id, query: { videoId: lastest.videoId }})
    }
  },
}
</script>

<style lang="stylus" scoped>
  .chapter
    & > div
      margin-bottom: 16px;
      padding: 24px 32px 32px;
      background-color: #fff;
      box-shadow: 0 8px 16px rgba(7,17,27,0.1);
      border-radius: 12px;
      color: #1c1f21;
      font-size: 14px;
      &.chapter-introduce
        line-height: 28px;
      &.chapter-item
        .chapter-title
          font-size: 16px;
          line-height: 24px;
          font-weight: 700;
        .chapter-desc
          margin-top: 2px;
          margin-bottom: 16px;
          font-size: 12px;
          color: #545c63;
        .term-item
          width: 100%;
          padding-left: 12px;
          line-height: 48px;
          cursor: pointer;
          &.disabled
            cursor: default;
          & > p
            display: flex;
            align-items: center;
            & > span
              &:nth-child(2)
                flex: 1;
          &:not(.disabled):hover
            background-color: rgba(242,13,13,.05);
            border-radius: 4px;
            color: #f20d0d;
            .play
              color: #f20d0d;
            .right
              & > i
                color: #f20d0d!important;
          .play
            margin-right: 8px;
            font-size: 24px;
            color: #9199a1;
          .right
            margin-right:15px;
            font-size: 16px;
            color: #d9dde1;
            .complete, .doning
              color: #00b43c;
              font-size: 12px;
            .doning
              i
                margin-left: 10px;
                font-size: 12px;
    .complete-info
      margin-bottom: 16px;
      padding: 12px 0 12px 32px;
      font-size: 16px;
      color: #93999f;
      line-height: 24px;
      .iconfont
        display: inline-block;
        vertical-align: middle;
        margin-right: 12px;
        font-size: 24px;
</style>
