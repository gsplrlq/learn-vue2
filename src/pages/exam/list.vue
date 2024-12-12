<template>
  <div class="m-center">
    <!-- 考试列表 -->
    <ul v-if="list.length" class="list">
      <li v-for="(item, index) in list" :key="index" class="list-item">
        <div>
          <h2 class="name">
            {{ item.name }}
          </h2>
          <p class="count">
            剩余次数：{{ item.remainderExamCount || 0 }} 次
          </p>
        </div>
        
        <div class="content">
          <div v-if="item.openingTime" class="time">时间：{{ item.openingTime }} 至 {{ item.closeTime }}</div>
          <div class="time">
            <span>时长：{{ item.duration }} 分钟</span>
          </div>
          <div>
            <span>总分：{{ item.totalScores }} 分</span>
            <span>及格分：{{ item.passScores }} 分</span>
            <!-- <span>单选：{{ item.singleChoiceScores }} 分</span>
            <span>多选：{{ item.singleChoiceScores }} 分</span>
            <span>选择：{{ item.judgmentScores }} 分</span> -->
          </div>
        </div>

        <div v-if="item.examType == 'trainingPackage'">
          <h2 class="name center">
            {{ item.trainingPackageName }}
          </h2>
          <p class="count center">
            所属套餐
          </p>
        </div>

        <div v-if="item.examFlag == 'yes'" class="btn" @click="handleLessonClick(item)">开始考试</div>
        <template v-else>
          <div class="right">
            <div class="btn unable">无法考试</div>
          </div>
        </template>
      </li>
    </ul>
    <empty v-else message="暂无相关考试数据"></empty>
  </div>
</template>
<script>
import Empty from 'components/empty/empty.vue'

export default {
  props: {
    list: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      currentFilterIndex: 0,
    }
  },
  methods: {
    // 考试点击事件
    handleLessonClick (lesson) {
      this.$router.push(`/exam/${lesson.id}`)
    }
  },
  components: {
    Empty
  },
}
</script>

<style scoped>
.list {
  margin-top: 20px;
}
.list-item {
  padding: 20px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
  border-radius: 4px;
  border: 1px solid #ebeef5;
  background-color: #fff;
  overflow: hidden;
  color: #303133;
  transition: .3s;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
}
.list-item .name {
  font-size: 20px;
  font-weight: 600;
  width: 250px;
  margin-right: 15px;
  margin-bottom: 5px;
}
.center {
  text-align: center;
}
.list-item .count {
  font-size: 14px;
  color: #4d555d;
}
.list-item .content {
  flex: 1;
  font-size: 16px;
  color: #4d555d;
}
.list-item .content span {
  margin-right: 20px;
}
.list-item .content .time {
  font-size: 16px;
  margin-bottom: 15px;

}
.list-item .btn {
  width: 138px;
  height: 48px;
  text-align: center;
  line-height: 48px;
  background-color: #f20d0d;
  border-radius: 24px;
  color: #fff;
  cursor: pointer;
  float: right;
}
.list-item .btn.unable {
  background-color: #c8c9cc;
  cursor: not-allowed;
}
.list-item .time {
  font-size: 14px;
  color: #4d555d;
}
</style>
