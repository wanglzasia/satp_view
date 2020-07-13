import {
  appSafeListData,
  orgLeaderList,
  savePlan,
  operPlanList,
  infoData,
  planInfo,
  editPlan,
  delPlan,
  doPlanApply
} from '@/api/551/opera/operaManage'
// import qs from 'qs'

// 运维管理
const actions = {
  // 应用安全任务列表
  appSafeListData({ commit }, params) {
    // const { taskName, bussiness, taskSource, itemType, taskType, pageNum, pageSize, parentTaskId } = params
    return new Promise((resolve, reject) => {
      appSafeListData(
        params
      ).then(result => {
        resolve(result)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 科室领导
  orgLeaderList({ commit }, params) {
    // const { taskName, bussiness, taskSource, itemType, taskType, pageNum, pageSize, parentTaskId } = params
    return new Promise((resolve, reject) => {
      orgLeaderList(
        params
      ).then(result => {
        resolve(result)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 应用安全工单详细
  infoData({ commit }, params) {
    // const { taskName, bussiness, taskSource, itemType, taskType, pageNum, pageSize, parentTaskId } = params
    return new Promise((resolve, reject) => {
      infoData(
        params
      ).then(result => {
        resolve(result)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 保存计划
  savePlan({ commit }, params) {
    // const { taskName, bussiness, taskSource, itemType, taskType, pageNum, pageSize, parentTaskId } = params
    return new Promise((resolve, reject) => {
      savePlan(
        params
      ).then(result => {
        resolve(result)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 修改计划
  editPlan({ commit }, params) {
    // const { taskName, bussiness, taskSource, itemType, taskType, pageNum, pageSize, parentTaskId } = params
    return new Promise((resolve, reject) => {
      editPlan(
        params
      ).then(result => {
        resolve(result)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 申请扫描计划
  doPlanApply({ commit }, params) {
    // const { taskName, bussiness, taskSource, itemType, taskType, pageNum, pageSize, parentTaskId } = params
    return new Promise((resolve, reject) => {
      doPlanApply(
        params
      ).then(result => {
        resolve(result)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 删除计划
  delPlan({ commit }, params) {
    // const { taskName, bussiness, taskSource, itemType, taskType, pageNum, pageSize, parentTaskId } = params
    return new Promise((resolve, reject) => {
      delPlan(
        params
      ).then(result => {
        resolve(result)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 计划详情
  planInfo({ commit }, params) {
    // const { taskName, bussiness, taskSource, itemType, taskType, pageNum, pageSize, parentTaskId } = params
    return new Promise((resolve, reject) => {
      planInfo(
        params
      ).then(result => {
        resolve(result)
      }).catch(error => {
        reject(error)
      })
    })
  },
  operPlanList({ commit }, params) {
    // const { taskName, bussiness, taskSource, itemType, taskType, pageNum, pageSize, parentTaskId } = params
    return new Promise((resolve, reject) => {
      operPlanList(
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
