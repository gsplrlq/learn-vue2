<template>
  <div class="nav-content">
    <div class="tags">
      <div
        class="tags-item"
      >
        <h2 class="title-box">
          <span class="title">{{ nav.name }}</span>
          <span class="line" />
        </h2>
        <ul class="list">
          <li
            v-for="(tag, index) in tags"
            :key="index"
            class="tag"
            @click="$router.push({ path:'/course', query: { courseType: 1, code: tag.code, pcode: tag.pcode }})"
          >
            {{ tag.name }}
          </li>
        </ul>
      </div>
    </div>

    <div class="nav-course">
      <div v-for="(lesson,index) in lessons" :key="index" class="course-item" @click="handleCourseClick(lesson.id)">
        <div class="img-box">
          <img :src="lesson.imgUrl" width="64" height="42" alt="">
        </div>
        <div class="course-content">
          <h2 class="title ellipsis">
            {{ lesson.title }}
          </h2>
          <p class="information">
            <span class="money">¥ {{ lesson.isDiscount ? lesson.discountPrice : lesson.price }} / </span>
            <!-- <span>{{ lesson.hard.text }} / </span> -->
            <span>
              <i class="iconfont user-icon">&#xe607;</i>
              {{ lesson.studyCount }}
            </span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    nav: {
      type: Object,
      required: true
    }
  },
  computed: {
    tags () {
      return this.nav.typeCategoryList || []
    },
    lessons () {
      return this.nav.courseInfoList || []
    },
  },
  methods: {
    handleCourseClick (id) {
      this.$router.push('/course/' + id)
    }
  }
}
</script>
<style lang="stylus" scoped>
  @import '~assets/stylus/variables.styl';
  @import '~assets/stylus/mixin.styl';
  .nav-content
    z-index: 100;
    position: absolute;
    top: 0;
    left: 216px;
    width: 768px;
    height: 555px;
    background-color: #fff;
    .tags
      position: relative;
      padding: 36px 48px 32px;
      .tags-item
        .title-box
          display: flex;
          align-items: center;
          margin-bottom: 20px;
          color: $theme-red-color;
          font-size: 14px;
          line-height: 24px;
          font-weight: 700;
          .title
            margin-right: 20px;
          .line
            flex: 1;
            height: 1px;
            background-color: $border-three-color;
        .list
          .tag
            display: inline-block;
            margin-right: 16px;
            margin-bottom: 24px;
            font-size: 14px;
            color: $font-second-color;
            cursor: pointer;
            &:hover
              color: $theme-red-color;
    .nav-course
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      padding: 36px 0 0 48px;
      background-color: #F8FAFC;
      .course-item
        flex: 0 0 50%;
        width: 50%;
        display: flex;
        align-items: center;
        margin-bottom: 36px;
        cursor:pointer;
        .img-box
          flex: 0 0 64px;
          margin-right: 16px;
          img-box(64px, 42px);
          & > img
            border-radius: 4px;
        .course-content
          flex: 1;
          max-width: calc(100% - 100px);
          .title
            font-size: 12px;
            line-height: 24px;
            color: $font-first-color;
          .information
            color: $font-second-color;
            font-size: 12px;
            line-height: 20px;
            letter-spacing: 1px;
            .money
              font-size: 12px;
              line-height: 20px;
              font-weight: 700;
            .user-icon
              margin-right: -3px;
              font-size: 14px;
              font-weight: 700;
</style>