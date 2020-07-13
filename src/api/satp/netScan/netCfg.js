import request from '@/utils/request'

// 列表
export function netCfgList(data) {
  return request({
    url: '/proxy/satp/netCfg/netCfgListData',
    method: 'post',
    data
  })
}
// 新增
export function addNetCfg(data) {
  return request({
    url: '/proxy/satp/netCfg/addNetCfg',
    method: 'post',
    data
  })
}
// 修改
export function updateNetCfg(data) {
  return request({
    url: '/proxy/satp/netCfg/updateNetCfg',
    method: 'post',
    data
  })
}
// 单个查询
export function findNetCfg(data) {
  return request({
    url: '/proxy/satp/netCfg/findNetCfg',
    method: 'post',
    data
  })
}
// 删除
export function deleteNetCfg(data) {
  return request({
    url: '/proxy/satp/netCfg/deleteNetCfg',
    method: 'post',
    data
  })
}

// 导入
export function importNetCfg(data) {
  return request({
    url: '/proxy/satp/netCfg/importNetCfg',
    method: 'post',
    headers: { 'Content-Type': 'multipart/form-data' },
    data
  })
}

// 导出
export function exportNetCfg(data) {
  return request({
    url: '/proxy/satp/netCfg/exportNetCfg',
    method: 'post',
    data,
    responseType: 'blob'
  })
}

// 导出模板
export function exportTemplate(data) {
  return request({
    url: '/proxy/satp/netCfg/exportTemplate',
    method: 'post',
    data,
    responseType: 'blob'
  })
}
