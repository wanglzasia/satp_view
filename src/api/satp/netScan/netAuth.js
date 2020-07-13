import request from '@/utils/request'

// 列表
export function netAuthList(data) {
  return request({
    url: '/proxy/satp/netAuth/netAuthListData',
    method: 'post',
    data
  })
}
// 新增
export function addNetAuth(data) {
  return request({
    url: '/proxy/satp/netAuth/addNetAuth',
    method: 'post',
    data
  })
}
// 修改
export function updateNetAuth(data) {
  return request({
    url: '/proxy/satp/netAuth/updateNetAuth',
    method: 'post',
    data
  })
}
// 单个查询
export function findNetAuth(data) {
  return request({
    url: '/proxy/satp/netAuth/findNetAuth',
    method: 'post',
    data
  })
}
// 删除
export function deleteNetAuth(data) {
  return request({
    url: '/proxy/satp/netAuth/deleteNetAuth',
    method: 'post',
    data
  })
}

// 授权审批
export function approval(data) {
  return request({
    url: '/proxy/satp/netAuth/approval',
    method: 'post',
    data
  })
}

// 查询授权审批
export function findNetAuthWithBusi(data) {
  return request({
    url: '/proxy/satp/netAuth/findNetAuthWithBusi',
    method: 'post',
    data
  })
}
