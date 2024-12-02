<template>
  <div class="lesson-detail">
    <!-- 头部 -->
    <lesson-header :base="detail" />

    <!-- 内容部分 -->
    <lesson-content v-if="Object.keys(detail).length" :data="detail" />
  </div>
</template>
<script>
import LessonHeader from './header.vue'
import LessonContent from './content.vue'
import { getTrainDetail } from 'api'
export default {
  data () {
    return {
      detail: {}
    }
  },
  mounted () {
    this.getLessonDetailData()
  },
  methods: {
    // 获取课程详情
    getLessonDetailData () {
      getTrainDetail(this.$route.params.id).then(res => {
        this.detail = res.data
      }).catch(() => {
        this.detail = {}
      })
    }
  },
  components: {
    LessonHeader,
    LessonContent
  }
}
</script>
<style lang="stylus" scoped>

</style>