import request from '@/utils/request'

// 漏洞验证任务列表
export function vulnValidTaskListData(data) {
  return request({
    url: '/proxy/satp/vulnValid/vulnValidTaskListData',
    method: 'post',
    data
  })
}

// 根据ID查询验证任务信息
export function queryValidTaskById(data) {
  return request({
    url: '/proxy/satp/vulnValid/queryValidTaskById',
    method: 'post',
    data
  })
}

// 新增漏洞验证任务
export function saveValidTask(data) {
  return request({
    url: '/proxy/satp/vulnValid/saveValidTask',
    method: 'post',
    data
  })
}

// 修改漏洞验证任务
export function updateValidTask(data) {
  return request({
    url: '/proxy/satp/vulnValid/updateValidTask',
    method: 'post',
    data
  })
}

// 漏洞验证方案列表
export function vulnValidPlanListData(data) {
  return request({
    url: '/proxy/satp/vulnValid/vulnValidPlanListData',
    method: 'post',
    data
  })
}

// 新增漏洞验证方案
export function saveValidPlan(data) {
  return request({
    url: '/proxy/satp/vulnValid/saveValidPlan',
    method: 'post',
    data
  })
}

// 根据id查询验证方案详情
export function queryValidPlanById(data) {
  return request({
    url: '/proxy/satp/vulnValid/queryValidPlanById',
    method: 'post',
    data
  })
}

// 修改漏洞验证方案
export function updateValidPlan(data) {
  return request({
    url: '/proxy/satp/vulnValid/updateValidPlan',
    method: 'post',
    data
  })
}

// 删除漏洞验证方案
export function deleteValidPlan(data) {
  return request({
    url: '/proxy/satp/vulnValid/deleteValidPlan',
    method: 'post',
    data
  })
}

// 验证任务管理--创建方案
export function createPlan(data) {
  return request({
    url: '/proxy/satp/vulnValid/createPlan',
    method: 'post',
    data
  })
}

// 验证任务管理--审核方案
export function auditPlan(data) {
  return request({
    url: '/proxy/satp/vulnValid/auditPlan',
    method: 'post',
    data
  })
}

// 验证任务管理--方案上报
export function reportPlan(data) {
  return request({
    url: '/proxy/satp/vulnValid/reportPlan',
    method: 'post',
    data
  })
}
