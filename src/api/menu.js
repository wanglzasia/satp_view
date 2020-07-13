import request from '@/utils/request'

export function add(data) {
  return request({
    url: '/proxy/rbac/menu/add',
    method: 'post',
    data
  })
}
export function modify(data) {
  return request({
    url: '/proxy/rbac/menu/modify',
    method: 'post',
    data
  })
}
export function deleteMenu(data) {
  return request({
    url: '/proxy/rbac/menu/delete',
    method: 'post',
    data
  })
}
export function funcs(data) {
  return request({
    url: '/proxy/rbac/menu/funcs',
    method: 'post',
    data
  })
}
export function menuList(data) {
  return request({
    url: '/proxy/rbac/menu/list',
    method: 'post',
    data
  })
}
