import { add, modify, deleteMenu, funcs, menuList } from '@/api/menu'
import qs from 'qs'

const actions = {
  add({ commit }, params) {
    const { parentId, name, url, path, icon, desc, component, type, hidden, redirect, idx } = params
    return new Promise((resolve, reject) => {
      add(
        qs.stringify({
          parentId: parentId,
          name: name,
          url: url,
          path: path,
          icon: icon,
          desc: desc,
          component: component,
          hidden: hidden,
          redirect: redirect,
          type: type,
          idx: idx
        })
      ).then(result => {
        resolve(result)
      }).catch(error => {
        reject(error)
      })
    })
  },
  modify({ commit }, params) {
    const { name, url, path, icon, desc, component, id, hidden, redirect, idx } = params
    return new Promise((resolve, reject) => {
      modify(
        qs.stringify({
          id: id,
          name: name,
          url: url,
          path: path,
          icon: icon,
          desc: desc,
          component: component,
          hidden: hidden,
          redirect: redirect,
          idx: idx
        })
      ).then(result => {
        resolve(result)
      }).catch(error => {
        reject(error)
      })
    })
  },
  delete({ commit }, params) {
    const { menuId } = params
    return new Promise((resolve, reject) => {
      deleteMenu(
        qs.stringify({
          menuId: menuId
        })
      ).then(result => {
        resolve(result)
      }).catch(error => {
        reject(error)
      })
    })
  },
  funcs({ commit }, params) {
    // console.log(params)
    return new Promise((resolve, reject) => {
      funcs(params).then(result => {
        resolve(result)
      }).catch(error => {
        reject(error)
      })
    })
  },
  menuList({ commit }, params) {
    return new Promise((resolve, reject) => {
      menuList(params).then(result => {
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
