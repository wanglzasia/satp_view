/* eslint-disable no-undef */
import { loadEvalList, addEval, updateEval, loadEvalutionInfo, saveEval, findEvalInfo } from '@/api/451/evalInfo'
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
  loadEvalList({ commit }, params) {
    //
    return new Promise((resolve, reject) => {
      loadEvalList(
        params
      ).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  addEval({ commit }, params) {
    //
    return new Promise((resolve, reject) => {
      addEval(
        params
      ).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  updateEval({ commit }, params) {
    //
    return new Promise((resolve, reject) => {
      updateEval(
        params
      ).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  loadEvalutionInfo({ commit }, params) {
    //
    return new Promise((resolve, reject) => {
      loadEvalutionInfo(
        params
      ).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  saveEval({ commit }, params) {
    //
    return new Promise((resolve, reject) => {
      saveEval(
        params
      ).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  findEvalInfo({ commit }, params) {
    //
    return new Promise((resolve, reject) => {
      findEvalInfo(
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
