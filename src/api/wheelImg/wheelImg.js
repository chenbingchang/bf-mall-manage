import http from '@/api/axios'

function getWheelImgList (data) {
  return http.post('/getWheelImgList', data, {
    baseURL: '/mock',
  })
}

export {
  getWheelImgList,
}
