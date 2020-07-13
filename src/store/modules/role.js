import { roleList, menus, add, modify, removeRole } from '@/api/role'
import qs from 'qs'
const actions = {
  roleList({ commit }, params) {
    // console.log(params)
    return new Promise((resolve, reject) => {
      roleList(JSON.parse(JSON.stringify(params))).then(result => {
        resolve(result)
      }).catch(error => {
        reject(error)
      })
    })
  },
  menus({ commit }, params) {
    // console.log(params)
    return new Promise((resolve, reject) => {
      menus(params).then(result => {
        resolve(result)
      }).catch(error => {
        reject(error)
      })
    })
  },
  add({ commit }, params) {
    const { roleName, roleCode, desc, checkIds, checkFuncIds } = params
    return new Promise((resolve, reject) => {
      add(
        qs.stringify({
          roleName: roleName,
          roleCode: roleCode,
          desc: desc,
          checkIds: JSON.stringify(checkIds),
          checkFuncIds: JSON.stringify(checkFuncIds)
        })
      ).then(result => {
        resolve(result)
      }).catch(error => {
        reject(error)
      })
    })
  },
  modify({ commit }, params) {
    const { roleId, roleName, desc, menusIds, funcsIds } = params
    return new Promise((resolve, reject) => {
      modify(
        qs.stringify({
          roleId: roleId,
          roleName: roleName,
          desc: desc,
          menusIds: JSON.stringify(menusIds),
          funcsIds: JSON.stringify(funcsIds)
        })
      ).then(result => {
        resolve(result)
      }).catch(error => {
        reject(error)
      })
    })
  },
  delete({ commit }, params) {
    const { roleId } = params
    return new Promise((resolve, reject) => {
      removeRole(
        qs.stringify({
          roleId: roleId
        })
      ).then(result => {
        resolve(result)
      }).catch(error => {
        reject(error)
      })
    })
  }
}
export default {
  namespaced: true,
  actions
}
