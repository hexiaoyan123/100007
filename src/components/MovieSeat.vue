 <template>
  <div class="container">

    <!-- 电影名称开始 -->
    <div class="ca-list">
      <div class="cs-item">
        <h4>
          {{movie}}
        </h4>
        <p>
          {{film.cinemaHallName}}  
          {{film.language}} 
          {{film.showType | showTypeToStr}}  
          {{film.showTime | dateFormat}}
        </p>
      </div>
    </div>
    <!-- 电影名称结束 -->

    <!-- 提示开始 -->
    <!-- <div class="st-ti">
      <div class="st-ti-left">
        请选择下方座位，最多选4个
      </div>
      <div class="st-ti-right">
        <span class="st-ti-btn" @click="goBack">换个场次</span>
      </div>
    </div> -->
    <!-- 提示结束 -->

    <!-- 座位标识开始 -->
    <div class="st-id">
      <div class="st-id-in">
        <div class="st-id-lable">
          <span class="ignore-seat seat-1"></span>
          <label class="ignore-label">可选</label>
        </div>
        <!-- <div class="st-id-lable">
          <span class="ignore-seat seat-0">×</span>
          <label class="ignore-label">维修</label>
        </div> -->
        <div class="st-id-lable">
          <span class="ignore-seat seat-2"></span>
          <label class="ignore-label">已选</label>
        </div>
        <div class="st-id-lable">
          <span class="ignore-seat seat-3"></span>
          <label class="ignore-label">已售</label>
        </div>
        <div class="st-id-lable">
          <span class="ignore-seat seat-4"></span>
          <span class="ignore-seat seat-5"></span>
          <label class="ignore-label">情侣</label>
        </div>
      </div>
    </div>
    <!-- 座位标识结束 -->

    <!-- 座位选择开始 -->
    <div class="seats-wrapper-out-cont">

      <!-- 没有座位开始 -->
      <div class="noseats" v-show="noseats">
        <div class="cs-item" style="text-align: center;">
            <h4>
              本场次排期有误，请选择其他场次！
            </h4>
        </div>
      </div>
      <!-- 没有座位结束 -->

      <!-- 排号开始 -->
      <div class="seats-bor" :style="{'zoom': zoom}">
        <div class="seats-bor-item" v-for="(item, key) in borList" :key="key">
          <span class="ignore-bor-item" :style="{'font-size': (14/zoom > 26 ? 26 : 14/zoom )+ 'px'}">{{item}}</span>
        </div>
      </div>
      <!-- 排号结束 -->

      <div class="seats-wrapper-out" style="height: 360px;" ref='seatsOut' @scroll="ySetaScoll">
        <!-- 座位开始 -->
        <div class="seats-wrapper" v-finger:pinch="pinch" :style="{'zoom': zoom}">
        <!-- <div class="seats-wrapper"> -->
          <!-- 中心线开始 -->
          <div class="seats-wrapper-center-line"></div>
          <!-- 中心线结束 -->

          <!-- 屏幕开始 -->
          <div class="seats-screen">
            <div class="seats-screen-in">荧幕方向</div>
          </div>
          <!-- 屏幕结束 -->
          <div class="row" v-for="(seatList, key) in seatsObj" :key="key" >
            <a v-for="(seat,j) in seatList" :key="j">
              <span v-if="! seat.code" class="ignore-seat"></span>
              <!-- <span class="ignore-seat seat-0">×</span> -->
              <span @click="selectSeat(seat)" v-if="seat.code && seat.status == 1"  v-show="check.ids.indexOf(seat.code) < 0" class="ignore-seat seat-1"></span>
              <span @click="selectSeat(seat)" v-if="seat.code && seat.status == 1 && seat.type == 1" v-show="check.ids.indexOf(seat.code) >= 0" class="ignore-seat seat-2"></span>
              <span v-if="seat.code && seat.status == 0" class="ignore-seat seat-3"></span>
              <span @click="selectSeat(seat)" v-if="seat.code && seat.status == 1 && seat.type == 2 && seatList[j+1] && seat.loveCod == seatList[j+1].loveCod" v-show="check.ids.indexOf(seat.code) >= 0" class="ignore-seat seat-4"></span>
              <span @click="selectSeat(seat)" v-if="seat.code && seat.status == 1 && seat.type == 2 && seatList[j-1] && seat.loveCod == seatList[j-1].loveCod" v-show="check.ids.indexOf(seat.code) >= 0" class="ignore-seat seat-5"></span>
              <!-- <span class="ignore-seat seat-6"></span> -->
            </a>
          </div>
        </div>
        <!-- 座位结束 -->
      </div>
    </div>
    <!-- 座位选择结束 -->

    <!-- 选中的票开始 -->
    <div class="check-list">
      <ul>
        <li v-for="(item, index) in check.objs" :key="index" class="check-item">{{item.rowNum}}排{{item.colNum}}座</li>
      </ul>
    </div>
    <!-- 选中的票结束 -->

    <!-- 提交开始 -->
    <div class="updata-cont">
      <!-- <div class="updata-left">
        <input type="number">
      </div> -->
      <!-- <div class="updata-right" @click="generateOrder">
        确认提交
      </div> -->
      <div class="updata-right" @click="yanzhengPhone">
        确认提交
      </div>
    </div>
    <!-- 提交结束 -->

    <!-- 绑定手机号开始 -->
    <div class="bind-phone-out" v-show="make.show" @click="make.show = false">
      <div class="bind-phone-in" @click.stop="1">
        <div class="cs-item">
          <h4>温馨提示：</h4>
          <p>请认真确认手机号，此手机号用于接收电影取票码。</p>
        </div>

        <input class="bind-phone-input" v-model="make.phone" placeholder="请输入手机号（用于接收取票码）" type="number">
        
        <div class="bind-phone-btn" @click="bindPhone">确认手机号</div>
      </div>
    </div>
    <!-- 绑定手机号结束 -->

  </div>
