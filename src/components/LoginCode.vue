<template>
  <div class="login">
    <router-link to="/index">
      <van-icon class="out" name="arrow-left" />
    </router-link>
    <figure class="logo">
      <img alt="图" title="图" src="../assets/logo.png">
    </figure>
    <div class="cont">
        <div class="form-cont">
            <div class="form-grop">
                <label class="form-lable">
                  
                </label>
                <input class="form-input" type="number" v-model.trim="form.phone" placeholder="请输入手机号码">
                <div class="form-more">
                    <van-icon name="close" v-show="form.phone" @click="form.phone = ''"/>
                </div>
            </div>
            <div class="form-grop">
                <label class="form-lable"></label>
                <input class="form-input" type="text" v-model.trim="form.code" placeholder="请输入验证码">
                <div class="form-more">
                  <span v-show="codeNum == 60" @click="getCode" class="red">获取验证码</span>
                  <span v-show="codeNum < 60" class="red">{{codeNum}}秒</span>
                </div>
            </div>
        </div>
        <div class="form-btn" @click="upData">登录</div>
        <div class="form-link">
          <div class="form-link-left">
            <router-link to="/loginPassword">账户密码登录</router-link>
          </div>
          <div class="form-link-right">
            <router-link to="/register">注册</router-link>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginCode',
  data () {
    return {
      form: {
        phone: '',
        code: ''
      },
      codeNum: 60, // 验证码倒计时
    }
  },
  methods: {
    // 提交数据
    upData () {
      let vm = this;
      if(this.form.phone + '' == ''){
          this.$toast('请输入手机号码')
          return false;
      }else if(! this.isPhone(this.form.phone + '')){
          this.$toast('手机号码格式错误')
          return false;
      }else if(this.form.code == ''){
        this.$toast('请输入验证码')
        return false;
      }
      let postData = {
        "grantType": "phone_auth",
        "appId": this.$init.appId,
        "appSecret": this.$init.appSecret,
        "phone": this.form.phone,
        "authCode": this.form.code
      }
      this.$http.post('/panda-common-oauth/oauth2/token', postData).then(function (response) {
          if(response.data.code == '1000'){
              const user = {
                phone: vm.form.phone,
                accessToken: response.data.result.accessToken,
                refreshToken: response.data.result.refreshToken,
                token: response.data.result.accessToken
              }
              vm.$init.user = user;
              vm.$cookies.set('user', JSON.stringify(user), '30d')
              vm.$cookies.set('sccessToken', response.data.result.accessToken, '100MIN')
              vm.getUserInfo();
          }else{
              vm.$toast(response.data.msg)
          }
      })
      .catch(function (error) {
          vm.$toast('请求超时，请稍后再试！')
      });
    },
    // 获得用户信息
    getUserInfo () {
      let vm = this;
      this.$axios({
        method: 'get',
        url: this.$init.ip + '/panda-common-oauth/oauth2/getUser',
        headers: {
          'Access-Token': this.$init.user.token
        }
      }).then(function (response) {
        if(response.data.code == '1000'){
          for(let key in response.data.result){
            vm.$init.user[key] = response.data.result[key]
          }
          vm.$cookies.set('user', JSON.stringify(vm.$init.user), '30d')
          vm.$router.push('/');
        }else{
          vm.$toast(response.data.msg)
        }
      })
      .catch(function (error) {
        vm.$toast('请求超时，请稍后再试！')
      });
    },
    // 获得验证码
    getCode () {
      if(this.isPhone(this.form.phone + '')){
          if(this.form.phone + '' == ''){
              this.$toast('请输入手机号');
              return false;
          }else if(! this.isPhone(this.form.phone + '')){
              this.$toast('手机号格式错误');
              return false;
          }
          let postData = {
              "authCodeType":"phone_auth_code",
              "appId": this.$init.appId,
              "appSecret": this.$init.appSecret,
              "authType": 2,
              "phone": this.form.phone
          }
          // 这里写请求
          let vm = this;
          this.$http.post('/panda-common-oauth/oauth2/authCode', postData).then(function (response) {
              if(response.data.code == '1000'){
                  vm.countDown();
              }else{
                  vm.$toast(response.data.msg)
              }
          })
          .catch(function (error) {
              vm.$toast('请求超时，请稍后再试！')
          });
      }else if(this.form.phone + '' == ''){
          this.$toast('请输入手机号码')
      }else{
          this.$toast('手机号码格式错误')
      }
    },
    // 倒计时
    countDown () {
        let vm = this;
        vm.codeNum = 59;
        function numDown () {
            if(vm.codeNum > 1){
                vm.codeNum = vm.codeNum -1;
            }else{
                vm.codeNum = 60;
                window.clearInterval(int)
                return false;
            }
        }
        var int = setInterval(numDown, 1000)
    },
    // 验证手机号
    isPhone (str) {
      var myreg=/^[1][2,3,4,5,7,8,9][0-9]{9}$/;  
      if (!myreg.test(str)) {  
        return false;  
      } else {  
        return true;  
      }
    }
  }
}
</script>

<style scoped>
.login{
  padding-top: 130px;
  position: relative;
}
.logo{
  display: block;
  width: 230px;
  margin: 0 auto;
}
.logo img{
  display: block;
  width: 100%;
}
.cont{
  padding: 75px;
}
.form-grop{
    display: flex;
    border-bottom: 1px solid #e990bc;
    font-size: 28px;
    line-height: 66px;
    margin-bottom: 42px;
}
.form-input{
    flex: 10;
    border: none;
    outline: none;
    font-size: 28px;
    line-height: 66px;
}
.van-icon{
    display: inline-block;
    padding: 0 5px;
}
.form-btn{
    color: #fff;
    line-height: 80px;
    font-size: 28px;
    text-align: center;
    border-radius: 40px;
    background-color: #00a8ec;
}
.form-cont{
    padding-bottom: 30px;
}
.form-link{
  line-height: 80px;
  padding-top: 30px;
  color: #818181;
}
.form-link a{
  color: #818181;
  font-size: 28px;
}
.form-link-left{
  float: left;
}
.form-link-right{
  float: right;
}
.out{
  position: absolute;
  font-size: 32px;
  color: #818181;
  top: 30px;
  left: 30px;
}
</style>
