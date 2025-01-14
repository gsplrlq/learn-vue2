<template>
  <div class="header">
    <div class="m-center">
      <!-- logo -->
      <div class="logo-box">
        <router-link to="/" class="router-link-active">
          <img data-v-1a44c52b="" height="45" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJ4AAACgCAMAAADKKyWUAAAAt1BMVEX///+3AAW2AASxAACzAAC1AAHimpzMTE+uAAD56un79vbHOz+6Eha6CxDRXmLqs7TYeHvquLm3AAO/IyfYd3q9FhvOVVnWcHL45+jOU1a+GyDei47Ua27inJ3MT1LEMDXJREe9FRnhl5nptbe5CQ7afH+/HiLuxsfXc3Xgk5b56+vQWV3CKi7lpKbdiIrKR0vnq6zbgIL99/bvycrswMHsvL3TZWjFNzr9+/v029vy0dLekJL24OGF63ubAAAEnklEQVR42u3cjVLaQBSG4ex3zgFq0erBP7SCWK2gKGj9bXv/19WQRElCaGNwZa37dsYxSzp9ZumYXcAEPp/vb90Mj1ebzWYvauu53nNb6Xpb4UC2/PHetO9RezN9L3pg8hd73wdZ3bhB4lDc+JrhNRlq3AnS+J3S7TYA41AAXbjMExq4zAMdpXifPO//4tXc/r9Xez+z53mvzcNTpYaSYVTuZTwwJUn0iBqFZIdMNDSNYVSoaqKleQBzd38j6uaeo5FQ0jr5Fg2dHkZDClBz88tG0s0Ywp9PN6p1aVhL8tSwjIOnOqRGJ7rL56G7RJxd9twzeDuo2qOg7OwJ3QbP1WNL+hq9xvETuxNMu94jAbWDyt2xluOB+kGKR5MhHgVZXjjUCtJjBCzEqxFK8uRshkc3OZ5ml2QrIovyuCRPhkGeJ6tBfvaEdoNpt4S34vHnWV5zhserK8G0L41l8niWJ6vXaR7BOMZbyfCM53me583lbVfnHdjncf16t6gs5KzolJV9+zwIJF+IPl7J8D6zFAW1zBOoFMTH11kezdFZ5alRQUEiM7OHooxlHhQFGbjBM2oKk1meKco2z3ie53me53meSzwATEVJlndPRTHs8jTUtfpfC9p5yPB+3RWdc2h7vafg86ByF36vYYd35jbP8dnzPM/zPM/zvIo8t5cEWB22qtYTtb3eg3D1rK+Ww0y1EGaZFwZTNTVqm1c+l3Zqnud5b8BToWoxE8M2D9w66cftvKjw9M3cNvzgtXn6qtfcA8feU6tZ56nbPMdnD9R2m+f47HmeGzzXtkKeR2tOfxKD7tzmfXV6G869diesnRQe1EeHRY1G9Xonrh41Gg1FbfMgVC0OU2OZt1D64V8leM3fdnGbZ2Wn5jIPikWy/eRCwj/VEgBqmScAU/Xs/9zj4fhoMOkoqTbpoLjkoVp8zsX2G1xzr4LKnZJ93np13obbvG9k/93wTSu8Tx+Et+55nud575B34vJVwyzCu7XOE7qszruxzoNsnbfTbZfvfCiw/64QV07wnjaSnud5/xNPTXFagqTWeVriRQAI5qRL+VB6EkwUuEHFsW2egIdH+5eT9nP9umLEurXBfmGDEdu+aoD2g3lRwvsZzOkHLe9VginvdHkrFtDJP3k/5q73PK8Ez83F/BPv1POWxwPAnSDVIc/wzmd5A5u8sxRPc/9ITzTPG055U7FtXhKEHnOvqeZ4u4w87+FYyvFoLm+jBG/28wotnuG1yeR5O4RFrxrjMjw11A1SdUiQux/LVTzEKd4FKYyahXhtNiVmj+/Sl+kuxQsx6QVJj/UGJJ695yd7LQZjkSVBjUptJKV1331qj1igIU+BZLTFBCM6ORHdZEhCXcyTZqdeWGfEMU+6nXryHnj0Na7TGZKYMjwIT8MkE2KAzJCazJAi4alwHFH0hZ4OOdRFITqifMxAKV6I0YJNgE6/zx5kv9UyOwn9AHeQe0Ge5xrP8TtnviOegzf2zPKc0hXwxLhzw2XN8VZYgNAHB4p5jdvshgLuFOp4NUj3sNcgZ2JqSH7dNV7f6ff7my9pfV7hIxXbjDo5uA58vuX2B0mI88W6GGeCAAAAAElFTkSuQmCC" alt="logo">
          <img data-v-1a44c52b="" height="45" src="@/assets/images/logo_text-Bw18naUB.png" alt="logo">
          <!-- <img src="https://t4.ftcdn.net/jpg/01/28/93/91/360_F_128939133_0WXTVdZ1bv1NXusQsdYYJLIwTVoXHqQ7.jpg" height="72" alt="Logo"> -->
        </router-link>
      </div>
    
      <!-- 导航栏模块 -->
      <m-nav v-if="navList.length" :list="navList" />
    
      <!-- 搜索框模块 -->
      <!-- <search /> -->
    
      <!-- 登录模块 -->
      <login-area />
    </div>
  </div>
</template>
<script>
// import Search from 'components/search/search.vue'
import MNav from './nav.vue'
import LoginArea from './login.vue'
import { getHeader } from 'api/common.js'
import { ERR_OK } from 'api/config.js'
export default {
  data () {
    return {
      navList: [
        {
          "path": "/course",
          "query": { courseType: 1 },
          "title": "免费课",
        },
        {
          "path": "/course",
          "query": { courseType: 2 },
          "title": "付费课",
        },
        {
          "path": "/lesson",
          "title": "培训套餐",
        },
        {
          "path": "/exam",
          "title": "在线考试",
        },
      ]
    }
  },
  mounted () {
    // this.getHeaderData()
  },
  methods: {
    // 获取头部导航数据
    getHeaderData () {
      getHeader().then(res => {
        let { code, data, msg } = res
        if (code === ERR_OK) {
          this.navList = data
        } else {
          this.$message.error(msg)
          this.navList = []
        }
      }).catch(() => {
        this.navList = []
      })
    }
  },
  components: {
    MNav,
    // Search,
    LoginArea
  }
}
</script>

<style lang="stylus" scoped>
  @import '~assets/stylus/variables.styl';
  .header
    z-index: 200;
    position: relative;
    padding-right: 10px;
    height: 100%;
    background-color: #fff;
    box-shadow: 0 4px 8px $shadow;
    .logo-box
      float: left;
      width: 200px;
      height: 72px;
      .router-link-active
        display: flex;
        height: 100%;
        align-items: center;
</style>
