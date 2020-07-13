import request from '@/utils/request'

/** **运维管理****/
// 应用安全流程列表
export function appSafeListData(data) {
  return request({
    url: '/proxy/551/operMtc/appSafeListData',
    method: 'post',
    data
  })
}

// 应用安全工单详情
export function infoData(data) {
  return request({
    url: '/proxy/551/operMtc/infoData',
    method: 'post',
    data
  })
}

// 科室领导
export function orgLeaderList(data) {
  return request({
    url: '/proxy/551/operMtc/orgLeaderList',
    method: 'post',
    data
  })
}

// 保存计划
export function savePlan(data) {
  return request({
    url: '/proxy/551/operMtc/savePlan',
    method: 'post',
    data
  })
}

// 计划详情
export function planInfo(data) {
  return request({
    url: '/proxy/551/operMtc/planInfo',
    method: 'post',
    data
  })
}

// 修改计划
export function editPlan(data) {
  return request({
    url: '/proxy/551/operMtc/editPlan',
    method: 'post',
    data
  })
}

// 申请扫描计划
export function doPlanApply(data) {
  return request({
    url: '/proxy/551/operMtc/doPlanApply',
    method: 'post',
    data
  })
}
// 删除计划
export function delPlan(data) {
  return request({
    url: '/proxy/551/operMtc/delPlan',
    method: 'post',
    data
  })
}

// 计划列表
export function operPlanList(data) {
  return request({
    url: '/proxy/551/operMtc/operPlanList',
    method: 'post',
    data
  })
}

