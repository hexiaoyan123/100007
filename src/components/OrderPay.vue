<template>
  <div class="container catr-cont">
    <header>
      订单结算
      <div class="class-back" @click="goBack">
        <van-icon name="arrow-left" />
      </div>
    </header>

    <!-- 地址开始 -->
    <div class="address" @click="goAdderssList">
      <div class="address-un" v-show="! adderss.areaName">
        <i class="iconfont on">&#xe639;</i>
        选择收货地址
      </div>
      <div class="address-on" v-show="adderss.areaName">
        <div class="address-on-left">
          <p>
            <strong>{{adderss.consignee}}</strong>
            <span>{{adderss.phone}}</span>
          </p>
          <p>{{adderss.areaName}} {{adderss.address}}</p>
        </div>
        <div class="address-on-right" v-show="adderss.isDefault == 1">
          <div class="address-on-btn">默认</div>
        </div>
      </div>
      <figure class="address-line">
        <img src="../assets/line.png" alt="">
      </figure>
    </div>
    <!-- 地址结束 -->
    
    <!-- 商品列表开始 -->
    <div class="goods-list">
      <ul class="goods-cont">
        <li class="goods-item" v-for="(item, index) in order.resOrderItemList" :key="index">
          <div class="goods-item-img">
            <figure class="img">
              <img :src="$init.imgIp + item.imageUrl" alt="">
            </figure>
          </div>
          <div class="goods-item-info">
            <h4>{{item.name}}</h4>
            <div class="goods-item-info-spec">
              {{item.specification}}
            </div>
            <div class="goods-item-info-cont">
              <div class="on goods-item-info-cont-left">
                ¥ {{item.price | moneyFormat}}
              </div>
              <div class="goods-item-info-cont-btn">
                x {{item.quantity}}
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <!-- 商品列表结束 -->

    <div class="supplement">
      <van-cell-group>
        <!-- <van-cell title="支付方式" is-link value="请选择"/> -->
        <van-cell title="配送方式" is-link v-show="shippingMethod.on == {}" value="请选择"  @click="shippingMethod.show = true"/>
        <van-cell title="配送方式" is-link v-show="shippingMethod.on != {}" :value="shippingMethod.on.name"  @click="shippingMethod.show = true"/>
      </van-cell-group>
      <van-cell-group>
        <van-field v-model="value" placeholder="留言" />
      </van-cell-group>
    </div>

    <div class="supplement">
      <van-cell-group>
        <van-cell title="商品金额" :value="priceGoods | moneyFormat" />
      </van-cell-group>
      <van-cell-group>
        <van-cell title="运费" v-if="shippingMethod.onId" :value="shippingMethod.price | moneyFormat" />
        <van-cell title="运费" v-if="! shippingMethod.onId" value="请选择配送方式" />
      </van-cell-group>
    </div>
    
    <!-- 购物车控制开始 -->
    <div class="fix-bar">
      <div class="fix-bar-left">
        <div class="fix-bar-info">
          <div class="fix-bar-info-maney">
            <em class="on">¥ {{price | moneyFormat}}</em>
          </div>
        </div>
      </div>
      <div class="fix-bar-right" @click="goNext">
        结算 <small v-if="order.resOrderItemList">({{order.resOrderItemList.length}}件)</small>
      </div>
    </div>
    <!-- 购物车控制结束 -->

    <!-- 选择支付方式开始 -->
    <van-actionsheet v-model="shippingMethod.show" title="">
      <div class="choice-cont">
        <van-cell-group>
          <van-cell v-for="(item, index) in shippingMethod.list" :key="index" @click="checkMethod(item)" :title="item.name" :value="item.defaultFirstPrice | moneyFormat" :label="item.description" />
        </van-cell-group>
      </div>
    </van-actionsheet>
    <!-- 选择支付方式结束 -->


  </div>
</template>

