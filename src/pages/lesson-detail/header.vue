<template>
  <div class="lesson-detail-header">
    <div class="m-center">
      <p class="bread-crumb">
        培训套餐 | {{ base.title }}
      </p>
      <p class="title">
        {{ base.title }}
      </p>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    base: {
      type: Object
    }
  },
}
</script>
<style lang="stylus" scoped>
  .lesson-detail-header
    height: 250px;
    background: url('~@/assets/images/lesson-bg.jpg') no-repeat center top;
    .bread-crumb
      padding-top: 16px;
      line-height: 24px;
      font-size: 12px;
      color: rgba(255,255,255,0.8);
    .title
      padding-top: 50px;
      font-size: 40px;
      line-height: 36px;
      color: #fff;
      text-shadow: 0 2px 4px rgba(28,31,33,.6);
</style>