<template>
  <div class="ordercont">
    <!-- 商品列表开始 -->
    <div class="goods-list">
      <!-- <div class="business-name">
        <span class="business-name-left">手机数码旗舰店</span>
        <span class="business-name-right">订单已取消</span>
      </div> -->
      <ul class="goods-cont">
        <li class="" v-for="(item, index) in list" :key="index">
          <div class="goods-item">
            <div class="goods-item-img">
              <img src="https://www.apple.com/cn/home/images/promos/watch_series_3_large.jpg" alt="">
            </div>
            <div class="goods-item-info">
              <h4>商品简介</h4>
              <p>2018-08-21 12:00</p>
              <p>数量： 1</p>
            </div>
          </div>
          <div class="goods-bottom">
            <span class="red">去支付</span>
            <span class="blue">去支付</span>
            <span>去支付</span>
          </div>
        </li>
      </ul>
    </div>
    <!-- 商品列表结束 -->

  </div>
</template>

<script>
export default {
  name: 'OrderListItem',
  components: {
    
  },
  data () {
    return {
      list: [],
      pageNum: 1,
    }
  },
  created () {
    this.getOrder(true);
  },
  methods: {
    // 获得订单列表
    getOrder (clear) {
      // 页码处理
      if(clear){
        this.list  =[];
        this.pageNum = 1;
      }else{
        this.pageNum += 1;
      }
      let vm = this;
      let postData = {}
      this.$http.post('/panda-shop-api/wap/pageOrder/'+ this.pageNum +'/20', postData).then(function (response) {
        if(response.data.code == '1000'){
          vm.list = vm.list.concat(response.data.result.list);
        }else{
          vm.$toast(response.data.msg)
        }
      })
      .catch(function (error) {
        vm.$toast('请求超时，请稍后再试！')
      });
    }
  },
  filters: {
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
    }
  }
}
</script>

<style scoped>

/* 商品列表 */
.goods-list{
  margin-top: 20px;
  background-color: #fff;
}
.business-name{
  line-height: 36px;
  padding: 20px 20px 20px 20px;
  position: relative;
  font-size: 28px;
  font-weight: 500;
  display: flex;
}
.business-name-left{
  flex: 6;
}
.business-name-right{
  font-size: 24px;
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