<script>
export default {
  name: 'Cart',
  components: {
    
  },
  data () {
    return {
      value: '', // 留言
      // 弹出层
      popup: false,
      // 订单
      order: {
        id: '', // 订单ID
        goods: [], // 商品列表
      },
      // 地址
      adderss: {},
      // 配送方式
      shippingMethod: {
        list: [], // 配送列表
        on: {},
        onId: '', // 选中配送方式ID
        show: false,
        weigt: 0, // 重量
        price: 0, // 配送价格
      },
      price: 0, // 计算出总价格
      priceGoods: 0, // 商品总金额
    }
  },
  created () {
    this.getOrder();
    this.getAddress();
    this.getListShippingMethod();
  },
  methods: {
    // 结算
    goNext () {
      if(! this.adderss.areaName){
        this.$toast('请选择地址')
        return false;
      }else if(! this.shippingMethod.onId){
        this.$toast('请选择配送方式')
        return false;
      }
      let vm = this
      let postData = {
        "orderId": this.$route.params.id, // 订单ID
        "receiverId": this.adderss.id, // 地址ID
        "shippingMethodId":  this.shippingMethod.onId, // 配送方式ID
        "remark": this.value // 留言
      }
      this.$http.post('/panda-shop-api/wap/updateOrder', postData).then(function (response) {
        if(response.data.code == '1000'){
          vm.$router.push('/orderPayCheck/'+vm.$route.params.id)
        }else{
          vm.$toast(response.data.msg)
        }
      })
      .catch(function (error) {
        vm.$toast('请求超时，请稍后再试！')
      });
    },
    // 计算价格
    calculation (){
      let price = 0;
      this.order.resOrderItemList.forEach((e, i) => {
        price += (e.quantity * e.price)
      })
      // price += this.shippingMethod.price;
      this.priceGoods = price;
      this.price = this.priceGoods + this.shippingMethod.price;
    },
    // 选择配送方式
    checkMethod (obj) {
      let vm = this;
      this.shippingMethod.on = obj;
      this.shippingMethod.show = false;
      this.$http.get('/panda-shop-api/wap/calculateFreight/'+obj.id + '/' + this.order.id).then(function (response) {
        if(response.data.code == '1000'){
          vm.shippingMethod.weigt = response.data.result.weigt;
          vm.shippingMethod.price = response.data.result.price;
          vm.shippingMethod.onId = obj.id;
          vm.calculation()
        }else{
          vm.$toast(response.data.msg)
        }
      })
      .catch(function (error) {
        vm.$toast('请求超时，请稍后再试！')
      });
    },
    // 获取配送方式
    getListShippingMethod () {
      let vm = this;
      this.$http.get('/panda-shop-api/wap/listShippingMethod').then(function (response) {
        if(response.data.code == '1000'){
          vm.shippingMethod.list = response.data.result;
        }else{
          vm.$toast(response.data.msg)
        }
      })
      .catch(function (error) {
        vm.$toast('请求超时，请稍后再试！')
      });
    },
    // 选择地址
    goAdderssList () {
      this.$router.push('/addressList')
    },
    // 获得地址信息
    getAddress () {
      let vm = this;
      if(this.$init.checkAddress){
        this.adderss = this.$init.checkAddress.more;
      }else if(this.$init.defaultAdderss){
        this.adderss = this.$init.defaultAdderss;
      }else if(window.sessionStorage.getItem('defaultAdderss')){
        this.adderss = JSON.parse(window.sessionStorage.getItem('defaultAdderss'))
      }else{
        this.$http.get('/panda-shop-api/wap/listReceiver').then(function (response) {
          if(response.data.code == '1000'){
            if(response.data.result && response.data.result.length > 0){
              response.data.result.forEach((e, i) => {
                if(e.isDefault == 1){
                  vm.adderss = e;
                }
              })
              if(vm.adderss == {}){
                vm.adderss = response.data.result[0]
              }
              vm.$init.defaultAdderss = vm.adderss;
              window.sessionStorage.setItem('defaultAdderss', JSON.stringify(vm.adderss))
            }
          }else{
            vm.$toast(response.data.msg)
          }
        })
        .catch(function (error) {
          vm.$toast('请求超时，请稍后再试！')
        });
      }
    },
    // 获得订单信息
    getOrder () {
      let vm = this;
      this.$http.get('/panda-shop-api/wap/getOrder/' + this.$route.params.id).then(function (response) {
        if(response.data.code == '1000'){
          vm.order = response.data.result;
          vm.calculation()
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
  },
  filters: {
    // 金钱格式化
    moneyFormat (value) {
      if(value){
        return (value/ 100).toFixed(2)
      }else{
        return ''
      }
    }
  }
}
</script>

<style scoped>
.catr-cont{
  padding-bottom: 102px;
  background-color: #f8f8f8;
}
header{
  width: 100%;
  font-size: 28px;
  color: #4d4d4d;
  line-height: 84px;
  text-align: center;
  border-bottom: 1px solid #dfdfdf;
  background-color: #fff;
}
.class-back{
  position: absolute;
  width: 80px;
  height: 80px;
  line-height: 92px;
  top: 0;
  left: 0;
  text-align: center;
  font-size: 28px;
}

/* 购物车控制条 */
.fix-bar{
  position: fixed;
  bottom: 0;
  left: 0;
  height: 100px;
  width: 100%;
  background-color: #fff;
  display: flex;
  font-size: 28px;
  border-top: 1px solid #dfdfdf;
}
.fix-bar-right{
  height: 100%;
  line-height: 100px;
  color: #fff;
  background-color: #00a8ec;
  text-align: center;
  width: 220px;
  font-weight: 700;
  font-size: 32px;
}
.fix-bar-right small{
  font-size: 20px;
  font-weight: 500;
}
.fix-bar-left{
  flex: 10;
  display: flex;
}
.fix-bar-choice{
  width: 100px;
  text-align: center;
  height: 100px;
  line-height: 60px;
}
.fix-bar-choice-title{
  line-height: 30px;
  font-size: 22px;
}
.fix-bar-info{
  flex: 10;
  line-height: 100px;
}
.fix-bar-info-maney{
  padding-right: 20px;
  padding-left: 20px;
  font-size: 32px;
  font-weight: 700;
}
.fix-bar-info-maney .on{
  font-weight: 700;
}

/* 商品列表 */
.goods-list{
  margin-bottom: 20px;
  background-color: #fff;
}
.business-name{
  line-height: 44px;
  padding: 20px 20px 20px 90px;
  position: relative;
  font-size: 32px;
  font-weight: 700;
}
.business-name-choice{
  position: absolute;
  left: 20px;
  top: 17px;
}
.business-name .iconfont{
  font-size: 32px;
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
}
.goods-item-img .img img{
  display: block;
  height: 100%;
  width: 100%;
}
.goods-item-info{
  flex: 10;
  padding-left: 20px;
}
.goods-item-info h4{
  color: #4d4d4d;
  font-size: 24px;
  line-height: 45px;
}
.goods-item-info-spec{
color: #818181;
font-size: 24px;
line-height: 45px;
}
.goods-item-info-cont{
  display: flex;
}
.goods-item-info-cont-left{
  flex: 8;
  line-height: 60px;
  font-size: 28px;
}
.goods-item-info-cont-btn{
  display: flex;
  border-radius: 8px;
  overflow: hidden;
  line-height: 60px;
  font-size: 28px;
}
.goods-item-info-cont-btn .btn {
  height: 60px;
  /* line-height: 50px; */
  width: 60px;
  text-align: center;
  font-size: 32px;
  background-color: #f7f7f7;
}
.goods-item-info-cont-btn .iconfont{
  font-size: 28px;
  line-height: 60px;
}
.goods-item-info-cont-btn-info{
  line-height: 60px;
  width: 90px;
  text-align: center;
  font-size: 28px;
  margin: 0 2px;
  background-color: #f7f7f7;
}

/* 地址选择 */
.address{
  margin-bottom: 20px;
}
.address-line{
  display: block;
  width: 100%;
}
.address-line img{
  display: block;
  width: 100%;
}
.address-un{
  height: 120px;
  box-sizing: border-box;
  background-color: #fff;
  text-align: center;
  font-size: 28px;
  line-height: 120px;
}
.address-un .iconfont{
  font-size: 28px;
}
.address-on{
  padding: 20px;
  box-sizing: border-box;
  background-color: #fff;
  font-size: 24px;
  color: #818181;
  line-height: 48px;
  display: flex;
}
.address-on strong{
  font-size: 28px;
  color: #4d4d4d;
}
.address-on-left{
  flex: 10;
}
.address-on-right{
  padding-top: 18px;
}
.address-on-btn{
  height: 60px;
  line-height: 60px;
  border-radius: 4px;
  width: 100px;
  color: #fff;
  text-align: center;
  background-color: #ff9900;
}
.supplement{
  margin-bottom: 20px;
}
</style>

<style>
.van-radio .van-icon-checked{
  color: #00a8ec;
}
.van-field__control{
  font-size: 14px;
}
</style>
