import Cookies from 'js-cookie'

const TokenKey = '111'
const RolesKey = '222'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function setRoles(roles) {
  return Cookies.set(RolesKey, roles)
}

export function getRoles() {
  return Cookies.get(RolesKey)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
