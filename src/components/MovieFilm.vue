 <template>
  <div class="container">
    <div class="nh-out">
      <div class="nh-bg" :style="{'background-image': 'url('+film.poster+')'}"></div>
      <div class="nh-cont">
        <figure class="fm-header-img">
          <img :src="film.poster" alt />
        </figure>
        <div class="nh-cont-cont">
          <h2>{{film.name}}</h2>
          <p>{{film.type}}</p>
          <p>{{film.country}} | {{film.duration | sToM}}</p>
          <p>{{film.publishDate}}上映</p>
        </div>
      </div>
    </div>

    <!-- 文字介绍开始 -->
    <div class="fm-text">
      <div class="fm-text-p">
        <em>导演：</em>
        {{film.director}}
      </div>
      <div class="fm-text-p">
        <em>主演：</em>
        {{film.cast}}
      </div>
      <div class="fm-text-p fm-text-more">
        <em>剧情：</em>
        {{film.intro}}
      </div>
      <!-- <div class="fm-text-p">
        {{film.intro}}
      </div>-->
    </div>
    <!-- 文字介绍结束 -->

    <!-- 剧照开始 -->
    <h4 class="fm-img-name">
      <span class="fm-img-name-left">剧照:</span>
      <!-- <span class="fm-img-name-right" @click="imageView(0)">
        <em class="on">全部</em>
        <van-icon name="arrow" />
      </span>-->
    </h4>
    <!-- <div class="fm-img-out">
      <div class="fm-img-in">
          <span class="fm-img-item" v-for="(item, index) in banners" :key="index">
            <img :src="item" alt="" @click="imageView(index)">
          </span>
      </div>
    </div>-->
    <div class="fm-img-out">
      <!-- <div class="fm-img-in"> -->
      <!-- <span style="display: inline-block;min-width: 101%;"> -->
      <span class="fm-img-item" v-for="(item, index) in banners" :key="index">
        <img :src="item" alt @click="imageView(index)" />
      </span>
      <!-- </span> -->
      <!-- </div> -->
    </div>
    <!-- 剧照结束 -->

    <!-- 提交开始 -->
    <div class="updata-cont">
      <div class="updata-right" @click="goToCinema">选座购票</div>
    </div>
    <!-- 提交结束 -->
  </div>
</template>

