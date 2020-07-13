import request from '@/utils/request'

export function delFileUpLoad(data) {
  return request({
    url: '/proxy/rbac/base/delFileUpload',
    method: 'post',
    data
  })
}
export function downloadFile(data) {
  return request({
    url: '/proxy/rbac/base/downloadFile',
    method: 'post',
    data,
    responseType: 'blob'
  })
}
export function querySysInformListByPage(data) {
  return request({
    url: '/proxy/rbac/base/querySysInformListByPage',
    method: 'post',
    data
  })
}

