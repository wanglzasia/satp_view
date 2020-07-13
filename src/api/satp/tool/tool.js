import request from '@/utils/request'

// 工具所有列表
export function toolAllList(data) {
  return request({
    url: '/proxy/satp/tool/toolAllListData',
    method: 'post',
    data
  })
}

// 任务工具列表
export function taskToolList(data) {
  return request({
    url: '/proxy/satp/tool/taskToolListData',
    method: 'post',
    data
  })
}

// 分页列表
export function toolList(data) {
  return request({
    url: '/proxy/satp/tool/toolListData',
    method: 'post',
    data
  })
}
// 新增
export function addTool(data) {
  return request({
    url: '/proxy/satp/tool/addTool',
    method: 'post',
    data
  })
}
// 修改
export function updateTool(data) {
  return request({
    url: '/proxy/satp/tool/updateTool',
    method: 'post',
    data
  })
}
// 单个查询
export function findTool(data) {
  return request({
    url: '/proxy/satp/tool/findTool',
    method: 'post',
    data
  })
}
// 删除
export function deleteTool(data) {
  return request({
    url: '/proxy/satp/tool/deleteTool',
    method: 'post',
    data
  })
}
// 修改状态
export function changeStatus(data) {
  return request({
    url: '/proxy/satp/tool/changeStatus',
    method: 'post',
    data
  })
}
