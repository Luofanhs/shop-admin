import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
// 引入elementUI的样式
import 'element-ui/lib/theme-chalk/index.css'

import axios from 'axios'
// 把axios放在vue的原型上
Vue.prototype.axios = axios
// 设置axios全集的baseURL,只要设置了全局的base_url，后面的请求会自动拼接上base_url
axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'

// 请求拦截器，用于给请求头默认添加Authorization
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  console.log(config)
  config.headers.Authorization = localStorage.getItem('token')
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  console.log(response)
  return response.data
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error)
})

Vue.use(ElementUI)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
