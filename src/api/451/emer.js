import request from '@/utils/request'

// 发起
export function selfCheckAdd(data) {
  return request({
    url: '/proxy/satpHlj/emer/emerAdd',
    method: 'post',
    data
  })
}
// 填报
export function selfCheckFlowAdd(data) {
  return request({
    url: '/proxy/satpHlj/selfCheck/selfCheckFlowAdd',
    method: 'post',
    data
  })
}
// 查询
export function findselfCheckFlowById(data) {
  return request({
    url: '/proxy/satpHlj/selfCheck/findselfCheckFlowById',
    method: 'post',
    data
  })
}
// 审核
export function auditOpr(data) {
  return request({
    url: '/proxy/satpHlj/selfCheck/auditOpr',
    method: 'post',
    data
  })
}
// 加载明细
export function loadselfCheckFlow(data) {
  return request({
    url: '/proxy/satpHlj/selfCheck/loadselfCheckFlow',
    method: 'post',
    data
  })
}
