<template>
  <div class="container">

    <!-- 新头部开始 -->
    <div class="new-header">
      <div class="nh-left" @click="city.show = true">
        <!-- <van-icon name="location" /> -->
        <!-- <i class="iconfont">&#xe644;</i> -->
        <span class="nh-left-map"></span>

        <em>{{city.city.name}}</em>
      </div>
      <div class="nh-center">
        <div class="nh-center-out">
          <div class="nh-center-item" :class="{'nh-center-item-on': showType == 1}" @click="showType = 1">热映</div>
          <div class="nh-center-item" :class="{'nh-center-item-on': showType == 2}" @click="showType = 2">待映</div>
        </div>
      </div>
    </div>
    <!-- 新头部结束 -->

    <!-- 城市选择开始 -->
    <van-popup v-model="city.show" position="right" :overlay="false">
      <movie-city :v-city="city.city" @closeCity="closeCityModo" @clickCity="getCity"></movie-city>
    </van-popup>
    <!-- 城市选择结束 -->

    <ul class="move-list" v-show="showType == 1">
      <li class="move-item clearfix" v-for="(item, index) in hotFilm.list" :key="index" @click="goMovieFilm(item.id)">
        <div class="move-item-l">
          <figure class="img">
            <img :src="item.poster" alt="">
          </figure>
        </div>
        <div class="move-item-r">
          <h3 class="unoverflow">{{item.name}}</h3>
          <div class="move-item-lable unoverflow">上映日期：{{item.publishDate}}</div>
          <p class="unoverflow">导演：{{item.director}}</p>
          <p class="unoverflow">演员：{{item.cast}}</p>
          <span class="move-item-btn" @click.stop="goMovieCinema(item.id)">购票</span>
        </div>
      </li>
    </ul>

    <ul class="move-list" v-show="showType == 2">
      <li class="move-item clearfix" v-for="(item, index) in awaitFilm.list" :key="index" @click="goMovieFilm(item.id)">
        <div class="move-item-l">
          <figure class="img">
            <img :src="item.poster" alt="">
          </figure>
        </div>
        <div class="move-item-r">
          <h3 class="unoverflow">{{item.name}}</h3>
          <div class="move-item-lable unoverflow">上映日期：{{item.publishDate}}</div>
          <p class="unoverflow">导演：{{item.director}}</p>
          <p class="unoverflow">演员：{{item.cast}}</p>
          <!-- <span class="move-item-btn" @click.stop="goMovieCinema(item.id)">购票</span> -->
        </div>
      </li>
    </ul>

    <bottom-bar-movie></bottom-bar-movie>
  </div>
</template>

