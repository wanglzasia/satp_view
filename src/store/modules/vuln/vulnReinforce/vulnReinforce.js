import { reinforceTaskList, queryReinforceTask, reinforceProjList, addReinforceProj,
  deleteReinforceProj, updateReinforceProj, addReinforceTask, updateReinforceTask,
  queryReinforceProj, reinforceProjOrResult, reinforceProjOrResultAudit, reinforceProjOrResultReport } from '@/api/vuln/vulnReinforce/vulnReinforce'
// import qs from 'qs'

const actions = {
  // 加固任务列表
  reinforceTaskList({ commit }, params) {
    // const { taskName, bussiness, taskSource, itemType, taskType, pageNum, pageSize, parentTaskId } = params
    return new Promise((resolve, reject) => {
      reinforceTaskList(
        params
      ).then(result => {
        resolve(result)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 查询加固任务
  queryReinforceTask({ commit }, params) {
    // const { taskName, bussiness, taskSource, itemType, taskType, pageNum, pageSize, parentTaskId } = params
    return new Promise((resolve, reject) => {
      queryReinforceTask(
        params
      ).then(result => {
        resolve(result)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 加固方案列表
  reinforceProjList({ commit }, params) {
    // const { taskName, bussiness, taskSource, itemType, taskType, pageNum, pageSize, parentTaskId } = params
    return new Promise((resolve, reject) => {
      reinforceProjList(
        params
      ).then(result => {
        resolve(result)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 新增保存方案
  addReinforceProj({ commit }, params) {
    // const { taskName, bussiness, taskSource, itemType, taskType, pageNum, pageSize, parentTaskId } = params
    return new Promise((resolve, reject) => {
      addReinforceProj(
        params
      ).then(result => {
        resolve(result)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 查找方案
  queryReinforceProj({ commit }, params) {
    // const { taskName, bussiness, taskSource, itemType, taskType, pageNum, pageSize, parentTaskId } = params
    return new Promise((resolve, reject) => {
      queryReinforceProj(
        params
      ).then(result => {
        resolve(result)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 删除方案
  deleteReinforceProj({ commit }, params) {
    // const { taskName, bussiness, taskSource, itemType, taskType, pageNum, pageSize, parentTaskId } = params
    return new Promise((resolve, reject) => {
      deleteReinforceProj(
        params
      ).then(result => {
        resolve(result)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 修改方案
  updateReinforceProj({ commit }, params) {
    // const { taskName, bussiness, taskSource, itemType, taskType, pageNum, pageSize, parentTaskId } = params
    return new Promise((resolve, reject) => {
      updateReinforceProj(
        params
      ).then(result => {
        resolve(result)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 新增任务
  addReinforceTask({ commit }, params) {
    // const { taskName, bussiness, taskSource, itemType, taskType, pageNum, pageSize, parentTaskId } = params
    return new Promise((resolve, reject) => {
      addReinforceTask(
        params
      ).then(result => {
        resolve(result)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 修改任务
  updateReinforceTask({ commit }, params) {
    // const { taskName, bussiness, taskSource, itemType, taskType, pageNum, pageSize, parentTaskId } = params
    return new Promise((resolve, reject) => {
      updateReinforceTask(
        params
      ).then(result => {
        resolve(result)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 加固任务管理流程--1.创建加固方案/执行加固结果
  reinforceProjOrResult({ commit }, params) {
    // const { taskName, bussiness, taskSource, itemType, taskType, pageNum, pageSize, parentTaskId } = params
    return new Promise((resolve, reject) => {
      reinforceProjOrResult(
        params
      ).then(result => {
        resolve(result)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 加固任务管理流程--2.加固方案审核/加固结果审核
  reinforceProjOrResultAudit({ commit }, params) {
    // const { taskName, bussiness, taskSource, itemType, taskType, pageNum, pageSize, parentTaskId } = params
    return new Promise((resolve, reject) => {
      reinforceProjOrResultAudit(
        params
      ).then(result => {
        resolve(result)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 加固任务管理流程--3.加固方案提交/加固结果上报
  reinforceProjOrResultReport({ commit }, params) {
    // const { taskName, bussiness, taskSource, itemType, taskType, pageNum, pageSize, parentTaskId } = params
    return new Promise((resolve, reject) => {
      reinforceProjOrResultReport(
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
