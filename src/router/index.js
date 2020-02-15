import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/home' },
  { path: '/home', component: Home },
]

const router = new VueRouter({
  mode: 'history',
  routes,
  base: '/fymap/', // 生产环境打包设置
})

export default router