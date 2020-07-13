<template>
  <div>
    <div v-loading="selfCheckLoading" class="app-container">
      <div>
        <el-page-header content="信息填报" @back="goBack" />
        <router-view />
      </div>
      <el-card>
        <el-form
          :model="formObj"
          :label-position="labelPosition"
          label-width="auto"
          size="small"
        >
          <template>
            <el-row>
              <el-form-item>
                <el-col :span="24" align="left">
                  <b>是否建立本专业线条客户信息保护实施细则，且实施细则已配套公司管理要求同步更新：</b>
                </el-col>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item>
                <el-col :span="24">
                  <el-radio v-model="formObj.a1" label="0">是，实施细则（需附正式文件）</el-radio>
                </el-col>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item>
                <el-col :span="24">
                  <file-upload
                    :qrydata="datas"
                    :numlimit="limit"
                    @getFileList="getA1List"
                  />
                </el-col>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item>
                <el-col :span="10">
                  <el-radio v-model="formObj.a1" label="1">否，原因说明</el-radio>
                </el-col>
                <el-col :span="10">
                  <el-input v-model="formObj.a1ReasonText1" placeholder="否，原因说明" clearable />
                </el-col>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item>
                <el-col :span="10">
                  <el-radio v-model="formObj.a1" label="2">不涉及，原因说明</el-radio>
                </el-col>
                <el-col :span="10">
                  <el-input v-model="formObj.a1ReasonText2" placeholder="不涉及，原因说明" clearable />
                </el-col>
              </el-form-item>
            </el-row>
          </template>
          <el-divider />
          <template>
            <el-row>
              <el-form-item>
                <el-col :span="24" align="left">
                  <b>是否建立本部门信息安全事件应急预案，且预案中包括客户信息泄露事件处置流程:</b>
                </el-col>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item>
                <el-col :span="24">
                  <el-radio v-model="formObj.a2" label="0">是，应急预案（需附正式文件）</el-radio>
                </el-col>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item>
                <el-col :span="24">
                  <file-upload
                    :qrydata="datas"
                    :numlimit="limit"
                    @getFileList="getA2List"
                  />
                </el-col>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item>
                <el-col :span="10">
                  <el-radio v-model="formObj.a2" label="1">否</el-radio>
                </el-col>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item>
                <el-col :span="10">
                  <el-radio v-model="formObj.a2" label="2">不涉及</el-radio>
                </el-col>
              </el-form-item>
            </el-row>
          </template>
          <el-divider />
          <template>
            <el-row>
              <el-form-item>
                <el-col :span="24" align="left">
                  <b>本单位掌握的个人信息类型和数量：</b>
                </el-col>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item>
                <el-col :span="24">
                  用户身份和鉴权信息<el-input v-model="formObj.a3Text1" clearable style="width:80px" />条
                </el-col>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item>
                <el-col :span="10">
                  用户数据及服务内容信息<el-input v-model="formObj.a3Text2" clearable style="width:80px" />条
                </el-col>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item>
                <el-col :span="10">
                  用户服务相关信息<el-input v-model="formObj.a3Text3" clearable style="width:80px" />条
                </el-col>
              </el-form-item>
            </el-row>
          </template>
          <el-divider />
          <template>
            <el-row>
              <el-form-item>
                <el-col :span="24" align="left">
                  <b>本单位掌握的个人信息出境的类型和数量：</b>
                </el-col>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item>
                <el-col :span="24">
                  用户身份和鉴权信息<el-input v-model="formObj.a4Text1" clearable style="width:80px" />条
                </el-col>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item>
                <el-col :span="10">
                  用户数据及服务内容信息<el-input v-model="formObj.a4Text2" clearable style="width:80px" />条
                </el-col>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item>
                <el-col :span="10">
                  用户服务相关信息<el-input v-model="formObj.a4Text3" clearable style="width:80px" />条
                </el-col>
              </el-form-item>
            </el-row>
          </template>
          <el-divider />
          <template>
            <el-row>
              <el-form-item>
                <el-col :span="24" align="left">
                  <b>是否全量梳理各类业务（包括用户协议、业务受理单等），并已充分告知用户收集、使用其个人信息的目的、方式和范围：</b>
                </el-col>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item>
                <el-col :span="24">
                  <el-radio v-model="formObj.a5" label="0">是，协议文件（需附正式文件）</el-radio>
                </el-col>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item>
                <el-col :span="24">
                  <file-upload
                    :qrydata="datas"
                    :numlimit="limit"
                    @getFileList="getA5List"
                  />
                </el-col>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item>
                <el-col :span="10">
                  <el-radio v-model="formObj.a5" label="1">否，原因说明</el-radio>
                </el-col>
                <el-col :span="10">
                  <el-input v-model="formObj.a5ReasonText1" placeholder="否，原因说明" clearable />
                </el-col>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item>
                <el-col :span="10">
                  <el-radio v-model="formObj.a5" label="2">不涉及，原因说明</el-radio>
                </el-col>
                <el-col :span="10">
                  <el-input v-model="formObj.a5ReasonText2" placeholder="不涉及，原因说明" clearable />
                </el-col>
              </el-form-item>
            </el-row>
          </template>
          <el-divider />
          <template>
            <el-row>
              <el-form-item>
                <el-col :span="24" align="left">
                  <b>是否在网站、营业厅、APP等渠道向用户明示公司个人信息收集、使用规则:</b>
                </el-col>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item>
                <el-col :span="24">
                  <el-radio v-model="formObj.a6" label="0">是，收集规则（需附正式文件）</el-radio>
                </el-col>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item>
                <el-col :span="24">
                  <file-upload
                    :qrydata="datas"
                    :numlimit="limit"
                    @getFileList="getA6List"
                  />
                </el-col>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item>
                <el-col :span="10">
                  <el-radio v-model="formObj.a6" label="1">否，原因说明</el-radio>
                </el-col>
                <el-col :span="10">
                  <el-input v-model="formObj.a6ReasonText1" placeholder="否，原因说明" clearable />
                </el-col>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item>
                <el-col :span="10">
                  <el-radio v-model="formObj.a6" label="2">不涉及，原因说明</el-radio>
                </el-col>
                <el-col :span="10">
                  <el-input v-model="formObj.a6ReasonText2" placeholder="不涉及，原因说明" clearable />
                </el-col>
              </el-form-item>
            </el-row>
          </template>
          <el-divider />
          <template>
            <el-row>
              <el-form-item>
                <el-col :span="24" align="left">
                  <b>是否严格数据共享类业务管理，未经客户同意，禁止将任何客户个人信息向第三方提供：</b>
                </el-col>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item>
                <el-col :span="24">
                  <el-radio v-model="formObj.a7" label="0">是，数据共享类业务清单（需附正式文件）</el-radio>
                </el-col>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item>
                <el-col :span="24">
                  <file-upload
                    :qrydata="datas"
                    :numlimit="limit"
                    @getFileList="getA7List"
                  />
                </el-col>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item>
                <el-col :span="10">
                  <el-radio v-model="formObj.a7" label="1">否，原因说明</el-radio>
                </el-col>
                <el-col :span="10">
                  <el-input v-model="formObj.a7ReasonText1" placeholder="否，原因说明" clearable />
                </el-col>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item>
                <el-col :span="10">
                  <el-radio v-model="formObj.a7" label="2">不涉及，原因说明</el-radio>
                </el-col>
                <el-col :span="10">
                  <el-input v-model="formObj.a7ReasonText2" placeholder="不涉及，原因说明" clearable />
                </el-col>
              </el-form-item>
            </el-row>
          </template>
          <el-divider />
          <template>
            <el-row>
              <el-form-item>
                <el-col :span="24" align="left">
                  <b>是否严格数据共享类业务管理，做好业务上线前的新技术新业务信息安全评估:</b>
                </el-col>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item>
                <el-col :span="24">
                  <el-radio v-model="formObj.a8" label="0">是，数据共享类业务进行了新技术新业务评估清单（需附正式文件）</el-radio>
                </el-col>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item>
                <el-col :span="24">
                  <file-upload
                    :qrydata="datas"
                    :numlimit="limit"
                    @getFileList="getA8List"
                  />
                </el-col>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item>
                <el-col :span="10">
                  <el-radio v-model="formObj.a8" label="1">否，原因说明</el-radio>
                </el-col>
                <el-col :span="10">
                  <el-input v-model="formObj.a8ReasonText1" placeholder="否，原因说明" clearable />
                </el-col>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item>
                <el-col :span="10">
                  <el-radio v-model="formObj.a8" label="2">不涉及，原因说明</el-radio>
                </el-col>
                <el-col :span="10">
                  <el-input v-model="formObj.a8ReasonText2" placeholder="不涉及，原因说明" clearable />
                </el-col>
              </el-form-item>
            </el-row>
          </template>
          <el-divider />
          <template>
            <el-row>
              <el-form-item>
                <el-col :span="24" align="left">
                  <b>是否梳理客户信息查询相关业务场景，并建立授权查询机制，对于投诉处理、业务办理等各类查询场景，要单独取得用户明确授权，并留存相应的授权记录：</b>
                </el-col>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item>
                <el-col :span="24">
                  <el-radio v-model="formObj.a9" label="0">是</el-radio>
                </el-col>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item>
                <el-col :span="10">
                  <el-radio v-model="formObj.a9" label="1">否，原因说明</el-radio>
                </el-col>
                <el-col :span="10">
                  <el-input v-model="formObj.a9ReasonText1" placeholder="否，原因说明" clearable />
                </el-col>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item>
                <el-col :span="10">
                  <el-radio v-model="formObj.a9" label="2">不涉及，原因说明</el-radio>
                </el-col>
                <el-col :span="10">
                  <el-input v-model="formObj.a9ReasonText2" placeholder="不涉及，原因说明" clearable />
                </el-col>
              </el-form-item>
            </el-row>
          </template>
          <el-divider />
          <template>
            <el-row>
              <el-form-item>
                <el-col :span="24" align="left">
                  <b>是否对各个涉敏感信息系统进行排查，确保未设立VIP、VVIP等各类重点客户网络监测保障机制:</b>
                </el-col>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item>
                <el-col :span="24">
                  <el-radio v-model="formObj.a10" label="0">是</el-radio>
                </el-col>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item>
                <el-col :span="10">
                  <el-radio v-model="formObj.a10" label="1">否，原因说明</el-radio>
                </el-col>
                <el-col :span="10">
                  <el-input v-model="formObj.a10ReasonText1" placeholder="否，原因说明" clearable />
                </el-col>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item>
                <el-col :span="10">
                  <el-radio v-model="formObj.a10" label="2">不涉及，原因说明</el-radio>
                </el-col>
                <el-col :span="10">
                  <el-input v-model="formObj.a10ReasonText2" placeholder="不涉及，原因说明" clearable />
                </el-col>
              </el-form-item>
            </el-row>
          </template>
          <el-divider />
          <template>
            <el-row>
              <el-form-item>
                <el-col :span="24" align="left">
                  <b>是否设立涉及客户敏感信息操作人员名单库（即“涉敏人员库”），并动态维护：</b>
                </el-col>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item>
                <el-col :span="24">
                  <el-radio v-model="formObj.a11" label="0">是，涉敏人员库（需附正式文件）</el-radio>
                </el-col>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item>
                <el-col :span="24">
                  <file-upload
                    :qrydata="datas"
                    :numlimit="limit"
                    @getFileList="getA11List"
                  />
                </el-col>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item>
                <el-col :span="10">
                  <el-radio v-model="formObj.a11" label="1">否，原因说明</el-radio>
                </el-col>
                <el-col :span="10">
                  <el-input v-model="formObj.a11ReasonText1" placeholder="否，原因说明" clearable />
                </el-col>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item>
                <el-col :span="10">
                  <el-radio v-model="formObj.a11" label="2">不涉及，原因说明</el-radio>
                </el-col>
                <el-col :span="10">
                  <el-input v-model="formObj.a11ReasonText2" placeholder="不涉及，原因说明" clearable />
                </el-col>
              </el-form-item>
            </el-row>
          </template>
          <el-divider />
          <template>
            <el-row>
              <el-form-item>
                <el-col :span="24" align="left">
                  <b>各个涉及客户信息系统，是否完整记录涉客户个人信息相关的操作日志和操作授权依据，确保所有操作可追溯到具体的操作人：</b>
                </el-col>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item>
                <el-col :span="24">
                  <el-radio v-model="formObj.a12" label="0">是，涉敏人员库（需附正式文件）</el-radio>
                </el-col>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item>
                <el-col :span="24">
                  <file-upload
                    :qrydata="datas"
                    :numlimit="limit"
                    @getFileList="getA12List"
                  />
                </el-col>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item>
                <el-col :span="10">
                  <el-radio v-model="formObj.a12" label="1">否，原因说明</el-radio>
                </el-col>
                <el-col :span="10">
                  <el-input v-model="formObj.a12ReasonText1" placeholder="否，原因说明" clearable />
                </el-col>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item>
                <el-col :span="10">
                  <el-radio v-model="formObj.a12" label="2">不涉及，原因说明</el-radio>
                </el-col>
                <el-col :span="10">
                  <el-input v-model="formObj.a12ReasonText2" placeholder="不涉及，原因说明" clearable />
                </el-col>
              </el-form-item>
            </el-row>
          </template>
          <el-divider />
          <template>
            <el-row>
              <el-form-item>
                <el-col :span="24" align="left">
                  <b>各个涉及客户信息系统，是否有效管控擅自篡改、删除记录等各类违规行为:</b>
                </el-col>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item>
                <el-col :span="24">
                  <el-radio v-model="formObj.a13" label="0">是</el-radio>
                </el-col>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item>
                <el-col :span="10">
                  <el-radio v-model="formObj.a13" label="1">否，原因说明</el-radio>
                </el-col>
                <el-col :span="10">
                  <el-input v-model="formObj.a13ReasonText1" placeholder="否，原因说明" clearable />
                </el-col>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item>
                <el-col :span="10">
                  <el-radio v-model="formObj.a13" label="2">不涉及，原因说明</el-radio>
                </el-col>
                <el-col :span="10">
                  <el-input v-model="formObj.a13ReasonText2" placeholder="不涉及，原因说明" clearable />
                </el-col>
              </el-form-item>
            </el-row>
          </template>
          <el-divider />
          <template>
            <el-row>
              <el-form-item>
                <el-col :span="24" align="left">
                  <b>各个涉及客户信息系统，日志记录字段是否至少应包括用户ID、时间、访问操作对象、操作类型等:</b>
                </el-col>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item>
                <el-col :span="24">
                  <el-radio v-model="formObj.a14" label="0">是</el-radio>
                </el-col>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item>
                <el-col :span="10">
                  <el-radio v-model="formObj.a14" label="1">否，原因说明</el-radio>
                </el-col>
                <el-col :span="10">
                  <el-input v-model="formObj.a14ReasonText1" placeholder="否，原因说明" clearable />
                </el-col>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item>
                <el-col :span="10">
                  <el-radio v-model="formObj.a14" label="2">不涉及，原因说明</el-radio>
                </el-col>
                <el-col :span="10">
                  <el-input v-model="formObj.a14ReasonText2" placeholder="不涉及，原因说明" clearable />
                </el-col>
              </el-form-item>
            </el-row>
          </template>
          <el-divider />
          <template>
            <el-row>
              <el-form-item>
                <el-col :span="24" align="left">
                  <b>是否建立金库模式管控场景清单，确保网管、业支、业务平台三大领域的涉敏账号、涉敏场景及涉敏资源全部纳入金库模式管控：</b>
                </el-col>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item>
                <el-col :span="24">
                  <el-radio v-model="formObj.a15" label="0">是，金库模式管控场景清单（需附正式文件）</el-radio>
                </el-col>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item>
                <el-col :span="24">
                  <file-upload
                    :qrydata="datas"
                    :numlimit="limit"
                    @getFileList="getA15List"
                  />
                </el-col>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item>
                <el-col :span="10">
                  <el-radio v-model="formObj.a15" label="1">否，原因说明</el-radio>
                </el-col>
                <el-col :span="10">
                  <el-input v-model="formObj.a15ReasonText1" placeholder="否，原因说明" clearable />
                </el-col>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item>
                <el-col :span="10">
                  <el-radio v-model="formObj.a15" label="2">不涉及，原因说明</el-radio>
                </el-col>
                <el-col :span="10">
                  <el-input v-model="formObj.a15ReasonText2" placeholder="不涉及，原因说明" clearable />
                </el-col>
              </el-form-item>
            </el-row>
          </template>
          <el-divider />
          <template>
            <el-row>
              <el-form-item>
                <el-col :span="24" align="left">
                  <b>金库申请必须有明确且合理的业务需求并完整记录操作原因，是否对金库申请原因随意填写情况开展自查:</b>
                </el-col>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item>
                <el-col :span="24">
                  <el-radio v-model="formObj.a16" label="0">是，自查记录（需附正式文件）</el-radio>
                </el-col>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item>
                <el-col :span="24">
                  <file-upload
                    :qrydata="datas"
                    :numlimit="limit"
                    @getFileList="getA16List"
                  />
                </el-col>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item>
                <el-col :span="10">
                  <el-radio v-model="formObj.a16" label="1">否，原因说明</el-radio>
                </el-col>
                <el-col :span="10">
                  <el-input v-model="formObj.a16ReasonText1" placeholder="否，原因说明" clearable />
                </el-col>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item>
                <el-col :span="10">
                  <el-radio v-model="formObj.a16" label="2">不涉及，原因说明</el-radio>
                </el-col>
                <el-col :span="10">
                  <el-input v-model="formObj.a16ReasonText2" placeholder="不涉及，原因说明" clearable />
                </el-col>
              </el-form-item>
            </el-row>
          </template>
          <el-divider />
          <template>
            <el-row>
              <el-form-item>
                <el-col :span="24" align="left">
                  <b>是否建立金库模式授权方式、授权关系、授权时长等策略的管理及定期更新机制，严格防范金库模式审批流于形式:</b>
                </el-col>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item>
                <el-col :span="24">
                  <el-radio v-model="formObj.a17" label="0">是</el-radio>
                </el-col>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item>
                <el-col :span="10">
                  <el-radio v-model="formObj.a17" label="1">否，原因说明</el-radio>
                </el-col>
                <el-col :span="10">
                  <el-input v-model="formObj.a17ReasonText1" placeholder="否，原因说明" clearable />
                </el-col>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item>
                <el-col :span="10">
                  <el-radio v-model="formObj.a17" label="2">不涉及，原因说明</el-radio>
                </el-col>
                <el-col :span="10">
                  <el-input v-model="formObj.a17ReasonText2" placeholder="不涉及，原因说明" clearable />
                </el-col>
              </el-form-item>
            </el-row>
          </template>
          <el-divider />
          <template>
            <el-row>
              <el-form-item>
                <el-col :span="24" align="left">
                  <b>是否营业厅、社会渠道、自助终端、10086以及外部接口均已实施模糊化，确保开发测试人员不得接触未经模糊化处理的敏感信息：</b>
                </el-col>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item>
                <el-col :span="24">
                  <el-radio v-model="formObj.a18" label="0">是</el-radio>
                </el-col>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item>
                <el-col :span="10">
                  <el-radio v-model="formObj.a18" label="1">否，原因说明</el-radio>
                </el-col>
                <el-col :span="10">
                  <el-input v-model="formObj.a18ReasonText1" placeholder="否，原因说明" clearable />
                </el-col>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item>
                <el-col :span="10">
                  <el-radio v-model="formObj.a18" label="2">不涉及，原因说明</el-radio>
                </el-col>
                <el-col :span="10">
                  <el-input v-model="formObj.a18ReasonText2" placeholder="不涉及，原因说明" clearable />
                </el-col>
              </el-form-item>
            </el-row>
          </template>
          <el-divider />
          <template>
            <el-row>
              <el-form-item>
                <el-col :span="24" align="left">
                  <b>是否存在4A及金库模式绕行行为：</b>
                </el-col>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item>
                <el-col :span="24">
                  <el-radio v-model="formObj.a19" label="0">是</el-radio>
                </el-col>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item>
                <el-col :span="10">
                  <el-radio v-model="formObj.a19" label="1">否，原因说明</el-radio>
                </el-col>
                <el-col :span="10">
                  <el-input v-model="formObj.a19ReasonText1" placeholder="否，原因说明" clearable />
                </el-col>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item>
                <el-col :span="10">
                  <el-radio v-model="formObj.a19" label="2">不涉及，原因说明</el-radio>
                </el-col>
                <el-col :span="10">
                  <el-input v-model="formObj.a19ReasonText2" placeholder="不涉及，原因说明" clearable />
                </el-col>
              </el-form-item>
            </el-row>
          </template>
          <el-divider />
          <template>
            <el-row>
              <el-form-item>
                <el-col :span="24" align="left">
                  <b>安全隐患、整改情况</b>
                </el-col>
              </el-form-item>
            </el-row>

            <el-row>
              <el-form-item>
                <el-col :span="10">
                  <el-input v-model="formObj.a20Text1" placeholder="自查发现的安全隐患" clearable />
                </el-col>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item>
                <el-col :span="10">
                  <el-input v-model="formObj.a20Text2" placeholder="整改情况" clearable />
                </el-col>
              </el-form-item>
            </el-row>
          </template>
          <el-divider />
          <template>
            <el-row>
              <el-col :span="22" align="center">
                <el-form-item>
                  <el-button type="primary" @click="onSubmit">提交</el-button>
                  <el-button @click="goBack">取消</el-button>
                </el-form-item>
              </el-col>
            </el-row>
          </template>
        </el-form>
      </el-card></div>
  </div>

