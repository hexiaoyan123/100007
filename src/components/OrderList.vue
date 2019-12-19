<template>
  <div class="container">

    <!-- 订单列表开始 -->
    <div class="order-list-conter">
      <movie-list></movie-list>
    </div>
    <!-- 订单列表结束 -->

    <bottom-bar-movie></bottom-bar-movie>
  </div>
</template>

<script>
import OrderMovieList from './movie/Orders'
// import OrderMovieList from './OrderMovieList'
import BottomBarMovie from './BottomBarMovie'
export default {
  name: 'OrderList',
  components: {
    'movie-list': OrderMovieList,
    'bottom-bar-movie': BottomBarMovie
  }, 
  data () {
    return {
      // 头部
      header: {
        show: false, //显示分类
      },
      // 分类
      type: {
        now: {},
        list: [{
          name: '商品',
          val: 1
        }, {
          name: '电影票',
          val: 2
        }, {
          name: '演出',
          val: 3
        }]
      }
    }
  },
  created () {
    this.type.now = this.type.list[1]
  },
  methods: {
    // 选择分类
    checkType (obj) {
      this.type.now = obj;
      this.header.show = false;
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
  padding-bottom: 88px;
}
.top img{
  display: block;
  width: 100%;
}

.order-list-conter{
  height: 100%;
}

header{
  height: 85px;
  line-height: 85px;
  position: absolute;
  /* position: fixed; */
  /* -webkit-overflow-scroll: touch; */
  width: 100%;
  top: 0;
  left: 0;
  background-color: #00a8ec;
  color: #ffffff;
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

/* 选择分类 */
.header-win{
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 100;
  box-sizing: border-box;
  padding-top: 85px;
}
.header-win-in{
  background-color: #fff;
  text-align: center;
  line-height: 85px;
  color: #4d4d4d;
}
.header-win-in li{
  border-top: 1px solid #dddddd;
}

</style>

<style>
.van-tab--active{
  color: #00a8ec;
}
.van-tabs__line{
  background-color: #00a8ec;
}
</style>
