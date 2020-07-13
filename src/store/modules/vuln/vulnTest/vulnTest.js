import { testTaskList, saveTestTask, queryTestTask, queryOrgsOrUsers, updateTestTask, testPlanList, queryTestPlan, saveTestPlan,
  updateTestPlan, restoreOrVerify, solutionAudit, solutionReport } from '@/api/vuln/vulnTest/vulnTest'
// import qs from 'qs'

const actions = {
  // 测试任务列表
  testTaskList({ commit }, params) {
    // const { taskName, bussiness, taskSource, itemType, taskType, pageNum, pageSize, parentTaskId } = params
    return new Promise((resolve, reject) => {
      testTaskList(
        params
      ).then(result => {
        resolve(result)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 保存测试任务
  saveTestTask({ commit }, params) {
    // const { taskName, bussiness, taskSource, itemType, taskType, pageNum, pageSize, parentTaskId } = params
    return new Promise((resolve, reject) => {
      saveTestTask(
        params
      ).then(result => {
        resolve(result)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 查询测试任务
  queryTestTask({ commit }, params) {
    // const { taskName, bussiness, taskSource, itemType, taskType, pageNum, pageSize, parentTaskId } = params
    return new Promise((resolve, reject) => {
      queryTestTask(
        params
      ).then(result => {
        resolve(result)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 查询中间表--组织/人员
  queryOrgsOrUsers({ commit }, params) {
    // const { taskName, bussiness, taskSource, itemType, taskType, pageNum, pageSize, parentTaskId } = params
    return new Promise((resolve, reject) => {
      queryOrgsOrUsers(
        params
      ).then(result => {
        resolve(result)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 修改测试任务
  updateTestTask({ commit }, params) {
    // const { taskName, bussiness, taskSource, itemType, taskType, pageNum, pageSize, parentTaskId } = params
    return new Promise((resolve, reject) => {
      updateTestTask(
        params
      ).then(result => {
        resolve(result)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 测试方案列表
  testPlanList({ commit }, params) {
    // const { taskName, bussiness, taskSource, itemType, taskType, pageNum, pageSize, parentTaskId } = params
    return new Promise((resolve, reject) => {
      testPlanList(
        params
      ).then(result => {
        resolve(result)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 查询测试方案
  queryTestPlan({ commit }, params) {
    // const { taskName, bussiness, taskSource, itemType, taskType, pageNum, pageSize, parentTaskId } = params
    return new Promise((resolve, reject) => {
      queryTestPlan(
        params
      ).then(result => {
        resolve(result)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 新增测试方案
  saveTestPlan({ commit }, params) {
    // const { taskName, bussiness, taskSource, itemType, taskType, pageNum, pageSize, parentTaskId } = params
    return new Promise((resolve, reject) => {
      saveTestPlan(
        params
      ).then(result => {
        resolve(result)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 修改测试方案
  updateTestPlan({ commit }, params) {
    // const { taskName, bussiness, taskSource, itemType, taskType, pageNum, pageSize, parentTaskId } = params
    return new Promise((resolve, reject) => {
      updateTestPlan(
        params
      ).then(result => {
        resolve(result)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 测试任务管理--修复/验证
  restoreOrVerify({ commit }, params) {
    // const { taskName, bussiness, taskSource, itemType, taskType, pageNum, pageSize, parentTaskId } = params
    return new Promise((resolve, reject) => {
      restoreOrVerify(
        params
      ).then(result => {
        resolve(result)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 测试任务管理--解决方案审核
  solutionAudit({ commit }, params) {
    // const { taskName, bussiness, taskSource, itemType, taskType, pageNum, pageSize, parentTaskId } = params
    return new Promise((resolve, reject) => {
      solutionAudit(
        params
      ).then(result => {
        resolve(result)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 测试任务管理--解决方案上报
  solutionReport({ commit }, params) {
    // const { taskName, bussiness, taskSource, itemType, taskType, pageNum, pageSize, parentTaskId } = params
    return new Promise((resolve, reject) => {
      solutionReport(
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
