<template>
  <div class="footer">
    <div class="footer-container m-center">
      <div class="footer-links">
        <ul>
          <li
            v-for="(item,index) in linkList"
            :key="index"
            class="link-item"
          >
            {{ item.title }}
          </li>
        </ul>
      </div>
      <div class="copyright">
        <p>Copyright© {{ year }} learnlearnlearn.com  京ICP备xxxx号 京公网安备xxxxx号</p>
      </div>
      <div class="share">
        <div class="share-item wechart">
          <span class="share-img" />
          <p>官方微信</p>
          <img src="../../assets/images/ercode.png" class="wechart-code" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getFooter } from 'api/common.js'
import { ERR_OK } from 'api/config.js'
export default {
  data () {
    return {
      linkList: []
    }
  },
  created () {
    this.year = new Date().getFullYear()
  },
  mounted () {
    // this.getFooterData()
  },
  methods: {
    // 获取底部版权数据
    getFooterData () {
      getFooter().then(res => {
        let { code, data, msg } = res
        if (code === ERR_OK) {
          this.linkList = data
        } else {
          this.$message.error(msg)
          this.linkList = []
        }
      }).catch(() => {
        this.linkList = []
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import '~assets/stylus/variables.styl';
  .footer
    width: 100%;
    height: 100%;
    padding: 36px 0;
    box-sizing: border-box;
    background-color: #F7F9FB;
    .footer-container
      position: relative;
      .footer-links
        .link-item
          display: inline-block;
          padding: 0 10px;
          color: $font-four-color;
          font-size: 14px;
          cursor: pointer;
          &:hover
            color: $font-second-color;
      .copyright
        margin-top: 8px;
        padding-left: 10px;
        line-height: 24px;
        color: $font-four-color;
        font-size: 12px;
      .share
        position: absolute;
        right: 0;
        top: 0;
        .share-item
          display: inline-block;
          margin-right: 18px;
          cursor: pointer;
          .share-img
            display: block;
            margin: 0 auto;
            width: 32px;
            height:32px;
            background: url('https://www.imooc.com/static/img/idx-btm.png') no-repeat 0 0
            background-position: -52px -221px;
          & > p
            margin-top: 4px;
            font-size: 12px;
            color: $font-second-color;
            line-height: 24px;
        .weibo
          .share-img
            background: url('https://www.imooc.com/static/img/idx-btm.png') no-repeat 0 0
            background-position: 0px -221px;
          &:hover
            .share-img
              background-position: 0px -262px;
        .wechart
          position: relative;
          &:hover
            .share-img
              background-position: -52px -262px;
            .wechart-code
              opacity: 1;
              transform: scale(1);
          .wechart-code
            position: absolute;
            opacity: 0;
            left: -67px;
            bottom: 65px;
            width: 172px;
            height: 172px;
            transform-origin: bottom;
            transform: scale(0);
            transition: all 0.15s linear;
</style>
