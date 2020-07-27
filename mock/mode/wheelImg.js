import Mock from 'mockjs'

const Random = Mock.Random

Random.string()

function list (req) {
  console.log(req)
  const body = JSON.parse(req.body)

  const data = Mock.mock({
    [`list|${body.pageSize}`]: [
      {
        id: '@string("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789", 32, 32)',
        startTime: '@datetime()',
        endTime: '@datetime()',
      },
    ],
    pageIndex: body.pageIndex,
    pageSize: body.pageSize,
    total: body.pageSize * 28,
  })

  return {
    // 8位（3、3、2）subCode，，前3位为模块，中间3位为功能，最后2位位状态，从数字和大写字母中挑选
    subCode: '00200100',
    msg: '',
    data,
  }
}

export default {
  list,
}
