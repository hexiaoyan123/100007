<template>
  <div class="botton-bar-cont">
    <div class="botton-bar-item" :class="{'botton-bar-item-on': $route.path == '/index'}" @click="goPath('/index')">
      <i class="iconfont">&#xe62f;</i>
      <p>福利中心</p>
    </div>
    <div class="botton-bar-item" :class="{'botton-bar-item-on': $route.path == '/orderList'}" @click="goPath('/orderList')">
      <i class="iconfont">&#xe611;</i>
      <p>订单中心</p>
    </div>
    <div class="botton-bar-item" :class="{'botton-bar-item-on': $route.path == '/cart'}" @click="goPath('/cart')">
      <i class="iconfont">&#xe60e;</i>
      <p>购物车</p>
    </div>
    <div class="botton-bar-item" :class="{'botton-bar-item-on': $route.path == '/home'}" @click="goPath('/home')">
      <i class="iconfont">&#xe60c;</i>
      <p>我的</p>
    </div>
    <!-- <div class="botton-bar-item" :class="{'botton-bar-item-on': $route.path == '/movieHome'}" @click="goPath('/movieHome')">
      <i class="iconfont">&#xe651;</i>
      <p>电影票</p>
    </div>
    <div class="botton-bar-item" :class="{'botton-bar-item-on': $route.path == '/searchClass'}" @click="goPath('/searchClass')">
      <i class="iconfont">&#xe605;</i>
      <p>分类</p>
    </div> -->
    <!-- <div class="botton-bar-item" :class="{'botton-bar-item-on': $route.path == '/helloWorld'}" @click="goPath('/helloWorld')">
      <i class="iconfont">&#xe605;</i>
      <p>导航</p>
    </div> -->
  </div>
</template>

<script>
export default {
  name: 'BottomBar',
  methods: {
    goPath (path) {
      this.$router.push(path)
    }
  }
}
</script>

<style scoped>
.botton-bar-cont{
  /* position: absolute; */
  position: fixed;
  /* -webkit-overflow-scroll: touch; */
  bottom: 0;
  left: 0;
  background-color: #ffffff;
  width: 100%;
  height: 88px;
  display: flex;
  border-top: 1px solid #ddd;
  box-sizing: border-box;
  padding-top: 3px;
  z-index: 90;
}
.botton-bar-item{
  flex: 3;
  text-align: center;
}
.botton-bar-item .iconfont{
  font-size: 36px;
  line-height: 50px;
}
.botton-bar-item p{
  font-size: 24px;
  line-height: 30px;
} 
.botton-bar-cont .botton-bar-item-on{
  color: #00a8ec;
}
</style>

