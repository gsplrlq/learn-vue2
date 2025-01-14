<template>
  <div class="empty-container">
    <el-empty :image-size="200" description="暂无数据"></el-empty>
  </div>
</template>
<script>
export default {
  props: {
    message: {
      type: String,
      default: '暂无相关数据'
    }
  }
}
</script>
<style lang="stylus" scoped>
  .empty-container
    padding: 30px 0;
    min-height: 300px;
    text-align: center;
    .empty-msg
      line-height: 24px;
      font-size: 16px;
      color: #8a919f;
</style>