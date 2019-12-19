<template>
  <div class="container address-list">
    <header>
      我的卡券
      <div class="class-back" @click="goBack">
        <van-icon name="arrow-left" />
      </div>
    </header>
    
    <div class="card">

      <div class="card-add" @click="goPath('/cardBinding')">
        <van-icon name="add-o" class="on" />
        <span>添加卡券</span>
      </div> 

      <ul class="card-list">
        <li class="card-item" v-for="(item, index) in list" :key="index" @click="goInfo(item)">
          <div class="card-item-top">
            {{item.payType | typeToStr}}
            <!-- <div class="card-item-ctrl">
              <span class="card-item-ctrl-btn">流水</span>
              <span class="card-item-ctrl-btn">充值</span>
            </div> -->
          </div>
          <div class="card-item-bottom">{{item.voucher}}</div>
          <div class="card-item-left"></div>
          <div class="card-item-right"></div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardMy',
  components: {
    
  },
  data () {
    return {
      list: [],
    }
  },
  created () {
    this.getListUserVoucher();
  },
  methods: {
    // 获得我的卡券
    getListUserVoucher () {
      let vm = this;
      this.$http.get('/panda-payment-api/wap/listUserVoucher/0').then(function (response) {
        if(response.data.code == '1000'){
          vm.list = response.data.result;
        }else{
          vm.$toast(response.data.msg)
        }
      })
      .catch(function (error) {
        vm.$toast('请求超时，请稍后再试！')
      });
    },
    // 跳转路径
    goPath (path) {
      this.$router.push(path)
    },
    // 返回上一页
    goBack () {
      this.$router.back(-1);
    },
    // 查看卡券信息
    goInfo (obj) {
      this.$init.nowCard = obj;
      window.sessionStorage.setItem('nowCard', JSON.stringify(obj))
      this.$router.push('/cardInfo?actionType=del')
    },
  },
  filters: {
    // 凭证类型转字符串
    typeToStr (value) {
      if(value == 1){
        return '现金卡'
      }else if(value == 2){
        return '点卡'
      }else if(value == 3){
        return '次卡'
      }else if(value == 4){
        return '通兑票'
      }else if(value == 5){
        return '现金券'
      }else if(value == 6){
        return '兑换券'
      }else if(value == 7){
        return '点券'
      }else{
        return ''
      }
    },
  }
}
</script>

<style scoped>
/* 头 */
header{
  /* position: absolute; */
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  font-size: 28px;
  color: #fff;
  line-height: 84px;
  text-align: center;
  border-bottom: 1px solid #dfdfdf;
  background-color: #00a8ec;
  z-index: 101;
}
.address-list{
  padding-top: 105px;
  background-color: #f8f8f8;
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
  color: #fff;
}

.card-add{
  background-color: #fff;
  border-bottom: 1px solid #dfdfdf;
  border-top: 1px solid #dfdfdf;
  padding: 0 35px;
}
.card-add span{
  color: #bababa;
  font-size: 28px;
  line-height: 76px;
}
.card-list{
  padding: 35px;
}
.card-item{
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 20px;
}
.card-item-top{
  height: 90px;
  font-size: 28px;
  line-height: 90px;
  padding: 0 40px; 
  color: #fff;
  position: relative;
  background: rgba(0, 170, 238, 0.8); /* For browsers that do not support gradients */  
  background: -webkit-linear-gradient(left top, rgba(0, 170, 238, 0.8), rgba(0, 170, 238, 0.8)); /* For Safari 5.1 to 6.0 */  
  background: -o-linear-gradient(bottom right, rgba(0, 170, 238, 0.8), rgba(0, 170, 238, 0.8)); /* For Opera 11.1 to 12.0 */  
  background: -moz-linear-gradient(bottom right, rgba(0, 170, 238, 0.8), rgba(0, 170, 238, 0.8)); /* For Firefox 3.6 to 15 */  
  background: linear-gradient(to bottom right, rgba(0, 170, 238, 0.8), rgba(0, 170, 238, 0.8)); /* Standard syntax */  
}
.card-item-bottom{
  height: 186px;
  line-height: 186px;
  background-color: #fff;
  color: #4d4d4d;
  text-align: center;
  font-size: 32px;
}
.card-item-left,
.card-item-right{
  height: 30px;
  width: 30px;
  position: absolute;
  top: 75px;
  border-radius: 50%;
  background-color: #f8f8f8;
}
.card-item-left{
  left: -15px;
}
.card-item-right{
  right: -15px;
}
.card-item-ctrl{
  position: absolute;
  top: 0px;
  right: 20px;
}
.card-item-ctrl-btn{
  display: inline-block;
  border: 1px solid #fff;
  padding: 0 20px;
  border-radius: 6px;
  line-height: 60px;
  height: 60px;
  margin-left: 20px;
}
</style>
 