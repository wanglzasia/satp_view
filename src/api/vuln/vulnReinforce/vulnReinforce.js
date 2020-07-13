import request from '@/utils/request'

// 加固任务列表
export function reinforceTaskList(data) {
  return request({
    url: '/proxy/satp/vulnReinforce/reinforceTaskListData',
    method: 'post',
    data
  })
}

// 查询加固任务
export function queryReinforceTask(data) {
  return request({
    url: '/proxy/satp/vulnReinforce/queryReinforceTask',
    method: 'post',
    data
  })
}

// 加固方案列表
export function reinforceProjList(data) {
  return request({
    url: '/proxy/satp/vulnReinforce/reinforceProjListData',
    method: 'post',
    data
  })
}

// 新增保存方案
export function addReinforceProj(data) {
  return request({
    url: '/proxy/satp/vulnReinforce/addReinforceProj',
    method: 'post',
    data
  })
}

// 删除方案
export function deleteReinforceProj(data) {
  return request({
    url: '/proxy/satp/vulnReinforce/deleteReinforceProj',
    method: 'post',
    data
  })
}

// 修改方案
export function updateReinforceProj(data) {
  return request({
    url: '/proxy/satp/vulnReinforce/updateReinforceProj',
    method: 'post',
    data
  })
}

// 查询方案
export function queryReinforceProj(data) {
  return request({
    url: '/proxy/satp/vulnReinforce/queryReinforceProj',
    method: 'post',
    data
  })
}

// 新增任务
export function addReinforceTask(data) {
  return request({
    url: '/proxy/satp/vulnReinforce/addReinforceTask',
    method: 'post',
    data
  })
}

// 修改任务
export function updateReinforceTask(data) {
  return request({
    url: '/proxy/satp/vulnReinforce/updateReinforceTask',
    method: 'post',
    data
  })
}

// 加固任务管理流程--1.创建加固方案/执行加固结果
export function reinforceProjOrResult(data) {
  return request({
    url: '/proxy/satp/vulnReinforce/reinforceProjOrResult',
    method: 'post',
    data
  })
}

// 加固任务管理流程--2.加固方案审核/加固结果审核
export function reinforceProjOrResultAudit(data) {
  return request({
    url: '/proxy/satp/vulnReinforce/reinforceProjOrResultAudit',
    method: 'post',
    data
  })
}

// 加固任务管理流程--3.加固方案提交/加固结果上报
export function reinforceProjOrResultReport(data) {
  return request({
    url: '/proxy/satp/vulnReinforce/reinforceProjOrResultReport',
    method: 'post',
    data
  })
}
