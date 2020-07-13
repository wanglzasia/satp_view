<template>
  <div>
    <div class="app-container">
      <el-card>
        <el-form
          :model="searchForm"
          label-position="left"
          label-width="70px"
          size="small"
          class="satp-form-inline"
        >
          <el-row>
            <el-col :span="6">
              <el-form-item label="业务名称" prop="serviceName">
                <el-input v-model="searchForm.serviceName" placeholder="业务名称" />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="所属阶段" prop="belongStage">
                <el-select v-model="searchForm.belongStage" placeholder="请选择">
                  <el-option
                    v-for="item in belongStageOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="业务类别" prop="serviceType">
                <el-select v-model="searchForm.serviceType" placeholder="请选择">
                  <el-option
                    v-for="item in serviceTypeOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="6">
              <div class="satp-from-btngrp-std" right>
                <el-dropdown size="small" split-button type="primary" @click="reloadDatagrid">
                  <i class="el-icon-search" />查询
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>高级条件</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
                <el-button type="success" icon="el-icon-plus" size="small" @click="dialogFormVisible = true">新增</el-button>
              </div>
            </el-col>
          </el-row>
        </el-form>

        <satp-datagrid
          ref="businessGrid"
          :url="url"
          :qparams="searchForm"
          :columns="columns"
          border
          :pagesizes="a.pSizes"
          @operClick="operClick"
        />
      </el-card>
    </div>

    <el-dialog title="新增" :visible.sync="dialogFormVisible" width="30%" :model="formObj" :close-on-click-modal="false" @close="cancle">
      <el-form
        ref="ruleForm"
        :model="formObj"
        :rules="formRule"
        label-width="0px"
        label-position="top"
        size="small"
        class="satp-form-label-top"
      >
        <!-- <el-row class="rowHand">
            备注：<font style="color:red;">*</font>为必选项
          </el-row> -->
        <el-row>
          <el-col :span="24">
            <el-form-item label="业务名称" prop="serviceName">
              <el-input v-model="formObj.serviceName" placeholder="业务名称" clearable />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="业务归属单位" prop="serviceBelongUnit">
              <el-input v-model="formObj.serviceBelongUnitName" placeholder="业务归属单位" clearable disabled prefix-icon="iconfont el-icon-s-home">
                <el-button slot="append" icon="el-icon-search" @click="serviceBelongUnitVisible = true" />
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="2">&nbsp;</el-col>
          <el-col :span="11">
            <el-form-item label="业务主管部门" prop="serviceDepart">
              <el-input v-model="formObj.serviceDepartName" placeholder="业务主管部门" clearable disabled prefix-icon="iconfont el-icon-s-home">
                <el-button slot="append" icon="el-icon-search" @click="serviceDepartVisible = true" />
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="业务类别" prop="serviceType">
              <el-select v-model="formObj.serviceType" placeholder="业务类别,请选择">
                <el-option
                  v-for="item in serviceTypeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="2">&nbsp;</el-col>
          <el-col :span="11">
            <el-form-item label="所属阶段" prop="belongStage">
              <el-select v-model="formObj.belongStage" placeholder="所属阶段,请选择">
                <el-option
                  v-for="item in belongStageOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="业务属性" prop="evalPracStage">
              <el-select v-model="formObj.evalPracStage" placeholder="业务属性,请选择">
                <el-option
                  v-for="item in evalPracStageOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="2">&nbsp;</el-col>
          <el-col :span="11">
            <el-form-item label="业务(拟)上线时间" prop="serviceOnlineTime">
              <el-date-picker
                v-model="formObj.serviceOnlineTime"
                placeholder="业务(拟)上线时间"
                clearable
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="业务简介" prop="synopsis">
              <el-input v-model="formObj.synopsis" type="textarea" placeholder="业务简介" clearable />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="负责人" prop="contactsee">
              <el-input v-model="formObj.contactseeName" placeholder="请选择负责人 " disabled size="small">
                <el-button slot="append" icon="el-icon-search" @click="getDataRootUser()" />
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="联系电话" prop="contactsNumber">
              <el-input v-model="formObj.contactsNumber" placeholder="联系电话" disabled clearable />
            </el-form-item>
          </el-col>
          <el-col :span="2">&nbsp;</el-col>
          <el-col :span="11">
            <el-form-item label="联系邮箱" prop="contactsMail">
              <el-input v-model="formObj.contactsMail" placeholder="联系邮箱" disabled clearable />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="总体说明文档" prop="allDescrDoc">
              <file-upload
                :qrydata="allDesDatas"
                :numlimit="limitDoc"
                @getFileList="getalldesList"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="技术文档" prop="technologyDoc">
              <file-upload
                :qrydata="techDatas"
                :numlimit="limitTech"
                @getFileList="getTechList"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="管理文档" prop="managementDoc">
              <file-upload
                :qrydata="manageDatas"
                :numlimit="limitManage"
                @getFileList="getManageList"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" type="text" @click="cancle()">取消</el-button>
        <el-button size="small" type="primary" @click="saveForm()">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="修改" :visible.sync="dialogFormVisibleEdit" width="30%" :model="selectObj" :close-on-click-modal="false" @close="cancleEdit">
      <el-form
        ref="ruleFormEdit"
        :model="selectObj"
        :rules="formRule"
        label-width="0px"
        label-position="top"
        size="small"
        class="satp-form-label-top"
      >
        <!-- <el-row class="rowHand">
            备注：<font style="color:red;">*</font>为必选项
          </el-row> -->
        <el-row>
          <el-col :span="24">
            <el-form-item label="业务名称" prop="serviceName">
              <el-input v-model="selectObj.serviceName" placeholder="业务名称" clearable />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="业务归属单位" prop="serviceBelongUnit">
              <el-input v-model="selectObj.serviceBelongUnitName" placeholder="业务归属单位" clearable disabled prefix-icon="iconfont el-icon-s-home">
                <el-button slot="append" icon="el-icon-search" @click="serviceBelongUnitVisible = true" />
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="2">&nbsp;</el-col>
          <el-col :span="11">
            <el-form-item label="业务主管部门" prop="serviceDepart">
              <el-input v-model="selectObj.serviceDepartName" placeholder="业务主管部门" clearable disabled prefix-icon="iconfont el-icon-s-home">
                <el-button slot="append" icon="el-icon-search" @click="serviceDepartVisible = true" />
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="业务类别" prop="serviceType">
              <el-select v-model="selectObj.serviceTypeName" placeholder="业务类别,请选择">
                <el-option
                  v-for="item in serviceTypeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="2">&nbsp;</el-col>
          <el-col :span="11">
            <el-form-item label="所属阶段" prop="belongStage">
              <el-select v-model="selectObj.belongStageName" placeholder="所属阶段,请选择">
                <el-option
                  v-for="item in belongStageOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="业务属性" prop="evalPracStage">
              <el-select v-model="selectObj.evalPracStageName" placeholder="业务属性,请选择">
                <el-option
                  v-for="item in evalPracStageOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="2">&nbsp;</el-col>
          <el-col :span="11">
            <el-form-item label="业务(拟)上线时间" prop="serviceOnlineTime">
              <el-date-picker
                v-model="selectObj.serviceOnlineTime"
                placeholder="业务(拟)上线时间"
                clearable
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="业务简介" prop="synopsis">
              <el-input v-model="selectObj.synopsis" type="textarea" placeholder="业务简介" clearable />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="负责人" prop="contactsee">
              <el-input v-model="selectObj.contactseeName" placeholder="请选择负责人 " disabled size="small">
                <el-button slot="append" icon="el-icon-search" @click="getDataRootUser()" />
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="联系电话" prop="contactsNumber">
              <el-input v-model="selectObj.contactsNumber" placeholder="联系电话" disabled clearable />
            </el-form-item>
          </el-col>
          <el-col :span="2">&nbsp;</el-col>
          <el-col :span="11">
            <el-form-item label="联系邮箱" prop="contactsMail">
              <el-input v-model="selectObj.contactsMail" placeholder="联系邮箱" disabled clearable />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="总体说明文档" prop="upload">
              <file-upload
                :qrydata="allDesDatas"
                :numlimit="limitDoc"
                :file-list="alldesFile"
                @getFileList="getalldesList"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="技术文档" prop="technologyDoc">
              <file-upload
                :qrydata="techDatas"
                :numlimit="limitTech"
                :file-list="techFile"
                @getFileList="getTechList"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="管理文档" prop="managementDoc">
              <file-upload
                :qrydata="manageDatas"
                :numlimit="limitManage"
                :file-list="manageFile"
                @getFileList="getManageList"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" type="text" @click="cancleEdit()">取消</el-button>
        <el-button size="small" type="primary" @click="saveEditForm()">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="详情" :visible.sync="dialogFormVisibleMore" width="30%" :model="selectObj" :close-on-click-modal="false" @close="cancleMore">
      <el-form
        :model="selectObj"
        label-width="0px"
        label-position="top"
        size="small"
        class="satp-form-label-top"
      >
        <!-- <el-row class="rowHand">
            备注：<font style="color:red;">*</font>为必选项
          </el-row> -->
        <el-row>
          <el-col :span="24">
            <el-form-item label="业务名称" prop="serviceName">
              <el-input v-model="selectObj.serviceName" placeholder="业务名称" disabled clearable />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="业务归属单位" prop="serviceBelongUnit">
              <el-input v-model="selectObj.serviceBelongUnitName" placeholder="业务归属单位" clearable disabled prefix-icon="iconfont el-icon-s-home">
                <el-button slot="append" icon="el-icon-search" @click="serviceBelongUnitVisible = true" />
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="2">&nbsp;</el-col>
          <el-col :span="11">
            <el-form-item label="业务主管部门" prop="serviceDepart">
              <el-input v-model="selectObj.serviceDepartName" placeholder="业务主管部门" clearable disabled prefix-icon="iconfont el-icon-s-home">
                <el-button slot="append" icon="el-icon-search" @click="serviceDepartVisible = true" />
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="业务类别" prop="serviceType" disabled>
              <el-select v-model="selectObj.serviceTypeName" placeholder="业务类别,请选择">
                <el-option
                  v-for="item in serviceTypeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="2">&nbsp;</el-col>
          <el-col :span="11">
            <el-form-item label="所属阶段" prop="belongStage" disabled>
              <el-select v-model="selectObj.belongStageName" placeholder="所属阶段,请选择">
                <el-option
                  v-for="item in belongStageOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="业务属性" prop="evalPracStage" disabled>
              <el-select v-model="selectObj.evalPracStageName" placeholder="业务属性,请选择">
                <el-option
                  v-for="item in evalPracStageOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="2">&nbsp;</el-col>
          <el-col :span="11">
            <el-form-item label="业务(拟)上线时间" prop="serviceOnlineTime" disabled>
              <el-date-picker
                v-model="selectObj.serviceOnlineTime"
                placeholder="业务(拟)上线时间"
                clearable
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="业务简介" prop="synopsis" disabled>
              <el-input v-model="selectObj.synopsis" type="textarea" placeholder="业务简介" clearable />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="负责人" prop="contactsee" disabled>
              <el-input v-model="selectObj.contactseeName" placeholder="请选择负责人 " disabled size="small">
                <el-button slot="append" icon="el-icon-search" @click="getDataRootUser()" />
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="联系电话" prop="contactsNumber" disabled>
              <el-input v-model="selectObj.contactsNumber" placeholder="联系电话" disabled clearable />
            </el-form-item>
          </el-col>
          <el-col :span="2">&nbsp;</el-col>
          <el-col :span="11">
            <el-form-item label="联系邮箱" prop="contactsMail" disabled>
              <el-input v-model="selectObj.contactsMail" placeholder="联系邮箱" disabled clearable />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="总体说明文档" prop="upload">
              <file-upload
                :qrydata="allDesDatas"
                :numlimit="limitDoc"
                :file-list="alldesFile"
                :disabled="true"
                @getFileList="getalldesList"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="技术文档" prop="technologyDoc">
              <file-upload
                :qrydata="techDatas"
                :numlimit="limitTech"
                :file-list="techFile"
                :disabled="true"
                @getFileList="getTechList"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="管理文档" prop="managementDoc">
              <file-upload
                :qrydata="manageDatas"
                :numlimit="limitManage"
                :file-list="manageFile"
                :disabled="true"
                @getFileList="getManageList"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
    <user-window
      v-if="userWindowVisible"
      :title="title"
      :parent-component-param="parentComponentParam"
      :multiple="multiple"
      :visible.sync="userWindowVisible"
      :modal-append-to-body="false"
      @getUserInfo="getUserInfo"
    />
    <select-org
      v-if="serviceDepartVisible"
      :visible.sync="serviceDepartVisible"
      @getOrg="getServiceDepart"
    />
    <select-org
      v-if="serviceBelongUnitVisible"
      :visible.sync="serviceBelongUnitVisible"
      @getOrg="getServiceBelongUnit"
    />
  </div>
