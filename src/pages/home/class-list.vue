<template>
  <div class="course-list-container m-center">
    <!-- 标题 -->
    <h2 class="home-title">
      <i class="title-icon left-icon" :style="getBackgroundPosition(true)" />
      {{ title }}
      <i class="title-icon right-icon" :style="getBackgroundPosition(false)" />
    </h2>

    <!-- 列表 -->
    <template v-if="list.length">
      <el-row :gutter="12">
        <el-col v-for="(course, index) in list" :key="index" :span="6">
          <el-card class="course-item" shadow="hover">
            <div slot="header" class="clearfix">
              <span>{{ course.name }}</span>
              <el-button style="float: right; padding: 3px 0" type="text" @click="handleCourseClick(course)">查看详情</el-button>
            </div>
            <div class="flex" style="display: flex;">
              <img
                src="https://iconfont.alicdn.com/p/illus/preview_image/YRtGHXZOsjwu/6af62e6b-87f8-42ba-8d7f-b8c33b3a8830.png"
                style="height: 45px; margin-right: 10px;"
              />
              <div>
                <p>班主任: {{ course.teacherName }}</p>
                <p>人数: {{ course.classSize }}</p>
                <p>课程: {{ course.courseName }}</p>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </template>
    <el-empty v-else />
  </div>
</template>
<script>
export default {
  props: {
    list: {
      type: Array,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    position: {
      type: Number,
      default: 0
    }
  },
  methods: {
    getBackgroundPosition (isLeft) {
      return {
        'background-position': `center ${ - (isLeft ? this.position : this.position + 1) * 36}px`
      }
    },
    // 课程点击事件
    handleCourseClick (item) {
      this.$router.push({ path: `/course/${item.courseId}`, query: { class: item.id } })
    } 
  },
  computed: {
  },
  components: {
  }
}
</script>
<style lang="stylus" scoped>
  @import '~assets/stylus/variables.styl';
  @import '~assets/stylus/mixin.styl';
  .course-list-container
    padding: 25px 0;
    .course-item
     cursor default
</style>
