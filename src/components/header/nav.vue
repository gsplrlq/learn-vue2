<template>
  <ul class="header-nav">
    <li v-for="(item,index) in list" :key="index" class="nav-item" :class="{'active': $route.path == item.path && (item.query && ($route.query.courseType == item.query.courseType) || !item.query) }">
      <router-link :to="{ path: item.path, query: item.query }" class="nav-link">
        {{ item.title }}
        <i v-if="item.icon" class="nav-icon" :style="getBackgroundImage(item.icon)" />
      </router-link>
    </li>
  </ul>
</template>
<script>
export default {
  props: {
    list: {
      type: Array,
      default () {
        return []
      }
    }
  },
  methods: {
    // 获取导航栏的背景图片
    getBackgroundImage (icon) {
      return {
        'background': `url(${icon}) no-repeat center center`
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
  @import '~assets/stylus/variables.styl';
  .header-nav
    float: left;
    overflow: hidden;
    .nav-item
      float: left;
      &.active
        .nav-link
          color: #f01414;
      .nav-link
        display: block;
        position: relative;
        padding: 0 20px;
        height: 72px;
        line-height: 72px
        color: $font-second-color;
        font-weight: 600;
        .nav-icon
          position: absolute;
          top: 14px;
          right: 4px;
          width: 16px;
          height: 16px;
    
</style>
