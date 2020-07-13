/* eslint-disable no-undef */
import {
  queryProbcenListByPage,
  queryProbdetailListByPage,
  queryProbdetailList,
  queryProbcenListById,
  updateProbcen,
  updateProbdetail,
  dispatch,
  doDisDeal,
  importProbInfo,
  queryRptPrepListByPage,
  querySysVulnListByPage,
  queryWebVulnListByPage,
  queryBaseLineListByPage,
  doRptPrepApply,
  doAudit,
  read,
  queryRptPrepList,
  queryRptPrepDetailListByPage,
  queryRptPrepDetailList,
  queryProbHisInfoListByPage
} from '@/api/satp/prob/disposal'
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

  queryProbcenListByPage({ commit }, params) {
    //
    return new Promise((resolve, reject) => {
      queryProbcenListByPage(
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
  },
  queryProbdetailList({ commit }, params) {
    //
    return new Promise((resolve, reject) => {
      queryProbdetailList(
        params
      ).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  queryProbcenListById({ commit }, params) {
    //
    return new Promise((resolve, reject) => {
      queryProbcenListById(
        params
      ).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  updateProbcen({ commit }, params) {
    //
    return new Promise((resolve, reject) => {
      updateProbcen(
        params
      ).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  updateProbdetail({ commit }, params) {
    //
    return new Promise((resolve, reject) => {
      updateProbdetail(
        params
      ).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  dispatch({ commit }, params) {
    //
    return new Promise((resolve, reject) => {
      dispatch(
        params
      ).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  doDisDeal({ commit }, params) {
    //
    return new Promise((resolve, reject) => {
      doDisDeal(
        params
      ).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  importProbInfo({ commit }, params) {
    //
    return new Promise((resolve, reject) => {
      importProbInfo(
        params
      ).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  queryRptPrepListByPage({ commit }, params) {
    //
    return new Promise((resolve, reject) => {
      queryRptPrepListByPage(
        params
      ).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  querySysVulnListByPage({ commit }, params) {
    //
    return new Promise((resolve, reject) => {
      querySysVulnListByPage(
        params
      ).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  queryWebVulnListByPage({ commit }, params) {
    //
    return new Promise((resolve, reject) => {
      queryWebVulnListByPage(
        params
      ).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  queryBaseLineListByPage({ commit }, params) {
    //
    return new Promise((resolve, reject) => {
      queryBaseLineListByPage(
        params
      ).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  doRptPrepApply({ commit }, params) {
    //
    return new Promise((resolve, reject) => {
      doRptPrepApply(
        params
      ).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  doAudit({ commit }, params) {
    //
    return new Promise((resolve, reject) => {
      doAudit(
        params
      ).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  read({ commit }, params) {
    //
    return new Promise((resolve, reject) => {
      read(
        params
      ).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  queryRptPrepList({ commit }, params) {
    //
    return new Promise((resolve, reject) => {
      queryRptPrepList(
        params
      ).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  queryRptPrepDetailListByPage({ commit }, params) {
    //
    return new Promise((resolve, reject) => {
      queryRptPrepDetailListByPage(
        params
      ).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  queryRptPrepDetailList({ commit }, params) {
    //
    return new Promise((resolve, reject) => {
      queryRptPrepDetailList(
        params
      ).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  queryProbHisInfoListByPage({ commit }, params) {
    //
    return new Promise((resolve, reject) => {
      queryProbHisInfoListByPage(
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
