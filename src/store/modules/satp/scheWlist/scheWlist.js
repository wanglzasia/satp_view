/* eslint-disable no-undef */
import { scheWlistList, addScheWlist, updateScheWlist, findScheWlist, deleteScheWlist, approval, findScheWlistByUpdateId } from '@/api/satp/scheWlist/scheWlist'

const actions = {
  // user login
  scheWlistList({ commit }, params) {
    //
    return new Promise((resolve, reject) => {
      scheWlistList(
        params
      ).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  addScheWlist({ commit }, params) {
    return new Promise((resolve, reject) => {
      addScheWlist(
        params
      ).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  updateScheWlist({ commit }, params) {
    return new Promise((resolve, reject) => {
      updateScheWlist(
        params
      ).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  findScheWlist({ commit }, params) {
    return new Promise((resolve, reject) => {
      findScheWlist(
        params
      ).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  findScheWlistByUpdateId({ commit }, params) {
    return new Promise((resolve, reject) => {
      findScheWlistByUpdateId(
        params
      ).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  deleteScheWlist({ commit }, params) {
    return new Promise((resolve, reject) => {
      deleteScheWlist(
        params
      ).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  approval({ commit }, params) {
    return new Promise((resolve, reject) => {
      approval(
        params
      ).then(response => {
        resolve(response)
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

