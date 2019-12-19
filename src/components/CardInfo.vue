<template>
  <div class="container address-list">
    <header>
      卡券详情
      <div class="class-back" @click="goBack">
        <van-icon name="arrow-left" />
      </div>
    </header>
    
    <div class="card">

      <ul class="card-list">
        <li class="card-item">
          <div class="card-item-top">
            <p>卡号: {{info.voucher}}</p>
            <p>类型: {{info.payTypeName}}</p>
            <p>有效期: {{info.expDate}}
              <span class="btn" v-if="actionType == 'del'" @click="delUserVoucher">删除卡券</span>
              <span class="btn" v-if="actionType == 'binding'" @click="saveUserVoucher">绑定卡券</span>
              <span class="btn" v-if="actionType == 'recharge'" @click="goPath('/cardFlow/'+info.voucher)">流水</span>
              <span class="btn" v-if="actionType == 'recharge'" @click="goPath('/cardRechargeMoney/'+info.voucher)">充值</span>
            </p>
          </div>
          <div class="card-item-bottom">余额: {{info.balance}}</div>
          <div class="card-item-left"></div>
          <div class="card-item-right"></div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardQuery',
  components: {
    
  },
  data () {
    return {
      info: {},
      actionType: this.$route.query.actionType
    }
  },
  created () {
    if(! this.$init.nowCard){
      this.$init.nowCard = JSON.parse(window.sessionStorage.getItem('nowCard'));
    }
    this.getInfo();
  },
  methods: {
    // 跳转
    goPath (path) {
      this.$router.push(path)
    },
    // 获得卡券详情
    getInfo () {
      let vm = this;
      let postData = {
        "voucher": this.$init.nowCard.voucher,
        "voucherPassword": this.$init.nowCard.voucherPassword
      }
      this.$http.post('/panda-payment-api/wap/getVoucher', postData).then(function (response) {
        if(response.data.code == '1000'){
          vm.info = response.data.result;
          vm.$init.cardRecharge = response.data.result;
          window.sessionStorage.setItem('cardRecharge', JSON.stringify(vm.$init.cardRecharge));
        }else{
          vm.$toast(response.data.msg)
        }
      })
      .catch(function (error) {
        vm.$toast('请求超时，请稍后再试！')
      });
    },
    // 绑定卡券
    saveUserVoucher () {
      let vm = this;
      let postData = {
        "voucher": this.$init.nowCard.voucher,
        "voucherPassword": this.$init.nowCard.voucherPassword
      }
      this.$http.post('/panda-payment-api/wap/saveUserVoucher', postData).then(function (response) {
        if(response.data.code == '1000'){
          vm.$toast('绑定成功');
          vm.goBack()
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
    // 删除卡券
    delUserVoucher () {
      let vm = this;
      this.$http.get('/panda-payment-api/wap/delUserVoucher/'+this.$init.nowCard.voucher).then(function (response) {
        if(response.data.code == '1000'){
          vm.$toast('删除成功');
          vm.goBack()
        }else{
          vm.$toast(response.data.msg)
        }
      })
      .catch(function (error) {
        vm.$toast('请求超时，请稍后再试！')
      });
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
  padding-top: 85px;
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
  color: #fff;
  font-size: 24px;
  background: rgba(0, 170, 238, 0.8); /* For browsers that do not support gradients */  
  background: -webkit-linear-gradient(left top, rgba(0, 170, 238, 0.8), rgba(0, 170, 238, 0.8)); /* For Safari 5.1 to 6.0 */  
  background: -o-linear-gradient(bottom right, rgba(0, 170, 238, 0.8), rgba(0, 170, 238, 0.8)); /* For Opera 11.1 to 12.0 */  
  background: -moz-linear-gradient(bottom right, rgba(0, 170, 238, 0.8), rgba(0, 170, 238, 0.8)); /* For Firefox 3.6 to 15 */  
  background: linear-gradient(to bottom right,rgba(0, 170, 238, 0.8),rgba(0, 170, 238, 0.8)); /* Standard syntax */ 
}
.card-item-top{
  color: #fff;
  padding: 30px 35px;
}
.card-item-top p{
  padding: 12px;
  line-height: 54px;
}
.card-item-bottom{
  height: 90px;
  line-height: 90px;
  padding: 0 35px;
  border-top: 1px dashed #ffffff;
}
.card-item-left,
.card-item-right{
  height: 30px;
  width: 30px;
  position: absolute;
  bottom: 75px;
  border-radius: 50%;
  background-color: #f8f8f8;
}
.card-item-left{
  left: -15px;
}
.card-item-right{
  right: -15px;
}
.btn{
  display: block;
  float: right;
  width: 150px;
  height: 50px;
  line-height: 50px;
  border-radius: 25px;
  text-align: center;
  border: 1px solid #ffffff;
}
</style>
 