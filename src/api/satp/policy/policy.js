import request from '@/utils/request'

// 列表
export function policyList(data) {
  return request({
    url: '/proxy/satp/policy/policyListData',
    method: 'post',
    data
  })
}
// 新增
export function addPolicy(data) {
  return request({
    url: '/proxy/satp/policy/addPolicy',
    method: 'post',
    data
  })
}
// 修改
export function updatePolicy(data) {
  return request({
    url: '/proxy/satp/policy/updatePolicy',
    method: 'post',
    data
  })
}
// 单个查询
export function findPolicy(data) {
  return request({
    url: '/proxy/satp/policy/findPolicy',
    method: 'post',
    data
  })
}
// 查询编码序列
export function findPolicyNum() {
  return request({
    url: '/proxy/satp/policy/findPolicyNum',
    method: 'post'
  })
}
// 生效
export function policyEffect(data) {
  return request({
    url: '/proxy/satp/policy/policyEffect',
    method: 'post',
    data
  })
}
// 失效
export function policyInvalid(data) {
  return request({
    url: '/proxy/satp/policy/policyInvalid',
    method: 'post',
    data
  })
}
// 获取下拉列表
export function getDictList() {
  return request({
    url: '/proxy/satp/policy/getDictList',
    method: 'post'
  })
}

// 导出模板
export function exportPolicyTemplate(data) {
  return request({
    url: '/proxy/satp/policy/exportPolicyTemplate',
    method: 'post',
    data,
    responseType: 'blob'
  })
}

// 导出
export function exportPolicy(data) {
  return request({
    url: '/proxy/satp/policy/exportPolicy',
    method: 'post',
    data,
    responseType: 'blob'
  })
}

// 导入
export function importPolicy(data) {
  return request({
    url: '/proxy/satp/policy/importPolicy',
    method: 'post',
    headers: { 'Content-Type': 'multipart/form-data' },
    data
  })
}

// 策略管理合规项列表
export function itemList(data) {
  return request({
    url: '/proxy/satp/policy/itemList',
    method: 'post',
    data
  })
}
