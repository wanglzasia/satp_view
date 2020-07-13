/* eslint-disable no-undef */
import { specToolList, addSpecTool, updateSpecTool, findSpecTool, doNotice, getToolId, noticeResult, specTaskList, addSpecTask, findSpecTask, specTaskAssetList, startTask, toolUserList, saveToolUser, specToolGiveList } from '@/api/satp/specTool/specTool'

const actions = {
  specToolList({ commit }, params) {
    return new Promise((resolve, reject) => {
      specToolList(
        params
      ).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  addSpecTool({ commit }, params) {
    return new Promise((resolve, reject) => {
      addSpecTool(
        params
      ).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  updateSpecTool({ commit }, params) {
    return new Promise((resolve, reject) => {
      updateSpecTool(
        params
      ).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  findSpecTool({ commit }, params) {
    return new Promise((resolve, reject) => {
      findSpecTool(
        params
      ).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  doNotice({ commit }, params) {
    return new Promise((resolve, reject) => {
      doNotice(
        params
      ).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  getToolId({ commit }) {
    return new Promise((resolve, reject) => {
      getToolId(
      ).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  noticeResult({ commit }, params) {
    return new Promise((resolve, reject) => {
      noticeResult(
        params
      ).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  specTaskList({ commit }, params) {
    return new Promise((resolve, reject) => {
      specTaskList(
        params
      ).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  addSpecTask({ commit }, params) {
    return new Promise((resolve, reject) => {
      addSpecTask(
        params
      ).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  findSpecTask({ commit }, params) {
    return new Promise((resolve, reject) => {
      findSpecTask(
        params
      ).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  specTaskAssetList({ commit }, params) {
    return new Promise((resolve, reject) => {
      specTaskAssetList(
        params
      ).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  startTask({ commit }, params) {
    return new Promise((resolve, reject) => {
      startTask(
        params
      ).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  toolUserList({ commit }, params) {
    return new Promise((resolve, reject) => {
      toolUserList(
        params
      ).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  saveToolUser({ commit }, params) {
    return new Promise((resolve, reject) => {
      saveToolUser(
        params
      ).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  specToolGiveList({ commit }, params) {
    return new Promise((resolve, reject) => {
      specToolGiveList(
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

