import request from '@/utils/request'

// 列表
export function loadBadInfo(data) {
  return request({
    url: '/proxy/satpHlj/badInfo/loadBadInfo',
    method: 'post',
    data
  })
}
// 新增不良信息
export function addBadInfo(data) {
  return request({
    url: '/proxy/satpHlj/badInfo/addBadInfo',
    method: 'post',
    data
  })
}
// 查询不良信息
export function findBadInfo(data) {
  return request({
    url: '/proxy/satpHlj/badInfo/findBadInfo',
    method: 'post',
    data
  })
}
// 导出模板
export function exportTemplate(data) {
  return request({
    url: '/proxy/satpHlj/badInfo/exportTemplate',
    method: 'post',
    data,
    responseType: 'blob'
  })
}
// 导入
export function importBadInfo(data) {
  return request({
    url: '/proxy/satpHlj/badInfo/importBadInfo',
    method: 'post',
    headers: { 'Content-Type': 'multipart/form-data' },
    data
  })
}

