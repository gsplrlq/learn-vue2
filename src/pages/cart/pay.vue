<template>
  <div class="cart-pay">
    <!-- 头部 -->
    <cart-header>
      <span class="cart-name">支付中心</span>
    </cart-header>

    <!-- 支付部分 -->
    <div class="pay-container m-center">
      <dl>
        <dt class="pay-title">
          <span>订单号：{{ orderSn }}</span>
          <span class="detail" @click="showList=!showList">{{ showList ? '收起' : '详情' }}</span>
        </dt>
        <template v-if="showList">
          <dd v-for="(item,index) in cartList" :key="index" class="pay-item">
            <div class="img-box">
              <img :src="item.productImageUrl" alt="">
            </div>
            <div class="content">
              <p class="name">
                {{ item.productName }}
              </p>
            </div>
            <div class="price">
              实际支付金额：<span>¥{{ item.amount }}</span>
            </div>
          </dd>
        </template>
      </dl>
      
      <div class="pay-way-container">
        <!-- 支付方式 -->
        <div class="way-list">
          <p class="way-title">
            支付方式
          </p>
          <div
            v-for="(item, index) in payWayList"
            :key="index"
            class="way-item"
            :class="[ {active: currentWayIndex==index}, getClassName(item)]"
            @click="currentWayIndex=index"
          >
            <!-- 勾选样式 -->
            <div v-if="currentWayIndex == index" class="way-check">
              <i class="iconfont">&#xe786;</i>
            </div>
          </div>
        </div>

        <!-- 支付按钮 -->
        <div class="pay-bottom">
          <div class="right">
            <p class="pay-total">
              应付金额：<span>¥ {{ total }}</span>
            </p>
            <button class="pay-btn" :class="{'is-disabled': isDisabled }" @click="handlePayClick">
              立即支付
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 支付弹窗 -->
    <el-dialog
      title="支付"
      :visible.sync="modal3"
      width="20%"
      :before-close="closePayDialog"
    >
      <div>
        <div>
          使用  
          <span v-if="way === 'wechat'" class="pay-for-method-1">微信</span>
          <span v-if="way === 'ali'" class="pay-for-method-2">支付宝</span> 
          扫一扫二维码进行支付
        </div>
        <!-- 微信支付二维码 -->
        <div v-if="way !== 'ali'" id="qrcodeImg" ref="qrCodeUrl"></div>
        <!-- 支付宝支付二维码 -->
        <iframe 
          v-if="way === 'ali'"
          :srcdoc="payAliQRcode" 
          frameborder="no" 
          border="0"
          marginwidth="10" 
          marginheight="10" 
          scrolling="no" 
          width="220" 
          height="220"
          style="overflow: hidden;"
        >
        </iframe>
        <div>注：若二维码过期失效，请刷新页面重新进入支付！</div>
      </div>
      <span slot="footer">
        <el-button @click="closePayDialog">返回</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import QRCode from 'qrcodejs2';
