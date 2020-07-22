import http from '@/api/axios'

function getCsrfToken () {
  console.log('获取csrfToken')
  return http.get('/csrfToken')
}

export {
  getCsrfToken,
}
