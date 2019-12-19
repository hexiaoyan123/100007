<template>
  <div class="container">

    <!-- 筛选开始 -->
    <div class="nca-select">
      <div class="nca-select-item"  @click="city.show = true">
        <!-- <van-icon name="location" /> -->
        <span class="nca-select-icon icon-location"></span>
        <em>{{city.city.name}}</em>
      </div>
      <div class="nca-select-item"  @click="search.show = true">
        <!-- <van-icon name="search" /> -->
        <span class="nca-select-icon icon-search"></span>
        <em>找影院</em>
      </div>
    </div>  
    <!-- 筛选结束 -->

    <!-- 影院列表开始 -->
    <div class="ca-list">
      <div class="cs-item" v-for="(item, index) in cinemas.list" :key="index" @click="goMovieField(item.id)">
        <h4>
          <div class="cs-item-name-left">
            <!-- <span class="cs-item-dui" v-if="item.goodsType == 2 || item.goodsType == 0">兑</span> -->
            <span class="cs-item-zuo" v-if="item.goodsType == 1 || item.goodsType == 0">座</span>
          </div>
          <div class="cs-item-name-right">
            {{item.name}}
          </div>
        </h4>
        <p>{{item.address}}</p>
      </div>

      <h3 v-show="cinemas.list.length == 0" class="noData">无影院信息</h3>
      <h3 v-show="cinemas.list.length > 0" class="noData">到底了！</h3>
    </div>
    <!-- 影院列表结束 --> 

    <!-- 城市选择开始 -->
    <van-popup v-model="city.show" position="right" :overlay="false">
      <movie-city :v-city="city.city" @closeCity="closeCityModo" @clickCity="getCity"></movie-city>
    </van-popup>
    <!-- 城市选择结束 -->

    <!-- 搜索筛选框开始 -->
    <div class="search-modo" v-if="search.show">
      <cinema-search @closeSearch="closeSMode" :v-city="city.city"></cinema-search>
    </div>
    <!-- 搜索筛选框结束 -->

    <bottom-bar-movie></bottom-bar-movie>
  </div>
</template>

