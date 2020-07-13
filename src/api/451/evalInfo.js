import request from '@/utils/request'

// 列表
export function loadEvalList(data) {
  return request({
    url: '/proxy/satpHlj/eval/loadEvalList',
    method: 'post',
    data
  })
}
// 新增评估清单
export function addEval(data) {
  return request({
    url: '/proxy/satpHlj/eval/addEval',
    method: 'post',
    data
  })
}
// 修改评估清单
export function updateEval(data) {
  return request({
    url: '/proxy/satpHlj/eval/updateEval',
    method: 'post',
    data
  })
}
// 业务列表
export function loadEvalutionInfo(data) {
  return request({
    url: '/proxy/satpHlj/eval/loadEvalutionInfo',
    method: 'post',
    data
  })
}
// 发起评估
export function saveEval(data) {
  return request({
    url: '/proxy/satpHlj/eval/saveEval',
    method: 'post',
    data
  })
}
// 查询评估明细
export function findEvalInfo(data) {
  return request({
    url: '/proxy/satpHlj/eval/findEvalInfo',
    method: 'post',
    data
  })
}
