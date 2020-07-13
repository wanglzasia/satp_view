/* eslint-disable no-undef */
import { netTaskList, addNetTask, updateNetTask, findNetTask, deleteNetTask, netTaskCfgList, netTaskNotCfgList, addNetTaskCfg, deleteNetTaskCfg, netResultList, netResultPortList, netAllResultList, portCfgList, ipList } from '@/api/satp/netScan/netTask'

const actions = {
  // user login
  netTaskList({ commit }, params) {
    //
    return new Promise((resolve, reject) => {
      netTaskList(
        params
      ).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  addNetTask({ commit }, params) {
    return new Promise((resolve, reject) => {
      addNetTask(
        params
      ).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  updateNetTask({ commit }, params) {
    return new Promise((resolve, reject) => {
      updateNetTask(
        params
      ).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  findNetTask({ commit }, params) {
    return new Promise((resolve, reject) => {
      findNetTask(
        params
      ).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  deleteNetTask({ commit }, params) {
    return new Promise((resolve, reject) => {
      deleteNetTask(
        params
      ).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  netTaskNotCfgList({ commit }, params) {
    return new Promise((resolve, reject) => {
      netTaskNotCfgList(
        params
      ).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  netTaskCfgList({ commit }, params) {
    return new Promise((resolve, reject) => {
      netTaskCfgList(
        params
      ).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  addNetTaskCfg({ commit }, params) {
    return new Promise((resolve, reject) => {
      addNetTaskCfg(
        params
      ).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  deleteNetTaskCfg({ commit }, params) {
    return new Promise((resolve, reject) => {
      deleteNetTaskCfg(
        params
      ).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  netResultList({ commit }, params) {
    return new Promise((resolve, reject) => {
      netResultList(
        params
      ).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  netResultPortList({ commit }, params) {
    return new Promise((resolve, reject) => {
      netResultPortList(
        params
      ).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  netAllResultList({ commit }, params) {
    return new Promise((resolve, reject) => {
      netAllResultList(
        params
      ).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  portCfgList({ commit }, params) {
    return new Promise((resolve, reject) => {
      portCfgList(
        params
      ).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  ipList({ commit }, params) {
    return new Promise((resolve, reject) => {
      ipList(
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
  actions
}

