/* eslint-disable no-undef */
import { loadSelfCheck, selfCheckAdd, selfCheckFlowAdd, findselfCheckFlowById, auditOpr, loadselfCheckFlow } from '@/api/451/selfCheck'
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
  loadSelfCheck({ commit }, params) {
    //
    return new Promise((resolve, reject) => {
      loadSelfCheck(
        params
      ).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  selfCheckAdd({ commit }, params) {
    //
    return new Promise((resolve, reject) => {
      selfCheckAdd(
        params
      ).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  selfCheckFlowAdd({ commit }, params) {
    //
    return new Promise((resolve, reject) => {
      selfCheckFlowAdd(
        params
      ).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  findselfCheckFlowById({ commit }, params) {
    //
    return new Promise((resolve, reject) => {
      findselfCheckFlowById(
        params
      ).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  auditOpr({ commit }, params) {
    //
    return new Promise((resolve, reject) => {
      auditOpr(
        params
      ).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  loadselfCheckFlow({ commit }, params) {
    //
    return new Promise((resolve, reject) => {
      loadselfCheckFlow(
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
