/* eslint-disable no-undef */
import {
  getAssetTypeTree,
  getAssetList,
  getOneAsset,
  getAssetRelList,
  saveAssetRel,
  deleteAssetRel,
  getAssetExtList,
  saveAssetExt,
  deleteAssetExt,
  saveAsset,
  updateAsset
} from '@/api/asset'
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
  getAssetTypeTree({ commit }, params) {
    //
    return new Promise((resolve, reject) => {
      getAssetTypeTree(
        params
      ).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  getAssetList({ commit }, params) {
    //
    return new Promise((resolve, reject) => {
      getAssetList(
        params
      ).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  getOneAsset({ commit }, params) {
    //
    return new Promise((resolve, reject) => {
      getOneAsset(
        params
      ).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  getAssetRelList({ commit }, params) {
    //
    return new Promise((resolve, reject) => {
      getAssetRelList(
        params
      ).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  saveAssetRel({ commit }, params) {
    //
    return new Promise((resolve, reject) => {
      saveAssetRel(
        params
      ).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  deleteAssetRel({ commit }, params) {
    //
    return new Promise((resolve, reject) => {
      deleteAssetRel(
        params
      ).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  getAssetExtList({ commit }, params) {
    //
    return new Promise((resolve, reject) => {
      getAssetExtList(
        params
      ).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  saveAssetExt({ commit }, params) {
    //
    return new Promise((resolve, reject) => {
      saveAssetExt(
        params
      ).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  deleteAssetExt({ commit }, params) {
    //
    return new Promise((resolve, reject) => {
      deleteAssetExt(
        params
      ).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  saveAsset({ commit }, params) {
    //
    return new Promise((resolve, reject) => {
      saveAsset(
        params
      ).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  updateAsset({ commit }, params) {
    //
    return new Promise((resolve, reject) => {
      updateAsset(
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
