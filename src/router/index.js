import Vue from 'vue'
import Router from 'vue-router'
import Success from '@/components/Success'
import Fail from '@/components/Fail'
import NoAuthority from '@/components/NoAuthority'
import Error from '@/components/Error'
import AddressList from '@/components/AddressList'
import AddressListManage from '@/components/AddressListManage'
import AddressAdd from '@/components/AddressAdd'
import CardRecharge from '@/components/CardRecharge'
import CardBinding from '@/components/CardBinding'
import CardMerge from '@/components/CardMerge'
import CardRechargeMoney from '@/components/CardRechargeMoney'
import CardRechargeMoneyOk from '@/components/CardRechargeMoneyOk'
import CardMy from '@/components/CardMy'
import CardQuery from '@/components/CardQuery'
import CardInfo from '@/components/CardInfo'
import CardFlow from '@/components/CardFlow'
import CardSearch from '@/components/CardSearch'
import OrderPay from '@/components/OrderPay'
import OrderPayCheck from '@/components/OrderPayCheck'
import OrderPayOnceCard from '@/components/OrderPayOnceCard'
import OrderPayCashCard from '@/components/OrderPayCashCard'
import OrderList from '@/components/OrderList'
import OrderDetails from '@/components/OrderDetails'
import Home from '@/components/Home'
import MovieCinema from '@/components/MovieCinema'
import MovieC from '@/components/MovieC'
import MovieField from '@/components/MovieField'
import MovieSeat from '@/components/MovieSeat'
import MovieFilm from '@/components/MovieFilm'
import MovieHome from '@/components/MovieHome'
import MoviePay from '@/components/MoviePay'
import UserUpdata from '@/components/UserUpdata'
import OrderMovieDetails from '@/components/OrderMovieDetails'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/success',
      name: '操作成功',
      component: Success,
      meta: {
        power: false
      }
    },
    {
      path: '/fail',
      name: '操作失败',
      component: Fail,
      meta: {
        power: false
      }
    },
    {
      path: '/noAuthority',
      name: '无权限',
      component: NoAuthority,
      meta: {
        power: false
      }
    },
    {
      path: '/error',
      name: '系统异常',
      component: Error,
      meta: {
        power: false
      }
    },
    {
      path: '*',
      redirect: '/movieHome'
    },
    {
      path: '/addressList',
      name: '选择收货地址',
      component: AddressList,
      meta: {
        power: true
      }
    },
    {
      path: '/addressListManage',
      name: '管理收货地址',
      component: AddressListManage,
      meta: {
        power: true
      }
    },
    {
      path: '/addressAdd',
      name: '添加收货地址',
      component: AddressAdd,
      meta: {
        power: true
      }
    },
    {
      path: '/cardRecharge',
      name: '卡券充值',
      component: CardRecharge,
      meta: {
        power: true
      }
    },
    {
      path: '/cardRechargeMoney/:id',
      name: '卡券充值',
      component: CardRechargeMoney,
      meta: {
        power: true
      }
    },
    {
      path: '/cardRechargeMoneyOk/:id',
      name: '卡券充值',
      component: CardRechargeMoneyOk,
      meta: {
        power: true
      }
    },
    {
      path: '/cardBinding',
      name: '绑定卡券',
      component: CardBinding,
      meta: {
        power: true
      }
    },
    {
      path: '/cardSearch',
      name: '搜索卡券',
      component: CardSearch,
      meta: {
        power: true
      }
    },
    {
      path: '/cardMerge',
      name: '合并卡券',
      component: CardMerge,
      meta: {
        power: true
      }
    },
    {
      path: '/cardMy',
      name: '我的卡券',
      component: CardMy,
      meta: {
        power: true
      }
    },
    {
      path: '/cardFlow/:id',
      name: '卡券流水',
      component: CardFlow,
      meta: {
        power: true
      }
    },
    {
      path: '/cardQuery',
      name: '卡券查询',
      component: CardQuery,
      meta: {
        power: true
      }
    },
    {
      path: '/cardInfo',
      name: '卡券信息',
      component: CardInfo,
      meta: {
        power: true
      }
    },
    {
      path: '/orderMovieDetails/:id',
      name: '电影订单详情',
      component: OrderMovieDetails,
      meta: {
        power: true
      }
    },
    {
      path: '/orderPay/:id',
      name: '订单结算',
      component: OrderPay,
      meta: {
        power: true
      }
    },
    {
      path: '/orderPayCheck/:id',
      name: '订单结算',
      component: OrderPayCheck,
      meta: {
        power: true
      }
    },
    {
      path: '/orderPayOnceCard/:id',
      name: '次卡支付',
      component: OrderPayOnceCard,
      meta: {
        power: true
      }
    },
    {
      path: '/orderPayCashCard/:id',
      name: '现金卡支付',
      component: OrderPayCashCard,
      meta: {
        power: true
      }
    },
    {
      path: '/orderList',
      name: '订单结算',
      component: OrderList,
      meta: {
        power: true
      }
    },
    {
      path: '/orderDetails/:id',
      name: '订单详情',
      component: OrderDetails,
      meta: {
        power: true
      }
    },
    {
      path: '/home',
      name: '个人中心',
      component: Home,
      meta: {
        power: true
      }
    },
    {
      path: '/userUpdata',
      name: '个人中心',
      component: UserUpdata,
      meta: {
        power: true
      }
    },
    {
      path: '/movieCinema',
      name: '选择影院',
      component: MovieCinema,
      meta: {
        power: true
      }
    },
    {
      path: '/movieC/:id',
      name: '选择影院',
      component: MovieC,
      meta: {
        power: true
      }
    },
    {
      path: '/movieCinema/:id',
      name: '选择影院',
      component: MovieCinema,
      meta: {
        power: true
      }
    },
    {
      path: '/movieField/:id',
      name: '选择放映场次',
      component: MovieField,
      meta: {
        power: true
      }
    },
    {
      path: '/movieSeat/:id',
      name: '选择座位',
      component: MovieSeat,
      meta: {
        power: true
      }
    },
    {
      path: '/movieFilm/:id',
      name: '影片详情',
      component: MovieFilm,
      meta: {
        power: true
      }
    },
    {
      path: '/movieHome',
      name: '电影票',
      component: MovieHome,
      meta: {
        power: true
      }
    },
    {
      path: '/moviePay/:id',
      name: '电影票支付',
      component: MoviePay,
      meta: {
        power: true
      }
    }
  ]
})
