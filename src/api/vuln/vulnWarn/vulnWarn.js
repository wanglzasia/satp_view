import request from '@/utils/request'

// 漏洞预警列表
export function vulnWarnListData(data) {
  return request({
    url: '/proxy/satp/vulnWarn/vulnWarnListData',
    method: 'post',
    data
  })
}

// 根据ID查询漏洞预警信息
export function queryVulnWarnById(data) {
  return request({
    url: '/proxy/satp/vulnWarn/queryVulnWarnById',
    method: 'post',
    data
  })
}

// 查询通知组织
export function queryScopeOrg(data) {
  return request({
    url: '/proxy/satp/vulnWarn/queryScopeOrg',
    method: 'post',
    data
  })
}

// 查询通知人员
export function queryScopeUser(data) {
  return request({
    url: '/proxy/satp/vulnWarn/queryScopeUser',
    method: 'post',
    data
  })
}

// 新增漏洞预警
export function saveVulnWarn(data) {
  return request({
    url: '/proxy/satp/vulnWarn/saveVulnWarn',
    method: 'post',
    data
  })
}

// 修改漏洞预警
export function updateVulnWarn(data) {
  return request({
    url: '/proxy/satp/vulnWarn/updateVulnWarn',
    method: 'post',
    data
  })
}

// 漏洞预警管理--发布预警信息
export function pubWarn(data) {
  return request({
    url: '/proxy/satp/vulnWarn/pubWarn',
    method: 'post',
    data
  })
}

// 漏洞预警管理--发布解决方案
export function pubPlan(data) {
  return request({
    url: '/proxy/satp/vulnWarn/pubPlan',
    method: 'post',
    data
  })
}

// 查询漏洞预警附件
export function findVulnWarnFiles(data) {
  return request({
    url: '/proxy/satp/vulnWarn/findVulnWarnFiles',
    method: 'post',
    data
  })
}

