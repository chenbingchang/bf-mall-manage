import http from '@/api/axios'

/**
 * 查询首页图片轮播图片列表
 * @param {Object} data 查询信息
 * @returns {Object} 列表信息
 */
function getWheelImgList (data) {
  return http.post('/getWheelImgList', data, {
    baseURL: '/mock',
  })
}

export {
  getWheelImgList,
}