</template>
<script>
import fileUpload from '@/components/fileUpload/index'
export default {
  name: 'BusInfo',
  components: { 'file-upload': fileUpload },
  data() {
    return {
      Height: window.innerHeight - 195,
      formObj: {},
      limit: 1, // 限制附件上传个数
      datas: {
        fileType: 'selfcheck',
        busiId: '1',
        busiSeg: '1',
        busiIndex: '1'
      },
      labelPosition: 'left',
      selfCheckLoading: false
    }
  },
  created() {
    this.formObj.id = this.$route.query.busiId
    this.formObj.createUserId = this.$route.query.createUserId
    this.formObj.taskId = this.$route.query.taskId
  },
  mounted() {

  },
  methods: {
    goBack() {
      this.$router.push({
        path: '/system/workflow/busiTaskList'
      })
    },
    onSubmit() {
      const $self = this
      this.selfCheckLoading = true
      if (this.formObj.a1 === '0' && !this.formObj.a1Appendix) {
        this.$message.warning(`缺少文件！`)
        return
      }
      if (this.formObj.a1 === '1' && !this.formObj.a1ReasonText1) {
        this.$message.warning(`请填写否原因说明 ！`)
        return
      }
      if (this.formObj.a1 === '2' && !this.formObj.a1ReasonText2) {
        this.$message.warning(`请填写不涉及原因说明 ！`)
        return
      }
      if (this.formObj.a2 === '0' && !this.formObj.a2Appendix) {
        this.$message.warning(`缺少文件！`)
        return
      }

      if (this.formObj.a5 === '0' && !this.formObj.a5Appendix) {
        this.$message.warning(`缺少文件！`)
        return
      }
      if (this.formObj.a5 === '1' && !this.formObj.a5ReasonText1) {
        this.$message.warning(`请填写否原因说明 ！`)
        return
      }
      if (this.formObj.a5 === '2' && !this.formObj.a5ReasonText2) {
        this.$message.warning(`请填写不涉及原因说明 ！`)
        return
      }
      if (this.formObj.a6 === '0' && !this.formObj.a6Appendix) {
        this.$message.warning(`缺少文件！`)
        return
      }
      if (this.formObj.a6 === '1' && !this.formObj.a6ReasonText1) {
        this.$message.warning(`请填写否原因说明 ！`)
        return
      }
      if (this.formObj.a6 === '2' && !this.formObj.a6ReasonText2) {
        this.$message.warning(`请填写不涉及原因说明 ！`)
        return
      }
      if (this.formObj.a7 === '0' && !this.formObj.a7Appendix) {
        this.$message.warning(`缺少文件！`)
        return
      }
      if (this.formObj.a7 === '1' && !this.formObj.a7ReasonText1) {
        this.$message.warning(`请填写否原因说明 ！`)
        return
      }
      if (this.formObj.a7 === '2' && !this.formObj.a7ReasonText2) {
        this.$message.warning(`请填写不涉及原因说明 ！`)
        return
      }
      if (this.formObj.a8 === '0' && !this.formObj.a8Appendix) {
        this.$message.warning(`缺少文件！`)
        return
      }
      if (this.formObj.a8 === '1' && !this.formObj.a8ReasonText1) {
        this.$message.warning(`请填写否原因说明 ！`)
        return
      }
      if (this.formObj.a8 === '2' && !this.formObj.a8ReasonText2) {
        this.$message.warning(`请填写不涉及原因说明 ！`)
        return
      }

      if (this.formObj.a9 === '1' && !this.formObj.a9ReasonText1) {
        this.$message.warning(`请填写否原因说明 ！`)
        return
      }
      if (this.formObj.a9 === '2' && !this.formObj.a9ReasonText2) {
        this.$message.warning(`请填写不涉及原因说明 ！`)
        return
      }
      if (this.formObj.a10 === '1' && !this.formObj.a10ReasonText1) {
        this.$message.warning(`请填写否原因说明 ！`)
        return
      }
      if (this.formObj.a10 === '2' && !this.formObj.a10ReasonText2) {
        this.$message.warning(`请填写不涉及原因说明 ！`)
        return
      }

      if (this.formObj.a11 === '0' && !this.formObj.a11Appendix) {
        this.$message.warning(`缺少文件！`)
        return
      }
      if (this.formObj.a11 === '1' && !this.formObj.a11ReasonText1) {
        this.$message.warning(`请填写否原因说明 ！`)
        return
      }
      if (this.formObj.a11 === '2' && !this.formObj.a11ReasonText2) {
        this.$message.warning(`请填写不涉及原因说明 ！`)
        return
      }
      if (this.formObj.a12 === '0' && !this.formObj.a12Appendix) {
        this.$message.warning(`缺少文件！`)
        return
      }
      if (this.formObj.a12 === '1' && !this.formObj.a12ReasonText1) {
        this.$message.warning(`请填写否原因说明 ！`)
        return
      }
      if (this.formObj.a12 === '2' && !this.formObj.a12ReasonText2) {
        this.$message.warning(`请填写不涉及原因说明 ！`)
        return
      }

      if (this.formObj.a13 === '1' && !this.formObj.a13ReasonText1) {
        this.$message.warning(`请填写否原因说明 ！`)
        return
      }
      if (this.formObj.a13 === '2' && !this.formObj.a13ReasonText2) {
        this.$message.warning(`请填写不涉及原因说明 ！`)
        return
      }
      if (this.formObj.a14 === '1' && !this.formObj.a14ReasonText1) {
        this.$message.warning(`请填写否原因说明 ！`)
        return
      }
      if (this.formObj.a14 === '2' && !this.formObj.a14ReasonText2) {
        this.$message.warning(`请填写不涉及原因说明 ！`)
        return
      }

      if (this.formObj.a15 === '0' && !this.formObj.a15Appendix) {
        this.$message.warning(`缺少文件！`)
        return
      }
      if (this.formObj.a15 === '1' && !this.formObj.a15ReasonText1) {
        this.$message.warning(`请填写否原因说明 ！`)
        return
      }
      if (this.formObj.a15 === '2' && !this.formObj.a15ReasonText2) {
        this.$message.warning(`请填写不涉及原因说明 ！`)
        return
      }

      if (this.formObj.a16 === '0' && !this.formObj.a16Appendix) {
        this.$message.warning(`缺少文件！`)
        return
      }
      if (this.formObj.a16 === '1' && !this.formObj.a16ReasonText1) {
        this.$message.warning(`请填写否原因说明 ！`)
        return
      }
      if (this.formObj.a16 === '2' && !this.formObj.a16ReasonText2) {
        this.$message.warning(`请填写不涉及原因说明 ！`)
        return
      }

      if (this.formObj.a17 === '1' && !this.formObj.a17ReasonText1) {
        this.$message.warning(`请填写否原因说明 ！`)
        return
      }
      if (this.formObj.a17 === '2' && !this.formObj.a17ReasonText2) {
        this.$message.warning(`请填写不涉及原因说明 ！`)
        return
      }
      if (this.formObj.a18 === '1' && !this.formObj.a18ReasonText1) {
        this.$message.warning(`请填写否原因说明 ！`)
        return
      }
      if (this.formObj.a18 === '2' && !this.formObj.a18ReasonText2) {
        this.$message.warning(`请填写不涉及原因说明 ！`)
        return
      }
      if (this.formObj.a19 === '1' && !this.formObj.a19ReasonText1) {
        this.$message.warning(`请填写否原因说明 ！`)
        return
      }
      if (this.formObj.a19 === '2' && !this.formObj.a19ReasonText2) {
        this.$message.warning(`请填写不涉及原因说明 ！`)
        return
      }
      this.$store.dispatch('selfCheck/selfCheckFlowAdd', this.formObj).then(response => {
        if (response && response.RET_CODE === '0') {
          this.selfCheckLoading = false
          $self.$message({
            message: '操作成功！',
            type: 'success'
          })
          this.goBack()
        }
      })
    },
    moreInfo() {
      this.$store.dispatch('businessInfo/findBusinessInfoByBussId', { bussId: this.bussId }).then(response => {
        this.selectObj = {}
        // 深克隆
        this.selectObj = Object.assign({}, response.businessInfo)
        // 附件信息，如果业务表里的附件id不存在，不会报错
        if (response.businessInfo.allDescList) {
          this.alldesFile = response.businessInfo.allDescList
        }
        if (response.businessInfo.techList) {
          this.techFile = response.businessInfo.techList
        }
        if (response.businessInfo.manageList) {
          this.manageFile = response.businessInfo.manageList
        }
        this.selectObj.serviceDepartName = response.businessInfo.serviceDepartName
        this.selectObj.serviceDepart = response.businessInfo.serviceDepart
        this.selectObj.serviceBelongUnitName = response.businessInfo.serviceBelongUnitName
        this.selectObj.serviceBelongUnit = response.businessInfo.serviceBelongUnit
      })
      this.$store.dispatch('evalInfo/findEvalInfo', { bussId: this.bussId }).then(response => {
        this.assessmentObj = {}
        // 深克隆
        this.assessmentObj = Object.assign({}, response.evalutionInfo)
      })
      this.$store.dispatch('evalVerify/findTetongList', { bussId: this.bussId }).then(response => {
        this.bussTtOptions = {}
        // 深克隆
        this.bussTtOptions = Object.assign({}, response.tetongList)
      })
    },
    getA1List(data) {
      this.formObj.a1Appendix = data[0].fileUrl
      this.formObj.a1AppendixName = data[0].name
    },
    getA2List(data) {
      this.formObj.a2Appendix = data[0].fileUrl
      this.formObj.a2AppendixName = data[0].name
    },
    getA5List(data) {
      this.formObj.a5Appendix = data[0].fileUrl
      this.formObj.a5AppendixName = data[0].name
    },
    getA6List(data) {
      this.formObj.a6Appendix = data[0].fileUrl
      this.formObj.a6AppendixName = data[0].name
    },
    getA7List(data) {
      this.formObj.a7Appendix = data[0].fileUrl
      this.formObj.a7AppendixName = data[0].name
    },
    getA8List(data) {
      this.formObj.a8Appendix = data[0].fileUrl
      this.formObj.a8AppendixName = data[0].name
    },
    getA11List(data) {
      this.formObj.a11Appendix = data[0].fileUrl
      this.formObj.a11AppendixName = data[0].name
    },
    getA12List(data) {
      this.formObj.a12Appendix = data[0].fileUrl
      this.formObj.a12AppendixName = data[0].name
    },
    getA15List(data) {
      this.formObj.a15Appendix = data[0].fileUrl
      this.formObj.a15AppendixName = data[0].name
    },
    getA16List(data) {
      this.formObj.a16Appendix = data[0].fileUrl
      this.formObj.a16AppendixName = data[0].name
    },
    cancleMore() {
      this.selectObj = {}
      this.alldesFile = []
      this.techFile = []
      this.manageFile = []
    }
  }
}
</script>
