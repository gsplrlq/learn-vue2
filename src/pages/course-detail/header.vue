<template>
  <div class="course-detail-header">
    <div class="header">
      <div class="header-content m-center">
        <p class="breadcrumb-box">
          <span>{{ base.courseType === 2 ? '付费课' : '免费课' }} | {{ base.title }}</span>
        </p>
        <!-- <p class="share-box">
          <span class="iconfont">&#xe716;</span>
          <span class="iconfont">&#xe646;</span>
          <span class="iconfont">&#xe6a0;</span>
          <span class="iconfont">&#xe699;</span>
        </p> -->
        <h2 class="title">
          {{ base.title }}
        </h2>
        <div class="overview" :title="base.courseDesc">{{ base.courseDesc }}</div>
        <div class="information">
          <div class="teacher">
            <!-- <img :src="base.teacher.avatar" class="avatar" alt="">
            <div class="teacher-introduce">
              <p class="name">
                {{ base.teacher.name }}
              </p>
              <p class="job">
                {{ base.teacher.job }}
              </p>
            </div> -->
            <dl>
              <!-- <dd>难度：{{ base.hard.text }}</dd> -->
              <dd>时长：{{ base.durationStr || 0 }}</dd>
              <dd>学习人数：{{ base.studyCount }}</dd>
              <dd>综合评分：{{ base.score || 0 }}</dd>
            </dl>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    base: {
      type: Object,
      default () {
        return {}
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
  .course-detail-header
    height: 200px;
    background-image: linear-gradient(90deg, #19172D, #645DB7);
    .header
      height: 100%;
      .header-content
        position: relative;
        height: 100%;
        color: #fff;
        .breadcrumb-box
          padding: 16px 0 24px 0;
          line-height: 24px;
          font-size: 12px;
          color: rgba(255,255,255,0.5);
        .share-box
          position: absolute;
          right: 0;
          top: 16px;
          font-size: 12px;
          line-height: 24px;
          cursor: pointer;
          color: rgba(255,255,255,0.5);
          & > span
            margin: 0 12px;
            &:hover
              color: #fff;
          .iconfont
            font-size: 24px;
        .title
          margin-top: 0px;
          margin-bottom: 8px;
          font-size: 32px;
          color: #fff;
          line-height: 48px;
        .overview
          color: rgba(255,255,255,0.8);
          font-size: 14px;
          line-height: 24px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        .information
          .teacher
            vertical-align: middle;
            display: flex;
            align-items: center;
            .avatar
              width: 48px;
              heighth: 48px;
              border-radius: 50%;
            .teacher-introduce
              margin-left: 8px;
              .name
                font-size: 14px;
                line-height: 24px;
                font-weight: 700;
              .job
                font-size: 12px;
            dl
              flex: 1;
              margin-top: 10px;
              dd
                display: inline-block;
                vertical-align: middle;
                margin-right: 20px;
                font-size: 16px;
                font-weight: 700;
                color: rgba(255,255,255,0.8);
</style>
