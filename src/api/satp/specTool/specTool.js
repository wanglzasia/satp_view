import request from '@/utils/request'

// 分页列表
export function specToolList(data) {
  return request({
    url: '/proxy/satp/specTool/specToolListData',
    method: 'post',
    data
  })
}
// 新增
export function addSpecTool(data) {
  return request({
    url: '/proxy/satp/specTool/addSpecTool',
    method: 'post',
    data
  })
}
// 修改
export function updateSpecTool(data) {
  return request({
    url: '/proxy/satp/specTool/updateSpecTool',
    method: 'post',
    data
  })
}
// 单个查询
export function findSpecTool(data) {
  return request({
    url: '/proxy/satp/specTool/findSpecTool',
    method: 'post',
    data
  })
}
// 专项工具通知
export function doNotice(data) {
  return request({
    url: '/proxy/satp/specTool/doNotice',
    method: 'post',
    data
  })
}
// 专项工具获取Id
export function getToolId() {
  return request({
    url: '/proxy/satp/specTool/getToolId',
    method: 'post'
  })
}
// 专项工具通知-阅知
export function noticeResult(data) {
  return request({
    url: '/proxy/satp/specTool/noticeResult',
    method: 'post',
    data
  })
}

// 专项工具任务列表
export function specTaskList(data) {
  return request({
    url: '/proxy/satp/specTool/specTaskListData',
    method: 'post',
    data
  })
}
// 专项工具任务新增
export function addSpecTask(data) {
  return request({
    url: '/proxy/satp/specTool/addSpecTask',
    method: 'post',
    data
  })
}
// 专项工具任务查询
export function findSpecTask(data) {
  return request({
    url: '/proxy/satp/specTool/findSpecTask',
    method: 'post',
    data
  })
}
// 专项工具资产列表
export function specTaskAssetList(data) {
  return request({
    url: '/proxy/satp/specTool/specTaskAssetListData',
    method: 'post',
    data
  })
}
// 专项工具任务启动
export function startTask(data) {
  return request({
    url: '/proxy/satp/specTool/startTask',
    method: 'post',
    data
  })
}

// 专项工具已分发用户获取
export function toolUserList(data) {
  return request({
    url: '/proxy/satp/specTool/toolUserList',
    method: 'post',
    data
  })
}

// 专项工具分发用户
export function saveToolUser(data) {
  return request({
    url: '/proxy/satp/specTool/saveToolUser',
    method: 'post',
    data
  })
}

// 专项工具分发列表
export function specToolGiveList(data) {
  return request({
    url: '/proxy/satp/specTool/specToolGiveList',
    method: 'post',
    data
  })
}
