import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'
import store from './store'
import BfScrollbar from '@components/common/BfScrollbar'
import VueCookies from 'vue-cookies'
import { COOKIE_KEY } from '@utils/constants'
import '@utils/checkCsrfToken'

Vue.config.productionTip = false
// elementui全局配置
Vue.use(ElementUI, { size: 'small' })
// VueCookies
Vue.use(VueCookies)
// 全局滚动条组件
Vue.component('bf-scrollbar', BfScrollbar)

// 判断是否登录
router.beforeEach((to, from, next) => {
  const userId = window.$cookies.get(COOKIE_KEY.userId)

  if (!userId) {
    // 没有登录
    if (['Login', '404'].includes(to.name)) {
      next()
    } else {
      // 没有登录跳转到登陆页面
      next({ name: 'Login' })
    }
  } else {
    // 已登录
    next()
  }
})

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
