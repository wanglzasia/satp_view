/* eslint-disable no-undef */
import { templateList, addTemplate, updateTemplate, findTemplate, findTemplateNo, templateEffect, templateInvalid, itemList, tempCopy, importTemplate, exportTemplateTemplate, exportTemplate, templateTemplateCount, deleteTemplateItem, saveTemplateItem } from '@/api/satp/template/template'

const actions = {
  templateList({ commit }, params) {
    return new Promise((resolve, reject) => {
      templateList(
        params
      ).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  templateEffect({ commit }, params) {
    return new Promise((resolve, reject) => {
      templateEffect(
        params
      ).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  templateInvalid({ commit }, params) {
    return new Promise((resolve, reject) => {
      templateInvalid(
        params
      ).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  addTemplate({ commit }, params) {
    return new Promise((resolve, reject) => {
      addTemplate(
        params
      ).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  updateTemplate({ commit }, params) {
    return new Promise((resolve, reject) => {
      updateTemplate(
        params
      ).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  findTemplate({ commit }, params) {
    return new Promise((resolve, reject) => {
      findTemplate(
        params
      ).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  findTemplateNo({ commit }) {
    return new Promise((resolve, reject) => {
      findTemplateNo(
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
  importTemplate({ commit }, params) {
    return new Promise((resolve, reject) => {
      importTemplate(
        params
      ).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  exportTemplateTemplate({ commit }, params) {
    return new Promise((resolve, reject) => {
      exportTemplateTemplate(
        params
      ).then(response => {
        // 流的转储属于浅拷贝，所以此处的content转储仅仅是便于理解，并没有实际作用=_=
        const content = response
        const blob = new Blob([content]) // 构造一个blob对象来处理数据
        let fileName = '安全合规模板导入模板.csv' // 导出文件名
        if (response.type === 'application/vnd.ms-excel') {
          fileName = '安全合规模板导入模板.xls' // 导出文件名
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
  exportTemplate({ commit }, params) {
    return new Promise((resolve, reject) => {
      exportTemplate(
        params
      ).then(response => {
      // 流的转储属于浅拷贝，所以此处的content转储仅仅是便于理解，并没有实际作用=_=
        const content = response
        const blob = new Blob([content]) // 构造一个blob对象来处理数据
        const fileName = '安全合规模板导出文件.xls' // 导出文件名
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

  saveTemplateItem({ commit }, params) {
    return new Promise((resolve, reject) => {
      saveTemplateItem(
        params
      ).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  templateItemount({ commit }, params) {
    return new Promise((resolve, reject) => {
      templateTemplateCount(
        params
      ).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  deleteTemplateItem({ commit }, params) {
    return new Promise((resolve, reject) => {
      deleteTemplateItem(
        params
      ).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  tempCopy({ commit }, params) {
    return new Promise((resolve, reject) => {
      tempCopy(
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

