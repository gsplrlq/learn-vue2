<template>
  <div>
    <div class="list">
      <div v-for="(item, index) in data.examList" :key="index" class="list-item">
        <h2>{{ item.name }}</h2>
        <div class="time">
          <div>开始: {{ item.startTime }}</div>
          <div>结束: {{ item.endTime }}</div>
        </div>
      </div>
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
    
  },
}
</script>
<style scoped>
.list {
  display: flex;
  align-items: center;
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
  margin-right: 20px;
}
h2 {
  font-weight: 600;
  margin-bottom: 10px;
}
.time {
  font-size: 14px;
}
.time div{
  padding: 5px 10px;  
}
</style>