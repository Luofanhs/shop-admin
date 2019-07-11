import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
// 引入elementUI的样式
import 'element-ui/lib/theme-chalk/index.css'

// import axios from 'axios'
// // 把axios放在vue的原型上
// Vue.prototype.axios = axios
// // 设置axios全集的baseURL,只要设置了全局的base_url，后面的请求会自动拼接上base_url
// axios.defaults.baseUrl = 'http://localhost:8888/api/private/v1/'

Vue.use(ElementUI)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
