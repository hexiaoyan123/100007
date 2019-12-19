<template>
  <div class="container">
    <!-- 影院列表开始 -->
    <div class="ca-list">
      <div class="cs-item">
        <h4>
          <div class="cs-item-name-left">
            <!-- <span class="cs-item-dui" v-if="cinema.goodsType == 2 || cinema.goodsType == 0">兑</span> -->
            <span class="cs-item-zuo" v-if="cinema.goodsType == 1 || cinema.goodsType == 0">座</span>
          </div>
          <div class="cs-item-name-right">{{cinema.name}}</div>
        </h4>
        <p>{{cinema.address}}</p>
      </div>
    </div>
    <!-- 影院列表结束 -->

    <!-- 电影简介图开始 -->
    <div class="fd-banner" style="z-index: 1;">
      <div style="min-width: 110%;z-index: 2;">
        <span
          class="fd-banner-item"
          :class="{'fd-banner-h': checkMove.id == item.id}"
          :id="'id'+item.id"
          v-for="(item, index) in listFilmShow"
          :key="index"
          @click="setCheckMove(item)"
        >
          <figure class="img">
            <img :src="item.poster" />
          </figure>
          <em class="fd-banner-item-horn"></em>
        </span>
      </div>
    </div>
    <!-- 电影简介图结束 -->

    <div class="fd-name">
      <div class="fd-name-left">{{checkMove.obj.name}}</div>
      <div class="fd-name-right" @click="goFilm">影片详情</div>
    </div>

    <!-- 日期导航开始 -->
    <div v-if="checkMove.ready">
      <van-tabs>
        <van-tab v-for="(item, key) in checkMove.day" :title="key | dayFormat" :key="key">
          <!-- {{item}} -->
          <div class="fd-item" v-for="(obj, index) in item" :key="index" @click="goSeat(obj)">
            <div class="fd-item-left">
              <div class="fd-item-left-cont">
                <div class="fd-item-left-cont-l">{{obj.showTime | timeToStr}}</div>
                <div class="fd-item-left-cont-r">{{obj.language}} {{obj.showType | showTypeToStr}}</div>
              </div>
              <div class="fd-item-left-cont">
                <div class="fd-item-left-cont-l">{{obj.endTime | timeToStr}}结束</div>
                <div class="fd-item-left-cont-r">{{obj.cinemaHallName}}</div>
              </div>
            </div>
            <div class="fd-item-right on">
              <span v-if="! obj.seckillPrice">¥ {{obj.settlePrice | moneyFormat}}</span>
              <span v-if="obj.seckillPrice">
                <del>¥ {{obj.settlePrice | moneyFormat}}</del>
                ¥ {{obj.seckillPrice | moneyFormat}}
              </span>
            </div>
          </div>
        </van-tab>
      </van-tabs>
    </div>
    <!-- 日期导航结束 -->
  </div>
</template>

