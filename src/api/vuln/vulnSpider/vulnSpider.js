import request from '@/utils/request'

// 漏洞情报呈现列表数据查询
export function vulnInfoListData(data) {
  return request({
    url: '/proxy/satp/vulnSpider/vulnInfoListData',
    method: 'post',
    data
  })
}

