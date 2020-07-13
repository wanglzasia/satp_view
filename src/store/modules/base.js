import { delFileUpLoad, downloadFile, querySysInformListByPage } from '@/api/base'

const actions = {
  delFileUpLoad({ commit }, params) {
    return new Promise((resolve, reject) => {
      delFileUpLoad(
        params
      ).then(result => {
        resolve(result)
      }).catch(error => {
        reject(error)
      })
    })
  },
  downloadFile({ commit }, params) {
    const { realName } = params
    return new Promise((resolve, reject) => {
      downloadFile(
        params
      ).then(response => {
        console.log(response)
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
      }).catch(error => {
        console.log(error)
        // 关闭loading
        this.loading = false
        this.btnSendTem = false
      })
    })
  },
  querySysInformListByPage({ commit }, params) {
    return new Promise((resolve, reject) => {
      querySysInformListByPage(
        params
      ).then(result => {
        resolve(result)
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
