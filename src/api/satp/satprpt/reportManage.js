import request from '@/utils/request'

export function queryProbRectListByPage(data) {
  return request({
    url: '/proxy/satp/reportManage/queryProbRectListByPage',
    method: 'post',
    data
  })
}
export function querySysVulnListByPage(data) {
  return request({
    url: '/proxy/satp/reportManage/querySysVulnListByPage',
    method: 'post',
    data
  })
}
export function queryWebVulnListByPage(data) {
  return request({
    url: '/proxy/satp/reportManage/queryWebVulnListByPage',
    method: 'post',
    data
  })
}
export function queryAppVulnByTypeListByPage(data) {
  return request({
    url: '/proxy/satp/reportManage/queryAppVulnByTypeListByPage',
    method: 'post',
    data
  })
}
export function queryWeakPwdListByPage(data) {
  return request({
    url: '/proxy/satp/reportManage/queryWeakPwdListByPage',
    method: 'post',
    data
  })
}
export function queryBaseNoItemListByPage(data) {
  return request({
    url: '/proxy/satp/reportManage/queryBaseNoItemListByPage',
    method: 'post',
    data
  })
}
export function queryAppVulnListByPage(data) {
  return request({
    url: '/proxy/satp/reportManage/queryAppVulnListByPage',
    method: 'post',
    data
  })
}
export function querySafeCodeListByPage(data) {
  return request({
    url: '/proxy/satp/reportManage/querySafeCodeListByPage',
    method: 'post',
    data
  })
}
export function queryInternetAssetListByPage(data) {
  return request({
    url: '/proxy/satp/reportManage/queryInternetAssetListByPage',
    method: 'post',
    data
  })
}
// 导出
export function exportReportManageExcel(data) {
  return request({
    url: '/proxy/satp/reportManage/exportReportManageExcel',
    method: 'post',
    data,
    responseType: 'blob'
  })
}
export function exportReportManagePdf(data) {
  return request({
    url: '/proxy/satp/reportManage/exportReportManagePdf',
    method: 'post',
    data,
    responseType: 'blob'
  })
}
export function exportReportManagePdfAll(data) {
  return request({
    url: '/proxy/satp/reportManage/exportReportManagePdfAll',
    method: 'post',
    data,
    responseType: 'blob'
  })
}
export function queryTemReportListByPage(data) {
  return request({
    url: '/proxy/satp/reportManage/queryTemReportListByPage',
    method: 'post',
    data
  })
}
export function queryTaskSummary(data) {
  return request({
    url: '/proxy/satp/reportManage/queryTaskSummary',
    method: 'post',
    data
  })
}
export function queryImportManageListByPage(data) {
  return request({
    url: '/proxy/satp/reportManage/queryImportManageListByPage',
    method: 'post',
    data
  })
}
// 模板下载
export function downloadTemp(data) {
  return request({
    url: '/proxy/satp/reportManage/downloadTemp',
    method: 'post',
    data,
    responseType: 'blob'
  })
}
export function importTemps(data) {
  return request({
    url: '/proxy/satp/reportManage/importTemps',
    method: 'post',
    data
  })
}
export function querySubReport(data) {
  return request({
    url: '/proxy/satp/reportManage/querySubReport',
    method: 'post',
    data
  })
}
export function subManage(data) {
  return request({
    url: '/proxy/satp/reportManage/subManage',
    method: 'post',
    data
  })
}
export function cancelSubManage(data) {
  return request({
    url: '/proxy/satp/reportManage/cancelSubManage',
    method: 'post',
    data
  })
}
