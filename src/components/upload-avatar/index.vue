
<template>
  <div>
    <el-upload
      class="avatar-uploader"
      accept="image/jpeg,image/png,image/gif"
      action="#"
      :show-file-list="false"
      :before-upload="beforeAvatarUpload"
      :http-request="onUpload"
    >
      <img v-if="imageUrl" :src="imageUrl" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
  </div>
</template>

<script>
import { upload } from 'api'

export default {
  model:{
    prop:'imageUrl',
    event:'parent-event'
  },
  props: {
    imageUrl: String
  },
  data () {
    return {
    };
  },
  methods: {
    handleAvatarSuccess (res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload (file) {
      if (!["image/jpeg", "image/png", "image/gif"].includes(file.type)) {
        this.$message.error("只能上传图片");
        return false;
      }
      const isExceed = file.size / 1024 / 1024 > 5;
      if (isExceed) {
        this.$message.error(`单个图片大小不能超过5MB`);
        return false;
      }
    },
    onUpload ({ file }) {
      this.uploadFile(file)
    },
    uploadFile (file) {
      upload({
        fileName: file.name
      }).then(res => {
        const { data } = res;
        let req = new FormData();
        req.append("OSSAccessKeyId", data.ossAccessKeyId);
        req.append("success_action_status", "200");
        req.append("policy", data.policy);
        req.append("x-oss-signature", data.signature);
        req.append("x-oss-signature-version", "OSS4-HMAC-SHA256");
        req.append("x-oss-credential", data.x_oss_credential);
        req.append("x-oss-date", data.x_oss_date);
        req.append("key", data.uploadDir + data.key); // 文件名
        req.append("x-oss-security-token", data.stsToken);
        req.append("file", file); // file 必须为最后一个表单域
        
        fetch(data.fileAccessHost, { 
          method: "POST",
          body: req
        }).then(() => {
          const url = data.fileAccessHost + data.uploadDir + data.key;
          this.$emit("parent-event", url);
        })
        .catch((error) => {
          this.$message.error(`异常 ${error}`, { type: "error" });
        });
      })
    }
  }
}
</script>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 120px;
    height: 120px;
    line-height: 120px;
    text-align: center;
  }
  .avatar {
    width: 120px;
    height: 120px;
    display: block;
  }
</style>