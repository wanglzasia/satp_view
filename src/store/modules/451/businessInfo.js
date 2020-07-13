/* eslint-disable no-undef */
import { loadBussinessList, findBusinessInfo, addBusinessInfo, modifyBusinessInfo, deleteBusinessInfo, loadRightBussinessList, loadLeftBussinessList, findBusinessInfoByBussId } from '@/api/451/businessInfo'
import { getToken } from '@/utils/auth'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    roles: []
  }
}

const state = getDefaultState()

const mutations = {
}

const actions = {
  loadBussinessList({ commit }, params) {
    //
    return new Promise((resolve, reject) => {
      loadBussinessList(
        params
      ).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  loadLeftBussinessList({ commit }, params) {
    //
    return new Promise((resolve, reject) => {
      loadLeftBussinessList(
        params
      ).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  loadRightBussinessList({ commit }, params) {
    //
    return new Promise((resolve, reject) => {
      loadRightBussinessList(
        params
      ).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  findBusinessInfo({ commit }, params) {
    //
    return new Promise((resolve, reject) => {
      findBusinessInfo(
        params
      ).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  findBusinessInfoByBussId({ commit }, params) {
    //
    return new Promise((resolve, reject) => {
      findBusinessInfoByBussId(
        params
      ).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  addBusinessInfo({ commit }, params) {
    //
    return new Promise((resolve, reject) => {
      addBusinessInfo(
        params
      ).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  modifyBusinessInfo({ commit }, params) {
    //
    return new Promise((resolve, reject) => {
      modifyBusinessInfo(
        params
      ).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  deleteBusinessInfo({ commit }, params) {
    //
    return new Promise((resolve, reject) => {
      deleteBusinessInfo(
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
  state,
  mutations,
  actions
}
