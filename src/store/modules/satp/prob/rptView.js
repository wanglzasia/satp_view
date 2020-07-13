/* eslint-disable no-undef */
import { loadBasicAsset,
  loadBasicVuln,
  loadBasicBiz,
  loadBasicRectify,
  reportViewSet,
  loadViewSet,
  loadView,
  setRptViewConfigMonth,
  getRptViewConfigMonth,
  queryAssetInfoList,
  queryProbInfoList,
  queryAllInfo
} from '@/api/satp/prob/rptView'
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
  loadBasicAsset({ commit }, params) {
    //
    return new Promise((resolve, reject) => {
      loadBasicAsset(
        params
      ).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  loadBasicVuln({ commit }, params) {
    //
    return new Promise((resolve, reject) => {
      loadBasicVuln(
        params
      ).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  loadBasicBiz({ commit }, params) {
    //
    return new Promise((resolve, reject) => {
      loadBasicBiz(
        params
      ).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  loadBasicRectify({ commit }, params) {
    //
    return new Promise((resolve, reject) => {
      loadBasicRectify(
        params
      ).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  loadManageSecurity({ commit }, params) {
    //
    return new Promise((resolve, reject) => {
      loadManageSecurity(
        params
      ).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  reportViewSet({ commit }, params) {
    //
    return new Promise((resolve, reject) => {
      reportViewSet(
        params
      ).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  loadViewSet({ commit }, params) {
    //
    return new Promise((resolve, reject) => {
      loadViewSet(
        params
      ).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  loadView({ commit }, params) {
    //
    return new Promise((resolve, reject) => {
      loadView(
        params
      ).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  setRptViewConfigMonth({ commit }, params) {
    //
    return new Promise((resolve, reject) => {
      setRptViewConfigMonth(
        params
      ).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  getRptViewConfigMonth({ commit }, params) {
    //
    return new Promise((resolve, reject) => {
      getRptViewConfigMonth(
        params
      ).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  queryAssetInfoList({ commit }, params) {
    //
    return new Promise((resolve, reject) => {
      queryAssetInfoList(
        params
      ).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  queryProbInfoList({ commit }, params) {
    //
    return new Promise((resolve, reject) => {
      queryProbInfoList(
        params
      ).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  queryAllInfo({ commit }, params) {
    //
    return new Promise((resolve, reject) => {
      queryAllInfo(
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
