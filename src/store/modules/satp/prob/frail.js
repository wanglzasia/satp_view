/* eslint-disable no-undef */
import {
  queryKeyFrailListByPage,
  addKeyFrail,
  updateKeyFrail,
  queryKeyFrailList,
  queryFrailAssetVulnInfo,
  queryFragVulnListByPage,
  queryFragAssetListByPage,
  queryFrailVulnInfoByAssetId,
  queryTrendChartsList,
  queryFrailHisListByPage,
  queryFrailProbInfoByPage,
  queryAssetProbLineCharts,
  queryAssetProbBarCharts,
  queryProbdetailListByPage
} from '@/api/satp/prob/frail'
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
  queryKeyFrailListByPage({ commit }, params) {
    //
    return new Promise((resolve, reject) => {
      queryKeyFrailListByPage(
        params
      ).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  addKeyFrail({ commit }, params) {
    //
    return new Promise((resolve, reject) => {
      addKeyFrail(
        params
      ).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  updateKeyFrail({ commit }, params) {
    //
    return new Promise((resolve, reject) => {
      updateKeyFrail(
        params
      ).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  queryKeyFrailList({ commit }, params) {
    //
    return new Promise((resolve, reject) => {
      queryKeyFrailList(
        params
      ).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  queryFrailAssetVulnInfo({ commit }, params) {
    //
    return new Promise((resolve, reject) => {
      queryFrailAssetVulnInfo(
        params
      ).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  queryFragVulnListByPage({ commit }, params) {
    //
    return new Promise((resolve, reject) => {
      queryFragVulnListByPage(
        params
      ).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  queryFragAssetListByPage({ commit }, params) {
    //
    return new Promise((resolve, reject) => {
      queryFragAssetListByPage(
        params
      ).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  queryFrailVulnInfoByAssetId({ commit }, params) {
    //
    return new Promise((resolve, reject) => {
      queryFrailVulnInfoByAssetId(
        params
      ).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  queryTrendChartsList({ commit }, params) {
    //
    return new Promise((resolve, reject) => {
      queryTrendChartsList(
        params
      ).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  queryFrailHisListByPage({ commit }, params) {
    //
    return new Promise((resolve, reject) => {
      queryFrailHisListByPage(
        params
      ).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  queryFrailProbInfoByPage({ commit }, params) {
    //
    return new Promise((resolve, reject) => {
      queryFrailProbInfoByPage(
        params
      ).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  queryAssetProbLineCharts({ commit }, params) {
    //
    return new Promise((resolve, reject) => {
      queryAssetProbLineCharts(
        params
      ).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  queryAssetProbBarCharts({ commit }, params) {
    //
    return new Promise((resolve, reject) => {
      queryAssetProbBarCharts(
        params
      ).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  queryProbdetailListByPage({ commit }, params) {
    //
    return new Promise((resolve, reject) => {
      queryProbdetailListByPage(
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