</template>

<script>
export default {
  name: 'MovieSeat',
  components: {
    
  },
  data () {
    return {
      noseats: false,
      movie: '', // 影片名称
      film: {}, // 排位详情
      seats: [], // 座位数据
      seatsObj: [], // 处理后座位数据
      check: {
        height: 0, // 选座区域高度
        ids: [], // 选中的ID
        objs: [], // 选中的组座位
      },
      // 缩放事件
      zoom: 1,
      minZoom: 1, // 最小缩放
      lastZoom: 1,
      // 补充信息
      make: {
        phone: '',
        show: false,
      },
      borList: {}, // 排号列表
      borTop: 0, // 向上便宜距离

      user: {}, // 用户信息
    }
  },
  created () {

    this.getListCinemaHallSeat();
    if(window.localStorage.getItem('movieField')){
      let obj = JSON.parse(window.localStorage.getItem('movieField'));
      this.film = obj.film;
      this.movie = obj.movie
    }else{
      this.$router.push('/movieCinema');
    }

  },
  methods: {
    // 验证有没有手机号
    yanzhengPhone () {
      let vm = this;
      if(this.check.ids.length == 0){
        vm.$toast('请选择座位');
        return false;
      }
      this.$http.get('/v1/checkPhone').then(function (response) {
          if(response.data.code == '1000'){
            if(! response.data.result){
              vm.make.show = true;
            }else{
              vm.make.phone =  response.data.result
              vm.make.show = true;
              // vm.generateOrder()
            }
          }else{
            vm.make.show = true;
          }
      })
      .catch(function (error) {
          vm.$toast('请求超时，请稍后再试！')
      });
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
    // 绑定手机号
    bindPhone () {
      let vm = this;
      if(this.make.phone + '' == ''){
          this.$toast('请输入手机号码')
          return false;
      }else if(! this.isPhone(this.make.phone + '')){
          this.$toast('手机号码格式错误')
          return false;
      }
      let postData = { 
        id: '',
        phone: this.make.phone,
        nickname:  '',
        imageUrl:  ''
      }
      this.$store.commit('ctrlLoader', true)
      this.$http.post('/v1/updateUser', postData).then(function (response) {
          vm.$store.commit('ctrlLoader', false)
          if(response.data.code == '1000'){
            vm.$init.user.phone = vm.make.phone;
            
            vm.generateOrder()
          }else{
              vm.$toast(response.data.msg)
          }
      })
      .catch(function (error) {
        vm.$store.commit('ctrlLoader', false)
          vm.$toast('请求超时，请稍后再试！')
      });
    },
    // 缩放事件
    pinch (e) {
      if(e.zoom == 1){
        this.lastZoom = this.zoom;
      }
      let zoomNum = e.zoom*this.lastZoom;
      
      if(zoomNum < this.minZoom){
        zoomNum = this.minZoom
      }else if(zoomNum > 3){
        zoomNum = 3
      }
      this.zoom = zoomNum; 
    },
    // 生成订单
    generateOrder () {
      let vm = this;
      if(this.check.ids.length == 0){
        vm.$toast('请选择座位');
        return false;
      }
      let cinemaHallSeatNames = []
      this.check.objs.forEach((e, i) => {
        cinemaHallSeatNames.push(e.rowNum+'排'+e.colNum+'座');
      })
      
      let postData = {
        "filmShowId": this.$route.params.id,
        "cinemaHallSeatIds": this.check.ids.join(','),
        'cinemaHallSeatNames': cinemaHallSeatNames.join(',')
      }
      this.$store.commit('ctrlLoader', true)
      this.$http.post('/panda-cinema-api/v1/generateOrder', postData, this.$init.channel.movie).then(function (response) {
        vm.$store.commit('ctrlLoader', false)
        if(response.data.code == '1000'){
          vm.$router.push('/moviePay/' + response.data.result)
        }else{
          vm.$toast(response.data.msg)
        }
      })
      .catch(function (error) {
        vm.$store.commit('ctrlLoader', false)
        vm.$toast('请求超时，请稍后再试！')
      });
    },
    // 选择座位
    selectSeat (obj) {
      let vm = this;
      if(obj.type != 2){
        if(vm.check.ids.indexOf(obj.code)  < 0){
          if(vm.check.ids.length >= 4){
            vm.$toast('最多选择4个座位')
            return false;
          }else{
            vm.addOrDelSeat(obj, 'add');
          }
        }else{
          vm.addOrDelSeat(obj, 'del');
        }
      }else{
        if(vm.check.ids.indexOf(obj.code)  < 0){
          vm.seats.forEach((e, i) => {
            if(e.loveCode == obj.loveCode){
              vm.addOrDelSeat(e, 'add');
            }
          })
        }else{
          vm.seats.forEach((e, i) => {
            if(e.loveCode == obj.loveCode){
              vm.addOrDelSeat(e, 'del');
            }
          })
        }
      }
    },
    // 添加删除座位计算
    addOrDelSeat (obj, type) {
      if(type == 'add'){
        this.check.ids.push(obj.code)
        this.check.objs.push(obj);
      }else{
        let idArr = [];
        this.check.ids.forEach((e, i) => {
          if(e != obj.code){
            idArr.push(e)
          }
        })
        this.check.ids = idArr;
        let objArr = [];
        this.check.objs.forEach((e, i) => {
          if(e.code != obj.code){
            objArr.push(e)
          }
        })
        this.check.objs = objArr;
      }
    },
    // 获得影厅座位图
    getListCinemaHallSeat () {
      let vm = this;
      this.$http.get('/panda-cinema-api/v1/listCinemaHallSeat/'+this.$route.params.id, this.$init.channel.movie).then(function (response) {
        if(response.data.code == '1000'){
          if(response.data.result){
            vm.seats = response.data.result;
          }else{
            vm.seats = [];
            vm.noseats = true;
          }
          // 验证情侣座 2109-02-28
          // var loveSet = false;
          // vm.seats.forEach(function(e, i){
          //   if(e.loveCode){
          //     loveSet = true;
          //   }
          // })
          // if(loveSet){
          //   vm.$toast('排期错误');
          //   return;
          // }

          vm.seatsFormat();
        }else{
          vm.noseats = true;
          vm.$toast(response.data.msg)
        }
      })
      .catch(function (error) {
        vm.$toast('请求超时，请稍后再试！')
      });
    },
    // 作为数据处理
    seatsFormat () {
      let xMin; // x轴最小值
      let xMax; // x轴最大值
      let yMin; // y轴最小值
      let yMax; // Y轴最大值
      let obj = {}; // 格式化数据
      let borObj = {}; // 排号列表
      this.popo(this.seats).forEach((e, i) => {
        // 添加格式化数据
        if(obj['x'+e.xcoord]){
          obj['x'+e.xcoord].push(e)
        }else{
          obj['x'+e.xcoord] = [];
          obj['x'+e.xcoord].push(e)
        }
        // 计算X轴最小值
        if(xMin === undefined){
          xMin = e.xcoord
        }else if(xMin > e.xcoord){
          xMin = e.xcoord
        }
        // 计算X轴最大值
        if(xMax === undefined){
          xMax = e.xcoord
        }else if(xMax < e.xcoord){
          xMax = e.xcoord
        }
        // 计算y轴最小值
        if(yMin === undefined){
          yMin = e.ycoord
        }else if(yMin > e.ycoord){
          yMin = e.ycoord
        }
        // 计算y轴最大值
        if(yMax === undefined){
          yMax = e.ycoord
        }else if(yMax < e.ycoord){
          yMax = e.ycoord
        }
      })
      // console.log('xMin' + xMin)
      // console.log('xMax' + xMax)
      // console.log('yMin' + yMin)
      // console.log('yMax' + yMax)

      let newObj = {}
      // 补充空闲
      for(let x = xMin; x < xMax+1; x++){
        if(! obj['x'+x]){
          obj['x'+x] = [];
        }
        for(let y = yMin; y< yMax+1; y++){
          if(! obj['x'+x][y-yMin]){
            obj['x'+x].splice(y-yMin, 0, {xcoord: x, ycoord: y, rowNum: 0});
          }else if(obj['x'+x][y-yMin].ycoord != y){
            obj['x'+x].splice(y-yMin, 0, {xcoord: x, ycoord: y, rowNum: 0});
          }
        }
        newObj['x'+x] = obj['x'+x];

        borObj['x'+x] = ''
        obj['x'+x].forEach((e, i) => {
          if(e.rowNum){
            borObj['x'+x] = e.rowNum
          }
        })
      }
      // 赋值
      this.seatsObj = newObj;
      this.borList = borObj;

      // 渲染完成计算高度
      let vm = this;
      this.$nextTick(function(){
        let height = document.querySelector('.seats-wrapper').offsetHeight;
        let width = document.querySelector('.seats-wrapper').offsetWidth;
        let outWidth = document.querySelector('.seats-wrapper-out').offsetWidth;
        // console.log(document.querySelector('.seats-wrapper-out'));
        vm.minZoom = outWidth / width;
        vm.zoom = outWidth / width;
      })
    },
    // 数组按 横坐标, 纵坐标排序
    popo (arr) {
      var obj = {}
      for(let i = 0; i< arr.length; i++){
        for(let j = 0; j<arr.length-i-1; j++){
          if(arr[j].xcoord > arr[j+1].xcoord){
            obj = arr[j];
            arr[j] = arr[j+1];
            arr[j+1] = obj;
          }else if(arr[j].xcoord == arr[j+1].xcoord && arr[j].ycoord > arr[j+1].ycoord){
            obj = arr[j];
            arr[j] = arr[j+1];
            arr[j+1] = obj;
          }
        }
      }
      return arr;
    },
    // 返回上一页
    goBack () {
      this.$router.back(-1);
    },
    // 竖向移动
    ySetaScoll () {
      let vm = this;
      let top = document.querySelector('.seats-wrapper-out').scrollTop;
      let borTop = top / vm.zoom;
      document.querySelector('.seats-bor').style['margin-top'] = '-' + borTop + 'px'
    },
  },
  filters: {
    // 播放类型
    showTypeToStr (vlaue) {
      if(vlaue == 1){
        return '2D'
      }else if(vlaue == 2){
        return '3D'
      }else if(vlaue == 3){
        return 'MAX2D'
      }else if(vlaue == 4){
        return 'MAX3D'
      }else if(vlaue == 6){
        return 'DMAX'
      }else{
        return ''
      }
    },
    // 时间格式化
    dateFormat (shijianchuo) {
      function add0(m){return m<10?'0'+m:m }
      var time = new Date(shijianchuo *1000);
      var y = time.getFullYear();
      var m = time.getMonth()+1;
      var d = time.getDate();
      var h = time.getHours();
      var mm = time.getMinutes();
      var s = time.getSeconds();
      return y+'-'+add0(m)+'-'+add0(d)+' '+add0(h)+':'+add0(mm)+':'+add0(s);
    }
  }
}
</script>

<style scoped>
.container{
  background-color: #fff;
  /* padding-top: 85px; */
  padding-bottom: 100px;
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
.bind-phone-in .cs-item{
  padding: 10px 0;
  border: none;
}
.cs-item{
  padding: 10px 24px;
  border-bottom: 1px solid #e6e6e6;
}
.cs-item h4{
  font-size: 36px;
  /* color: #4d4d4d; */
  line-height: 60px;
  /* padding-left: 40px; */
  position: relative;
  font-weight: 700;
  /* color: #818181; */
}
.cs-item p{
  font-size: 27px;
  /* color: #bababa; */
  line-height: 44px;
  /* padding: 10px 0; */
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
  position: absolute;
  top: 9px;
  left: 0;
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
  position: absolute;
  top: 9px;
  left: 0;
}

.st-ti{
  padding: 12px 20px;
  border-bottom: 1px solid #e6e6e6;
  display: flex;
  line-height: 70px;
  font-size: 24px;
  color: #4d4d4d;
}
.st-ti-left{
  flex: 10;
}
.st-ti-btn{
  display: block;
  padding: 0 20px;
  border: 1px solid #00a8ec;
  border-radius: 6px;
  color: #00a8ec;
}

.st-id{
  font-size: 0;
  display: flex;
  padding: 20px 0;
  border-bottom: 1px solid #e6e6e6;
}
.st-id-in{
  margin: 0 auto;
  display: flex;
}
.ignore-seat{
  display: inline-block;
  height: 20px;
  width: 30px;
  line-height: 20px;
  overflow: hidden;
  text-align: center; 
  font-size: 14px;
  background-position: 0px 0px;
}
.st-id-lable{
  display: inline-block;
  border: 1px solid transparent;
  display: flex;
}
.ignore-label{
  font-size: 12px;
  line-height: 20px;
  display: inline-block;
  height: 20px;
}

.seat-0{
  background: url(../assets/movie/setas-o.png);
  background-size: 100%;
}
.seat-1{
  background: url(../assets/movie/setas-o.png);
  background-size: 100%;
}
.seat-2{
  background: url(../assets/movie/setas-on.png);
  background-size: 100%;
}
.seat-3{
  background: url(../assets/movie/setas-un.png);
  background-size: 100%;
}
.seat-4{
  background: url(../assets/movie/seats-love-0.png);
  background-size: 100%;
}
.seat-5{
  background: url(../assets/movie/seats-love-1.png);
  background-size: 100%;
}
.row a{
  font-size: 0;
  line-height: 0;
}
.seats-wrapper-out{
  overflow: auto;
  box-sizing: border-box;
  padding: 20px 20px 20px 60px;
  width: 100%;
  background-color: #ededed;
  z-index: 1;
   /* -webkit-overflow-scrolling: touch; */
}
.seats-wrapper{
  white-space:nowrap;
  text-align: center;
}
.seats-wrapper .row{
  white-space:nowrap;
  text-align: center;
  margin-bottom: 14px;
  font-size: 0;
}

.updata-cont{
  position: fixed;
  bottom: 0;
  width: 100%;
  display: flex;
  z-index: 10;
}
.updata-left{
  flex: 10;
  background-color: #f8f8f8;
  padding: 16px;
}
.updata-right{
  width: 100%;
  text-align: center;
  line-height: 100px;
  color: #fff;
  background-color: #00a8ec;
  font-size: 28px;
}
.updata-left input{
  box-sizing: border-box;
  background-color: #fff;
  line-height: 48px;
  display: block;
  padding: 10px;
  width: 100%;
  background-color: #fff;
  border: none;
  outline: none;
  border-radius: 4px;
}
/* 荧幕 */
.seats-screen{
  text-align: center;
  padding-bottom: 40px;
}
.seats-screen-in{
  display: inline-block;
  width: 90%;
  height: 50px;
  line-height: 50px;
  background-color: #DCDCDC;
  border-radius: 0 0 100% 100%;
}
/* 中心线 */
.seats-wrapper-center-line{
  position: absolute;
  z-index: -1;
  width: 0;
  height: 100%;
  top: 0;
  left: 50%;
  margin-left: 20px;
  border-left: 1px dashed #999;
  box-sizing: border-box;
  border-top: 40px solid transparent;
}

.seats-wrapper-out{
  position: relative;
  width: 100%;
  overflow: auto;
}
.seats-wrapper-out-cont{
  width: 100%;
  overflow: hidden;
  position: relative;
}
.seats-wrapper{
  position: absolute;
  z-index: 10;
  top: 0;
  left: 0;
  min-width: 100%;
  box-sizing: border-box;
  padding: 0 20px 0 60px;
}
/* 选中的票 */
.check-list{
  padding: 20px 0 0 20px;
}
.check-item{
  display: inline-block;
  line-height: 50px;
  font-size: 24px;
  border: 1px solid #00a8ec;
  padding: 0 20px;
  margin-right: 20px;
  margin-bottom: 20px;
  border-radius: 6px;
  color: #00a8ec;
}
/* 绑定手机号 */
.bind-phone-out{
  position: absolute;
  height: 100%;
  width: 100%;
  left: 0;
  top: 0;
  z-index: 20;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items:center;/*垂直居中*/
  justify-content: center;/*水平居中*/
}
.bind-phone-in{
  width: 80%;
  box-sizing: border-box;
  padding: 20px;
  background-color: #fff;
}
.bind-phone-input{
  display: block;
  box-sizing: border-box;
  border: none;
  border-bottom: 1px solid #00a8ec;
  padding: 12px 0px;
  line-height: 40px;
  width: 100%;
  font-size: 27px;
}
.bind-phone-btn{
  display: block;
  line-height: 66px;
  font-size: 27px;
  text-align: center;
  color: #fff;
  background-color: #00a8ec;
  margin-top: 20px;
}

/* 排号开始 */
.seats-bor{
  position: absolute;
  z-index: 10;
  width: 4.6%;
  top: 80px;
  left: 10px;
  background-color: rgba(0, 0, 0, 0.4);
  border-radius: 20px;
  overflow: hidden;
  color: #fff;
  text-align: center;
  padding-top: 10px;
}
.seats-bor-item{
  margin-bottom: 14px;
  width: 100%;
}
.ignore-bor-item{
  display: block;
  height: 20px;
  width: 100%;
  line-height: 20px;
  overflow: hidden;
  text-align: center;
  font-size: 14px;
}
.noseats{
  position: absolute;
  left: 0;
  top: 40%;
  z-index: 200;
  width: 100%;
}
</style>
