/**
 * satp dev group
 */

export function satpVersion() {
  console.log('satp common js')
  console.log('version 1.0')
  console.log('since 2020-04-2')
}
/**
 * 日期格式化函数
 * @param {*} el 源数据
 */
export function dateTimeFormat(el) {
  const fmt = 'YYYY-MM-DD HH:mm:ss'
  let value = ''
  if (el) { value = this.moment(el).format(fmt) }
  return value
}

/**
 * 执行计划转义
 * @param {*} data  执行计划数组
 */
export function parserTaskPlan(data) {
  const planType = data.planType
  const planFreq = data.planFreq
  let taskPlan = ''
  if (planType === 1) {
    switch (planFreq) {
      case 1:
        // 每日
        taskPlan = '每日' + data.hour + '时' + data.min + '分'
        break
      case 2:
        // 每周
        taskPlan = '每周' + data.week + ' ' + data.hour + '时' + data.min + '分'
        break
      case 3:
        // 每月
        taskPlan = '每月' + data.day + '日' + data.hour + '时' + data.min + '分'
        break
      case 4:
        // 每年
        taskPlan = '每年' + data.month + '月' + data.day + '日' + data.hour + '时' + data.min + '分'
        break
      case 5:
        // 单次
        taskPlan = data.hour + '时' + data.min + '分'
        break
      default:
        break
    }
  } else {
    taskPlan = '立即执行'
  }
  return taskPlan
}
/**
 *任务状态转义
 * @param {任务状态} taskStatus
 */
export function taskStatusFormat(taskStatus) {
  let ret = ''
  if (taskStatus === 0 || taskStatus === '0') {
    ret = '草稿'
  } else if (taskStatus === 1 || taskStatus === '1') {
    ret = '已完成'
  } else if (taskStatus === 2 || taskStatus === '2') {
    ret = '执行中'
  } else if (taskStatus === 20 || taskStatus === '20') {
    ret = '待拆分'
  } else if (taskStatus === 21 || taskStatus === '21') {
    ret = '待执行'
  }
  return ret
}
/**
 *任务来源
 * @param {任务来源格式化} taskStatus
 */
export function taskSrcFormatter(taskStatus) {
  let ret = ''
  if (taskStatus === 2 || taskStatus === '2') {
    ret = '集团'
  } else if (taskStatus === 1 || taskStatus === '1') {
    ret = '省份'
  }
  // alert(taskStatus)
  return ret
}

/**
 *任务类型
 * @param {任务类型} taskType
 */
export function taskTypeFormatter(taskType) {
  let ret = ''
  if (taskType === 'inte') {
    ret = '综合检查'
  } else if (taskType === 'base') {
    ret = '基线检测'
  } else if (taskType === 'vuln') {
    ret = '系统漏扫'
  } else if (taskType === 'web') {
    ret = 'web检测'
  } else if (taskType === 'weak') {
    ret = '弱口令检测'
  } else if (taskType === 'content') {
    ret = '内容合规检测'
  } else if (taskType === 'app') {
    ret = 'APP检测'
  } else if (taskType === 'server') {
    ret = '应用服务地址探测'
  } else if (taskType === 'grade') {
    ret = '等保自评'
  } else if (taskType === 'code') {
    ret = '代码审计'
  }
  return ret
}