<script>
export default {
  name: "MovieField",
  components: {},
  data() {
    return {
      // 影院信息
      cinema: {},
      // 影院排期
      listFilmShow: [],
      // 选中的影片
      checkMove: {
        id: "",
        obj: {}, // 选中电影
        day: {}, // 按天输出
        ready: false
      }
    };
  },
  created() {
    console.log(this.$route.query.filmId);
    this.getCinema();
    this.getFilmShow();
  },
  methods: {
    // 选座
    goSeat(obj) {
      let movie = {
        movie: this.checkMove.obj.name,
        film: obj
      };
      window.localStorage.setItem("movieField", JSON.stringify(movie));
      this.$router.push("/movieSeat/" + obj.id);
    },
    // 影院详情
    goFilm() {
      this.$router.push("/movieFilm/" + this.checkMove.id);
    },
    // 选中影片
    setCheckMove(obj) {
      this.checkMove.id = obj.id;
      this.checkMove.obj = obj;
      this.filmFormat();
    },
    // 获得影院数据
    getCinema() {
      let vm = this;
      this.$http
        .get(
          "/panda-cinema-api/v1/getCinema/" + this.$route.params.id,
          this.$init.channel.movie
        )
        .then(function(response) {
          if (response.data.code == "1000") {
            if (response.data.result) {
              vm.cinema = response.data.result;
            } else {
              vm.cinema = {};
            }
          } else {
            vm.$toast(response.data.msg);
          }
        })
        .catch(function(error) {
          vm.$toast("请求超时，请稍后再试！");
        });
    },
    // 返回上一页
    goBack() {
      this.$router.back(-1);
    },
    // 获得电影排期
    getFilmShow() {
      let vm = this;
      this.$http
        .get(
          "/panda-cinema-api/v1/listFilmShow/" + this.$route.params.id,
          this.$init.channel.movie
        )
        .then(function(response) {
          if (response.data.code == "1000") {
            if (response.data.result) {
              vm.listFilmShow = response.data.result;
              if (vm.$route.query.filmId) {
                let obj = {};
                vm.listFilmShow.forEach((e, i) => {
                  if (e.id == vm.$route.query.filmId) {
                    obj = e;
                  }
                });
                vm.setCheckMove(obj);
              } else {
                vm.setCheckMove(vm.listFilmShow[0]);
              }
              vm.$nextTick(() => {
                let num = document.querySelector("#id" + vm.checkMove.id)
                  .offsetLeft;
                document.querySelector(".fd-banner").scrollTo(num - 6, 0);
              });
            } else {
              vm.listFilmShow = [];
            }
          } else {
            vm.$toast(response.data.msg);
          }
        })
        .catch(function(error) {
          vm.$toast("请求超时，请稍后再试！");
        });
    },
    // 时间格式化
    dateFormat(shijianchuo) {
      function add0(m) {
        return m < 10 ? "0" + m : m;
      }
      var time = new Date(shijianchuo * 1000);
      var y = time.getFullYear();
      var m = time.getMonth() + 1;
      var d = time.getDate();
      var h = time.getHours();
      var mm = time.getMinutes();
      var s = time.getSeconds();
      return (
        y +
        "-" +
        add0(m) +
        "-" +
        add0(d) +
        " " +
        add0(h) +
        ":" +
        add0(mm) +
        ":" +
        add0(s)
      );
    },
    // 格式化电影排期
    filmFormat() {
      this.checkMove.ready = false;
      let vm = this;
      let list = this.popo(this.checkMove.obj.resFilmShowList);
      let day = {};
      // 获得日期数组
      list.forEach((e, i) => {
        e.endTime = e.showTime + vm.checkMove.obj.duration;
        // console.log('showTime=' + vm.dateFormat(e.showTime))
        // console.log('endTime='+ vm.dateFormat(e.endTime))
        // console.log(vm.checkMove.obj.duration)
        // console.log(vm.checkMove.obj.duration)

        let time = vm.dateFormat(e.showTime);
        let dayKay = time.split(" ")[0];
        if (day[dayKay]) {
          day[dayKay].push(e);
        } else {
          day[dayKay] = [];
          day[dayKay].push(e);
        }
      });
      this.$nextTick((e, i) => {
        vm.checkMove.ready = true;
        vm.checkMove.day = day;
      });
    },
    // 数组按时间排序
    popo(arr) {
      if (arr) {
        var obj = {};
        for (let i = 0; i < arr.length; i++) {
          for (let j = 0; j < arr.length - i - 1; j++) {
            if (arr[j].showTime > arr[j + 1].showTime) {
              obj = arr[j];
              arr[j] = arr[j + 1];
              arr[j + 1] = obj;
            }
          }
        }
        return arr;
      } else {
        return [];
      }
    }
  },
  filters: {
    // 播放类型
    showTypeToStr(vlaue) {
      if (vlaue == 1) {
        return "2D";
      } else if (vlaue == 2) {
        return "3D";
      } else if (vlaue == 3) {
        return "MAX2D";
      } else if (vlaue == 4) {
        return "MAX3D";
      } else if (vlaue == 6) {
        return "DMAX";
      } else {
        return "";
      }
    },
    // 时间戳转 时:分
    timeToStr(shijianchuo) {
      function add0(m) {
        return m < 10 ? "0" + m : m;
      }
      var time = new Date(shijianchuo * 1000);
      var y = time.getFullYear();
      var m = time.getMonth() + 1;
      var d = time.getDate();
      var h = time.getHours();
      var mm = time.getMinutes();
      var s = time.getSeconds();
      return add0(h) + ":" + add0(mm);
    },
    // 价格格式转换
    moneyFormat(value) {
      if (value) {
        return (value / 100).toFixed(2);
      } else {
        return "";
      }
    },
    // 日期格式转换
    dayFormat(value) {
      let m = value.split("-")[1];
      let d = value.split("-")[2];
      return m + "月" + d + "日";
    }
  }
};
</script>

