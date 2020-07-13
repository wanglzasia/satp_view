import request from '@/utils/request'

// 任务列表
export function taskList(data) {
  return request({
    url: '/proxy/satp/task/taskList',
    method: 'post',
    data
  })
}

// 新增任务,不含资产等配置信息
export function addTask(data) {
  return request({
    url: '/proxy/satp/task/addTask',
    method: 'post',
    data
  })
}

// --- 任务合规项相关函数
// 保存任务合规项
export function saveTaskItem(data) {
  return request({
    url: '/proxy/satp/task/saveTaskItem',
    method: 'post',
    data
  })
}

// 删除任务合规项
export function deleteTaskItem(data) {
  return request({
    url: '/proxy/satp/task/deleteTaskItem',
    method: 'post',
    data
  })
}

// 合规项待选列表
export function itemList(data) {
  return request({
    url: '/proxy/satp/task/itemListData',
    method: 'post',
    data: data
  })
}

// 任务合规项已选列表
export function taskItemList(data) {
  return request({
    url: '/proxy/satp/task/taskItemListData',
    method: 'post',
    data: data
  })
}

// --- 任务模板相关函数
// 保存任务模板
export function saveTemplate(data) {
  return request({
    url: '/proxy/satp/task/saveTemplate',
    method: 'post',
    data: data
  })
}

// 删除任务模板
export function deleteTaskTemplate(data) {
  return request({
    url: '/proxy/satp/task/deleteTaskTemplate',
    method: 'post',
    data: data
  })
}

// 模板待选列表
export function templateList(data) {
  return request({
    url: '/proxy/satp/task/templateListData',
    method: 'post',
    data: data
  })
}

// 任务模板已选列表
export function taskTemplateList(data) {
  return request({
    url: '/proxy/satp/task/taskTemplateListData',
    method: 'post',
    data: data
  })
}

// ///////////////////////////////
// 任务资产相关列表
// 资产待选列表

// 任务资产列表
export function loadAssetToSel(data) {
  return request({
    url: '/proxy/satp/task/loadAssetToSel',
    method: 'post',
    data
  })
}

// 资产已选列表
export function loadTaskAsset(data) {
  return request({
    url: '/proxy/satp/task/loadTaskAsset',
    method: 'post',
    data
  })
}

// 保存任务资产
export function saveAsset(data) {
  return request({
    url: '/proxy/satp/task/saveAsset',
    method: 'post',
    data: data
  })
}
// 删除任务资产
export function deleteTaskAsset(data) {
  return request({
    url: '/proxy/satp/task/deleteTaskAsset',
    method: 'post',
    data: data
  })
}
// ///////////////////////////////
// /任务工具相关
// ///////////////////////////////

// 待选工具列表
export function taskToolList(data) {
  return request({
    url: '/proxy/satp/task/taskToolList',
    method: 'post',
    data: data
  })
}
// 已选工具列表
export function taskToolToSel(data) {
  return request({
    url: '/proxy/satp/task/taskToolToSel',
    method: 'post',
    data: data
  })
}

// 保存任务工具
export function saveTaskTool(data) {
  return request({
    url: '/proxy/satp/task/saveTaskTool',
    method: 'post',
    data: data
  })
}
// 删除任务工具
export function deleteTaskTool(data) {
  return request({
    url: '/proxy/satp/task/deleteTaskTool',
    method: 'post',
    data: data
  })
}
// 查询任务信息
export function loadTask(data) {
  return request({
    url: '/proxy/satp/task/loadTask',
    method: 'post',
    data: data
  })
}

// 查询任务树信息
export function loadSubTaskTree(data) {
  return request({
    url: '/proxy/satp/task/loadSubTaskTree',
    method: 'post',
    data: data
  })
}

// 保存子任务
export function addSubTask(data) {
  return request({
    url: '/proxy/satp/task/addSubTask',
    method: 'post',
    data: data
  })
}

// 查询任务树信息
export function loadTaskAssignList(data) {
  return request({
    url: '/proxy/satp/task/loadTaskAssignList',
    method: 'post',
    data: data
  })
}

// 保存子任务
export function loadTaskAssignToAssignList(data) {
  return request({
    url: '/proxy/satp/task/loadTaskAssignToAssignList',
    method: 'post',
    data: data
  })
}

// 删除子任务
export function removeSubTask(data) {
  return request({
    url: '/proxy/satp/task/removeSubTask',
    method: 'post',
    data: data
  })
}

// 删除任务
export function removeTask(data) {
  return request({
    url: '/proxy/satp/task/removeTask',
    method: 'post',
    data: data
  })
}

// 分配任务资产
export function moveIn(data) {
  return request({
    url: '/proxy/satp/task/moveIn',
    method: 'post',
    data: data
  })
}

// 清除任务资产
export function moveOut(data) {
  return request({
    url: '/proxy/satp/task/moveOut',
    method: 'post',
    data: data
  })
}

// 拆分完成
export function splitDone(data) {
  return request({
    url: '/proxy/satp/task/splitDone',
    method: 'post',
    data: data
  })
}

// //////////////
// //
// //////////////
// 资产列表
export function assetList(data) {
  return request({
    url: '/proxy/satp/task/assetListData',
    method: 'post',
    data
  })
}

// 启动任务
export function startTask(data) {
  return request({
    url: '/proxy/satp/task/startTask',
    method: 'post',
    data: data
  })
}

