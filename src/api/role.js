import request from '@/utils/request'

export function roleList(data) {
  return request({
    url: '/proxy/rbac/role/roleList',
    method: 'post',
    data
  })
}
export function menus(data) {
  return request({
    url: '/proxy/rbac/role/menus',
    method: 'post',
    data
  })
}
export function add(data) {
  return request({
    url: '/proxy/rbac/role/add',
    method: 'post',
    data
  })
}
export function modify(data) {
  return request({
    url: '/proxy/rbac/role/modify',
    method: 'post',
    data
  })
}
export function removeRole(data) {
  return request({
    url: '/proxy/rbac/role/delete',
    method: 'post',
    data
  })
}
