import http from '@/api/axios'

/**
 * 获取csrftoken
 */
function getCsrfToken () {
  console.log('获取csrfToken')
  return http.get('/csrfToken')
}

/**
 * 上传图片
 */
function uploadImg (data) {
  return http.post('/upload/img', data)
}

/**
 * 获取lodash
 */
function secrectAes () {
  return http.get('/secrect/aes')
}

export {
  getCsrfToken,
  uploadImg,
  secrectAes,
}
