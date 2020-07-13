/* eslint-disable no-undef */
import { policyList, addPolicy, updatePolicy, findPolicy, findPolicyNum, policyEffect, policyInvalid, itemList, getDictList, importPolicy, exportPolicyTemplate, exportPolicy } from '@/api/satp/policy/policy'

const actions = {
  policyList({ commit }, params) {
    return new Promise((resolve, reject) => {
      policyList(
        params
      ).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  policyEffect({ commit }, params) {
    return new Promise((resolve, reject) => {
      policyEffect(
        params
      ).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  policyInvalid({ commit }, params) {
    return new Promise((resolve, reject) => {
      policyInvalid(
        params
      ).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  addPolicy({ commit }, params) {
    return new Promise((resolve, reject) => {
      addPolicy(
        params
      ).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  updatePolicy({ commit }, params) {
    return new Promise((resolve, reject) => {
      updatePolicy(
        params
      ).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  findPolicy({ commit }, params) {
    return new Promise((resolve, reject) => {
      findPolicy(
        params
      ).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  findPolicyNum({ commit }) {
    return new Promise((resolve, reject) => {
      findPolicyNum(
      ).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  itemList({ commit }, params) {
    return new Promise((resolve, reject) => {
      itemList(
        params
      ).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  getDictList({ commit }) {
    return new Promise((resolve, reject) => {
      getDictList(
      ).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  importPolicy({ commit }, params) {
    return new Promise((resolve, reject) => {
      importPolicy(
        params
      ).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  exportPolicyTemplate({ commit }, params) {
    return new Promise((resolve, reject) => {
      exportPolicyTemplate(
        params
      ).then(response => {
        // 流的转储属于浅拷贝，所以此处的content转储仅仅是便于理解，并没有实际作用=_=
        const content = response
        const blob = new Blob([content]) // 构造一个blob对象来处理数据
        let fileName = '安全合规策略导入模板.csv' // 导出文件名
        if (response.type === 'application/vnd.ms-excel') {
          fileName = '安全合规策略导入模板.xls' // 导出文件名
        }
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
      }).catch((error) => {
        console.log(error)
      })
    })
  },
  exportPolicy({ commit }, params) {
    return new Promise((resolve, reject) => {
      exportPolicy(
        params
      ).then(response => {
      // 流的转储属于浅拷贝，所以此处的content转储仅仅是便于理解，并没有实际作用=_=
        const content = response
        const blob = new Blob([content]) // 构造一个blob对象来处理数据
        const fileName = '安全合规策略导出文件.xls' // 导出文件名
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
      }).catch((error) => {
        console.log(error)
      })
    })
  }
}

export default {
  namespaced: true,
  actions
}

