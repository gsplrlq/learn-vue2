<template>
  <div class="comment">
    <div class="comment-container">
      <div v-if="catalog.hasStudy" class="search-btn" @click="getQa">
        添加笔记
      </div>
    </div>

    <!-- 评价列表 -->
    <ul class="comment-list">
      <li
        v-for="(comment,index) in commentList"
        :key="index"
        class="comment-item"
      >
        <div class="img-box">
          <img :src="comment.userAvatar" alt="">
        </div>
        <div class="comment-content-wrapper">
          <p>
            <span class="name">{{ comment.userAccount }}</span>
          </p>
          <p class="content">
            {{ comment.content }}
          </p>
          <p>
            <span class="time">时间：{{ comment.createTime }}</span>
          </p>
        </div>
      </li>
    </ul>

    <el-empty v-if="commentList.length == 0"></el-empty>
  </div>
</template>
<script>
import { getLessonNote, getLessonNoteCreate } from 'api'
export default {
  props: {
    catalog: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      commentList: [],
    }
  },
  mounted () {
    this.getLessonComment()
  },
  methods: {
    // 分页值更新
    handlePaginationChange (page) {
      this.page = page
      this.getLessonComment()
    },
    // 获取课程评价列表
    getLessonComment () {
      const params = {
        courseId: this.$route.params.id,
        page: {
          current: 1,
          size: -1,
        }
      }
      this.commentList = []
      getLessonNote(params).then((res) => {
        this.commentList = res.data.records
      })
    },
    getQa () {
      this.$prompt('请输入笔记', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      }).then(({ value }) => {
        getLessonNoteCreate({
          "courseId": this.$route.params.id,
          "content": value,
        }).then(() => {
          this.$message({
            type: 'success',
            message: '提交成功'
          });
          this.getLessonComment()
        })
      })
    },
  }
}
</script>
<style lang="stylus" scoped>
  .comment
    .comment-container 
      height: 60px;
      width: 100%;
      .search-btn
        flex: 0 0 138px;
        width: 138px;
        height: 48px;
        text-align: center;
        line-height: 48px;
        background-color: #f20d0d;
        border-radius: 24px;
        color: #fff;
        cursor: pointer;
    .comment-list
      .comment-item
        margin-bottom: 8px;
        padding: 24px; 36px;
        display: flex;
        align-items: flex-start;
        background-color: #fff;
        box-shadow: 0 0 8px 4px rgba(7,17,27,.1);
        border-radius: 12px;
        .img-box
          margin-right: 20px;
          flex: 0 0 48px;
          width: 48px;
          height: 48px;
          & > img
            display: block;
            width: 100%;
            height: 100%;
            border-radius: 50%;
            background-color: #eee;
        .comment-content-wrapper
          flex: 1;
          & > p
            font-size: 14px;
            color: #14191e;
            line-height: 24px;
            &.content
              margin-top: 4px;
              margin-bottom: 8px;
              line-height: 28px;
            .name
              color: #787d82;
              font-weight: 700;
            .score, .time
              float: right;
            .time
              color: #b5b9bc;
              font-size: 12px;
</style>