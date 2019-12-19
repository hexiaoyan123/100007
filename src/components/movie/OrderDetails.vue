<template>
  <div class="container">
    <!-- 头部开始 -->
    <!-- <header>
      <div class="header-back" @click="goBack">
        <van-icon name="arrow-left" />
      </div>
      <div class="header-cont">
        查看订单
      </div>
      <div class="header-more"></div>
    </header> -->
    <!-- 头部结束 -->

    <div class="top-line" v-if="order.dataStatus == 2">
      支付剩余时间： {{timer}}
    </div>

    <ul class="list">
      <li class="item">
        <div class="item-left">
         <p class="name">{{order.filmName}}</p>
         <p>{{order.showTime | timeToStr}}</p>
         <p>{{order.cinemaName}} {{order.cinemaHallName}}</p>
         <p>{{order.rowCol}}</p>
        </div>
        <div class="item-right"></div>
      </li>
    </ul>

    <ul class="list">
      <li class="item">
        <div class="item-left">
          <p class="name">取电影票</p>
          <div class="nobor">
            <div class="item-left" style="text-align: center;">
              <span class="on" v-if="order.voucher">{{order.voucher}}</span>
              <span class="on" v-else>暂无</span>
            </div>
            <div class="item-right"></div>
          </div>
        </div>
        <div class="item-right"></div>
      </li>
    </ul>

    <ul class="list">
      <li class="item">
        <div class="item-left">
          <span class="on name-right">{{order.dataStatus | typeToStr}}</span>
          <p class="name">订单号：{{order.id}} </p>
          <!-- <b>订单号: {{order.id}}</b> <span class="on" style="float: right;">{{order.dataStatus | typeToStr}}</span> -->
          <div class="nobor">
            <div class="item-left">
            <p>购买时间：{{order.createTime | timeToStr}}</p>
            <p>订单手机：{{order.phone}}</p>
            <p>订单金额：{{order.orderAmount | moneyFormat}}</p>
            </div>
            <div class="item-right"></div>
          </div>
        </div>
        <div class="item-right"></div>
      </li>
    </ul>
   
    <!-- <div class="goods-bottom" v-if="order.dataStatus != 4">
      <span @click.stop="goPay" v-if="order.dataStatus == 2" class="blue">去支付</span>
      <span @click.stop="cancelOrder" v-if="order.dataStatus == 1 || order.dataStatus == 2">取消订单</span>
      <span @click.stop="delOrder" v-if="order.dataStatus == 0 || order.dataStatus == 3 || order.dataStatus == 5 || order.dataStatus == 6 || order.dataStatus == 7">删除订单</span>
    </div> -->

    <div class="goods-bottom" v-if="order.dataStatus == 2 || order.dataStatus == 1">
      <span @click.stop="goPay" v-if="order.dataStatus == 2" class="blue-on">立即支付</span>
      <span @click.stop="cancelOrder" v-if="order.dataStatus == 1 || order.dataStatus == 2" class="blue-on">取消订单</span>
    </div>

  </div>
</template>