<style scoped>
.container {
  background-color: #fff;
  /* padding-top: 85px; */
}
.top img {
  display: block;
  width: 100%;
}

header {
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
.header-back {
  width: 70px;
  text-align: center;
}
.header-cont {
  flex: 10;
}
.header-more {
  width: 75px;
  text-align: center;
}
header .iconfont {
  font-size: 28px;
}

.cs-item {
  padding: 10px 24px;
  border-bottom: 1px solid #e6e6e6;
}
.cs-item h4 {
  font-size: 28px;
  /* color: #4d4d4d; */
  line-height: 50px;
  /* padding-left: 40px; */
  position: relative;
  display: flex;
}
.cs-item-name-left {
  line-height: 30px;
  padding-top: 6px;
}
.cs-item-name-right {
  flex: 10;
}
.cs-item p {
  font-size: 27px;
  /* color: #bababa; */
  line-height: 44px;
}
.cs-item-dui {
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
.cs-item-zuo {
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

.fd-banner {
  width: 100%;
  padding: 20px 0 20px 20px;
  box-sizing: border-box;
  font-size: 0;
  white-space: nowrap;
  /* -webkit-overflow-scrolling: touch;
  z-index:1;
  overflow: auto;
  overflow-x: scroll; */
  display: -webkit-box;
  /* overflow-x: scroll;
  -webkit-overflow-scrolling:touch; */
  overflow-y: hidden;
  overflow-x: scroll;
  -webkit-overflow-scrolling: touch;
  -webkit-box-flex: 1;
}
.fd-banner .img {
  display: inline-block;
  height: 200px;
}
.fd-banner .img img {
  display: inline-block;
  height: 100%;
}
.fd-name {
  border-top: 1px solid #e6e6e6;
  line-height: 72px;
  padding: 0 20px;
  display: flex;
}
.fd-name-left {
  flex: 10;
  font-size: 28px;
  color: #222;
}
.fd-name-right {
  font-size: 22px;
  color: #00a8ec;
}
.fd-item {
  border-bottom: 1px solid #e6e6e6;
  padding: 20px 20px;
  display: flex;
}
.fd-item-left {
  flex: 10;
}
.fd-item-left .fd-item-left-cont:last-child {
  color: #b9b9b9;
}
.fd-item-left-cont {
  display: flex;
  font-size: 27px;
  /* color: #4d4d4d; */
  line-height: 44px;
}
.fd-item-left-cont-l {
  width: 270px;
}
.fd-item-left-cont-r {
  flex: 10;
}
.fd-item-right {
  font-size: 28px;
  line-height: 88px;
}
.fd-banner-item {
  display: inline-block;
  position: relative;
  border: 6px solid transparent;
  margin-right: 8px;
}
.fd-banner-item-horn {
  position: absolute;
  bottom: -17px;
  left: 50%;
  margin-left: -6px;
  display: inline-block;
  border-top: 12px solid transparent;
  border-left: 12px solid transparent;
  border-right: 12px solid transparent;
}
.fd-banner-item.fd-banner-h {
  border-color: #00a8ec;
}
.fd-banner-h .fd-banner-item-horn {
  border-top-color: #00a8ec;
}
.fd-item-right del {
  color: #b9b9b9;
  font-size: 20px;
  margin-right: 10px;
}
</style>

<style>
.van-tab--active {
  color: #00a8ec;
}
.van-tabs__line {
  background-color: #00a8ec;
}
</style>
