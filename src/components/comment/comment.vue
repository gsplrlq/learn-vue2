<template>
  <div class="comment">
    <!-- 评价总览 -->
    <div v-if="!loading" class="score-overview">
      <div class="star-box">
        <span class="title">综合评分</span>
        <span class="score">{{ comment.score }}</span>
        <mooc-star :value="comment.score / 2" :size="18" disabled />
      </div>

      <div v-if="catalog.hasStudy && !comment.userEvaluated" class="search-btn" @click="dialogFormVisible = true">
        我要评价
      </div>
    </div>

    <!-- 评价列表 -->
    <ul class="comment-list">
      <li
        v-for="(comment,index) in comment.commentList"
        :key="index"
        class="comment-item"
      >
        <div class="img-box">
          <img :src="comment.userAvatar" alt="">
        </div>
        <div class="comment-content-wrapper">
          <p>
            <span class="name">{{ comment.userAccount }}</span>
            <span class="score">
              <MoocStar :value="comment.score / 2" :size="16" :disabled="true" />
              <!-- {{ comment.score }}分 -->
            </span>
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

    <el-empty v-if="comment.commentList.length == 0"></el-empty>

    <el-dialog title="评价" :visible.sync="dialogFormVisible" width="400px">
      <el-form ref="form" :model="form">
        <el-form-item label="分数" :label-width="90" style="display: flex; align-items: center;" :rules="[ { required: true, message: '分数不能为0'} ]">
          <el-rate v-model="form.score"></el-rate>
        </el-form-item>
        <el-form-item label="内容" :label-width="90" :rules="[ { required: true, message: '内容不能为空'} ]">
          <el-input v-model="form.content" autocomplete="off" style="width: 300px;"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { getLessoEvaluate, getLessoEvaluateCreate } from 'api'
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
      comment: {
        userEvaluated: false,
        score: 0,
        commentList: [],
      },
      dialogFormVisible: false,
      form: {
        courseId: this.$route.params.id,
        content: '',
        score: 0
      },
      loading: true
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
      this.loading = true
      const params = {
        courseId: this.$route.params.id,
        page: {
          current: 1,
          size: -1,
        }
      }
      this.comment = {
        userEvaluated: false,
        score: 0,
        commentList: []
      }
      getLessoEvaluate(params).then((res) => {
        this.comment = res.data
        this.comment.commentList = res.data.page.records
        this.comment.score = res.data.score
        this.comment.userEvaluated = res.data.userEvaluated

        this.loading = false
      })
    },
    submitForm () {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          getLessoEvaluateCreate({
            "courseId": this.$route.params.id,
            "content": this.form.content,
            "score": this.form.score * 2
          }).then(() => {
            this.$message({
              type: 'success',
              message: '提交成功'
            });
            this.close()
            this.getLessonComment()
          })
        }
      });
    },
    close () {
      this.dialogFormVisible = false
      this.$refs['form'].resetFields();
    }
  }
}
</script>
<style lang="stylus" scoped>
  .comment
    min-height: 500px;
    .score-overview
      padding: 24px 32px;
      display: flex;
      align-items: center;
      background-color: #fff;
      box-shadow: 0 0 8px 4px rgba(7,17,27,0.1);
      border-radius: 12px;
      .search-btn
        flex: 0 0 138px;
        width: 138px;
        height: 48px;
        text-align: center;
        line-height: 48px;
        background-color: #B70005;
        border-radius: 24px;
        color: #fff;
        cursor: pointer;
        float: right;
      .star-box
        flex: 1;
        & > span
          display: inline-block;
          vertical-align:  middle;
          line-height: 24px;
          &.title
            width: 40px;
            text-align: center;
            color: #1c1f21;
            font-size: 14px;
            line-height: 16px;
            font-weight: 700;
          &.score
            padding-left: 5px;
            font-size: 32px;
            color: #4d555d;
            font-weight: 700;
            margin-right: 20px;
        >>> .star
          margin-left: 10px;
          vertical-align: middle;
          .star-item
            margin-right: 3px;
      .score-box
        margin-left: 50px;
        & > span
          display: inline-block;
          vertical-align:  middle;
          line-height: 24px;
          font-size: 14px;
          &.score
            padding-left: 12px;
            font-size: 26px;
            color: #f90;
            font-weight: 700;
    .comment-list
      margin-top: 24px;
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