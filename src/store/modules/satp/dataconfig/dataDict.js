/* eslint-disable no-undef */
import {
  queryDataDictListByPage,
  queryDataDictList,
  saveDataDict,
  updateDataDict,
  deleteDataDict
} from '@/api/satp/dataconfig/dataDict'
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
  // user login

  queryDataDictListByPage({ commit }, params) {
    //
    return new Promise((resolve, reject) => {
      queryDataDictListByPage(
        params
      ).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  queryDataDictList({ commit }, params) {
    //
    return new Promise((resolve, reject) => {
      queryDataDictList(
        params
      ).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  saveDataDict({ commit }, params) {
    //
    return new Promise((resolve, reject) => {
      saveDataDict(
        params
      ).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  updateDataDict({ commit }, params) {
    //
    return new Promise((resolve, reject) => {
      updateDataDict(
        params
      ).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  deleteDataDict({ commit }, params) {
    //
    return new Promise((resolve, reject) => {
      deleteDataDict(
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
