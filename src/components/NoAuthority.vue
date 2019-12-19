<template>
  <div class="container">
    <div class="base-info fail">
      <figure class="img">
        <img src="../assets/fail.png" :class="{'just':just }" alt="">
      </figure>
      <h2>操作失败</h2>
    </div>
    <div class="base-btn-cont">
      <!-- <router-link to="/index">
        <span class="base-btn">返回首页</span>
      </router-link> -->
    </div>
    <div class="base-more">
      <p>获得权限失败, 请稍后重试, 如有问题请拨打</p>
      <a href="tel:4000101515">
        <h3>客服热线：<span>400 010 1515</span></h3>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Fail',
  data () {
    return {
      just: false
    }
  },
  mounted () {
    let vm = this;
    setTimeout(function(){
      vm.just = true;
    }, 100)
  },
  methods: {

  }
}
</script>

<style scoped>
.container{
  text-align: center;
}
header{
  color: #ffffff;
  font-size: 28px;
  line-height: 85px;
  background-color: #00a8ec;
}
.base-info{
  padding-top: 170px;
}
.base-info .img{
  display: block;
  margin: 0 auto;
  height: 170px;
  width: 170px;
  transform:rotateY(180deg);
  transition: all 0.6s;
}
.base-info .img img{
  height: 100%;
  width: 100%;
  display: block;
}
.base-info .just{
  transform: rotateY(0deg);
}
.fail h2{
  font-size: 50px;
  color: #ff5162;
  line-height: 126px;
}
.base-btn{
  display: inline-block;
  width: 160px;
  line-height: 60px;
  border: 1px solid #dddddd;
  border-radius: 6px;
  font-size: 26px;
  color: #a8a8a8;
}
.base-more{
  color: #bababa;
}
.base-more p{
  font-size: 24px;
  line-height: 36px;
  color: #bababa;
}
.base-more h3{
  font-size: 28px;
  line-height: 54px;
  color: #bababa;
}
.base-btn-cont{
  padding: 170px 0;
}
</style>
