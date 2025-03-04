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
            <div slot="header" class="header">
              <div style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">{{ course.name }}</div>
              <el-button style="float: right; padding: 3px 0" type="text" @click="handleCourseClick(course)">查看详情</el-button>
            </div>
            <div class="content">
              <img
                src="@/assets/images/class_bg.png"
                style="height: 45px; margin-right: 10px;"
              />
              <div>
                <div class="text">班主任: {{ course.teacherName }}</div>
                <div class="text">人数: {{ course.classSize }}</div>
                <div class="text">课程: {{ course.courseName }}</div>
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
     .header
      display: flex
      justify-content: space-between
      line-height: 22px
    .content 
      display: flex;
      justify-content: space-between
      .text
        flex: 1;
        width: 210px;
        margin-bottom: 5px;
        white-space: nowrap; 
        overflow: hidden; 
        text-overflow: ellipsis;
</style>
