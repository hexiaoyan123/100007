<template>
  <div class="container">
    <!-- 头部开始 -->
    <header>
      <div class="header-back" @click="goBack">
        <van-icon name="arrow-left" />
      </div>
      <div class="header-cont">
        个人信息
      </div>
      <div class="header-more">
        <!-- <i class="iconfont">&#xe60a;</i> -->
      </div>
    </header>
    <!-- 头部结束 -->

    <input type="file" id="file" style="display: none;" @change="upGo">

    <van-cell-group>
      <van-cell title="头像">
        <div class="user-img-cont" @click="clickFile">
          <figure class="user-img">
            <img :src="$init.imgIp + imageUrl" alt="">
          </figure>
          <van-icon class="user-img-sel" name="arrow" />
        </div>
      </van-cell>
      <van-field label="手机号" v-model="phone" placeholder="请输入手机号" />
      <van-field label="昵称" v-model="nickname" placeholder="请输入用户名" />
    </van-cell-group>

    <div class="user-btn-cont">
      <div class="user-btn" @click="updateUser">修改</div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'UserUpdata',
  data () {
    return {
      phone: this.$init.user.phone,
      nickname: this.$init.user.nickname,
      imageUrl: this.$init.user.imageUrl,
    }
  },
  created () {
    this.phone = this.$init.user.phone;
    this.nickname = this.$init.user.nickname;
    this.imageUrl = this.$init.user.imageUrl;
  },
  methods: {
    // 打开上传文件
    clickFile () {
      document.getElementById("file").click()
    },
    // 上传图片
    upGo () {
      let vm = this;
      var file = document.getElementById("file").files[0];
      if(!/image\/\w+/.test(file.type)){  
        hint('请求超时，请稍后再试！');
        return false;  
      } 
      var param = new FormData(); 
      param.append('file', file, file.name);
      this.$http.post('/panda-common-resource/resource/uploadImage', param).then(function (response) {
        if(response.data.code == '1000'){
          vm.imageUrl = response.data.result.fileUrl;
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
    // 验证手机号
    isPhone (str) {
      var myreg=/^[1][2,3,4,5,7,8,9][0-9]{9}$/;  
      if (!myreg.test(str)) {  
        return false;  
      } else {  
        return true;  
      }
    },
    // 更新用户信息
    updateUser () {
      console.log(this.$init.user)
      let vm = this;
      let postData = {
        id: this.$init.user.id,
        phone: this.phone,
        nickname:  this.nickname,
        imageUrl:  this.imageUrl,
      }
      if(! postData.phone){
        this.$toast('请输入手机号')
        return;
      }else if(! postData.nickname){
        this.$toast('请输入昵称')
        return;
      }else if(! postData.imageUrl){
        this.$toast('请上传用户头像')
        return;
      }else if(! this.isPhone(postData.phone)){
        this.$toast('手机号格式错误')
        return;
      }
      this.$http.post('/panda-common-oauth/oauth2/updateUser', postData).then(function (response) {
        if(response.data.code == '1000'){
          let user = vm.$init.user;
          user.phone = postData.phone;
          user.nickname = postData.nickname;
          user.imageUrl = postData.imageUrl;
          vm.$init.user = user;
          vm.$cookies.set('user', JSON.stringify(user), '30d')
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
  background-color: #00a8ec;
  color: #fff;
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
.user-img{
  display: inline-block;
  height: 100px;
  width: 100px;
  border-radius: 50%;
  background-color: #f8f8f8;
  overflow: hidden;
}
.user-img img{
  display: inline-block;
  height: 100%;
  width: 100%;
}
.user-img-cont{
  position: relative;
  padding-right: 40px;
}
.user-img-sel{
  position: absolute;
  top: 40px;
  right: 0;
}
.user-btn-cont{
  padding: 40px 20px 20px 20px;
}
.user-btn{
  line-height: 80px;
  text-align: center;
  font-size: 32px;
  color: #fff;
  background-color: #00a8ec;
  border-radius: 6px;
}
</style>
<style>
.van-field__control{
  height: 24px;
  font-size: 12px;
  line-height: 24px;
  text-align: right;
}
</style>

