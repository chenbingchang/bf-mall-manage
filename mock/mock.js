import Mock from 'mockjs'
import mode from './mode'

Mock.mock('/mock/getWheelImgList', 'post', mode.wheelImg.list)
