<template>
  <ul class="course-list">
    <li
      v-for="(item,index) in list"
      :key="index"
      class="course-item"
      @click="handleCourseClick(item)"
    >
      <div class="img-box">
        <img :src="item.imgUrl" alt="">
        <div v-if="item.labels && item.labels.length > 0" class="tags">
          <span v-for="(label, index) in item.labels" :key="index" class="tag-item">{{ label }}</span>
        </div>
        <div v-if="item.process > 0" class="badge rate">
          {{ item.process }}%
        </div>
      </div>
      <p class="course-name">
        {{ item.title }}
      </p>
      <p class="info">
        <span>{{ item.courseType == 1 ? '免费' : '付费' }}</span>
        <!-- <span>{{ item.hard.text }}</span> -->
        <span><i class="iconfont icon-user">&#xe607;</i>{{ item.studyCount }}</span>
        <!-- <span>
          <mooc-star class="star-box" :value="5" :disabled="true" />
        </span> -->
      </p>
      <span v-if="item.courseType == 2" class="price">
        <span>¥ {{ item.price }}</span>
        <template v-if="item.isDiscount">
          <span class="old-price">¥ {{ item.discountPrice }}</span>
          <span class="discount-title">限时优惠</span>
        </template>
      </span>
      <!-- <p v-else>
        <span>免费</span>
      </p> -->
    </li>
  </ul>
</template>
<script>
export default {
  props: {
    list: {
      type: Array,
      default () {
        return []
      }
    }
  },
  methods: {
    // 课程点击事件
    handleCourseClick (item) {
      this.$router.push(`/course/` + item.id)
    } 
  }
}
</script>
<style lang="stylus" scoped>
  @import '~assets/stylus/variables.styl';
  @import '~assets/stylus/mixin.styl';
  .course-list
    display: flex;
    align-items: flex-start;
    flex-wrap: wrap;
    .course-item
      position: relative;
      flex: 0 0 25%;
      margin-bottom: 32px;
      cursor: pointer;
      padding: 0px 16px;
      box-sizing: border-box;
      &:hover
        .course-name
          color: $theme-red-color;
      .img-box
        position: relative;
        img-box(280px, 150px)
        & > img
          border-radius: 8px;
          &:hover
            box-shadow: 0px 12px 24px  $shadow
        .tags
          position: absolute;
          bottom: 12px;
          left: 8px;
          .tag-item
            margin-right: 10px;
            padding: 4px 8px;
            border-radius: 4px;
            color: #fff;
            font-size: 12px;
            background-color: rgba(28, 31, 33, 0.6);
        .badge
          position: absolute;
          width: 42px;
          border: 2px solid #fff;
          border-radius: 12px;
          line-height: 20px;
          color: #fff;
          font-size: 12px;
          text-align: center;
          font-weight: 600;
        .rate
          right: -7px;
          top: 8px;
          background-image: linear-gradient(-90deg, #65da98 0%, #0cba4d 100%);
      & > p
        padding: 0 8px;
        box-sizing: border-box;
      .course-name
        word-break: break-all;
        font-size: 16px;
        font-weight: 700;
        line-height: 28px;
        color: $font-first-color;
        multline-ellipsis(2);
      .info
        font-size: 12px;
        color: $font-four-color;
        line-height: 24px;
        & > span
          padding: 0 6px;
          &:first-child
            padding-left: 0;
        .icon-user
          margin-right: -2px;
          font-weight: 600;

      .price
        position: absolute;
        right: 32px;
        bottom: 0;
        span
          font-size: 12px;
          font-weight: 600;
          line-height: 24px;
          letter-spacing: 0.5px;
        .old-price
          padding:0 3px 0 10px;
          text-decoration: line-through;
        .discount-title
          padding: 0 4px;
          border-radius: 4px;
          font-size: 12px;
          background-color: $theme-red-color;
          opacity: 0.6;
          color: #fff;
</style>