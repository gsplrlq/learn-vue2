<template>
  <div class="lesson-nav-container">
    <div class="lesson-nav">
      <ul class="m-center">
        <li
          v-for="(item,index) in directionList"
          :key="index"
          class="nav-item"
          :class="{active: index == currentCategoryIndex}"
          @click="handleCategoryClick(item, index)"
        >
          {{ item.name }}
        </li>
      </ul>
    </div>
    <!-- <dl class="label-list ml-center">
      <dd
        v-for="(label,index) in currentLabels"
        :key="index"
        class="label-item"
        :class="{active: index == currentLabelIndex}"
        @click="handleLabelClick(label, index)"
      >
        {{ label.name }}
      </dd>
    </dl> -->
  </div>
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
  data () {
    return {
      currentCategoryIndex: 0,
      currentLabelIndex: 0
    }
  },
  methods: {
    // 主分类点击事件
    handleCategoryClick (item, index) {
      this.currentCategoryIndex = index
      this.currentLabelIndex = 0
      this.$emit('update:params', this.emitParams)
    },
    // 标签点击事件
    handleLabelClick (label, index) {
      this.currentLabelIndex = index
      this.$emit('update:params', this.emitParams)
    }
  },
  computed: {
    directionList () {
      if (this.list.length === 0) {
        return []
      }
      let categoryList = this.list.map(l => {
        return {
          name: l.name,
          code: l.code,
          list: l.typeCategoryList
        }
      })
      return categoryList
    },
    currentLabels () {
      const currentCategory = this.directionList[this.currentCategoryIndex]
      let ret = []
      if (!currentCategory) {
        return []
      } else {
        ret = currentCategory.list.slice()
        ret.unshift({
          name: '不限'
        })
        return ret
      }
    },
    emitParams () {
      const category = this.directionList[this.currentCategoryIndex]
      const label = this.currentLabels[this.currentLabelIndex]
      return {
        category: category.title === '全部' ? '' : category.code,
        label: label === '不限' ? '' : label.code
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import '~assets/stylus/variables.styl';
  .lesson-nav-container
    .lesson-nav
      z-index: 1;
      position: relative;
      padding: 16px 0;
      box-sizing: border-box;
      box-shadow: 0 8px 16px 0 rgba(7,17,27,0.1)
      background-color: #fff;
      .nav-item
        position: relative;
        display: inline-block;
        margin-right: 46px;
        height: 40px;
        line-height: 40px;
        color: $font-first-color;
        font-weight: 700;
        font-size: 16px;
        cursor: pointer;
        &:hover
          color: $theme-orange-dark-color;
        &.active
          color: $theme-orange-dark-color;
          &::after
            content: '';
            position: absolute;
            left: 50%;
            bottom: 0;
            margin-left: -8px;
            width: 16px;
            height: 3px;
            background-color: $theme-orange-dark-color;
            border-radius: 2px;
    .label-list
      margin-top: 24px;
      .label-item
        display: inline-block;
        margin-right: 20px;
        margin-bottom: 12px;
        padding: 0 12px;
        line-height: 32px;
        border-radius: 6px;
        font-size: 14px;
        color: $font-second-color;
        cursor: pointer;
        &:hover
          color: $theme-orange-dark-color;
          background-color: rgba(204,136,0,.1);
        &.active
          color: $theme-orange-dark-color;
          background-color: rgba(204,136,0,.1);
</style>
