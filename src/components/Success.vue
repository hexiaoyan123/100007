<template>
  <div class="container">
    <header>操作成功</header>
    <div class="base-info success">
      <figure class="img" :class="{'just':just }">
        <img src="../assets/success.png" alt />
      </figure>
      <h2>操作成功</h2>
    </div>
    <div class="base-btn-cont" v-if="orderNum.indexOf('V') > -1">
      <a :href="$init.homeLink">
        <span class="base-btn">返回首页</span>
      </a>
    </div>
    <div class="base-btn-cont" v-else>
      <a :href="$init.homeLink2">
        <span class="base-btn">返回首页</span>
      </a>
    </div>
    <!-- <span>orderNum：{{orderNum}}</span> -->
    <div class="base-more">
      <p>您的操作已成功，如有问题请拨打</p>
      <a href="tel:4000101515">
        <h3>
          客服热线：
          <span>400 010 1515</span>
        </h3>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "Success",
  data() {
    return {
      just: false,

      // 订单号
      orderNum: ""
    };
  },
  created() {
    // 订单号
    this.orderNum = this.$init.user.orderNum;
    if (!this.orderNum) {
      this.orderNum = this.$cookies.get("orderNum");
    }
  },
  mounted() {
    let vm = this;
    setTimeout(function() {
      vm.just = true;
    }, 100);
  },
  methods: {}
};
</script>

<style scoped>
.container {
  text-align: center;
}
header {
  color: #ffffff;
  font-size: 28px;
  line-height: 85px;
  background-color: #00a8ec;
}
.base-info {
  padding-top: 170px;
}
.base-info .img {
  display: block;
  margin: 0 auto;
  height: 170px;
  transform: rotateY(180deg);
  transition: all 0.6s;
}
.base-info .img img {
  display: inline-block;
  height: 100%;
}
.base-info .just {
  transform: rotateY(0deg);
}
.success h2 {
  font-size: 50px;
  color: #2dbc83;
  line-height: 126px;
}
.base-btn {
  display: inline-block;
  width: 160px;
  line-height: 60px;
  border: 1px solid #dddddd;
  border-radius: 6px;
  font-size: 26px;
  color: #a8a8a8;
}
.base-more {
  color: #bababa;
}
.base-more p {
  font-size: 24px;
  line-height: 36px;
  color: #bababa;
}
.base-more h3 {
  font-size: 28px;
  line-height: 54px;
  color: #bababa;
}
.base-btn-cont {
  padding: 170px 0;
}
</style>