<script>
export default {
  name: 'OrderDetails',
  data () {
    return {
      order: {},
      timer: '00:00', // 倒计时时间
    }
  },
  created () {
    this.getOrder()
  },
  methods: {
    // 获得订单信息
    getOrder () {
      let vm = this;
      this.$http.get('/panda-cinema-api/v1/getOrder/' + this.$route.params.id).then(function (response) {
        if(response.data.code == '1000'){
          vm.order = response.data.result;
        }else{
          vm.$toast(response.data.msg)
        }
      })
      .catch(function (error) {
        vm.$toast('请求超时，请稍后再试！')
      });
    },
    // 返回上一页
    goBack () {
      this.$router.back(-1);
    },
    // 去支付
    goPay () {
      this.$router.push('/movie/orderPay/'+this.order.id);
    },
    // 删除订单
    delOrder () {
      let vm = this;
      this.$http.get('/panda-shop-api/wap/delOrder/'+ this.order.id).then(function (response) {
        if(response.data.code == '1000'){
          vm.goBack()
        }else{
          vm.$toast(response.data.msg)
        }
      })
      .catch(function (error) {
        vm.$toast('请求超时，请稍后再试！')
      });
    },
    // 取消订单
    cancelOrder () {
      let vm = this;
      this.$http.get('/panda-cinema-api/v1/cancelOrder/'+ this.order.id).then(function (response) {
        if(response.data.code == '1000'){
          vm.goBack()
        }else{
          vm.$toast(response.data.msg)
        }
      })
      .catch(function (error) {
        vm.$toast('请求超时，请稍后再试！')
      });
    },
    // 倒计时
    resetTime (time) {
      let vm = this;
      //获取当前时间
      var date = new Date();
      var now = date.getTime();
      //设置截止时间
      var end = time*1000;
      if(end <= now){
        return false;
      }
      //时间差
      var leftTime = end-now;
      var timer = null;
      // 倒计时函数
      function countDown() {
        leftTime -= 1000;
        //定义变量 d,h,m,s保存倒计时的时间
        var d,h,m,s;
        if (leftTime>=0) {
          d = Math.floor(leftTime/1000/60/60/24);
          h = Math.floor(leftTime/1000/60/60%24);
          m = Math.floor(leftTime/1000/60%60);
          s = Math.floor(leftTime/1000%60);   
          
          if(m < 10){
            m = '0'+m
          }
          if(s <10){
            s = '0' + s
          }
          
          vm.timer = m+":"+s;
        }else{
          vm.timer = "00:00";
          clearInterval(timer);
        }
      }

      timer=setInterval(countDown,1000);
    }
  },
  filters: {
    // 状态转字符串
    typeToStr (value) {
      if(value == 1){
        return '待付款'
      }else if(value == 2){
        return '待出票'
      }else if(value == 3){
        return '已出票'
      }else if(value == 4){
        return '已取消'
      }else if(value == 5){
        return '已失败'
      }else{
        return ''
      }
    },
    // 金钱格式化
    moneyFormat (value) {
      if(value){
        return (value/ 100).toFixed(2)
      }else if(value === 0){
        return 0
      }else{
        return ''
      }
    },
    // 时间格式化
    timeToStr (shijianchuo) {
      function add0(m){return m<10?'0'+m:m }
      var time = new Date(shijianchuo *1000);
      var y = time.getFullYear();
      var m = time.getMonth()+1;
      var d = time.getDate();
      var h = time.getHours();
      var mm = time.getMinutes();
      var s = time.getSeconds();
      return y+'-'+add0(m)+'-'+add0(d)+' '+add0(h)+':'+add0(mm);
    },
    // 放映类型转换
    showTypeToStr (value) {
      if(value == 1){
        return '2D'
      }else if(value == 2){
        return '3D'
      }else if(value == 3){
        return 'MAX2D'
      }else if(value == 4){
        return 'MAX3D'
      }else if(value == 6){
        return 'DMAX'
      }
    },
  }
}
</script>

<style scoped>
.container{
  background-color: #f8f8f8;
  /* padding-top: 85px; */
}
.top img{
  display: block;
  width: 100%;
}
.nobor{
  display: flex;
}
header{
  height: 85px;
  line-height: 85px;
  /* position: absolute; */
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  background-color: #fff;
  color: #4d4d4d;
  z-index: 20;
  text-align: center;
  display: flex;
  font-size: 28px;
  z-index: 101;
}
.header-back{
  width: 70px;
  text-align: center;
}
.header-cont{
  flex: 10;
}
.header-more{
  width: 75px;
  text-align: center;
}
header .iconfont{
  font-size: 28px;
}

.list{
  margin-top: 20px;
  border-bottom: 1px solid #eee;
}
.item{
  border-top: 1px solid #eee;
  padding: 20px;
  line-height: 44px;
  font-size: 27px;
  color: #898989;
  display: flex;
  background-color: #fff;
}
.item-left{
  flex: 10;
}

.right{
  float: right;
}
.goods-list{
  background-color: #fff;
  margin-top: 20px;
}
.goods-item{
  border-top: 1px solid #eee;
  display: flex;
  position: relative;
  padding: 20px 20px 20px 20px;
}
.goods-item-choice{
  position: absolute;
  height: 100%;
  top: 0;
  left: 0;
  width: 90px;
  box-sizing: border-box;
  padding: 0 20px;
  padding-top: 75px;
  color: #999;
}
.goods-item-choice .van-icon{
  font-size: 20px;
}
.goods-item-choice .van-icon.van-icon-checked{
  color: #00a8ec;
}
.goods-item-img img{
  display: block;
  height: 150px;
  width: 150px;
}
.goods-item-info{
  flex: 10;
  padding-left: 20px;
  font-size: 24px;
  line-height: 50px;
} 
.goods-bottom{
  padding: 10px 20px;
  line-height: 60px;
  text-align: right;
  background-color: #fff;
  margin-top: 20px;
  
}
.goods-bottom span{
  text-align: center;
  display: inline-block;
  padding: 0 20px;
  border: 1px solid #00a8ec;
  border-radius: 6px;
  margin-left: 10px;
}
.goods-bottom .red{
  color: #ff4403;
  border-color: #ff4403;
}
.goods-bottom .blue{
  color: #00a8ec;
  border-color: #00a8ec;
}
.blue-on{
  color: #fff;
  border-color: #00a8ec;
  background-color: #00a8ec;
}
.top-line{
  font-size: 27px;
  text-align: center;
  line-height: 77px;
  color: #fff;
  background-color: #f1cf64;
}
.item .name{
  font-size: 36px;
  font-weight: 700;
  line-height: 60px;
  color: #222;
}
.name-right{
  float: right;
  line-height: 60px;
  /* padding: 10px 0; */
}
.item p{
  line-height: 44px;
  /* padding: 10px 0; */
}
</style>
