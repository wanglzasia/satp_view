/* eslint-disable no-undef */
import { itemList, addItem, updateItem, findItem, findItemNum, itemEffect, itemInvalid, policyList, codeList, importItem, exportItemTemplate, exportItem, itemTemplateCount, deleteItemPolicy, saveItemPolicy } from '@/api/satp/item/item'

const actions = {
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

  itemEffect({ commit }, params) {
    return new Promise((resolve, reject) => {
      itemEffect(
        params
      ).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  itemInvalid({ commit }, params) {
    return new Promise((resolve, reject) => {
      itemInvalid(
        params
      ).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  addItem({ commit }, params) {
    return new Promise((resolve, reject) => {
      addItem(
        params
      ).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  updateItem({ commit }, params) {
    return new Promise((resolve, reject) => {
      updateItem(
        params
      ).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  findItem({ commit }, params) {
    return new Promise((resolve, reject) => {
      findItem(
        params
      ).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  findItemNum({ commit }) {
    return new Promise((resolve, reject) => {
      findItemNum(
      ).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
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
  importItem({ commit }, params) {
    return new Promise((resolve, reject) => {
      importItem(
        params
      ).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  exportItemTemplate({ commit }, params) {
    return new Promise((resolve, reject) => {
      exportItemTemplate(
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
  exportItem({ commit }, params) {
    return new Promise((resolve, reject) => {
      exportItem(
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
  },

  saveItemPolicy({ commit }, params) {
    return new Promise((resolve, reject) => {
      saveItemPolicy(
        params
      ).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  itemTemplateCount({ commit }, params) {
    return new Promise((resolve, reject) => {
      itemTemplateCount(
        params
      ).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  deleteItemPolicy({ commit }, params) {
    return new Promise((resolve, reject) => {
      deleteItemPolicy(
        params
      ).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  codeList({ commit }) {
    return new Promise((resolve, reject) => {
      codeList(
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

