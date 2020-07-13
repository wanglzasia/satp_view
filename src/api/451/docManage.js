import request from '@/utils/request'

// 列表
export function policyFileList(data) {
  return request({
    url: '/proxy/satpHlj/doc/policyFileListData',
    method: 'post',
    data
  })
}
export function findPolicyFile(data) {
  return request({
    url: '/proxy/satpHlj/doc/findPolicyFile',
    method: 'post',
    data
  })
}
export function addPolicyFile(data) {
  return request({
    url: '/proxy/satpHlj/doc/addPolicyFile',
    method: 'post',
    data
  })
}
export function updatePolicyFile(data) {
  return request({
    url: '/proxy/satpHlj/doc/updatePolicyFile',
    method: 'post',
    data
  })
}
export function deletePolicyFile(data) {
  return request({
    url: '/proxy/satpHlj/doc/deletePolicyFile',
    method: 'post',
    data
  })
}
export function listFileTypes(data) {
  return request({
    url: '/proxy/satpHlj/doc/fileTypeTree',
    method: 'post',
    data
  })
}
export function fileTypeAdd(data) {
  return request({
    url: '/proxy/satpHlj/doc/fileTypeAdd',
    method: 'post',
    data
  })
}
export function fileTypeModify(data) {
  return request({
    url: '/proxy/satpHlj/doc/fileTypeModify',
    method: 'post',
    data
  })
}
export function fileTypeDelete(data) {
  return request({
    url: '/proxy/satpHlj/doc/fileTypeDelete',
    method: 'post',
    data
  })
}
