/* eslint-disable no-undef */
import { loadInbuList, listInbuTypes, addInbu, inbuTypeList, inbuTypeChildren, inbuTypeAdd, inbuTypeModify, inbuTypeDelete } from '@/api/451/inbu'
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
  loadInbuList({ commit }, params) {
    //
    return new Promise((resolve, reject) => {
      loadInbuList(
        params
      ).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  listInbuTypes({ commit }, params) {
    return new Promise((resolve, reject) => {
      listInbuTypes(
        params
      ).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  addInbu({ commit }, params) {
    return new Promise((resolve, reject) => {
      addInbu(
        params
      ).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  inbuTypeList({ commit }, params) {
    //
    return new Promise((resolve, reject) => {
      inbuTypeList(
        params
      ).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  inbuTypeChildren({ commit }, params) {
    //
    return new Promise((resolve, reject) => {
      inbuTypeChildren(
        params
      ).then(response => {
        resolve(response.data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  inbuTypeAdd({ commit }, params) {
    //
    return new Promise((resolve, reject) => {
      inbuTypeAdd(
        params
      ).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  inbuTypeModify({ commit }, params) {
    //
    return new Promise((resolve, reject) => {
      inbuTypeModify(
        params
      ).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  inbuTypeDelete({ commit }, params) {
    //
    return new Promise((resolve, reject) => {
      inbuTypeDelete(
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
