/* eslint-disable no-undef */
import { loadBadInfo, addBadInfo, findBadInfo, exportTemplate, importBadInfo } from '@/api/451/badInfo'
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
  loadBadInfo({ commit }, params) {
    //
    return new Promise((resolve, reject) => {
      loadBadInfo(
        params
      ).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  addBadInfo({ commit }, params) {
    //
    return new Promise((resolve, reject) => {
      addBadInfo(
        params
      ).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  findBadInfo({ commit }, params) {
    //
    return new Promise((resolve, reject) => {
      findBadInfo(
        params
      ).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
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
        let fileName = '不良信息导入模板.csv' // 导出文件名
        if (response.type === 'application/vnd.ms-excel') {
          fileName = '不良信息导入模板.xls' // 导出文件名
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
  importBadInfo({ commit }, params) {
    return new Promise((resolve, reject) => {
      importBadInfo(
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
