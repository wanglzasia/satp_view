/* eslint-disable no-undef */
import { emerAdd } from '@/api/451/emer'
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

  emerAdd({ commit }, params) {
    //
    return new Promise((resolve, reject) => {
      emerAdd(
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
