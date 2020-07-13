import request from '@/utils/request'

export function loadBasicAsset(data) {
  return request({
    url: '/proxy/satp/rptView/loadBasicAsset',
    method: 'post',
    data
  })
}

export function loadBasicVuln(data) {
  return request({
    url: '/proxy/satp/rptView/loadBasicVuln',
    method: 'post',
    data
  })
}

export function loadBasicBiz(data) {
  return request({
    url: '/proxy/satp/rptView/loadBasicBiz',
    method: 'post',
    data
  })
}

export function loadBasicRectify(data) {
  return request({
    url: '/proxy/satp/rptView/loadBasicRectify',
    method: 'post',
    data
  })
}

export function loadManageSecurity(data) {
  return request({
    url: '/proxy/satp/rptView/loadManageSecurity',
    method: 'post',
    data
  })
}

export function loadViewSet(data) {
  return request({
    url: '/proxy/satp/rptView/loadViewSet',
    method: 'post',
    data
  })
}

export function loadView(data) {
  return request({
    url: '/proxy/satp/rptView/loadView',
    method: 'post',
    data
  })
}

export function reportViewSet(data) {
  return request({
    url: '/proxy/satp/rptView/reportViewSet',
    method: 'post',
    data
  })
}

export function setRptViewConfigMonth(data) {
  return request({
    url: '/proxy/satp/rptView/setRptViewConfigMonth',
    method: 'post',
    data
  })
}

export function getRptViewConfigMonth(data) {
  return request({
    url: '/proxy/satp/rptView/getRptViewConfigMonth',
    method: 'post',
    data
  })
}

export function queryAssetInfoList(data) {
  return request({
    url: '/proxy/satp/rptView/queryAssetInfoList',
    method: 'post',
    data
  })
}

export function queryProbInfoList(data) {
  return request({
    url: '/proxy/satp/rptView/queryProbInfoList',
    method: 'post',
    data
  })
}

export function queryAllInfo(data) {
  return request({
    url: '/proxy/satp/rptView/queryAllInfo',
    method: 'post',
    data
  })
}
