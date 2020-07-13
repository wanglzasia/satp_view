import request from '@/utils/request'

// 列表
export function loadEvalVerifyList(data) {
  return request({
    url: '/proxy/satpHlj/evalVerify/loadEvalVerifyList',
    method: 'post',
    data
  })
}
// 核查
export function verifyAdd(data) {
  return request({
    url: '/proxy/satpHlj/evalVerify/verifyAdd',
    method: 'post',
    data
  })
}
// 核验
export function safetyAdd(data) {
  return request({
    url: '/proxy/satpHlj/evalVerify/safetyAdd',
    method: 'post',
    data
  })
}
// 查询特通人员
export function findTetongList(data) {
  return request({
    url: '/proxy/satpHlj/evalVerify/findTetongList',
    method: 'post',
    data
  })
}
// 核验结果
export function safetyResult(data) {
  return request({
    url: '/proxy/satpHlj/evalVerify/safetyResult',
    method: 'post',
    data
  })
}
