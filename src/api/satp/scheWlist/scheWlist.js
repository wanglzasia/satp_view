import request from '@/utils/request'

// 列表
export function scheWlistList(data) {
  return request({
    url: '/proxy/satp/scheWlist/scheWlistListData',
    method: 'post',
    data
  })
}
// 新增
export function addScheWlist(data) {
  return request({
    url: '/proxy/satp/scheWlist/addScheWlist',
    method: 'post',
    data
  })
}
// 修改
export function updateScheWlist(data) {
  return request({
    url: '/proxy/satp/scheWlist/updateScheWlist',
    method: 'post',
    data
  })
}
// 单个查询
export function findScheWlist(data) {
  return request({
    url: '/proxy/satp/scheWlist/findScheWlist',
    method: 'post',
    data
  })
}
// 删除
export function deleteScheWlist(data) {
  return request({
    url: '/proxy/satp/scheWlist/deleteScheWlist',
    method: 'post',
    data
  })
}

// 授权审批
export function approval(data) {
  return request({
    url: '/proxy/satp/scheWlist/approval',
    method: 'post',
    data
  })
}

export function findScheWlistByUpdateId(data) {
  return request({
    url: '/proxy/satp/scheWlist/findScheWlistByUpdateId',
    method: 'post',
    data
  })
}
