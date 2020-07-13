import request from '@/utils/request'

// 加载漏洞方案视图数据
export function loadVulnProjData(data) {
  return request({
    url: '/proxy/satp/vulnReport/loadVulnProjData',
    method: 'post',
    data
  })
}

// 加载测试基地管理视图数据
export function loadTestBaseData(data) {
  return request({
    url: '/proxy/satp/vulnReport/loadTestBaseData',
    method: 'post',
    data
  })
}

