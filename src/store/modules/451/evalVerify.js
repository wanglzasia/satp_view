/* eslint-disable no-undef */
import { loadEvalVerifyList, verifyAdd, safetyAdd, findTetongList, safetyResult } from '@/api/451/evalVerify'
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
  loadEvalVerifyList({ commit }, params) {
    //
    return new Promise((resolve, reject) => {
      loadEvalVerifyList(
        params
      ).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  verifyAdd({ commit }, params) {
    //
    return new Promise((resolve, reject) => {
      verifyAdd(
        params
      ).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  safetyAdd({ commit }, params) {
    //
    return new Promise((resolve, reject) => {
      safetyAdd(
        params
      ).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  findTetongList({ commit }, params) {
    //
    return new Promise((resolve, reject) => {
      findTetongList(
        params
      ).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  safetyResult({ commit }, params) {
    //
    return new Promise((resolve, reject) => {
      safetyResult(
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
