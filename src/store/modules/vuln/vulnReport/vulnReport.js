import { loadVulnProjData, loadTestBaseData } from '@/api/vuln/vulnReport/vulnReport'
// import qs from 'qs'

const actions = {
  // 加载漏洞方案视图数据
  loadVulnProjData({ commit }, params) {
    // const { taskName, bussiness, taskSource, itemType, taskType, pageNum, pageSize, parentTaskId } = params
    return new Promise((resolve, reject) => {
      loadVulnProjData(
        params
      ).then(result => {
        resolve(result)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 加载测试基地管理视图数据
  loadTestBaseData({ commit }, params) {
    // const { taskName, bussiness, taskSource, itemType, taskType, pageNum, pageSize, parentTaskId } = params
    return new Promise((resolve, reject) => {
      loadTestBaseData(
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
