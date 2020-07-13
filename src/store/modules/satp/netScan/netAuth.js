/* eslint-disable no-undef */
import { netAuthList, addNetAuth, updateNetAuth, findNetAuth, deleteNetAuth } from '@/api/satp/netScan/netAuth'

const actions = {
  // user login
  netAuthList({ commit }, params) {
    //
    return new Promise((resolve, reject) => {
      netAuthList(
        params
      ).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  addNetAuth({ commit }, params) {
    return new Promise((resolve, reject) => {
      addNetAuth(
        params
      ).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  updateNetAuth({ commit }, params) {
    return new Promise((resolve, reject) => {
      updateNetAuth(
        params
      ).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  findNetAuth({ commit }, params) {
    return new Promise((resolve, reject) => {
      findNetAuth(
        params
      ).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  deleteNetAuth({ commit }, params) {
    return new Promise((resolve, reject) => {
      deleteNetAuth(
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

