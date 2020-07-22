import axios from 'axios'
import { Message } from 'element-ui'

const http = axios.create({
  baseURL: '/api', // 代理
  timeout: 10000,
})

// 请求拦截器
http.interceptors.request.use(function (config) {
  console.log(document.cookie)
  // 后台需要的防csrf攻击的token头
  config.headers['x-csrf-token'] = window.$cookies.get('csrfToken')

  return config
}, function (err) {
  console.log(err)
  Message({
    type: 'error',
    showClose: true, // 显示手动关闭按钮
    message: '请求异常！',
    duration: 2000, // 延迟1秒后关闭
    customClass: 'common-toast',
  })

  return Promise.reject(err)
})

// 返回拦截器
http.interceptors.response.use(function (response) {
  // 只返回data
  return response.data
}, function (err) {
  console.log(err)
  Message({
    type: 'error',
    showClose: true, // 显示手动关闭按钮
    message: '服务异常！',
    duration: 2000, // 延迟1秒后关闭
    customClass: 'common-toast',
  })

  return Promise.reject(err)
})

export default http
