import request from '@/utils/request'

export function add(data) {
  return request({
    url: '/proxy/rbac/org/add',
    method: 'post',
    data
  })
}
export function modify(data) {
  return request({
    url: '/proxy/rbac/org/modify',
    method: 'post',
    data
  })
}
export function deleteOrg(data) {
  return request({
    url: '/proxy/rbac/org/delete',
    method: 'post',
    data
  })
}
export function list(data) {
  return request({
    url: '/proxy/rbac/org/list',
    method: 'post',
    data
  })
}
