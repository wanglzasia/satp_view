import request from '@/utils/request'

// 测试任务列表
export function testTaskList(data) {
  return request({
    url: '/proxy/satp/vulnTest/testTaskListData',
    method: 'post',
    data
  })
}

// 保存测试任务
export function saveTestTask(data) {
  return request({
    url: '/proxy/satp/vulnTest/saveTestTask',
    method: 'post',
    data
  })
}

// 查询测试任务
export function queryTestTask(data) {
  return request({
    url: '/proxy/satp/vulnTest/queryTestTask',
    method: 'post',
    data
  })
}

// 查询中间表--组织/人员
export function queryOrgsOrUsers(data) {
  return request({
    url: '/proxy/satp/vulnTest/queryOrgsOrUsers',
    method: 'post',
    data
  })
}

// 修改测试任务
export function updateTestTask(data) {
  return request({
    url: '/proxy/satp/vulnTest/updateTestTask',
    method: 'post',
    data
  })
}

// 测试方案列表
export function testPlanList(data) {
  return request({
    url: '/proxy/satp/vulnTest/testPlanListData',
    method: 'post',
    data
  })
}

// 查询测试方案
export function queryTestPlan(data) {
  return request({
    url: '/proxy/satp/vulnTest/queryTestPlan',
    method: 'post',
    data
  })
}

// 新增测试方案
export function saveTestPlan(data) {
  return request({
    url: '/proxy/satp/vulnTest/saveTestPlan',
    method: 'post',
    data
  })
}

// 修改测试方案
export function updateTestPlan(data) {
  return request({
    url: '/proxy/satp/vulnTest/updateTestPlan',
    method: 'post',
    data
  })
}

// 测试任务管理--修复/验证
export function restoreOrVerify(data) {
  return request({
    url: '/proxy/satp/vulnTest/restoreOrVerify',
    method: 'post',
    data
  })
}

// 测试任务管理--解决方案审核
export function solutionAudit(data) {
  return request({
    url: '/proxy/satp/vulnTest/solutionAudit',
    method: 'post',
    data
  })
}

// 测试任务管理--解决方案上报
export function solutionReport(data) {
  return request({
    url: '/proxy/satp/vulnTest/solutionReport',
    method: 'post',
    data
  })
}
