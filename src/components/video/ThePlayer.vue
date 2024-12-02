<script>
import "aliyun-aliplayer/build/skins/default/aliplayer-min.css";
export default {
  name: 'XXX', // XXX
  props: {
    playingVideo: {
      type: Object
    }
  },
}
</script>
<template>
  <div>
    <div id="container"></div>
    <div class="vd-info">
      <p class="vd-title">{{ playingVideo.title }}</p>
      <!-- <div class="vd-duration">
        <img src="./assets/time.png" alt="" class="icon-time" />{{
          playingVideo.duration
        }}
      </div> -->
    </div>
    <!-- <div v-if="playingVideo.Description" class="vd-split"></div>
    <div class="vd-intro">{{ playingVideo.Description }}</div> -->
  </div>
</template>
<style scoped>
#container {
  width: 100%;
}
.vd-info {
  padding: 20px 0;
}
.vd-info .vd-title {
  font-size: 20px;
  color: #4d555d;
  letter-spacing: 0;
  text-align: left;
  font-weight: bold;
}
.vd-info .vd-duration {
  display: flex;
  align-items: center;
  font-size: 20px;
  color: #c3c5c6;
  letter-spacing: 0;
  text-align: left;
}
.vd-info .vd-duration.live {
  color: #fc4347;
}
.vd-split {
  border-bottom: 1px solid #73777a;
}
.vd-intro {
  font-size: 14px;
  color: #ffffff;
  letter-spacing: 0;
  line-height: 22px;
  text-align: left;
  padding: 22px 0;
}
.icon-time {
  width: 22px;
  height: 22px;
  margin-right: 5px;
}
</style>
