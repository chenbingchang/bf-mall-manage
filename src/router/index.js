import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import(/* webpackChunkName: "Index" */ '@/views/Index.vue'),
    children: [
      {
        path: '/',
        alias: '/home',
        name: 'Home',
        component: () => import(/* webpackChunkName: "Home" */ '@/views/Home.vue'),
      },
      {
        path: '/adminUser',
        name: 'AdminUser',
        component: () => import(/* webpackChunkName: "AdminUser" */ '@/views/AdminUser.vue'),
      },
      {
        path: '/wheelImg',
        name: 'WheelImg',
        component: () => import(/* webpackChunkName: "WheelImg" */ '@/views/WheelImg.vue'),
      },
    ],
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "Login" */ '@/views/Login.vue'),
  },
  // 全不匹配的情况下，返回404，路由按顺序从上到下，依次匹配。最后一个*能匹配全部，
  {
    path: '*',
    name: '404',
    component: () => import(/* webpackChunkName: "404" */ '@/views/404.vue'),
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
