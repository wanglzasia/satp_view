import request from '@/utils/request'

// 白名单列表
export function vulnWhiteListData(data) {
  return request({
    url: '/proxy/satp/vulnWhite/vulnWhiteListData',
    method: 'post',
    data
  })
}

// 新增白名单
export function saveWhite(data) {
  return request({
    url: '/proxy/satp/vulnWhite/saveWhite',
    method: 'post',
    data
  })
}

// 修改白名单
export function updateWhite(data) {
  return request({
    url: '/proxy/satp/vulnWhite/updateWhite',
    method: 'post',
    data
  })
}

// 漏洞白名单来源分析
export function whiteSourceData(data) {
  return request({
    url: '/proxy/satp/vulnWhite/whiteSourceData',
    method: 'post',
    data
  })
}

// 漏洞白名单状态分析
export function whiteStatusData(data) {
  return request({
    url: '/proxy/satp/vulnWhite/whiteStatusData',
    method: 'post',
    data
  })
}

