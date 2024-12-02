<template>
  <div class="lesson-search-container">
    <div class="lesson-search ml-center">
      <div class="search-box">
        <div class="input-box">
          <el-input v-model="title" type="text" placeholder="搜索感兴趣的套餐内容" class="input" @change="search" />
          <div class="icon-box" @click="search">
            <i class="iconfont">&#xe63c;</i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    hot: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      title: '',
    }
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
  .lesson-search-container
    padding: 17px 19px;
    height: 132px;
    box-sizing: border-box;
    background: url('https://coding.imooc.com/static/module/index/img/sz-header-bk.png') no-repeat center center;
    background-size: cover;
    .lesson-search
      & > img
        display: inline-block;
        vertical-align: middle;
        &.sub-img
          margin-left: 20px;
      .search-box
        float: right;
        margin-top: 24px;
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
            background-color: $theme-orange-dark-color;
            border-radius: 0 8px 8px 0;
            color: #fff;
            text-align: center;
            cursor: pointer;
            .iconfont
              font-size: 20px;
              font-weight: 700;
        .hot-box
          margin-top: 8px;
          font-size: 12px;
          color:rgba(255,255,255,0.8);
          line-height: 18px;
          & > dt
            display: inline-block;
            vertical-align: center;
            margin-right: 10px;
          .hot-item
            display: inline-block;
            vertical-align: center;
            margin-right: 20px;
            cursor: pointer;
</style>