</template>

<script>
import UserInfo from '@/components/Userwindow/index.vue'
import fileUpload from '@/components/fileUpload/index'
import selectOrg from '@/components/SelectOrg/index'
import datagrid from '@/components/datagrid/datagrid'
import { parseTime } from '@/utils/index.js'
export default {
  name: 'BusinessInfo',
  components: { 'satp-datagrid': datagrid, 'user-window': UserInfo, 'file-upload': fileUpload, 'select-org': selectOrg },
  props: {
    /* 选项列表数据(树形结构的对象数组) */
    options: {
      type: Array,
      default: () => { return [] }
    },
    /* 可清空选项 */
    clearable: {
      type: Boolean,
      default: () => { return true }
    },
    /* 自动收起 */
    accordion: {
      type: Boolean,
      default: () => { return false }
    }
  },
  data() {
    return {
      dialogFormVisible: false,
      belongStageOptions: [{
        value: '1',
        label: '试点'
      }, {
        value: '2',
        label: '试商用'
      }, {
        value: '3',
        label: '正式商用'
      }],

      serviceTypeOptions: [{
        value: '1',
        label: '一类业务'
      }, {
        value: '2',
        label: '二类业务'
      }, {
        value: '3',
        label: '三类业务'
      }],

      evalPracStageOptions: [{
        value: '1',
        label: '新业务上线'
      }, {
        value: '2',
        label: '存量重点业务'
      }],

      searchForm: {
        serviceName: '',
        belongStage: '',
        serviceType: '',
        page: true
      },
      a: {
        pSizes: [10, 15, 20]
      },
      formObj: {},
      test1Height: 300,
      url: 'businessInfo/loadBussinessList',
      columns: [
        { label: '业务名称', prop: 'serviceName', width: 120, align: 'left' },
        { label: '业务简介', prop: 'synopsis', align: 'center' },
        { label: '所属阶段', prop: 'belongStage', align: 'center' },
        { label: '业务类别', prop: 'serviceType', align: 'center' },
        { label: '业务(拟)上线时间', prop: 'serviceOnlineTime', align: 'center', formatter: this.dateFormatter },
        { label: '评估实践阶段', prop: 'evalPracStage', align: 'center' },
        {
          label: '操作',
          align: 'center',
          width: 300,
          actions: [
            { title: '修改', prop: 'edit', type: 'text', icon: 'el-icon-edit', popconfirm: '确认修改这条记录?' },
            { title: '详情', prop: 'more', type: 'text', icon: 'el-icon-more' },
            { title: '删除', prop: 'delete', type: 'text', icon: 'el-icon-delete', popconfirm: '确认删除这条记录?' }
          ]
        }
      ],
      formRule: {
        serviceName: [
          { required: true, message: '请填写业务名称', trigger: 'blur' }
        ],

        serviceType: [
          { required: true, message: '请选择业务类别', trigger: 'blur' }
        ],
        belongStage: [
          { required: true, message: '请选择所属阶段', trigger: 'blur' }
        ],
        evalPracStage: [
          { required: true, message: '请选择业务属性', trigger: 'blur' }
        ],
        serviceOnlineTime: [
          { required: true, message: '请填写业务(拟)上线时间', trigger: 'blur' }
        ],
        synopsis: [
          { required: true, message: '请填写业务简介', trigger: 'blur' }
        ]
      },
      orgs: [],
      props: {
        id: 'id',
        label: 'label',
        children: 'children'
      },
      selectOrgVisible: false,
      userWindowVisible: false,
      parentComponentParam: {}, // 向子组件传递自定义参数对象
      multiple: false, // 默认false 单选;
      title: '请选择用户', // 弹出框标题
      userNames: '',
      userIds: '',
      limitDoc: 3, // 限制附件上传个数
      alldesFile: [], // 初始附件列表
      allDesDatas: {
        fileType: 'doubleNew',
        busiId: '1',
        busiSeg: '1',
        busiIndex: '1'
      }, // 附件上传参数
      limitTech: 3, // 限制附件上传个数
      techFile: [], // 初始附件列表
      techDatas: {
        fileType: 'doubleNew',
        busiId: '2',
        busiSeg: '1',
        busiIndex: '1'
      }, // 附件上传参数
      limitManage: 3, // 限制附件上传个数
      manageFile: [], // 初始附件列表
      manageDatas: {
        fileType: 'doubleNew',
        busiId: '3',
        busiSeg: '1',
        busiIndex: '1'
      }, // 附件上传参数
      allDescrDocId: '',
      technologyDocId: '',
      managementDocId: '',
      dialogFormVisibleEdit: false,
      selectObj: {},
      dialogFormVisibleMore: false,
      serviceBelongUnitVisible: false,
      serviceDepartVisible: false
    }
  },
  mounted() {
    this.listOrgs()
  },
  methods: {
    operClick(data) {
      const $self = this
      const { row, prop } = data
      switch (prop) {
        case 'edit':
          this.alldesFile = []
          this.techFile = []
          this.manageFile = []
          this.dialogFormVisibleEdit = true
          // eslint-disable-next-line no-case-declarations
          const business = { serviceId: row.serviceId }
          this.$store.dispatch('businessInfo/findBusinessInfo', business).then(response => {
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
          break
        case 'delete':
          this.$store.dispatch('businessInfo/deleteBusinessInfo', { serviceId: row.serviceId }).then(response => {
            if (response && response.RET_CODE === '0') {
              this.reloadDatagrid()
              $self.$message({
                message: '操作成功！',
                type: 'success'
              })
            }
          })
          break
        case 'more':
          this.dialogFormVisibleMore = true
          this.$store.dispatch('businessInfo/findBusinessInfo', { serviceId: row.serviceId }).then(response => {
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
          break
        default:
          break
      }
    },
    reloadDatagrid() {
      this.$refs['businessGrid'].reload()
    },
    dateFormatter(row) {
      const time = parseTime(row.serviceOnlineTime, '')
      return time
    },
    // 取消操作
    cancle() {
      this.formObj = {}
      this.alldesFile = []
      this.techFile = []
      this.manageFile = []
      this.dialogFormVisible = false
    },
    cancleEdit() {
      this.selectObj = {}
      this.alldesFile = []
      this.techFile = []
      this.manageFile = []
      this.dialogFormVisibleEdit = false
    },
    cancleMore() {
      this.selectObj = {}
      this.alldesFile = []
      this.techFile = []
      this.manageFile = []
      this.dialogFormVisibleMore = false
    },
    clearDoc() {
      this.allDescrDocId = ''
      this.technologyDocId = ''
      this.managementDocId = ''
    },
    saveForm() {
      const $self = this
      $self.$refs['ruleForm'].validate(valid => {
        if (valid) {
          if (this.alldesFile.length > 0) {
            this.alldesFile.forEach(file => {
              if (this.allDescrDocId === null || this.allDescrDocId === '') {
                this.allDescrDocId = file.idx
              } else {
                this.allDescrDocId = this.allDescrDocId + ',' + file.idx
              }
            })
          }
          if (this.techFile.length > 0) {
            this.techFile.forEach(file => {
              if (this.technologyDocId === null || this.technologyDocId === '') {
                this.technologyDocId = file.idx
              } else {
                this.technologyDocId = this.technologyDocId + ',' + file.idx
              }
            })
          }
          if (this.manageFile.length > 0) {
            this.manageFile.forEach(file => {
              if (this.managementDocId === null || this.managementDocId === '') {
                this.managementDocId = file.idx
              } else {
                this.managementDocId = this.managementDocId + ',' + file.idx
              }
            })
          }
          $self.formObj.allDescrDocId = this.allDescrDocId
          $self.formObj.technologyDocId = this.technologyDocId
          $self.formObj.managementDocId = this.managementDocId
          if ($self.formObj.allDescrDocId === '' || $self.formObj.allDescrDocId === null) {
            this.$message.warning(`请上传总体说明文档`)
            this.clearDoc()
            return
          }
          if ($self.formObj.technologyDocId === '' || $self.formObj.technologyDocId === null) {
            this.$message.warning(`请上传技术文档`)
            this.clearDoc()
            return
          }
          if ($self.formObj.managementDocId === '' || $self.formObj.managementDocId === null) {
            this.$message.warning(`请上传管理文档`)
            this.clearDoc()
            return
          }
          if (!$self.formObj.serviceBelongUnit) {
            this.$message.warning(`请选择业务归属单位`)
            this.clearDoc()
            return
          }
          if (!$self.formObj.serviceDepart) {
            this.$message.warning(`请选择业务主管部门`)
            this.clearDoc()
            return
          }
          if (!$self.formObj.contactsee) {
            this.$message.warning(`请选择负责人`)
            this.clearDoc()
            return
          }
          this.$store.dispatch('businessInfo/addBusinessInfo', $self.formObj).then(response => {
            if (response && response.RET_CODE === '0') {
              $self.formObj = {}
              this.reloadDatagrid()
              $self.dialogFormVisible = false
              this.clearDoc()
              $self.$message({
                message: '操作成功！',
                type: 'success'
              })
            }
          })
        } else {
          return false
        }
      })
    },
    saveEditForm() {
      const $self = this
      $self.$refs['ruleFormEdit'].validate(valid => {
        if (valid) {
          if (this.alldesFile.length > 0) {
            this.alldesFile.forEach(file => {
              if (this.allDescrDocId === null || this.allDescrDocId === '') {
                this.allDescrDocId = file.idx
              } else {
                this.allDescrDocId = this.allDescrDocId + ',' + file.idx
              }
            })
          }
          if (this.techFile.length > 0) {
            this.techFile.forEach(file => {
              if (this.technologyDocId === null || this.technologyDocId === '') {
                this.technologyDocId = file.idx
              } else {
                this.technologyDocId = this.technologyDocId + ',' + file.idx
              }
            })
          }
          if (this.manageFile.length > 0) {
            this.manageFile.forEach(file => {
              if (this.managementDocId === null || this.managementDocId === '') {
                this.managementDocId = file.idx
              } else {
                this.managementDocId = this.managementDocId + ',' + file.idx
              }
            })
          }
          $self.selectObj.allDescrDocId = this.allDescrDocId
          $self.selectObj.technologyDocId = this.technologyDocId
          $self.selectObj.managementDocId = this.managementDocId
          if ($self.selectObj.allDescrDocId === '' || $self.selectObj.allDescrDocId === null) {
            this.$message.warning(`请上传总体说明文档`)
            this.clearDoc()
            return
          }
          if ($self.selectObj.technologyDocId === '' || $self.selectObj.technologyDocId === null) {
            this.$message.warning(`请上传技术文档`)
            this.clearDoc()
            return
          }
          if ($self.selectObj.managementDocId === '' || $self.selectObj.managementDocId === null) {
            this.$message.warning(`请上传管理文档`)
            this.clearDoc()
            return
          }
          if (!$self.selectObj.serviceBelongUnit) {
            this.$message.warning(`请选择业务归属单位`)
            this.clearDoc()
            return
          }
          if (!$self.selectObj.serviceDepart) {
            this.$message.warning(`请选择业务主管部门`)
            this.clearDoc()
            return
          }
          if ($self.selectObj.contactsee === '' || $self.selectObj.contactsee === null) {
            this.$message.warning(`请选择负责人`)
            this.clearDoc()
            return
          }
          this.$store.dispatch('businessInfo/modifyBusinessInfo', $self.selectObj).then(response => {
            if (response && response.RET_CODE === '0') {
              $self.selectObj = {}
              this.reloadDatagrid()
              $self.dialogFormVisibleEdit = false
              this.clearDoc()
              $self.$message({
                message: '操作成功！',
                type: 'success'
              })
            }
          })
        } else {
          return false
        }
      })
    },
    listOrgs() {
      var _this = this
      this.$store.dispatch('org/list').then(resp => {
        _this.orgs = resp.data
      })
    },
    getDataRootUser() { // 调弹窗时可修改参数
      this.userWindowVisible = true
      this.parentComponentParam.flag1 = 'test'
      this.parentComponentParam.title = '选择设置视图用户'
      this.multiple = false// true 为复选
    },
    getUserInfo(data, parentComponentParam) { // 确定选择用户方法 单选时data 传的对象;复选传的数组
      const $self = this
      $self.formObj.contactseeName = data.userName
      $self.formObj.contactsee = data.userId
      $self.formObj.contactsNumber = data.phone
      $self.formObj.contactsMail = data.eMail
      $self.selectObj.contactseeName = data.userName
      $self.selectObj.contactsee = data.userId
      $self.selectObj.contactsNumber = data.phone
      $self.selectObj.contactsMail = data.eMail
      console.log(this.formObj.contactseeName)
    },
    getalldesList(data) {
      this.alldesFile = data
    },
    getTechList(data) {
      this.techFile = data
    },
    getManageList(data) {
      this.manageFile = data
    },
    getServiceDepart(data) {
      this.formObj.serviceDepartName = data.label
      this.formObj.serviceDepart = data.id
      this.selectObj.serviceDepartName = data.label
      this.selectObj.serviceDepart = data.id
    },
    getServiceBelongUnit(data) {
      this.formObj.serviceBelongUnitName = data.label
      this.formObj.serviceBelongUnit = data.id
      this.selectObj.serviceBelongUnitName = data.label
      this.selectObj.serviceBelongUnit = data.id
    }
  }

}
</script>
<style scoped>
.el-scrollbar .el-scrollbar__view .el-select-dropdown__item{
    height: auto;
    max-height: 274px;
    padding: 0;
    overflow: hidden;
    overflow-y: auto;
  }
  .el-select-dropdown__item.selected{
    font-weight: normal;
  }
  ul li >>>.el-tree .el-tree-node__content{
    height:auto;
    padding: 0 20px;
  }
  .el-tree-node__label{
    font-weight: normal;
  }
  .el-tree >>>.is-current .el-tree-node__label{
    color: #409EFF;
    font-weight: 700;
  }
  .el-tree >>>.is-current .el-tree-node__children .el-tree-node__label{
    color:#606266;
    font-weight: normal;
  }
</style>