// 暂停任务
export function pauseTask(data) {
  return request({
    url: '/proxy/satp/task/pauseTask',
    method: 'post',
    data: data
  })
}

// 停止任务
export function stopTask(data) {
  return request({
    url: '/proxy/satp/task/stopTask',
    method: 'post',
    data: data
  })
}

// 跟踪任务
export function taskTrace(data) {
  return request({
    url: '/proxy/satp/task/taskTrace',
    method: 'post',
    data: data
  })
}

// 导出任务
export function expTask(data) {
  return request({
    url: '/proxy/satp/task/expTask',
    method: 'post',
    data: data
  })
}

// 任务详情
export function taskDetail(data) {
  return request({
    url: '/proxy/satp/task/taskDetail',
    method: 'post',
    data: data
  })
}

// 保存任务合规项
/*
export function saveItem(data) {
  return request({
    url: '/proxy/satp/task/saveItem',
    method: 'post',
    data: data
  })
}
*/

// 获取任务预估时间
export function getEstTime(data) {
  return request({
    url: '/proxy/satp/task/getEstTime',
    method: 'post',
    data: data
  })
}

// 保存任务信息
export function updateTask(data) {
  return request({
    url: '/proxy/satp/task/updateTask',
    method: 'post',
    data: data
  })
}

// ////////////
// 以下为 代码安全任务
// ////////////

// 代码安全任务分页
export function caTaskList(data) {
  return request({
    url: '/proxy/satp/task/caTaskListData',
    method: 'post',
    data: data
  })
}

// 保存代码安全任务
export function saveCaTask(data) {
  return request({
    url: '/proxy/satp/task/saveCaTask',
    method: 'post',
    data: data
  })
}

export function configDone(data) {
  return request({
    url: '/proxy/satp/task/configDone',
    method: 'post',
    data: data
  })
}

export function configSingleDone(data) {
  return request({
    url: '/proxy/satp/task/singleConfigDone',
    method: 'post',
    data: data
  })
}

// 等保相关
export function loadGradeAssetData(data) {
  return request({
    url: '/proxy/satp/task/loadGradeAssetData',
    method: 'post',
    data: data
  })
}

export function loadGradeItemData(data) {
  return request({
    url: '/proxy/satp/task/loadGradeItemData',
    method: 'post',
    data: data
  })
}

export function saveGradeAsset(data) {
  return request({
    url: '/proxy/satp/task/saveGradeAsset',
    method: 'post',
    data: data
  })
}

export function removeGradeAsset(data) {
  return request({
    url: '/proxy/satp/task/removeGradeAsset',
    method: 'post',
    data: data
  })
}

export function saveGradeItem(data) {
  return request({
    url: '/proxy/satp/task/saveGradeItem',
    method: 'post',
    data: data
  })
}

export function removeGradeItem(data) {
  return request({
    url: '/proxy/satp/task/removeGradeItem',
    method: 'post',
    data: data
  })
}

export function gradeConfigDone(data) {
  return request({
    url: '/proxy/satp/task/gradeConfigDone',
    method: 'post',
    data: data
  })
}

export function gradeSplitDone(data) {
  return request({
    url: '/proxy/satp/task/gradeSplitDone',
    method: 'post',
    data: data
  })
}

export function gradeAssignDetailList(data) {
  return request({
    url: '/proxy/satp/task/gradeAssignDetailList',
    method: 'post',
    data: data
  })
}

export function saveGradeResult(data) {
  return request({
    url: '/proxy/satp/task/saveGradeResult',
    method: 'post',
    data: data
  })
}

export function startGradeTask(data) {
  return request({
    url: '/proxy/satp/task/startGradeTask',
    method: 'post',
    data: data
  })
}

export function gradeTaskDone(data) {
  return request({
    url: '/proxy/satp/task/gradeTaskDone',
    method: 'post',
    data: data
  })
}

export function taskGradeRptItems(data) {
  return request({
    url: '/proxy/satp/task/taskGradeRptItems',
    method: 'post',
    data: data
  })
}

export function taskGradeRptResults(data) {
  return request({
    url: '/proxy/satp/task/taskGradeRptResults',
    method: 'post',
    data: data
  })
}

export function taskGradeChkResults(data) {
  return request({
    url: '/proxy/satp/task/taskGradeChkResults',
    method: 'post',
    data: data
  })
}

export function taskGradeDtlAssigns(data) {
  return request({
    url: '/proxy/satp/task/taskGradeDtlAssigns',
    method: 'post',
    data: data
  })
}

// 增加目标
export function saveServerTarget(data) {
  return request({
    url: '/proxy/satp/task/saveServerTarget',
    method: 'post',
    data: data
  })
}
// 移除目标
export function removeServerTarget(data) {
  return request({
    url: '/proxy/satp/task/removeServerTarget',
    method: 'post',
    data: data
  })
}
// 应用管理地址探测资产列表
export function taskServerAssets(data) {
  return request({
    url: '/proxy/satp/task/taskServerAssets',
    method: 'post',
    data: data
  })
}
// 应用管理地址探测任务配置完成
export function taskServerConfigDone(data) {
  return request({
    url: '/proxy/satp/task/taskServerConfigDone',
    method: 'post',
    data: data
  })
}

// 启动单任务
export function singleStartTask(data) {
  return request({
    url: '/proxy/satp/task/singleStartTask',
    method: 'post',
    data: data
  })
}