import CartHeader from './cart-header.vue'
import { getOrderInfo, getPayUrl, getPayResult } from 'api'
export default {
  data () {
    return {
      isDisabled: false,
      charge: 0,
      showList: true,
      currentWayIndex: 0,
      payWayList: [],
      cartList: [],
      timer: null,


      modal3: false,    // 是否打开支付弹窗
      payAliQRcode: '',    // 支付宝codeURL
    }
  },
  created () {
    this.payWayList = [
      {
        "type": 'ali',
        "name": "支付宝",
      },
      {
        "type": 'wechat',
        "name": "微信",
      }
    ]
  },
  mounted () {
    this.getOrderInfoData()
  },
  methods: {
    // 订单支付
    handlePayClick () {
      if(this.isDisabled) return

      this.isDisabled = true
      const params = {
        orderSn: this.orderSn,
        payType: this.way
      }
      getPayUrl(params).then(res => {
        this.openPay(res.data)
      }).catch(() => {
        this.isDisabled = false
        // this.$message.error('接口异常')
      })
    },
    startTimer () {
      this.timer = setTimeout(() => {
        this.startTimer()
        this.getResult()
      }, 3000);
    },
    // 支付窗口
    openPay (url) {
      clearInterval(this.timer); 

      this.modal3 = true;
      if(this.way === 'wechat') this.qrcode(url)
      else this.payAliQRcode = url

      this.startTimer()
    },
    qrcode (url) {  // 前端根据 URL 生成微信支付二维码
      if(this.$refs.qrCodeUrl) this.$refs.qrCodeUrl.innerHTML = "";

      this.$nextTick(() => {
        return new QRCode(this.$refs.qrCodeUrl, {
          text: url,
          colorDark: '#000',
          colorLight: '#fff'
        });
     })
    },
    closePayDialog (){  // 关闭支付窗口
      this.modal3 = false;
      this.isDisabled = false
      clearInterval(this.timer);    // 清除定时器
    },
    getResult () {
      getPayResult({
        orderSn: this.orderSn,
        payType: this.way
      }).then(res => {
        if(res.data.paySuccess) {
          this.closePayDialog();    // 关闭支付弹窗
          clearTimeout(this.timer)
          this.$confirm('支付成功，是否查看订单详情？', '提示', {
            confirmButtonText: '确定',
            type: 'success'
          }).then(() => {
            this.$router.replace('/order')
          }, () => {
            this.$router.replace('/lesson')
          })
          this.isDisabled = false
        }
      })
    },
    // 获取订单详情
    getOrderInfoData () {
      getOrderInfo(this.orderSn).then(res => {
        this.cartList = [res.data]
      }).catch (() => {
        this.cartList = []
      })
    },
    // 获取支付方式的样式
    getClassName (item) {
      const classMap = {
        'ali': 'Alipay',
        'wechat': 'Wxpay',
      }
      return classMap[item.type]
    },
    // 获取背景图片
    getBackground (item) {
      return {
        'background-image': `url(${item.img})`
      }
    },

  },
  computed: {
    total () {
      let result = 0
      this.cartList.forEach(item => {
        if (item.isDiscount) {
          result = Number((result +  parseFloat(item.discountPrice)).toFixed(2))
        } else {
          result = Number((result +  parseFloat(item.amount)).toFixed(2))
        }
      })
      return result
    },
    way () {
      return this.payWayList[this.currentWayIndex].type
    },
    orderSn () {
      return this.$route.params.orderSn
    }
  },
  watch: {
    currentWayIndex (val) {
      if (val === 2 && this.charge < this.total) {
        this.isDisabled = true
      } else {
        this.isDisabled = false
      }
    },
    $route () {
      clearTimeout(this.timer)
    }
  },
  components: {
    CartHeader
  },
  destroyed () {
    clearTimeout(this.timer)
  },
}
</script>
<style lang="stylus" scoped>
  .cart-pay
    margin-bottom: 60px;
    .cart-name
      margin-right: 25px;
      font-size: 32px;
      color: #07111b;
    .pay-container
      margin-top: -40px;
      padding: 36px 32px 0 32px;
      background-color: #fff;
      box-shadow: 0 8px 16px rgba(7,17,27,0.1);
      border-radius: 8px;
      box-sizing: border-box;
      .pay-title
        padding-bottom: 36px;
        font-size: 16px;
        .detail
          float: right;
          font-size: 14px;
          color: #f01414;
          cursor: pointer;
      .pay-item
        display: flex;
        align-items: center;
        padding: 24px;
        background-color: #f3f5f7;
        border-bottom: 2px solid #fff;
        &:last-child
          margin-bottom: 60px;
        .img-box
          margin-right: 20px;
          flex: 0 0 160px;
          width: 160px;
          height: 90px;
          img
            display: block;
            width: 100%;
            height: 100%;
        .content
          flex: 1;
          align-self: flex-start;
          .name
            margin-top: 8px;
            line-height: 24px;
        .price
          flex: 0 0 28%;
          width: 28%;
          font-size: 14px;
          color: #93999f;
          span
            padding-left: 10px;
            color: #f01414;
            font-size: 16px;
      .pay-way-container
        padding: 30px 12px 48px;
        border-top: 1px solid #d9dde1;
        .way-list
          .way-title
            padding-bottom: 15px;
            font-size: 16px;
            line-height: 36px;
            color: #07111b;
          .way-item
            position: relative;
            display: inline-block;
            vertical-align: middle;
            margin-right: 18px;
            width: 194px;
            height: 86px;
            background-color: #f3f5f7;
            border: 2px solid #f3f5f7;
            cursor: pointer;
            border-radius: 6px;
            background-repeat: no-repeat;
            background-position: center center;
            background: url('~@/assets/images/pay_s.png') no-repeat center top;
            .way-check
              position: absolute;
              right: 0;
              bottom: 0;
              width: 0;
              height: 0;
              border: 10px solid #f01414;
              border-color: transparent #f01414 #f01414 transparent;
              text-align: center;
              .iconfont
                z-index: 99;
                display: inline-block;
                position: absolute;
                top: -1px;
                right: -10px;
                color: #fff;
                font-size: 12px;
            &.active
              border: 2px solid #f01414;
            &.Alipay
              background-position: 33px -304px;
            &.Wxpay
              background-position: 30px -423px;
            &.Account
              position: relative;
              background-position: left 20px center;
              background-size: 48px 48px;
              .account-info
                position: absolute;
                left: 80px;
                top: 50%;
                transform: translateY(-50%);
                .title
                  font-size: 20px;
                  color: #1c1f21;
                  font-weight: 700;
                  line-height: 30px;
                .balance
                  font-size: 12px;
                  color: #9199a1;
                  line-height: 16px;
        .pay-bottom
          margin-top: 48px;
          padding-top: 36px;
          overflow: hidden;
          border-top: 1px solid #d9dde1;
          .left
            float: left;
            .pay-tips
              color: #f01414;
              font-size: 14px;
              line-height: 30px;
          .right
            float: right;
            .pay-total
              font-size: 14px;
              color: #07111b;
              line-height: 36px;
              span
                display: inline-block;
                vertical-align: middle;
                font-size: 22px;
                color: #f01414;
            .pay-btn
              margin-left: auto;
              margin-top: 32px;
              margin-bottom: 16px;
              width: 140px;
              height: 40px;
              border: none;
              outline: none;
              text-align: center;
              line-height: 36px;
              background-color: #f01414;
              color: #fff;
              font-size: 14px;
              font-weight: 700;
              cursor: pointer;
              &.is-disabled
                cursor: not-allowed;
                pointer-events: none;
                background-color: rgba(240, 20, 20, 0.5);
            .tips
              font-size: 12px;
              color: #4d555d;
              line-height: 24px;
              text-align: right;
              cursor: pointer;
              &:hover
                color: #f01414;
</style>


<style>
.pay-dialog-body p{
    margin-bottom: 10px;
}
#qrcodeImg{
    margin: 40px;
}
.pay-for-method-1{
    font-weight: bold;
    color: #67c23a;
}
.pay-for-method-2{
    font-weight: bold;
    color: #409eff;
}
</style>