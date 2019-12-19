<template>
  <div class="container">
    <!-- 头部开始 -->
    <header>
      <div class="header-back" @click="goBack">
        <van-icon name="arrow-left" />
      </div>
      <div class="header-cont">
        个人中心
      </div>
      <div class="header-more">
        <!-- <i class="iconfont">&#xe60a;</i> -->
      </div>
    </header>
    <!-- 头部结束 -->

    <ul class="list">
      <li class="role" @click="goPath('/userUpdata')">
        <div class="role-img">
          <figure class="img">
            <img :src="userImg" alt="">
          </figure>
        </div>
        <div class="role-name">
          {{$init.user.nickname}}
        </div>
        <div class="role-right">
          <van-icon name="arrow" />
        </div>
      </li>
      <li class="item" @click="goPath('/orderList')">
        <div class="item-left">
          <i class="iconfont on">&#xe601;</i>
          我的订单
        </div>
        <div class="item-right">
          <van-icon name="arrow" />
        </div>
      </li>
      <!-- <li class="item" @click="goPath('/cardMy')">
        <div class="item-left">
          <i class="iconfont on">&#xe607;</i>
          我的卡券
        </div>
        <div class="item-right">
          <van-icon name="arrow" />
        </div>
      </li> -->
      <!-- <li class="item" @click="goPath('/cardSearch?actionType=binding')">
        <div class="item-left">
          <i class="iconfont on">&#xe6f6;</i>
          卡券查询
        </div>
        <div class="item-right">
          <van-icon name="arrow" />
        </div>
      </li> -->
      <!-- <li class="item" @click="goPath('/cardMerge')">
        <div class="item-left">
          <i class="iconfont on">&#xe60b;</i>
          卡券合并
        </div>
        <div class="item-right">
          <van-icon name="arrow" />
        </div>
      </li> -->
      <!-- <li class="item" @click="goPath('/cardSearch?actionType=recharge')">
        <div class="item-left">
          <i class="iconfont on">&#xe6f8;</i>
          卡券充值
        </div>
        <div class="item-right">
          <van-icon name="arrow" />
        </div>
      </li> -->
      <!-- <li class="item" @click="goPath('/cardFlow')">
        <div class="item-left">
          <i class="iconfont on">&#xe600;</i>
          卡券流水
        </div>
        <div class="item-right">
          <van-icon name="arrow" />
        </div>
      </li> -->
    </ul>

    <ul class="list">
      <!-- <li class="item">
        <div class="item-left">
          <i class="iconfont on">&#xe627;</i>
          关于我们
        </div>
        <div class="item-right">
          <van-icon name="arrow" />
        </div>
      </li> -->
      <li class="item" @click="goTel">
        <div class="item-left">
          <i class="iconfont on">&#xe603;</i>
          联系客服
        </div>
        <div class="item-right">
          <van-icon name="arrow" />
        </div>
      </li>
    </ul>

    <!-- <ul class="list">
      <li class="item center" @click="logout">退出登录</li>
    </ul> -->

    <bottom-bar-movie></bottom-bar-movie>
  </div>
</template>

<script>
import BottomBarMovie from './BottomBarMovie'
export default {
  name: 'Home',
  components: {
    'bottom-bar-movie': BottomBarMovie,
  },
  data () {
    return {
      userImg:  this.$init.imgIp + this.$init.user.imageUrl,
    }
  },
  created () {
    
  },
  methods: {
    // 拨打电话
    goTel () {
      window.location.href = "tel:4000101515";
    },
    // 跳转路径
    goPath (path) {
      this.$router.push(path)
    },
    // 返回上一页
    goBack () {
      this.$router.back(-1);
    },
    // 退出登录
    logout () {
      let vm = this;
      this.$http.get('/panda-common-oauth/oauth2/logout').then(function (response) {
        if(response.data.code == '1000'){
          // 清除登录信息
          vm.$init.user = {};
          vm.$cookies.remove('user')
          vm.$router.push('/loginCard');
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
  padding-bottom: 88px;
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

.list{
  margin-bottom: 20px;
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
.item .iconfont{
  font-size: 26px;
  display: inline-block;
  width: 50px;
  text-align: center;
}
.item-left{
  flex: 10;
}
.role{
  display: flex;
  padding: 20px;
  background-color: #fff;
  line-height: 100px;
}
.role-name{
  flex: 10;
  line-height: 100px;
  padding-left: 24px;
  font-size: 28px;
  color: #4d4d4d;
}
.role-img .img{
  display: block;
  height: 100px;
  width: 100px;
  border-radius: 50%;
  overflow: hidden;
}
.role-img .img img{
  display: block;
  height: 100%;
  width: 100%;
}

.item .red{
  color: #ff4403;
  border-color: #ff4403;
}
.item .blue{
  color: #00b202;
  border-color: #00b202;
}
.list .item.center{
  display: block;
  text-align: center;
}
</style>
