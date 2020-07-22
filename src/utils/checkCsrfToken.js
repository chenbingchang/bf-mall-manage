import 'vue-cookies'
import { getCsrfToken } from '@/api/common/common'

async function checkCsrfToken () {
  // 如果没有csrfToken，则先调一个请求，后台会返回csrfToken
  if (!window.$cookies.get('csrfToken')) {
    await getCsrfToken()
  }
}

checkCsrfToken()
