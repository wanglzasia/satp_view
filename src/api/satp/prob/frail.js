import request from '@/utils/request'

export function queryKeyFrailListByPage(data) {
  return request({
    url: '/proxy/satp/frail/queryKeyFrailListByPage',
    method: 'post',
    data
  })
}
export function addKeyFrail(data) {
  return request({
    url: '/proxy/satp/frail/addKeyFrail',
    method: 'post',
    data
  })
}
export function updateKeyFrail(data) {
  return request({
    url: '/proxy/satp/frail/updateKeyFrail',
    method: 'post',
    data
  })
}
export function queryKeyFrailList(data) {
  return request({
    url: '/proxy/satp/frail/queryKeyFrailList',
    method: 'post',
    data
  })
}
export function queryFrailAssetVulnInfo(data) {
  return request({
    url: '/proxy/satp/frail/queryFrailAssetVulnInfo',
    method: 'post',
    data
  })
}
export function queryFragVulnListByPage(data) {
  return request({
    url: '/proxy/satp/frail/queryFragVulnListByPage',
    method: 'post',
    data
  })
}
export function queryFragAssetListByPage(data) {
  return request({
    url: '/proxy/satp/frail/queryFragAssetListByPage',
    method: 'post',
    data
  })
}
export function queryFrailVulnInfoByAssetId(data) {
  return request({
    url: '/proxy/satp/frail/queryFrailVulnInfoByAssetId',
    method: 'post',
    data
  })
}
export function queryTrendChartsList(data) {
  return request({
    url: '/proxy/satp/frail/queryTrendChartsList',
    method: 'post',
    data
  })
}
export function queryFrailHisListByPage(data) {
  return request({
    url: '/proxy/satp/frail/queryFrailHisListByPage',
    method: 'post',
    data
  })
}
export function queryFrailProbInfoByPage(data) {
  return request({
    url: '/proxy/satp/frail/queryFrailProbInfoByPage',
    method: 'post',
    data
  })
}
export function queryAssetProbLineCharts(data) {
  return request({
    url: '/proxy/satp/frail/queryAssetProbLineCharts',
    method: 'post',
    data
  })
}
export function queryAssetProbBarCharts(data) {
  return request({
    url: '/proxy/satp/frail/queryAssetProbBarCharts',
    method: 'post',
    data
  })
}
export function queryProbdetailListByPage(data) {
  return request({
    url: '/proxy/satp/frail/queryProbdetailListByPage',
    method: 'post',
    data
  })
}
