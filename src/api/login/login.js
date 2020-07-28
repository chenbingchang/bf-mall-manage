import http from '@/api/axios'

/**
 * 登录
 * @param {Object} data 登录的信息
 * @returns {Object} 登录结果
 */
function login (data) {
  return http.post('/manage/login', data, {})
}

export {
  login,
}
