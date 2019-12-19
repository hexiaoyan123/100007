// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import md5 from 'js-md5'
import App from './App'
import router from './router'
import store from './store'
import init from './common/init'
import axios from 'axios'
import vueFinger from 'vue-finger'
import VueCookies from 'vue-cookies'
import {
  List,
  Waterfall,
  Sku,
  Picker,
  SwitchCell,
  Actionsheet,
  Rate,
  Row,
  Col,
  Icon,
  Swipe,
  SwipeItem,
  Lazyload,
  Toast,
  Popup,
  Tab,
  Tabs,
  AddressList,
  AddressEdit,
  Area,
  RadioGroup,
  Radio,
  Field,
  Cell,
  CellGroup,
  GoodsAction,
  GoodsActionBigBtn,
  GoodsActionMiniBtn
} from 'vant'

Vue.use(List).use(Waterfall).use(Sku).use(Picker).use(SwitchCell).use(Actionsheet).use(Rate).use(Row).use(Col).use(Icon).use(Swipe).use(SwipeItem).use(Lazyload).use(Toast).use(Popup).use(Tab).use(Tabs).use(AddressList).use(AddressEdit).use(Area).use(RadioGroup).use(Radio).use(Field).use(Cell).use(CellGroup).use(GoodsAction).use(GoodsActionBigBtn).use(GoodsActionMiniBtn)
Vue.use(vueFinger)
Vue.use(VueCookies)

Vue.config.productionTip = false

Vue.prototype.$axios = axios
Vue.prototype.$init = init
Vue.prototype.$md5 = md5
Vue.prototype.$http = {
  post(url, data, channel) {
    return axios({
      method: 'post',
      baseURL: init.ip,
      url: url,
      data: data,
      timeout: 0,
      transformResponse: [function (data) {
        if (data && typeof (data) == 'string') {
          let dataObj = JSON.parse(data)
          if (dataObj.msg && dataObj.msg.indexOf('您没有登录，请登录！') >= 0) {
            window.location.href = init.homeLink
          }
          return dataObj
        } else {
          return data
        }
      }],
      headers: {
        // 'Content-Type': 'application/json;charset=UTF-8',
        // 'Channel-Id': channel ? channel : init.channel.index
        'Content-Type': 'application/json;charset=UTF-8',
        'Channel-ID': init.channelId,
        'Access-Token': init.user.token ? init.user.token : init.channelId
      }
    })
  },
  get(url, channel) {
    return axios({
      method: 'get',
      baseURL: init.ip,
      url: url,
      timeout: 0,
      transformResponse: [function (data) {
        if (data && typeof (data) == 'string') {
          let dataObj = JSON.parse(data)
          if (dataObj.msg && dataObj.msg.indexOf('您没有登录，请登录！') >= 0) {
            window.location.href = init.homeLink
          }
          return dataObj
        } else {
          return data
        }
      }],
      headers: {
        // 'Channel-Id': channel ? channel : init.channel.index
        'Content-Type': 'application/json;charset=UTF-8',
        'Channel-ID': init.channelId,
        'Access-Token': init.user.token ? init.user.token : init.channelId
      }
    })
  }
}

router.beforeEach((to, from, next) => {
  // 显示loader
  // store.commit('showLoader')
  // 权限设置
  if (to.query.token && to.query.token != '') {
    if (to.query.token === 'null') {
      next('/noAuthority')
    } else {
      Vue.prototype.$init.user.token = to.query.token
      axios.defaults.headers['Access-Token'] = to.query.token
      VueCookies.set('sccessToken', to.query.token, '10000MIN')

      Vue.prototype.$init.user.orderNum = to.query.orderNum
      VueCookies.set('orderNum', to.query.orderNum, '10000MIN')
      // // 获得用户信息
      // Vue.prototype.$http.get('/panda-common-oauth/oauth2/getUser').then(function (response) {
      //   if (response.data.code === '1000') {
      //     Vue.prototype.$init.user.id = response.data.result.id
      //     Vue.prototype.$init.user.nickname = response.data.result.nickname
      //     Vue.prototype.$init.user.imageUrl = response.data.result.imageUrl
      //     console.log(Vue.prototype.$init.user)
      //     VueCookies.set('user', JSON.stringify(Vue.prototype.$init.user), '10000MIN')
      //     next()
      //   }
      // })
      next()
    }
    // next()
  } else if (Vue.prototype.$init.user.token) {
    if (VueCookies.isKey('sccessToken')) {
      axios.defaults.headers['Access-Token'] = VueCookies.get('sccessToken')
      next()
    } else {
      VueCookies.set('sccessToken', Vue.prototype.$init.user.token, '10000MIN')
      axios.defaults.headers['Access-Token'] = VueCookies.get('sccessToken')
      next()
      // Vue.prototype.$http.get('/panda-common-oauth/oauth2/refreshToken/' + Vue.prototype.$init.user.refreshToken).then(function (response) {
      //   if (response.data.code === '1000') {
      //     VueCookies.set('sccessToken', response.data.result.accessToken, '100MIN')
      //     axios.defaults.headers['Access-Token'] = VueCookies.get('sccessToken')
      //     next()
      //   } else {
      //     next('/movieHome')
      //   }
      // })
    }
  } else if (VueCookies.isKey('sccessToken')) {
    axios.defaults.headers['Access-Token'] = VueCookies.get('sccessToken')
    Vue.prototype.$init.user.token = VueCookies.get('sccessToken')
    next()
    // Vue.prototype.$init.user = JSON.parse(VueCookies.get('user'))
    // if (VueCookies.isKey('sccessToken')) {
    //   axios.defaults.headers['Access-Token'] = VueCookies.get('sccessToken')
    //   next()
    // } else {
    //   Vue.prototype.$http.get('/panda-common-oauth/oauth2/refreshToken/' + Vue.prototype.$init.user.refreshToken).then(function (response) {
    //     if (response.data.code === '1000') {
    //       VueCookies.set('sccessToken', response.data.result.accessToken, '100MIN')
    //       axios.defaults.headers['Access-Token'] = VueCookies.get('sccessToken')
    //       next()
    //     } else {
    //       next('/movieHome')
    //     }
    //   })
    // }
  } else {
    next()
  }
})

router.afterEach((to, from) => {
  // 请空提示
  Toast.clear('clearAll')
  // title处理
  // if (to.name) {
  //   document.title = to.name
  // } else {
  //   document.title = '中票娱乐'
  // }
  // setTimeout(() => {
  //   // 隐藏loader
  //   store.commit('hidenLoader')
  // }, 300)
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
