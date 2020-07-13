import request from '@/utils/request'

export function getAssetTypeTree(data) {
  return request({
    url: '/proxy/satp/asset/getAssetTypeTree',
    method: 'post',
    data
  })
}

export function getAssetList(data) {
  return request({
    url: '/proxy/satp/asset/getAssetList',
    method: 'post',
    data
  })
}

export function getOneAsset(data) {
  return request({
    url: '/proxy/satp/asset/getOneAsset',
    method: 'post',
    data
  })
}

export function getAssetRelList(data) {
  return request({
    url: '/proxy/satp/asset/getAssetRelList',
    method: 'post',
    data
  })
}

export function saveAssetRel(data) {
  return request({
    url: '/proxy/satp/asset/saveAssetRel',
    method: 'post',
    data
  })
}

export function deleteAssetRel(data) {
  return request({
    url: '/proxy/satp/asset/deleteAssetRel',
    method: 'post',
    data
  })
}

export function getAssetExtList(data) {
  return request({
    url: '/proxy/satp/asset/getAssetExtList',
    method: 'post',
    data
  })
}

export function saveAssetExt(data) {
  return request({
    url: '/proxy/satp/asset/saveAssetExt',
    method: 'post',
    data
  })
}

export function deleteAssetExt(data) {
  return request({
    url: '/proxy/satp/asset/deleteAssetExt',
    method: 'post',
    data
  })
}

export function saveAsset(data) {
  return request({
    url: '/proxy/satp/asset/saveAsset',
    method: 'post',
    data
  })
}

export function updateAsset(data) {
  return request({
    url: '/proxy/satp/asset/updateAsset',
    method: 'post',
    data
  })
}
