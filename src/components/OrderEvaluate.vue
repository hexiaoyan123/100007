<template>
  <div class="container address-list">
    <header>
      <div class="header-back" @click="goBack">
        <van-icon name="arrow-left" />
      </div>
      <div class="header-cont">
        评价
      </div>
      <div class="header-more">
        <!-- <i class="iconfont">&#xe60a;</i> -->
      </div>
    </header>

    <!-- 商品列表开始 -->
    <div class="goods-list">
      <ul class="goods-cont">
        <li class="" v-for="(item, index) in goods" :key="index" >
          <div class="goods-item">
            <div class="goods-item-img">
              <figure class="img">
                <img :src="$init.imgIp + item.imageUrl" alt="">
              </figure>
            </div>
            <div class="goods-item-info">
              <h4>{{item.name}}</h4>
              <div>
                <van-rate :size="25" v-model="score" />
              </div>
            </div>
          </div>
          <div class="goods-bottom">
            共 {{order.quantity}} 件
          </div>
        </li>
      </ul>
    </div>
    <!-- 商品列表结束 -->

    <div class="form-out">
      <h3>评价:</h3>
      <textarea  rows="3" maxlength="100" v-model="content"></textarea>
    </div>

    <div class="btn-out">
      <span class="btn-in" :class="{'btn-in-on': score != ''}" @click="onSave">提交评价</span>
    </div>

  </div>
</template>

<script>
export default {
  name: 'AddressAdd',
  data () {
    return {
      order: {},
      goods: [],
      score: 5, // 评分
      content: '', // 评价
    }
  },
  created () {
    this.getOrder();
  },
  methods: {
    // 获得订单信息
    getOrder () {
      let vm = this;
      this.$http.get('/panda-shop-api/wap/getOrder/' + this.$route.params.id).then(function (response) {
        if(response.data.code == '1000'){
          vm.order = response.data.result;
          vm.goods.push(vm.order.resOrderItemList[0])
        }else{
          vm.$toast(response.data.msg)
        }
      })
      .catch(function (error) {
        vm.$toast('请求超时，请稍后再试！')
      });
    },
    // 保存
    onSave() {
      let vm = this;
      // 请求参数
      var postData = {
        "goodsId": vm.goods[0].goodsId,
        "score": vm.score,
        "content": vm.content
      }
      var httpUrl = '/panda-shop-api/wap/saveReview'; // 请求地址
      this.$http.post(httpUrl, postData).then(function (response) {
        if(response.data.code == '1000'){
          vm.$router.back(-1);
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
  margin-bottom: 20px;
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
.form-out{
  border: none;
  box-sizing: border-box;
  background-color: #fff;
}
.form-out h3{
  border-bottom: 1px solid #dfdfdf;
  line-height: 60px;
  padding: 0 20px;
}
.form-out textarea{
  display: block;
  border: none;
  width: 100%;
  font-size: 24px;
  padding: 20px;
  box-sizing: border-box;
}
.btn-out{
  box-sizing: border-box;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 20px;
}
.btn-in{
  display: block;
  line-height: 66px;
  background-color: #4d4d4d;
  color: #fff;
  text-align: center;
  font-size: 28px;
}
.btn-out .btn-in-on{
  background-color: #00a8ec;
}
</style>
