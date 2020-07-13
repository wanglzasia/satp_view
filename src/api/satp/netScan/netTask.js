import request from '@/utils/request'

// 列表
export function netTaskList(data) {
  return request({
    url: '/proxy/satp/netTask/netTaskListData',
    method: 'post',
    data
  })
}
// 新增
export function addNetTask(data) {
  return request({
    url: '/proxy/satp/netTask/addNetTask',
    method: 'post',
    data
  })
}
// 修改
export function updateNetTask(data) {
  return request({
    url: '/proxy/satp/netTask/updateNetTask',
    method: 'post',
    data
  })
}
// 单个查询
export function findNetTask(data) {
  return request({
    url: '/proxy/satp/netTask/findNetTask',
    method: 'post',
    data
  })
}
// 删除
export function deleteNetTask(data) {
  return request({
    url: '/proxy/satp/netTask/deleteNetTask',
    method: 'post',
    data
  })
}

// 已配置列表
export function netTaskCfgList(data) {
  return request({
    url: '/proxy/satp/netTask/netTaskCfgList',
    method: 'post',
    data
  })
}

// 未配置列表
export function netTaskNotCfgList(data) {
  return request({
    url: '/proxy/satp/netTask/netTaskNotCfgList',
    method: 'post',
    data
  })
}
// 新增配置
export function addNetTaskCfg(data) {
  return request({
    url: '/proxy/satp/netTask/addNetTaskCfg',
    method: 'post',
    data
  })
}
// 删除配置
export function deleteNetTaskCfg(data) {
  return request({
    url: '/proxy/satp/netTask/deleteNetTaskCfg',
    method: 'post',
    data
  })
}
// 端口列表
export function portCfgList(data) {
  return request({
    url: '/proxy/satp/netTask/portCfgList',
    method: 'post',
    data
  })
}

// 暴露资产扫描结果列表
export function netResultList(data) {
  return request({
    url: '/proxy/satp/netTask/netResultList',
    method: 'post',
    data
  })
}

// 暴露资产扫描结果查询
export function findNetResult(data) {
  return request({
    url: '/proxy/satp/netTask/findNetResult',
    method: 'post',
    data
  })
}

// 暴露资产扫描端口结果列表
export function netResultPortList(data) {
  return request({
    url: '/proxy/satp/netTask/netResultPortList',
    method: 'post',
    data
  })
}

// 暴露资产扫描总结果列表
export function netAllResultList(data) {
  return request({
    url: '/proxy/satp/netTask/netAllResultList',
    method: 'post',
    data
  })
}

// 开始扫描
export function startTask(data) {
  return request({
    url: '/proxy/satp/netTask/startTask',
    method: 'post',
    data
  })
}
// 停止扫描
export function stopTask(data) {
  return request({
    url: '/proxy/satp/netTask/stopTask',
    method: 'post',
    data
  })
}

export function ipList(data) {
  return request({
    url: '/proxy/satp/netTask/ipList',
    method: 'post',
    data
  })
}
