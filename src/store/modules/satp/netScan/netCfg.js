/* eslint-disable no-undef */
import { netCfgList, addNetCfg, updateNetCfg, findNetCfg, deleteNetCfg, exportTemplate, importNetCfg, exportNetCfg } from '@/api/satp/netScan/netCfg'

const actions = {
  // user login
  netCfgList({ commit }, params) {
    return new Promise((resolve, reject) => {
      netCfgList(
        params
      ).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  addNetCfg({ commit }, params) {
    return new Promise((resolve, reject) => {
      addNetCfg(
        params
      ).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  updateNetCfg({ commit }, params) {
    return new Promise((resolve, reject) => {
      updateNetCfg(
        params
      ).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  findNetCfg({ commit }, params) {
    return new Promise((resolve, reject) => {
      findNetCfg(
        params
      ).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  deleteNetCfg({ commit }, params) {
    return new Promise((resolve, reject) => {
      deleteNetCfg(
        params
      ).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  importNetCfg({ commit }, params) {
    return new Promise((resolve, reject) => {
      importNetCfg(
        params
      ).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  exportNetCfg({ commit }, params) {
    return new Promise((resolve, reject) => {
      exportNetCfg(
        params
      ).then(response => {
        // 流的转储属于浅拷贝，所以此处的content转储仅仅是便于理解，并没有实际作用=_=
        const content = response
        const blob = new Blob([content]) // 构造一个blob对象来处理数据
        const fileName = '网络配置导出文件.xls' // 导出文件名
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

  exportTemplate({ commit }, params) {
    return new Promise((resolve, reject) => {
      exportTemplate(
        params
      ).then(response => {
        // 流的转储属于浅拷贝，所以此处的content转储仅仅是便于理解，并没有实际作用=_=
        const content = response
        const blob = new Blob([content]) // 构造一个blob对象来处理数据
        let fileName = '网络配置导入模板.csv' // 导出文件名
        if (response.type === 'application/vnd.ms-excel') {
          fileName = '网络配置导入模板.xls' // 导出文件名
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
  }
}
export default {
  namespaced: true,
  actions
}

