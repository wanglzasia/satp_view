import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/proxy/rbac/user/login',
    method: 'post',
    data
  })
}

export function getInfo() {
  return request({
    url: '/proxy/rbac/user',
    method: 'post'
  })
}

export function getMenuInfo() {
  return request({
    url: '/proxy/rbac/satp/menu',
    method: 'post'
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}

export function userList(data) {
  return request({
    url: '/proxy/rbac/user/list',
    method: 'post',
    data
  })
}
export function roleList() {
  return request({
    url: '/proxy/rbac/role/list',
    method: 'post'
  })
}
export function modify(data) {
  return request({
    url: '/proxy/rbac/user/modify',
    method: 'post',
    data
  })
}
export function password(data) {
  return request({
    url: '/proxy/rbac/user/password',
    method: 'post',
    data
  })
}
export function status(data) {
  return request({
    url: '/proxy/rbac/user/status',
    method: 'post',
    data
  })
}
export function add(data) {
  return request({
    url: '/proxy/rbac/user/add',
    method: 'post',
    data
  })
}
export function remove(data) {
  return request({
    url: '/proxy/rbac/user/remove',
    method: 'post',
    data
  })
}
export function removeUsers(data) {
  return request({
    url: '/proxy/rbac/user/removeUsers',
    method: 'post',
    data
  })
}

export function getOrgTree(data) {
  return request({
    url: '/proxy/rbac/user/getOrgTree',
    method: 'post',
    data
  })
}

