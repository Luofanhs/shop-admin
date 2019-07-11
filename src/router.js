import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from './components/Login.vue'
import Index from './components/Index.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/index' },
    { path: '/index', component: Index },
    { path: '/login', component: Login }
  ]
})
// 导航守卫：用于拦截未登录的用户
// from: 从哪来
// to：到哪去
// next:可以通过
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  if (to.path === '/login' || token) {
    next()
  } else {
    next('/login')
  }
})

export default router
