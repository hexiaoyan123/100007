<template>
  <div class="container address-list">
    <header>
      <span v-show="actionType == 'add'">添加收货地址</span>
      <span v-show="actionType == 'edit'">编辑收货地址</span>
      <div class="class-back" @click="goBack">
        <van-icon name="arrow-left" />
      </div>
    </header>
    
    <van-address-edit
      :area-list="areaList"
      show-set-default
      show-search-result
      :show-delete="actionType == 'edit'"
      :search-result="searchResult"
      :address-info="editAddress"
      :show-postal='false'
      @save="onSave"
      @delete="onDelete"
      @change-detail="onChangeDetail"
    />

    <van-cell-group>
      <van-field label="收货人" v-model="val" placeholder="名字" />
      <van-field label="联系电话" v-model="val" placeholder="手机号或固定电话" />
      <van-field label="收件地址" v-model="val" placeholder="选择地址" disabled />
      <van-field label="详细地址" v-model="val" placeholder="如街道、楼层、门牌号等" />
      <van-switch-cell title="设为默认地址" v-model="checked" />
    </van-cell-group>


  </div>
</template>

<script>
import area from '../common/area.js'
export default {
  name: 'AddressAdd',
  components: {
    
  },
  data () {
    return {
      actionType: this.$route.query.actionType, // 操作类型
      areaList: area, // 地址列表
      searchResult: [], // 详细地址模糊列表
      editAddress: {}, // 编辑地址

      val:'',
      checked: true,
    }
  },
  created () {
    // 编辑地址处理
    if(this.actionType == 'edit'){
      if(this.$init.editAddress){
        this.editAddress = this.$init.editAddress;
      }else{
        let editAddress = window.sessionStorage.getItem('editAddress')
        if(editAddress){
          this.editAddress = JSON.parse(editAddress);
        }
      }
      this.editAddress.address_detail = this.editAddress.more.address; // 详细地址
      let areaList = this.editAddress.more.areaName.split(' ');
      this.editAddress.province = areaList[0] ? areaList[0] : ''; // 省
      this.editAddress.city = areaList[1] ? areaList[1] : ''; // 市
      this.editAddress.county = areaList[2] ? areaList[2] : ''; // 区
    }

    // 获得地址
    this.getArea();

  },
  methods: {
    // 保存
    onSave(obj) {
      let vm = this;
      // 请求参数
      var postData = {
        "isDefault": obj.is_default ? 1 : 0,
        "consignee": obj.name,
        "phone": obj.tel,
        "areaName": obj.province + ' ' + obj.city + ' ' + obj.county,
        "address": obj.address_detail
      }
      var httpUrl = ''; // 请求地址
      if(this.actionType == 'edit'){
        httpUrl = '/panda-shop-api/wap/updateReceiver';
        postData.id = obj.id;
      }else{
        httpUrl = '/panda-shop-api/wap/saveReceiver'
      }
      this.$http.post(httpUrl, postData).then(function (response) {
        if(response.data.code == '1000'){
          vm.$router.back(-1);
        }else{
          vm.$toast(response.data.msg)
        }
      })
      .catch(function (error) {
        vm.$toast('请求超时，请稍后再试！')
      });
    },
    // 删除
    onDelete(val) {
      let vm = this;
      this.$http.get('/panda-shop-api/wap/delReceiver/'+ this.editAddress.id).then(function (response) {
        if(response.data.code == '1000'){
          vm.$router.back(-1);
        }else{
          vm.$toast(response.data.msg)
        }
      })
      .catch(function (error) {
        vm.$toast('请求超时，请稍后再试！')
      });
    },
    // 详细地址模糊搜索
    onChangeDetail(val) {
      this.searchResult = [];
    },
    // 返回上一页
    goBack () {
      this.$router.back(-1);
    },
    // 获得地址
    getArea (id) {
      let vm = this;
      if(! id){
        id = 0;
      }
      this.$http.get('/panda-shop-api/wap/getArea/'+ id).then(function (response) {
        if(response.data.code == '1000'){
          
        }else{
          vm.$toast(response.data.msg)
        }
      })
      .catch(function (error) {
        vm.$toast('请求超时，请稍后再试！')
      });
    }
  }
}
</script>

<style scoped>
header{
  /* position: absolute; */
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  font-size: 28px;
  color: #4d4d4d;
  line-height: 84px;
  text-align: center;
  border-bottom: 1px solid #dfdfdf;
}
.address-list{
  padding-top: 85px;
}
.class-back{
  position: absolute;
  width: 80px;
  height: 80px;
  line-height: 92px;
  top: 0;
  left: 0;
  text-align: center;
  font-size: 28px;
}
</style>

<style>
.van-button--primary{
  background-color: #00a8ec;
  border: 1px solid #00a8ec;
}
.van-switch--on{
  background-color: #00a8ec;
}
.van-cell__value input,
.van-cell__value textarea{
  font-size: 14px;
}
</style>
