<template>
  <div class="container bookcont">
    <!-- 头部开始 -->
    <header>
      <div class="header-back">
        <van-icon name="arrow-left" />
      </div>
      <div class="header-cont">
        北京 
        <!-- <i class="iconfont">&#xe608;</i> -->
      </div>
      <div class="header-more" @click="popup = true">
        <i class="iconfont">&#xe60a;</i>
      </div>
    </header>
    <!-- 头部结束 -->

    <!-- 导航开始 -->
    <div class="nav">
      <van-tabs>
        <van-tab v-for="(item, index) in navs" :key="index" :title="item.name">
          <book-item></book-item>
        </van-tab>
      </van-tabs>
    </div>
    <!-- 导航结束 -->

    <van-popup v-model="popup" position="bottom" >
      <ul class="popup-list">
        <li>
          <router-link to="">搜索</router-link>
        </li>
        <li>
          <router-link to="">更多</router-link>
        </li>
      </ul>
    </van-popup>
  </div>
</template>

<script>
import BookItem from './BookItem'
export default {
  name: 'Book',
  components: {
    'book-item': BookItem
  },
  data () {
    return {
      // 弹出层
      popup: false,
      // 轮播图
      bannerImages: [
        'https://www.apple.com/v/home/dq/images/promos/music_three_months_large.jpg',
        'https://www.apple.com/v/home/dq/images/promos/music_three_months_large.jpg'
      ],
      // 导航
      navs: [
        {
          name: '童书',
          id: ''
        },
        {
          name: '励志',
          id: ''
        },
        {
          name: '文学',
          id: ''
        },
        {
          name: '经营',
          id: ''
        },
        {
          name: '武侠',
          id: ''
        }
      ],
    }
  },
  methods: {

  }
}
</script>

<style scoped>
.bookcont{
  padding-top: 85px;
}
.container{
  background-color: #f8f8f8;
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
  color: #ffffff;
  z-index: 100;
  text-align: center;
  display: flex;
  font-size: 28px;
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

.nav{
  background-color: #ffffff;
}
.popup-list li{
  line-height: 85px;
  font-size: 28px;
  color: #4d4d4d;
  text-align: center;
  border-top: 1px solid #dfdfdf;
}
</style>
