/* eslint-disable no-undef */
import { toolList, addTool, updateTool, findTool, deleteTool, changeStatus } from '@/api/satp/tool/tool'
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
  toolList({ commit }, params) {
    //
    return new Promise((resolve, reject) => {
      toolList(
        params
      ).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  changeStatus({ commit }, params) {
    return new Promise((resolve, reject) => {
      changeStatus(
        params
      ).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  addTool({ commit }, params) {
    return new Promise((resolve, reject) => {
      addTool(
        params
      ).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  updateTool({ commit }, params) {
    return new Promise((resolve, reject) => {
      updateTool(
        params
      ).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  findTool({ commit }, params) {
    return new Promise((resolve, reject) => {
      findTool(
        params
      ).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  deleteTool({ commit }, params) {
    return new Promise((resolve, reject) => {
      deleteTool(
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