<script>
import { ImagePreview } from "vant";
export default {
  name: "MovieSeat",
  components: {},
  data() {
    return {
      star: 5, // 星星评分
      film: {}, // 影片信息
      banners: [] // 剧照
    };
  },
  created() {
    this.getMovie();
  },
  methods: {
    // 选作购票
    goToCinema() {
      this.$router.push("/movieC/" + this.$route.params.id);
    },
    // 预览图片
    imageView(num) {
      ImagePreview(this.banners, num);
    },
    // 获得影院详情
    getMovie() {
      let vm = this;
      this.$http
        .get(
          "/panda-cinema-api/v1/getFilm/" + this.$route.params.id,
          this.$init.channel.movie
        )
        .then(function(response) {
          if (response.data.code == "1000") {
            if (response.data.result) {
              vm.film = response.data.result;
              vm.banners = response.data.result.stills.split(",");
            } else {
              vm.film = {};
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
    }
  },
  filters: {
    sToM(val) {
      if (val - 0) {
        return parseInt((val - 0) / 60) + "分钟";
      } else {
        return "";
      }
    }
  }
};
</script>

<style scoped>
.container {
  background-color: #f8f8f8;
  /* padding-top: 85px; */
  padding-bottom: 100px;
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
  background-color: #fff;
  color: #4d4d4d;
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

/* 影片头 */
.fm-header {
  position: relative;
  margin-bottom: 20px;
}
.fm-header-top {
  height: 174px;
  box-sizing: border-box;
  padding-left: 240px;
  padding-right: 20px;
  background: #00a8ec80;
  background: -webkit-gradient(
    linear,
    left top,
    right bottom,
    from(#00a8ec80),
    to(#00a8ecb3)
  );
  background: linear-gradient(to bottom right, #00a8ec80, #00a8ecb3);
  color: #fff;
  padding-top: 10px;
}
.fm-header-top h2 {
  color: #fff;
  font-size: 28px;
  line-height: 60px;
  display: flex;
}
.fm-header-top h2 span {
  flex: 10;
  overflow: hidden;
}
.fm-header-top p {
  font-size: 24px;
  line-height: 50px;
}
.fm-header-bottom {
  padding-left: 240px;
  font-size: 0;
  background-color: #fff;
  padding-top: 24px;
  height: 150px;
  box-sizing: border-box;
  border-bottom: 1px solid #dddddd;
}
.fm-header-lable {
  display: inline-block;
  line-height: 46px;
  padding: 0 38px;
  border: 1px solid #dddddd;
  border-radius: 4px;
  color: #dddddd;
  font-size: 22px;
  margin-right: 10px;
  margin-bottom: 10px;
}
/* .fm-header-img{
  display: block;
  position: absolute;
  height: 270px;
  width: 190px;
  border: 1px solid #dddddd;
  border-radius: 8px;
  z-index: 10;
  top: 28px;
  left: 26px;
  overflow: hidden;
} */
.fm-header-img img {
  display: block;
  height: 100%;
  width: 100%;
}

/* 文字介绍 */
.fm-text {
  background-color: #fff;
  border-top: 1px solid #dddddd;
  padding: 20px;
  border-bottom: 1px solid #dddddd;
  /* margin-top: 20px; */
}
.fm-text-p {
  line-height: 44px;
  color: #bababa;
  font-size: 27px;
}
.fm-text-p em {
  color: #4d4d4d;
}
.fm-text-more {
  /* margin-top: 10px; */
}

/* 剧照开始 */
.fm-img-name {
  display: flex;
  line-height: 60px;
  font-size: 27px;
  color: #4d4d4d;
  padding: 0 20px;
  padding-top: 10px;
  background-color: #fff;
}
.fm-img-name-left {
  flex: 10;
}
.fm-img-name-right {
  height: 60px;
}
.fm-img-out {
  width: 100%;
  box-sizing: border-box;
  padding: 0 20px 20px 20px;
  background-color: #fff;
  display: -webkit-box;
  /* overflow-x: scroll;
  -webkit-overflow-scrolling:touch; */
  overflow-y: hidden;
  overflow-x: scroll;
  -webkit-overflow-scrolling: touch;
  -webkit-box-flex: 1;
}
.fm-img-in {
  padding: 0 0 20px 20px;
  font-size: 0;
  white-space: nowrap;
  min-width: 101%;
  /* display: -webkit-box;
  overflow-x: scroll;
  -webkit-overflow-scrolling:touch; */
}
.fm-img-item {
  /* display: inline-block; */
  display: block;
  height: 160px;
  width: 160px;
  overflow: hidden;
  margin-right: 20px;
}
.fm-img-item img {
  display: block;
  height: 100%;
}

.updata-cont {
  position: fixed;
  bottom: 0;
  width: 100%;
  display: flex;
}
.updata-right {
  flex: 10;
  text-align: center;
  line-height: 100px;
  color: #fff;
  background-color: #00a8ec;
  font-size: 28px;
}

/* 背景 */
.nh-out {
  position: relative;
  border-bottom: 1px solid #ddd;
}
.nh-bg {
  height: 256px;
  background-color: #fff;
  background-size: 100% auto;
  /* background-image: url(http://res.fcloud.mopon.cn/access/201808/27121889268654923.jpg); */
  filter: blur(8px) brightness(50%);
}
.nh-cont {
  position: absolute;
  width: 100%;
  left: 0;
  top: 0;
  box-sizing: border-box;
  padding-left: 210px;
}
.nh-cont-cont {
  color: #fff;
  padding-top: 16px;
  font-size: 27px;
  line-height: 44px;
}
.nh-cont-cont h2 {
  color: #fff;
  font-size: 36px;
  line-height: 70px;
}
.fm-header-img {
  display: block;
  position: absolute;
  height: 180px;
  width: 135px;
  /* border: 1px solid #dddddd; */
  /* border-radius: 8px; */
  z-index: 10;
  top: 28px;
  left: 26px;
  overflow: hidden;
  border-radius: 5px;
}
</style>