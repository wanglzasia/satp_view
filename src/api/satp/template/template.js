import request from '@/utils/request'

// 列表
export function templateList(data) {
  return request({
    url: '/proxy/satp/template/templateListData',
    method: 'post',
    data
  })
}
// 新增
export function addTemplate(data) {
  return request({
    url: '/proxy/satp/template/addTemplate',
    method: 'post',
    data
  })
}
// 修改
export function updateTemplate(data) {
  return request({
    url: '/proxy/satp/template/updateTemplate',
    method: 'post',
    data
  })
}
// 单个查询
export function findTemplate(data) {
  return request({
    url: '/proxy/satp/template/findTemplate',
    method: 'post',
    data
  })
}
// 查询编码序列
export function findTemplateNo() {
  return request({
    url: '/proxy/satp/template/findTemplateNo',
    method: 'post'
  })
}
// 生效
export function templateEffect(data) {
  return request({
    url: '/proxy/satp/template/templateEffect',
    method: 'post',
    data
  })
}
// 失效
export function templateInvalid(data) {
  return request({
    url: '/proxy/satp/template/templateInvalid',
    method: 'post',
    data
  })
}
// 导出模板
export function exportTemplateTemplate(data) {
  return request({
    url: '/proxy/satp/template/exportTemplateTemplate',
    method: 'post',
    data,
    responseType: 'blob'
  })
}

// 导出
export function exportTemplate(data) {
  return request({
    url: '/proxy/satp/template/exportTemplate',
    method: 'post',
    data,
    responseType: 'blob'
  })
}

// 导入
export function importTemplate(data) {
  return request({
    url: '/proxy/satp/template/importTemplate',
    method: 'post',
    headers: { 'Content-Type': 'multipart/form-data' },
    data
  })
}

// 合规模板关联合规项列表
export function itemList(data) {
  return request({
    url: '/proxy/satp/template/itemList',
    method: 'post',
    data
  })
}

// 合规模板关联合规项
export function saveTemplateItem(data) {
  return request({
    url: '/proxy/satp/template/saveTemplateItem',
    method: 'post',
    data
  })
}
// 合规模板取消关联合规项
export function deleteTemplateItem(data) {
  return request({
    url: '/proxy/satp/template/deleteTemplateItem',
    method: 'post',
    data
  })
}
// 合规模板关联合规项数量
export function templateItemCount(data) {
  return request({
    url: '/proxy/satp/template/templateItemCount',
    method: 'post',
    data
  })
}
// 合规模板复制
export function tempCopy(data) {
  return request({
    url: '/proxy/satp/template/tempCopy',
    method: 'post',
    data
  })
}

