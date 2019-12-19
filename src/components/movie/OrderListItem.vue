<template>
  <div>
    <div class="movie-item">
      <div class="movie-item-top" @click="goOrderDetails">
        <div class="movie-item-left">
          <p class="movie-item-left-d">选座票</p>
          <p class="movie-item-left-big">
            ¥ {{info.orderAmount | moneyFormat1}}<small>.{{info.orderAmount | moneyFormat2}}</small>
          </p>
          <div class="movie-item-left-stea on">{{info.dataStatus | typeToStr}}</div>
        </div>
        <div class="movie-item-right">
          <h3 class="unoverflow">{{info.filmName}} <small>{{info.quantity}}张</small></h3>
          <h4 class="unoverflow">{{info.showTime | timeToStr}}</h4>
          <p class="unoverflow">{{info.cinemaName}} {{info.cinemaHallName}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OrderMovieListItem',
  props: ['obj'],
  data () {
    return {
      timer: '00:00', // 倒计时时间
      show: true,
    }
  },
  methods: {
    // 查看订单
    goOrderDetails () {
      this.$router.push('/orderMovieDetails/'+this.info.id);
    },
    // 去支付
    goPlay () {
      this.$router.push('/moviePay/'+this.info.id);
    },
    // 刷新列表
    refresh () {
      this.$emit('refreshList', true);
    },
    // 取消订单
    cancelOrder () {
      let vm = this;
      this.$http.get('/panda-cinema-api/v1/cancelOrder/'+this.info.id).then(function (response) {
        if(response.data.code == '1000'){
          vm.refresh();
        }else{
          vm.$toast(response.data.msg)
        }
      })
      .catch(function (error) {
        vm.$toast('请求超时，请稍后再试！')
      });
    },
    // 立即支付
    // 倒计时
    resetTime (time) {
      let vm = this;
      //获取当前时间
      var date = new Date();
      var now = date.getTime();
      //设置截止时间
      var end = time*1000;
      if(end <= now){
        return false;
      }
      //时间差
      var leftTime = end-now;
      var timer = null;
      // 倒计时函数
      function countDown() {
        leftTime -= 1000;
        //定义变量 d,h,m,s保存倒计时的时间
        var d,h,m,s;
        if (leftTime>=0) {
          d = Math.floor(leftTime/1000/60/60/24);
          h = Math.floor(leftTime/1000/60/60%24);
          m = Math.floor(leftTime/1000/60%60);
          s = Math.floor(leftTime/1000%60);   
          
          if(m < 10){
            m = '0'+m
          }
          if(s <10){
            s = '0' + s
          }
          
          vm.timer = m+":"+s;
        }else{
          vm.timer = "00:00";
          clearInterval(timer);
        }
      }

      timer=setInterval(countDown,1000);
    }
  },
  computed: {
    info () {
      if(this.obj){
        this.resetTime(this.obj.overTime)
        return this.obj;
      }else{
        return {}
      }
    }
  },
  filters: {
    // 状态转字符串
    typeToStr (value) {
      if(value == 1){
        return '待付款'
      }else if(value == 2){
        return '待出票'
      }else if(value == 3){
        return '已出票'
      }else if(value == 4){
        return '已取消'
      }else if(value == 5){
        return '已失败'
      }else{
        return ''
      }
    },
    // 金钱格式化
    moneyFormat (value) {
      if(value){
        return (value/ 100).toFixed(2)
      }else if(value === 0){
        return 0
      }else{
        return ''
      }
    },
     moneyFormat1 (value){
      if(value){
        return ((value/ 100).toFixed(2)+'').split('.')[0]
      }else{
        return ''
      }
    },
    moneyFormat2 (value){
      if(value){
        return ((value/ 100).toFixed(2)+'').split('.')[1]
      }else{
        return ''
      }
    },
    // 时间格式化
    timeToStr (shijianchuo) {
      // function add0(m){return m<10?'0'+m:m }
      // var time = new Date(shijianchuo *1000);
      // var y = time.getFullYear();
      // var m = time.getMonth()+1;
      // var d = time.getDate();
      // var h = time.getHours();
      // var mm = time.getMinutes();
      // var s = time.getSeconds();
      // return y+'-'+add0(m)+'-'+add0(d)+' '+add0(h)+':'+add0(mm);
      var date = new Date(shijianchuo * 1000 + 8 * 3600 * 1000);
      return date.toJSON().substr(0, 19).replace('T', ' ');
    },
    // 放映类型转换
    showTypeToStr (value) {
      if(value == 1){
        return '2D'
      }else if(value == 2){
        return '3D'
      }else if(value == 3){
        return 'MAX2D'
      }else if(value == 4){
        return 'MAX3D'
      }else if(value == 6){
        return 'DMAX'
      }
    },
  }
}
</script>

<style scoped>
.movie-item{
  padding: 20px;
  background-color: #ffffff;
  border-radius: 6px;
  border-top: 10px solid #00a8ec;
  margin-bottom: 20px;
}
.movie-item-top{
  display: flex;
}
.movie-item-left{
  flex: 5;
  border-right: 1px dashed #eee;
  color: #222;
  text-align: center;
}
.movie-item-left-d{
  line-height: 36px;
  font-size: 36px;
  padding: 10px 0;
}
.movie-item-left-big{
  font-size: 36px;
  line-height: 36px;
  /* padding: 10px 0 10px 0; */
}
.movie-item-left-stea{
  font-size: 27px;
  padding-top: 10px;
}
.movie-item-right{
  width: 70%;
  padding-left: 20px;
}
.movie-item-right h3{
  /* color: #818181; */
  line-height: 36px;
  font-size: 36px;
  padding: 10px 0;
  font-weight: 700;
}
.movie-item-right h3 small{
  font-weight: 500;
}
.movie-item-right h4{
  color: #898989;
  line-height: 44px;
  font-size: 27px;
  /* padding: 10px 0; */
}
.movie-item-right p{
  font-size: 27px;
  line-height: 44px;
  /* padding: 18px 0 20px 0; */
  color: #999;
}
.movie-item-bottom{
  display: flex;
}
.movie-item-bottom-time{
  flex: 5;
  line-height: 72px;
  color: #424242;
  font-size: 26px;
}
.movie-item-bottom-ctrl{
  flex: 5.6;
  text-align: right;
  font-size: 26px;
}
.movie-btn-1{
  display: inline-block;
  width: 150px;
  height: 70px;
  line-height: 70px;
  text-align: center;
  font-size: 26px;
  line-height: 70px;
  border: 1px solid #00a8ec;
  border-radius: 6px;
  color: #00a8ec;
}
.movie-btn-2{
  display: inline-block;
  width: 150px;
  height: 70px;
  line-height: 70px;
  text-align: center;
  font-size: 26px;
  line-height: 70px;
  border: 1px solid #00a8ec;
  border-radius: 6px;
  margin-left: 20px;
  color: #fff;
  background-color: #00a8ec;
}
</style>

