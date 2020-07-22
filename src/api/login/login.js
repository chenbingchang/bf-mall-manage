import http from '@/api/axios'

function login (data) {
  return http.post('/manage/login', data, {})
}

export {
  login,
}
