import { vulnInfoListData } from '@/api/vuln/vulnSpider/vulnSpider'
// import qs from 'qs'

const actions = {
  // 漏洞情报呈现列表数据查询
  vulnInfoListData({ commit }, params) {
    // const { taskName, bussiness, taskSource, itemType, taskType, pageNum, pageSize, parentTaskId } = params
    return new Promise((resolve, reject) => {
      vulnInfoListData(
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
