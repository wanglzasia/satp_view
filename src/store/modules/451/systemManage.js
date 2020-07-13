/* eslint-disable no-undef */
import { policyFileList, findPolicyFile, updatePolicyFile, addPolicyFile, deletePolicyFile, listFileTypes, fileTypeDelete, fileTypeModify, fileTypeAdd } from '@/api/451/systemManage'
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
  policyFileList({ commit }, params) {
    //
    return new Promise((resolve, reject) => {
      policyFileList(
        params
      ).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  findPolicyFile({ commit }, params) {
    //
    return new Promise((resolve, reject) => {
      findPolicyFile(
        params
      ).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  addPolicyFile({ commit }, params) {
    return new Promise((resolve, reject) => {
      addPolicyFile(
        params
      ).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  updatePolicyFile({ commit }, params) {
    return new Promise((resolve, reject) => {
      updatePolicyFile(
        params
      ).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  deletePolicyFile({ commit }, params) {
    return new Promise((resolve, reject) => {
      deletePolicyFile(
        params
      ).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  listFileTypes({ commit }, params) {
    return new Promise((resolve, reject) => {
      listFileTypes(
        params
      ).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  fileTypeAdd({ commit }, params) {
    return new Promise((resolve, reject) => {
      fileTypeAdd(
        params
      ).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  fileTypeModify({ commit }, params) {
    return new Promise((resolve, reject) => {
      fileTypeModify(
        params
      ).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  fileTypeDelete({ commit }, params) {
    return new Promise((resolve, reject) => {
      fileTypeDelete(
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

