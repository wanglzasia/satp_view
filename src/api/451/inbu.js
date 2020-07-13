import request from '@/utils/request'

// 列表
export function loadInbuList(data) {
  return request({
    url: '/proxy/satpHlj/inbu/loadInbuList',
    method: 'post',
    data
  })
}
export function listInbuTypes(data) {
  return request({
    url: '/proxy/satpHlj/inbu/inbuTypeTree',
    method: 'post',
    data
  })
}
export function addInbu(data) {
  return request({
    url: '/proxy/satpHlj/inbu/addInbu',
    method: 'post',
    data
  })
}
export function inbuTypeList(data) {
  return request({
    url: '/proxy/satpHlj/inbu/inbuTypeList',
    method: 'post',
    data
  })
}
export function inbuTypeChildren(data) {
  return request({
    url: '/proxy/satpHlj/inbu/inbuTypeChildren',
    method: 'post',
    data
  })
}
export function inbuTypeAdd(data) {
  return request({
    url: '/proxy/satpHlj/inbu/inbuTypeAdd',
    method: 'post',
    data
  })
}
export function inbuTypeModify(data) {
  return request({
    url: '/proxy/satpHlj/inbu/inbuTypeModify',
    method: 'post',
    data
  })
}
export function inbuTypeDelete(data) {
  return request({
    url: '/proxy/satpHlj/inbu/inbuTypeDelete',
    method: 'post',
    data
  })
}