<script>
import BottomBarMovie from './BottomBarMovie'
import MovieCity from './MovieCity'
import MovieCinemaSearch from './MovieCinemaSearch'
export default {
  name: 'MovieC',
  components: {
    'movie-city': MovieCity,
    'bottom-bar-movie': BottomBarMovie,
    'cinema-search': MovieCinemaSearch
  },
  data () {
    return {
      // 城市
      city: {
        show: false, //城市弹窗
        city: {}, // 选中的地址
      },
      // 影院信息
      cinemas: {
        list: [],
        now: 0
      },

      // 搜索
      search: {
        show: false,
        val: ''
      },
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
      this.city.show = true;
    }
  },
  methods: {
    // 根据影片查询影院
    getListFilmCinema () {
      let vm = this;
      vm.cinemas.now = 0;
      let postData = {
        cityCode: this.city.city.id,
        longitude: '',
        latitude: ''
      }
      this.$http.post('/panda-cinema-api/v1/listCinema', postData, this.$init.channel.movie).then(function (response) {
      // this.$http.get('/panda-cinema-api/v1/listCinema/'+this.city.city.id, this.$init.channel.movie).then(function (response) {
        if(response.data.code == '1000'){
          if(response.data.result){
            vm.cinemas.list = response.data.result;
          }else{
            vm.cinemas.list = [];
          }
        }else{
          vm.$toast(response.data.msg)
        }
      })
      .catch(function (error) {
        vm.$toast('请求超时，请稍后再试！')
      });
    },
    // 获得选中的地址
    getCity (data) {
      this.city.city = data;
      this.$init.moveCity = data;
      window.localStorage.setItem('moveCity', JSON.stringify(data));
      this.city.show = false;

      this.getListFilmCinema()
    },
    // 前往影院
    goMovieField (id) {
      let filmId = '';
      if(this.$route.params.id){
        filmId = '?filmId='+this.$route.params.id
      }
      this.$router.push('/movieField/'+id + filmId)
    },
    // 关闭城市选择
    closeCityModo (data) {
      this.city.show = false;
    },
    // 关闭搜索框
    closeSMode (data) {
      this.search.show = false;
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
  /* padding-top: 155px; */
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

.ca-select{
  position: fixed;
  top: 85px;
  width: 100%;
  background-color: #fff;
  box-sizing: border-box;
  padding: 0 20px;
  font-size: 24px;
  color: #808080;
  display: flex;
  line-height: 70px;
  border-bottom: 1px solid #e6e6e6;
  z-index: 101;
}
.ca-select .iconfont{
  font-size: 24px;
  color: #808080;
}
.ca-select-left{
  flex: 2;
}
.ca-select-center{
  text-align: center;
  flex: 4;
  font-size: 28px;
  color: #4d4d4d;
}
.ca-select-right{
  text-align: right;
  flex: 2;
  display: flex;
  height: 68px;
}

.cs-item{
  padding: 10px 24px;
  border-bottom: 1px solid #e6e6e6;
}
.cs-item h4{
  font-size: 28px;
  /* color: #4d4d4d; */
  line-height: 50px;
  /* padding-left: 40px; */
  position: relative;
  display: flex;
}
.cs-item-name-left{
  line-height: 30px;
  padding-top: 7px;
}
.cs-item-name-right{
  flex: 10;
}
.cs-item p{
  font-size: 27px;
  /* color: #bababa; */
  line-height: 44px;
}
.cs-item-dui{
  display: inline-block;
  height: 30px;
  width: 30px;
  font-size: 22px;
  line-height: 30px;
  text-align: center;
  border-radius: 4px;
  color: #fff;
  background-color: #ff9900;
  /* position: absolute; */
  top: 9px;
  left: 0;
  margin-right: 10px;
}
.cs-item-zuo{
  display: inline-block;
  height: 30px;
  width: 30px;
  font-size: 22px;
  line-height: 30px;
  text-align: center;
  border-radius: 4px;
  color: #fff;
  background-color: #00b202;
  /* position: absolute; */
  top: 9px;
  left: 0;
  margin-right: 10px;
}
.city-popup{
  height: 100%;
  width: 100%;
  background-color: #fff;
}

/* 地区筛选 */
.class-window{
  position: absolute;
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 98px;
  line-height: 76px;
  padding-top: 156px;
}
.class-window-btn{
  width: 100%;
  box-sizing: border-box;
  line-height: 80px;
  border-top: 1px solid #d9d9d9;
  font-size: 28px;
  text-align: center;
  background-color: #ffffff;
  display: flex;
}
.class-window-btn-left{
  flex: 5;
}
.class-window-btn-right{
  flex: 5;
  color: #ffffff;
  background-color: #00a8ec;
}
.class-window-list{
  padding: 20px;
  background-color: #ffffff;
  font-size: 24px;
  line-height: 80px;
  max-height: 530px;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
}
.class-window-list-item{
  border-bottom: 1px solid #eeeeee;
  text-align: center;
}
.class-window-list-item:last{
  border: none;
}
/* 搜索框 */
.search-modo{
  position: fixed;
  height: 100%;
  width: 100%;
  z-index: 102;
  background-color: #fff;
  top: 0;
  left: 0;
  box-sizing: border-box;
  padding-top: 88px;
}
.search-modo-left{
  flex: 10;
}
.search-modo-left input{
  display: block;
  width: 100%;
  border: 1px solid #e6e6e6;
  line-height: 47px;
  border-radius: 4px;
  box-sizing: border-box;
  padding: 0 6px;
}
.search-modo-right{
  
}
.search-modo-btn{
  display: inline-block;
  line-height: 50px;
  background-color: #00a8ec;
  color: #fff;
  padding: 0 30px;
  border-radius: 4px;
  margin-left: 20px;
}
.ca-select-right-lable{
  display: inline-block;
  max-width: 120px;
  overflow:hidden;
  text-overflow:ellipsis;
  white-space:nowrap;
}
.ca-select-right-1{
  flex: 9;
}
.ca-select-right-2{
  width: 50px;
  height: 60px;
  overflow: hidden;
  text-align: right;
}

/* 新搜索 */
.nca-select{
  display: flex;
  padding: 0 20px;
  background-color: #00a8ec;
  color: #fff;
}
.nca-select-item{
  margin-right: 40px;
  padding-right: 10px;
  position: relative;
  padding-left: 44px;
}
.nca-select-item em{
  font-size: 24px;
  line-height: 88px;
}
.nca-select .van-icon{
  margin-right: 5px;
}
.nca-select-icon{
  display: inline-block;
  height: 36px;
  width: 36px;
  background-size: 100%;
  position: absolute;
  left: 0;
  top: 23px;
}
.icon-location{
  background-image: url(../assets/movie/map2.png);
}
.icon-search{
  background-image: url(../assets/movie/s2.png);
}
/* 时间分期 */
.new-tabs{
  line-height: 66px;
}
.new-tabs ul{
  display: -webkit-box;
  overflow-y: hidden;
  overflow-x: scroll;
  -webkit-overflow-scrolling: touch;
  -webkit-box-flex: 1;
  white-space:nowrap; 
}
.new-tab{
  width: 200px;
  overflow: hidden;
  font-size: 24px;
  text-align: center;
  border-bottom: 5px solid transparent;
}
.new-tab-now{
  color: #00a8ec;
  border-color: #00a8ec;
}
</style>

<style>
.van-popup--right{
  height: 100%;
  width: 100%;
  background-color: #fff;
}
</style>
