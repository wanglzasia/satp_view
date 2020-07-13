import request from '@/utils/request'

// 列表
export function itemList(data) {
  return request({
    url: '/proxy/satp/item/itemListData',
    method: 'post',
    data
  })
}
// 新增
export function addItem(data) {
  return request({
    url: '/proxy/satp/item/addItem',
    method: 'post',
    data
  })
}
// 修改
export function updateItem(data) {
  return request({
    url: '/proxy/satp/item/updateItem',
    method: 'post',
    data
  })
}
// 单个查询
export function findItem(data) {
  return request({
    url: '/proxy/satp/item/findItem',
    method: 'post',
    data
  })
}
// 查询编码序列
export function findItemNum() {
  return request({
    url: '/proxy/satp/item/findItemNum',
    method: 'post'
  })
}
// 生效
export function itemEffect(data) {
  return request({
    url: '/proxy/satp/item/itemEffect',
    method: 'post',
    data
  })
}
// 失效
export function itemInvalid(data) {
  return request({
    url: '/proxy/satp/item/itemInvalid',
    method: 'post',
    data
  })
}
// 导出模板
export function exportItemTemplate(data) {
  return request({
    url: '/proxy/satp/item/exportItemTemplate',
    method: 'post',
    data,
    responseType: 'blob'
  })
}

// 导出
export function exportItem(data) {
  return request({
    url: '/proxy/satp/item/exportItem',
    method: 'post',
    data,
    responseType: 'blob'
  })
}

// 导入
export function importItem(data) {
  return request({
    url: '/proxy/satp/item/importItem',
    method: 'post',
    headers: { 'Content-Type': 'multipart/form-data' },
    data
  })
}

// 合规项关联合规策略列表
export function policyList(data) {
  return request({
    url: '/proxy/satp/item/policyList',
    method: 'post',
    data
  })
}

// 合规项关联合规策略
export function saveItemPolicy(data) {
  return request({
    url: '/proxy/satp/item/saveItemPolicy',
    method: 'post',
    data
  })
}
// 合规项取消关联合规策略
export function deleteItemPolicy(data) {
  return request({
    url: '/proxy/satp/item/deleteItemPolicy',
    method: 'post',
    data
  })
}
// 合规项关联合规策略数量
export function itemTemplateCount(data) {
  return request({
    url: '/proxy/satp/item/itemTemplateCount',
    method: 'post',
    data
  })
}
// 合规项适用对象类型列表
export function codeList() {
  return request({
    url: '/proxy/satp/item/codeList',
    method: 'post'
  })
}

