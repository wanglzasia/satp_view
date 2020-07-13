import request from '@/utils/request'

// 列表
export function policyFileList(data) {
  return request({
    url: '/proxy/satpHlj/system/policyFileListData',
    method: 'post',
    data
  })
}
export function findPolicyFile(data) {
  return request({
    url: '/proxy/satpHlj/system/findPolicyFile',
    method: 'post',
    data
  })
}
export function addPolicyFile(data) {
  return request({
    url: '/proxy/satpHlj/system/addPolicyFile',
    method: 'post',
    data
  })
}
export function updatePolicyFile(data) {
  return request({
    url: '/proxy/satpHlj/system/updatePolicyFile',
    method: 'post',
    data
  })
}
export function deletePolicyFile(data) {
  return request({
    url: '/proxy/satpHlj/system/deletePolicyFile',
    method: 'post',
    data
  })
}
export function listFileTypes(data) {
  return request({
    url: '/proxy/satpHlj/system/fileTypeTree',
    method: 'post',
    data
  })
}
export function fileTypeAdd(data) {
  return request({
    url: '/proxy/satpHlj/system/fileTypeAdd',
    method: 'post',
    data
  })
}
export function fileTypeModify(data) {
  return request({
    url: '/proxy/satpHlj/system/fileTypeModify',
    method: 'post',
    data
  })
}
export function fileTypeDelete(data) {
  return request({
    url: '/proxy/satpHlj/system/fileTypeDelete',
    method: 'post',
    data
  })
}
