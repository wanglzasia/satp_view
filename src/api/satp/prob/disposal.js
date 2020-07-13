import request from '@/utils/request'

export function queryProbcenListByPage(data) {
  return request({
    url: '/proxy/satp/disposal/queryProbcenListByPage',
    method: 'post',
    data
  })
}

export function queryProbdetailListByPage(data) {
  return request({
    url: '/proxy/satp/disposal/queryProbdetailListByPage',
    method: 'post',
    data
  })
}

export function queryProbcenListById(data) {
  return request({
    url: '/proxy/satp/disposal/queryProbcenListById',
    method: 'post',
    data
  })
}

export function updateProbcen(data) {
  return request({
    url: '/proxy/satp/disposal/updateProbcen',
    method: 'post',
    data
  })
}

export function updateProbdetail(data) {
  return request({
    url: '/proxy/satp/disposal/updateProbdetail',
    method: 'post',
    data
  })
}

export function queryProbdetailList(data) {
  return request({
    url: '/proxy/satp/disposal/queryProbdetailList',
    method: 'post',
    data
  })
}
export function dispatch(data) {
  return request({
    url: '/proxy/satp/disposal/dispatch',
    method: 'post',
    data
  })
}
export function doDisDeal(data) {
  return request({
    url: '/proxy/satp/disposal/doDisDeal',
    method: 'post',
    data
  })
}
export function importProbInfo(data) {
  return request({
    url: '/proxy/satp/disposal/importProbInfo',
    method: 'post',
    data
  })
}
// 合规报备
export function queryRptPrepList(data) {
  return request({
    url: '/proxy/satp/disposal/queryRptPrepList',
    method: 'post',
    data
  })
}
export function queryRptPrepListByPage(data) {
  return request({
    url: '/proxy/satp/disposal/queryRptPrepListByPage',
    method: 'post',
    data
  })
}
export function querySysVulnListByPage(data) {
  return request({
    url: '/proxy/satp/disposal/querySysVulnListByPage',
    method: 'post',
    data
  })
}
export function queryWebVulnListByPage(data) {
  return request({
    url: '/proxy/satp/disposal/queryWebVulnListByPage',
    method: 'post',
    data
  })
}
export function queryBaseLineListByPage(data) {
  return request({
    url: '/proxy/satp/disposal/queryBaseLineListByPage',
    method: 'post',
    data
  })
}
export function doRptPrepApply(data) {
  return request({
    url: '/proxy/satp/disposal/doRptPrepApply',
    method: 'post',
    data
  })
}
export function doAudit(data) {
  return request({
    url: '/proxy/satp/disposal/doAudit',
    method: 'post',
    data
  })
}
export function read(data) {
  return request({
    url: '/proxy/satp/disposal/read',
    method: 'post',
    data
  })
}
export function queryRptPrepDetailList(data) {
  return request({
    url: '/proxy/satp/disposal/queryRptPrepDetailList',
    method: 'post',
    data
  })
}
export function queryRptPrepDetailListByPage(data) {
  return request({
    url: '/proxy/satp/disposal/queryRptPrepDetailListByPage',
    method: 'post',
    data
  })
}
export function queryProbHisInfoListByPage(data) {
  return request({
    url: '/proxy/satp/disposal/queryProbHisInfoListByPage',
    method: 'post',
    data
  })
}
