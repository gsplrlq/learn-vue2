<template>
  <div class="list">
    <div v-for="(item, index) in data.courseList" :key="index" class="list-item" @click="handleLessonClick(item)">
      <h2>{{ item.name }}</h2>
    </div>
  </div>
</template>
<script>
export default {
  name: 'XXX', // XXX
  props: {
    data: {
      type: Object
    }
  },
  computed: {

  },
  data () {
    return {
      
    }
  },
  methods: {
    // 课程点击事件
    handleLessonClick (course) {
      this.$router.push(`/course/${course.id}`)
    }
  },
}
</script>
<style scoped>
.list {
  display: flex;
  align-items: center;
  flex-flow: row wrap;
}
.list-item {
  width: 200px;
  padding: 20px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
  border-radius: 4px;
  border: 1px solid #ebeef5;
  background-color: #fff;
  overflow: hidden;
  color: #303133;
  transition: .3s;
  margin-right: 20px;
  margin-bottom: 20px;
  cursor: pointer;
}
.list-item:hover {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .2);
}
h2 {
  font-weight: 600;
}
</style>