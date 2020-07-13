import { add, modify, deleteOrg, list } from '@/api/org'
import qs from 'qs'

const actions = {
  add({ commit }, params) {
    const { parentId, name } = params
    return new Promise((resolve, reject) => {
      add(
        qs.stringify({
          parentId: parentId,
          name: name
        })
      ).then(result => {
        resolve(result)
      }).catch(error => {
        reject(error)
      })
    })
  },
  modify({ commit }, params) {
    const { name, id } = params
    return new Promise((resolve, reject) => {
      modify(
        qs.stringify({
          id: id,
          name: name
        })
      ).then(result => {
        resolve(result)
      }).catch(error => {
        reject(error)
      })
    })
  },
  delete({ commit }, params) {
    const { orgId } = params
    return new Promise((resolve, reject) => {
      deleteOrg(
        qs.stringify({
          orgId: orgId
        })
      ).then(result => {
        resolve(result)
      }).catch(error => {
        reject(error)
      })
    })
  },
  list({ commit }, params) {
    // console.log(params)
    return new Promise((resolve, reject) => {
      list().then(result => {
        resolve(result)
      }).catch(error => {
        reject(error)
      })
    })
  },
  searchList({ commit }, params) {
    // console.log(params)
    const { orgName } = params
    return new Promise((resolve, reject) => {
      list(
        qs.stringify({
          name: orgName
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
