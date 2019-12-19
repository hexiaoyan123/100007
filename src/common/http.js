'use strict'
import axios from 'axios'
import init from './init'

export default {
  // post方法
  post(url, data) {
    return axios({
      method: 'post',
      baseURL: init.ip,
      url: url,
      data: data,
      timeout: 0,
      headers: {
        // 'Content-Type': 'application/json;charset=UTF-8',
        // 'Access-Token': init.user.token ? init.user.token : ''
        'Content-Type': 'application/json;charset=UTF-8',
        'Channel-ID': init.channelId,
        'Access-Token': init.user.token ? init.user.token : init.channelId
      }
    })
  },
  // get方法
  get: axios.create({
    method: 'get',
    baseURL: init.ip,
    headers: {
      // 'Access-Token': init.user.token ? init.user.token : ''
      'Content-Type': 'application/json;charset=UTF-8',
      'Channel-ID': init.channelId,
      'Access-Token': init.user.token ? init.user.token : init.channelId
    }
  })
}