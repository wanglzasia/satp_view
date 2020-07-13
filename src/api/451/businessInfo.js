import request from '@/utils/request'

// 列表
export function loadBussinessList(data) {
  return request({
    url: '/proxy/satpHlj/businessInfo/loadBussinessList',
    method: 'post',
    data
  })
}
// 左边栏列表
export function loadLeftBussinessList(data) {
  return request({
    url: '/proxy/satpHlj/businessInfo/loadLeftBussinessList',
    method: 'post',
    data
  })
}
// 右边栏列表
export function loadRightBussinessList(data) {
  return request({
    url: '/proxy/satpHlj/businessInfo/loadRightBussinessList',
    method: 'post',
    data
  })
}
// 获取业务信息
export function findBusinessInfo(data) {
  return request({
    url: '/proxy/satpHlj/businessInfo/findBusinessInfo',
    method: 'post',
    data
  })
}
// 获取业务信息
export function findBusinessInfoByBussId(data) {
  return request({
    url: '/proxy/satpHlj/businessInfo/findBusinessInfoByBussId',
    method: 'post',
    data
  })
}
// 添加业务信息
export function addBusinessInfo(data) {
  return request({
    url: '/proxy/satpHlj/businessInfo/addBusinessInfo',
    method: 'post',
    data
  })
}
// 修改业务信息
export function modifyBusinessInfo(data) {
  return request({
    url: '/proxy/satpHlj/businessInfo/modifyBusinessInfo',
    method: 'post',
    data
  })
}
// 删除业务信息
export function deleteBusinessInfo(data) {
  return request({
    url: '/proxy/satpHlj/businessInfo/deleteBusinessInfo',
    method: 'post',
    data
  })
}
