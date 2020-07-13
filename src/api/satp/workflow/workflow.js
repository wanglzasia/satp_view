import request from '@/utils/request'

// 流程定义列表分页
function processList(data) {
  return request({
    url: '/proxy/satp/workflow/processListData',
    method: 'post',
    data
  })
}

// 流程定义查看流程xml
function processXmlResource(data) {
  return request({
    url: '/proxy/satp/workflow/processResource',
    method: 'post',
    data
  })
}

// 流程定义查看流程图片
function processPicResource(data) {
  return request({
    url: '/proxy/satp/workflow/processResource',
    method: 'post',
    responseType: 'arraybuffer',
    data
  })
}

// 删除流程
function deleteProcess(data) {
  return request({
    url: '/proxy/satp/workflow/deleteProcess',
    method: 'post',
    data
  })
}

// 开启工作流
function start(data) {
  return request({
    url: '/proxy/satp/workflow/start',
    method: 'post',
    data
  })
}

// 所有待办任务列表
function allBusiTaskListData(data) {
  return request({
    url: '/proxy/satp/workflow/allBusiTaskListData',
    method: 'post',
    data
  })
}

// 个人待办任务列表
function busiTaskListData(data) {
  return request({
    url: '/proxy/satp/workflow/busiTaskListData',
    method: 'post',
    data
  })
}

// 查询流程跟踪数据
function taskTraceListData(data) {
  return request({
    url: '/proxy/satp/workflow/taskTraceListData',
    method: 'post',
    data
  })
}

// 流程跟踪图片
function taskTracePicture(data) {
  return request({
    url: '/proxy/satp/workflow/taskTracePicture',
    method: 'post',
    responseType: 'arraybuffer',
    data
  })
}

// 流程终止
function termProcess(data) {
  return request({
    url: '/proxy/satp/workflow/termProcess',
    method: 'post',
    data
  })
}

// 流程转派
function transferTask(data) {
  return request({
    url: '/proxy/satp/workflow/transferTask',
    method: 'post',
    data
  })
}

// 审批记录
function auditTrace(data) {
  return request({
    url: '/proxy/satp/workflow/auditTrace',
    method: 'post',
    data
  })
}

// 查询url配置
function getURL(data) {
  return request({
    url: '/proxy/satp/workflow/getURL',
    method: 'post',
    data
  })
}

// 查询任务变量
function getTaskVariable(data) {
  return request({
    url: '/proxy/satp/workflow/getTaskVariable',
    method: 'post',
    data
  })
}

// 查询历史任务列表分页
function hisTaskListData(data) {
  return request({
    url: '/proxy/satp/workflow/hisTaskListData',
    method: 'post',
    data
  })
}

// 查询流程定义key和name
function procDefListData(data) {
  return request({
    url: '/proxy/satp/workflow/procDefListData',
    method: 'post',
    data
  })
}

export default {
  processList: processList,
  processXmlResource: processXmlResource,
  processPicResource: processPicResource,
  deleteProcess: deleteProcess,
  start: start,
  allBusiTaskListData: allBusiTaskListData,
  busiTaskListData: busiTaskListData,
  taskTraceListData: taskTraceListData,
  taskTracePicture: taskTracePicture,
  termProcess: termProcess,
  transferTask: transferTask,
  auditTrace: auditTrace,
  getURL: getURL,
  getTaskVariable: getTaskVariable,
  hisTaskListData: hisTaskListData,
  procDefListData: procDefListData
}
