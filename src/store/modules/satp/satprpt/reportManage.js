/* eslint-disable no-undef */
import {
  queryProbRectListByPage,
  querySysVulnListByPage,
  queryWebVulnListByPage,
  queryWeakPwdListByPage,
  queryBaseNoItemListByPage,
  queryAppVulnListByPage,
  queryAppVulnByTypeListByPage,
  querySafeCodeListByPage,
  queryInternetAssetListByPage,
  exportReportManageExcel,
  exportReportManagePdf,
  exportReportManagePdfAll,
  queryTemReportListByPage,
  queryTaskSummary,
  queryImportManageListByPage,
  downloadTemp,
  importTemps,
  querySubReport,
  subManage,
  cancelSubManage
} from '@/api/satp/satprpt/reportManage'
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
  queryProbRectListByPage({ commit }, params) {
    //
    return new Promise((resolve, reject) => {
      queryProbRectListByPage(
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
  queryWeakPwdListByPage({ commit }, params) {
    //
    return new Promise((resolve, reject) => {
      queryWeakPwdListByPage(
        params
      ).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  queryBaseNoItemListByPage({ commit }, params) {
    //
    return new Promise((resolve, reject) => {
      queryBaseNoItemListByPage(
        params
      ).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  queryAppVulnListByPage({ commit }, params) {
    //
    return new Promise((resolve, reject) => {
      queryAppVulnListByPage(
        params
      ).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  queryAppVulnByTypeListByPage({ commit }, params) {
    //
    return new Promise((resolve, reject) => {
      queryAppVulnByTypeListByPage(
        params
      ).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  querySafeCodeListByPage({ commit }, params) {
    //
    return new Promise((resolve, reject) => {
      querySafeCodeListByPage(
        params
      ).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  queryInternetAssetListByPage({ commit }, params) {
    //
    return new Promise((resolve, reject) => {
      queryInternetAssetListByPage(
        params
      ).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  exportReportManageExcel({ commit }, params) {
    const { realName } = params
    return new Promise((resolve, reject) => {
      exportReportManageExcel(
        params
      ).then(response => {
        const content = response
        const blob = new Blob([content]) // 构造一个blob对象来处理数据
        const fileName = realName // 导出文件名
        // 对于<a>标签，只有 Firefox 和 Chrome（内核） 支持 download 属性
        // IE10以上支持blob但是依然不支持download
        if ('download' in document.createElement('a')) { // 支持a标签download的浏览器
          const link = document.createElement('a') // 创建a标签
          link.download = fileName // a标签添加属性
          link.style.display = 'none'
          link.href = URL.createObjectURL(blob)
          document.body.appendChild(link)
          link.click() // 执行下载
          URL.revokeObjectURL(link.href) // 释放url
          document.body.removeChild(link) // 释放标签
        } else { // 其他浏览器
          navigator.msSaveBlob(blob, fileName)
        }
        this.btnSendTem = false
      }).catch(() => {
      })
    })
  },
  exportReportManagePdf({ commit }, params) {
    const { realName } = params
    return new Promise((resolve, reject) => {
      exportReportManagePdf(
        params
      ).then(response => {
        const content = response
        const blob = new Blob([content]) // 构造一个blob对象来处理数据
        const fileName = realName // 导出文件名
        // 对于<a>标签，只有 Firefox 和 Chrome（内核） 支持 download 属性
        // IE10以上支持blob但是依然不支持download
        if ('download' in document.createElement('a')) { // 支持a标签download的浏览器
          const link = document.createElement('a') // 创建a标签
          link.download = fileName // a标签添加属性
          link.style.display = 'none'
          link.href = URL.createObjectURL(blob)
          document.body.appendChild(link)
          link.click() // 执行下载
          URL.revokeObjectURL(link.href) // 释放url
          document.body.removeChild(link) // 释放标签
        } else { // 其他浏览器
          navigator.msSaveBlob(blob, fileName)
        }
        this.btnSendTem = false
      }).catch(() => {
      })
    })
  },
  exportReportManagePdfAll({ commit }, params) {
    const { realName } = params
    alert(realName)
    return new Promise((resolve, reject) => {
      exportReportManagePdfAll(
        params
      ).then(response => {
        const content = response
        const blob = new Blob([content]) // 构造一个blob对象来处理数据
        const fileName = realName // 导出文件名
        // 对于<a>标签，只有 Firefox 和 Chrome（内核） 支持 download 属性
        // IE10以上支持blob但是依然不支持download
        if ('download' in document.createElement('a')) { // 支持a标签download的浏览器
          const link = document.createElement('a') // 创建a标签
          link.download = fileName // a标签添加属性
          link.style.display = 'none'
          link.href = URL.createObjectURL(blob)
          document.body.appendChild(link)
          link.click() // 执行下载
          URL.revokeObjectURL(link.href) // 释放url
          document.body.removeChild(link) // 释放标签
        } else { // 其他浏览器
          navigator.msSaveBlob(blob, fileName)
        }
        this.btnSendTem = false
      }).catch(() => {
      })
    })
  },
  queryTemReportListByPage({ commit }, params) {
    //
    return new Promise((resolve, reject) => {
      queryTemReportListByPage(
        params
      ).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  queryTaskSummary({ commit }, params) {
    //
    return new Promise((resolve, reject) => {
      queryTaskSummary(
        params
      ).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  queryImportManageListByPage({ commit }, params) {
    //
    return new Promise((resolve, reject) => {
      queryImportManageListByPage(
        params
      ).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  importTemps({ commit }, params) {
    //
    return new Promise((resolve, reject) => {
      importTemps(
        params
      ).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  downloadTemp({ commit }, params) {
    const { realName } = params
    return new Promise((resolve, reject) => {
      downloadTemp(
        params
      ).then(response => {
        const content = response
        const blob = new Blob([content]) // 构造一个blob对象来处理数据
        const fileName = fileName // 导出文件名
        // 对于<a>标签，只有 Firefox 和 Chrome（内核） 支持 download 属性
        // IE10以上支持blob但是依然不支持download
        if ('download' in document.createElement('a')) { // 支持a标签download的浏览器
          const link = document.createElement('a') // 创建a标签
          link.download = realName // a标签添加属性
          link.style.display = 'none'
          link.href = URL.createObjectURL(blob)
          document.body.appendChild(link)
          link.click() // 执行下载
          URL.revokeObjectURL(link.href) // 释放url
          document.body.removeChild(link) // 释放标签
        } else { // 其他浏览器
          navigator.msSaveBlob(blob, fileName)
        }
        this.btnSendTem = false
      }).catch(() => {
      })
    })
  },

  querySubReport({ commit }, params) {
    //
    return new Promise((resolve, reject) => {
      querySubReport(
        params
      ).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  subManage({ commit }, params) {
    //
    return new Promise((resolve, reject) => {
      subManage(
        params
      ).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  cancelSubManage({ commit }, params) {
    //
    return new Promise((resolve, reject) => {
      cancelSubManage(
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
