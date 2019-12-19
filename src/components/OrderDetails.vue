<template>
  <div class="container">
    <!-- 头部开始 -->
    <header>
      <div class="header-back" @click="goBack">
        <van-icon name="arrow-left" />
      </div>
      <div class="header-cont">
        查看订单
      </div>
      <div class="header-more">
        <!-- <i class="iconfont">&#xe60a;</i> -->
      </div>
    </header>
    <!-- 头部结束 -->

    <ul class="list">
      <li class="item">
        <div class="item-left">
          编号: {{order.id}}
        </div>
        <div class="item-right">
          <span>{{order.dataStatus | typeToStr}}</span>
        </div>
      </li>
      <li class="item" v-show="order.trackingNumber">
        <div class="item-left">
          快递单号: {{order.trackingNumber}}
        </div>
        <div class="item-right"></div>
      </li>
      <li class="item">
        <div class="item-left">
          收货人: {{order.consignee}}
        </div>
        <div class="item-right">
          电话: {{order.phone}}
        </div>
      </li>
      <li class="item">
        <div class="item-left">
          地址: {{order.areaName + order.address}}
        </div>
        <div class="item-right">
          
        </div>
      </li>
      <li class="item">
        <div class="item-left">
          留言: {{order.remark}}
        </div>
        <div class="item-right">
          
        </div>
      </li>
    </ul>

    <!-- 商品列表开始 -->
    <div class="goods-list">
      <div class="item">
        名称: 
      </div>
      <ul class="goods-cont">
        <li class="" v-for="(item, index) in order.resOrderItemList" :key="index" >
          <div class="goods-item" @click="goGoods(item.channelId, item.goodsId)">
            <div class="goods-item-img">
              <figure class="img">
                <img :src="$init.imgIp + item.imageUrl" alt="">
              </figure>
            </div>
            <div class="goods-item-info">
              <h4>{{item.name}}</h4>
              <p>{{item.specification}}</p>
              <p>数量： {{item.quantity}}
                <span class="right">¥ {{item.price | moneyFormat}}</span>
              </p>
            </div>
          </div>
          <div class="goods-bottom" v-if="order.resOrderItemList.length == index+1">
            <span @click.stop="goEV" v-if="order.dataStatus == 4" class="blue">评价订单</span>
            <span @click.stop="goPay" v-if="order.dataStatus == 0" class="blue">去支付</span>
            <span @click.stop="cancelOrder" v-if="order.dataStatus == 0">取消订单</span>
            <span @click.stop="delOrder" v-if="order.dataStatus == 5 || order.dataStatus == 7">删除订单</span>
          </div>
        </li>
      </ul>
    </div>
    <!-- 商品列表结束 -->

    <ul class="list">
      <li class="item">
        <div class="item-left">
          创建日期: {{order.createTime | dateFormat}}
        </div>
        <div class="item-right">
        </div>
      </li>
      <li class="item">
        <div class="item-left">
          共计{{order.quantity}}件商品:
        </div>
        <div class="item-right">
          商品金额: <em class="on">¥ {{order.productPrice | moneyFormat}}</em>
        </div>
      </li>
      <li class="item">
        <div class="item-left">
          支付方式: {{order.paymentMethod | paymentMethodStr}}
        </div>
        <div class="item-right">
          配送金额: {{order.freight | moneyFormat}}
        </div>
      </li>
      <li class="item">
        <div class="item-left">
          应付金额
        </div>
        <div class="item-right">
          <em class="on">¥ {{order.orderAmount | moneyFormat}}</em>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'OrderDetails',
  data () {
    return {
      order: {}
    }
  },
  created () {
    this.getOrder()
  },
  methods: {
    // 获得订单信息
    getOrder () {
      let vm = this;
      this.$http.get('/panda-shop-api/wap/getOrder/' + this.$route.params.id).then(function (response) {
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
      this.$init.order = this.order;
      this.$router.push('/orderPay/'+this.order.id)
    },
    // 去评价
    goEV () {
      this.$init.order = this.order;
      this.$router.push('/orderEvaluate/'+this.order.id)
    },
    // 查看商品
    goGoods (channelId, id) {
      this.$router.push('/product/'+channelId+'/'+id)
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
      this.$http.get('/panda-shop-api/wap/cancelOrder/'+ this.order.id).then(function (response) {
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
  },
  filters: {
    // 时间格式化
    dateFormat (shijianchuo) {
      function add0(m){return m<10?'0'+m:m }
      var time = new Date(shijianchuo *1000);
      var y = time.getFullYear();
      var m = time.getMonth()+1;
      var d = time.getDate();
      var h = time.getHours();
      var mm = time.getMinutes();
      var s = time.getSeconds();
      return y+'-'+add0(m)+'-'+add0(d)+' '+add0(h)+':'+add0(mm)+':'+add0(s);
    },
    // 状态转字符串
    typeToStr (value) {
      // 状态（0：等待付款；1：等待审核；2：等待发货；3：已发货；4：已收货；5：已完成；6：已失败；7：已取消；8：已拒绝；）
      if(value == 0){
        return '等待付款'
      }else if(value == 1){
        return '等待审核'
      }else if(value == 2){
        return '等待发货'
      }else if(value == 3){
        return '已发货'
      }else if(value == 4){
        return '已收货'
      }else if(value == 5){
        return '已完成'
      }else if(value == 6){
        return '已失败'
      }else if(value == 7){
        return '已取消'
      }else if(value == 8){
        return '已拒绝'
      }else{
        return ''
      }
    },
    // 支付类型转字符串
    paymentMethodStr (value) {
      // 状态（1：中影现金卡支付；2：中影次卡支付；3：微信支付；4：中影现金卡微信补差支付；5：中影次卡微信补差支付；）
      if(value == 1){
        return '中影现金卡支付'
      }else if(value == 2){
        return '中影次卡支付'
      }else if(value == 3){
        return '微信支付'
      }else if(value == 4){
        return '中影现金卡微信补差支付'
      }else if(value == 5){
        return '中影次卡微信补差支付'
      }else{
        return ''
      }
    },
    // 金钱格式化
    moneyFormat (value) {
      if(value){
        return (value/ 100).toFixed(2)
      }else{
        return ''
      }
    },
  }
}
</script>

<style scoped>
.container{
  background-color: #f8f8f8;
  padding-top: 85px;
}
.top img{
  display: block;
  width: 100%;
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
  border-bottom: 1px solid #dddddd;
}
.item{
  border-top: 1px solid #dddddd;
  padding: 20px;
  line-height: 44px;
  font-size: 24px;
  color: #818181;
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
  border-top: 1px solid #dfdfdf;
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
.goods-item-img .img{
  display: block;
  height: 150px;
  width: 150px;
  overflow: hidden;
}
.goods-item-img .img img{
  display: block;
  height: 100%;
  width: 100%;
}
.goods-item-info{
  flex: 10;
  padding-left: 20px;
  font-size: 24px;
  line-height: 50px;
} 
.goods-bottom{
  padding: 10px 20px;
  line-height: 54px;
  border-top: 1px solid #dfdfdf;
  text-align: right;
}
.goods-bottom span{
  text-align: center;
  display: inline-block;
  padding: 0 20px;
  border: 1px solid #dfdfdf;
  border-radius: 6px;
  margin-left: 10px;
}
.goods-bottom .red{
  color: #ff4403;
  border-color: #ff4403;
}
.goods-bottom .blue{
  color: #00b202;
  border-color: #00b202;
}
</style>
