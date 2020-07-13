/* eslint-disable no-undef */
import {} from '@/api/satp/dataconfig/dataRoot'
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

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
