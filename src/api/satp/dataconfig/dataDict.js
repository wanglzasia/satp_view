import request from '@/utils/request'

export function queryDataDictListByPage(data) {
  return request({
    url: '/proxy/satp/configManage/queryDataDictListByPage',
    method: 'post',
    data
  })
}

export function queryDataDictList(data) {
  return request({
    url: '/proxy/satp/configManage/queryDataDictList',
    method: 'post',
    data
  })
}

export function saveDataDict(data) {
  return request({
    url: '/proxy/satp/configManage/saveDataDict',
    method: 'post',
    data
  })
}

export function updateDataDict(data) {
  return request({
    url: '/proxy/satp/configManage/updateDataDict',
    method: 'post',
    data
  })
}

export function deleteDataDict(data) {
  return request({
    url: '/proxy/satp/configManage/deleteDataDict',
    method: 'post',
    data
  })
}

