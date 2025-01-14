<template>
  <div class="input-box">
    <el-input v-model="title" type="text" placeholder="搜索感兴趣的内容" class="input" @change="search" />
    <div class="icon-box" @click="search">
      <i class="iconfont">&#xe63c;</i>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      title: '',
      result: []
    }
  },
  mounted () {
  },
  methods: {
    search () {
      this.$emit('update:title', this.title)
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import '~assets/stylus/variables.styl';
  .input-box
    position: relative;
    height: 48px;
    .input
      display: inline-block;
      vertical-align: middle;
      width: 512px;
      height: 48px;
      box-sizing: border-box;
      outline: none;
      >>> .el-input__inner {
        border-radius: 8px 0 0 8px;
        height: 100%;
      }
    .icon-box
      display: inline-block;
      vertical-align: middle;
      width: 48px;
      height: 48px;
      line-height: 48px;
      background-color: $theme-red-color;
      border-radius: 0 8px 8px 0;
      color: #fff;
      text-align: center;
      cursor: pointer;
      .iconfont
        font-size: 20px;
        font-weight: 700;
</style>
