<template>
  <div id="app">
    <div class="app-back">
      <i class="iconfont" @click="goback">&#xe60d;</i> 在线选座
    </div>
    <router-view></router-view>
    <Loader v-show="$store.state.loader"></Loader>
  </div>
</template>

<script>
import Loader from './components/Loader'
export default {
  name: 'App',
  components: {
    Loader
  },
  methods: {
    goback () {
      this.$router.back(-1);
      // this.$router.push('/movieHome');
    }
  }
}
</script>

<style>
@font-face {
  font-family: 'iconfont';  /* project id 711237 */
  src: url('//at.alicdn.com/t/font_711237_d6r1otyf66j.eot');
  src: url('//at.alicdn.com/t/font_711237_d6r1otyf66j.eot?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/font_711237_d6r1otyf66j.woff2') format('woff2'),
  url('//at.alicdn.com/t/font_711237_d6r1otyf66j.woff') format('woff'),
  url('//at.alicdn.com/t/font_711237_d6r1otyf66j.ttf') format('truetype'),
  url('//at.alicdn.com/t/font_711237_d6r1otyf66j.svg#iconfont') format('svg');
}
.iconfont{
  font-family:"iconfont" !important;
  font-size:16px;font-style:normal;
  -webkit-font-smoothing: antialiased;
  -webkit-text-stroke-width: 0.2px;
  -moz-osx-font-smoothing: grayscale;
}
body,div,dl,dt,dd,ul,ol,li,h1,h2,h3,h4,h5,h6,pre,code,form,fieldset,legend,input,button,textarea,p,blockquote,th,td { margin:0; padding:0;}
body { background:#fff; color: #989898; font-size:24px; font-family: "Microsoft YaHei", Helvetica, Arial, sans-serif;}
td,th,caption { font-size:24px;}
h1, h2, h3, h4, h5, h6 { font-weight:normal; font-size:100%; color: #222222;}
address, caption, cite, code, dfn, em, strong, th, var {font-style:normal; font-weight:normal;}
a { color:#555; text-decoration:none; }
a:link { text-decoration: none;}
a:active { text-decoration:none;}
a:hover { text-decoration:none;} 
a:visited { text-decoration: none;}
img { border:none;}
ol,ul,li { list-style:none;}
input, textarea, select, button { font:14px Verdana,Helvetica,Arial,sans-serif;caret-color:#00a8ec;}
table { border-collapse:collapse;}
.clearfix:after {content: "."; display: block; height:0; clear:both; visibility: hidden;}
.clearfix { *zoom:1; }
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none !important;
  margin: 0;
}
html,body{
  height: 100%;
  width: 100%;
  overflow: hidden;
  box-sizing: border-box;
}
#app{
  height: 100%;
  width: 100%;
  overflow: hidden;
  box-sizing: border-box;
  /* overflow: auto; */
  /* overflow: auto;
  -webkit-overflow-scrolling: touch;
  position: absolute;
  height: 100%;
  width: 100%;
  left: 0;
  top: 0; */
  padding-top: 88px;
}
.app-back{
  line-height: 88px;
  background-color: #fff;
  position: absolute;
  top: 0;
  left: 0;
  height: 88px;
  width: 100%;
  box-sizing: border-box;
  padding: 0 20px;
  z-index: 9999;
  border-bottom: 1px solid #eee;
  text-align: center;
  font-size: 27px;
}
.app-back .iconfont{
  float: left;
  font-size: 32px;
}
.container{
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  /* overflow-x: hidden;
  overflow-y: auto; */
  overflow: auto;
  -webkit-overflow-scrolling: touch;
}
.container-content{
  height: 100%;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
}
.red{
  color: #ff4403;
}
.on{
  color: #00a8ec;
}
figure{
  margin: 0;
}

/* 溢出省略号 */
.unoverflow{
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
}
/* 无数据 */
.noData{
  line-height: 60px;
  text-align: center;
  color: #999;
  font-size: 24px;
}

/* 宽高比容器 */
.aspectratio{
  position: relative;
}
.aspectratio::before{ 
  content: '';
  display: block; 
  width: 1px; 
  margin-left: -1px; 
  height: 0; 
}
.aspectratio-content{
  position: absolute; 
  top: 0; 
  left: 0; 
  right: 0; 
  bottom: 0; 
  width: 100%; 
  height: 100%;
}
[w-1-1]{
  aspect-ratio: '1:1';
}
</style>
