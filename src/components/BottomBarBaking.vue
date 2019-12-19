<template>
  <div class="botton-bar-cont">
    <div class="botton-bar-home" @click="goPath('/index')">
      <i class="iconfont">&#xe604;</i>
    </div>
    <div class="botton-bar-item" :class="{'botton-bar-item-on': $route.path == '/baking'}" @click="goPath('/baking')">
      <i class="iconfont">&#xe62f;</i>
      <p>主页</p>
    </div>
    <div class="botton-bar-item" :class="{'botton-bar-item-on': $route.path == '/searchClass'}" @click="goPath('/searchClass?channel='+ $init.channel.baking)">
      <i class="iconfont">&#xe605;</i>
      <p>分类</p>
    </div>
    <div class="botton-bar-item" :class="{'botton-bar-item-on': $route.path == '/cart'}" @click="goPath('/cart')">
      <i class="iconfont">&#xe60e;</i>
      <p>购物车</p>
    </div>
    <div class="botton-bar-item" :class="{'botton-bar-item-on': $route.path == '/home'}" @click="goPath('/home')">
      <i class="iconfont">&#xe60c;</i>
      <p>我的</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BottomBarBaking',
  methods: {
    goPath (path) {
      this.$router.push(path)
    }
  }
}
</script>

<style scoped>
.botton-bar-cont{
  position: fixed;
  -webkit-overflow-scroll: touch;
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
  padding-left: 88px;
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
.botton-bar-home{
  position: absolute;
  left: 0;
  top: 0;
  text-align: center;
  height: 88px;
  width: 88px;
  line-height: 88px;
  background-color: #00a8ec;
  color: #ffffff;
}
.botton-bar-home .iconfont{
  font-size: 36px;
}
</style>