<script>
import BottomBarMovie from './BottomBarMovie'
import MovieCity from './MovieCity'
import vMap  from './Map'
export default {
  name: 'MovieCinema',
  components: {
    'movie-city': MovieCity,
    'bottom-bar-movie': BottomBarMovie
  },
  data () {
    return {
      // 城市
      city: {
        show: false, //城市弹窗
        city: {}, // 选中的地址
      },
      // 热门
      hotFilm: {
        list: [],
      },
      // 待映
      awaitFilm: {
        list: []
      },
      showType: 1, // 类型切换
    }
  },
  created () {
    // 城市处理
    if(this.$init.moveCity){
      this.getCity(this.$init.moveCity);
    }else if(window.localStorage.getItem('moveCity')){
      let data = JSON.parse(window.localStorage.getItem('moveCity'));
      this.getCity(data);
    }else{
      let city = {"id":"110100","parentId":"110000","grade":"2","name":"北京","abbr":"B"}
      window.localStorage.setItem('moveCity', JSON.stringify(city));
      this.getCity(city);
    }
    this.getListHotFilm();
    this.getListAwaitFilm();
  },
  methods: {
    // 关闭城市选择
    closeCityModo (data) {
      this.city.show = false;
    },
    // 获得选中的地址
    getCity (data) {
      this.city.city = data;
      this.$init.moveCity = data;
      window.localStorage.setItem('moveCity', JSON.stringify(data));
      this.city.show = false;
    },
    // 获得热影片
    getListHotFilm () {
      let vm = this;
      this.$http.get('/panda-cinema-api/v1/listHotFilm/' + this.city.city.id, this.$init.channel.movie).then(function (response) {
        if(response.data.code == '1000'){
          if(response.data.result){
            vm.hotFilm.list = response.data.result
          }else{
            vm.hotFilm.list = [];
          }
        }else{
          vm.$toast(response.data.msg)
        }
      })
      .catch(function (error) {
        vm.$toast('请求超时，请稍后再试！')
      });
    },
    // 获得待映影片
    getListAwaitFilm () {
      let vm = this;
      this.$http.get('/panda-cinema-api/v1/listAwaitFilm', this.$init.channel.movie).then(function (response) {
        if(response.data.code == '1000'){
          if(response.data.result){
            vm.awaitFilm.list = response.data.result
          }else{
            vm.awaitFilm.list = [];
          }
        }else{
          vm.$toast(response.data.msg)
        }
      })
      .catch(function (error) {
        vm.$toast('请求超时，请稍后再试！')
      });
    },
    // 购票
    goMovieCinema (id) {
      this.$router.push('/movieC/'+id);
    },
    // 电影详情
    goMovieFilm (id) {
      this.$router.push('/movieFilm/'+id);
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
  background-color: #fff;
  /* padding-top: 85px; */
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

.move-list{
  width: 100%;
  overflow: hidden;
}
.move-item{
  padding: 20px;
  box-sizing: border-box;
  border-bottom: 1px solid #e6e6e6;
}
.move-item-r{
  padding-left: 20px;
  width: 80%;
  float: right;
  box-sizing: border-box;
  position: relative;
}
.move-item-l{
  width: 20%;
  float: left;
}
.move-item-l .img{
  display: block;
  width: 100%;
  height: 180px;
  overflow: hidden;
  border-radius: 5px;
}
.move-item-l .img img{
  display: block;
  height: 100%;
  width: 100%;
}
.move-item-r h3{
  font-size: 36px;
  line-height: 50px;
  font-weight: 700;
  /* padding-bottom: 12px; */
}
.move-item-lable{
  font-size: 27px;
  line-height: 44px;
  margin-top: 10px;
  /* margin-bottom: 40px; */
}
.move-item-r p{
  font-size: 27px;
  line-height: 44px;
  /* margin-top: 16px; */
  width: 70%;
}
.move-item-btn{
  position: absolute;
  display: block;
  line-height: 60px;
  padding: 0 30px;
  border-radius: 6px;
  color: #fff;
  background-color: #00a8ec;
  right: 0;
  bottom: 0;
}

/* 改版头部 */
.new-header{
  position: relative;
  box-sizing: border-box;
  background-color: #fff;
  z-index: 9;
  font-size: 30px;
  line-height: 88px;
  text-align: center;
}
.new-header i{
font-size: 30px;
  line-height: 88px;
}
.nh-left{
  position: absolute;
  left: 20px;
  color: #989898;
  padding-left: 45px;
}
.nh-center-out{
  display: inline-block;
  margin: 0 auto;
  border: 4px solid #00a8ec;
  line-height: 60px;
  color: #00a8ec;
  border-radius: 4px;
  /* overflow: hidden; */
}
.nh-center-item{
  display: inline-block;
  width: 160px;
}
.nh-center-item-on{
  color: #fff;
  background-color: #00a8ec;
}
.nh-left-map{
  display: inline-block;
  height: 36px;
  width: 36px;
  background-image: url(../assets/movie/map.png);
  background-size: 100%;
  position: absolute;
  top: 24px;
  left: 0;
}
</style>

<style>
.van-popup--right{
  height: 100%;
  width: 100%;
  background-color: #fff;
}
</style>
