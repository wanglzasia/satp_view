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
              <el-form-item label="业务名称" prop="evalName">
                <el-input v-model="searchForm.evalName" placeholder="业务名称" />
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
                <el-button type="success" icon="el-icon-plus" size="small" @click="addEval">新增</el-button>
              </div>
            </el-col>
          </el-row>
        </el-form>

        <el-dialog title="新增" :visible.sync="dialogFormVisible" width="70%" :close-on-click-modal="false" @close="cancle">
          <el-row>
            <el-col :span="10">
              <el-table
                :data="leftServices"
                stripe
                border
                :height="Height"
                style="width: 100%"
                :max-height="tableHeight"
              >
                <el-table-column
                  type="button"
                  prop="serviceName"
                  label="未选中业务名称"
                  fit
                />
                <el-table-column
                  prop="serviceDepartName"
                  label="业务归属"
                  fit
                />
                <el-table-column
                  prop="serviceType"
                  label="业务类别"
                  fit
                />
                <el-table-column
                  label="操作"
                  width="80"
                >
                  <template slot-scope="scope">
                    <el-button
                      type="text"
                      title="添加业务"
                      size="small"
                      icon="el-icon-right"
                      @click="appendService(scope.row)"
                    />
                    <el-button
                      type="text"
                      title="业务详情"
                      size="small"
                      icon="el-icon-more"
                      @click="moreInfo(scope.row)"
                    />
                  </template>

                </el-table-column>
              </el-table>
              <div class="satp-pagination-container">
                <el-pagination
                  :current-page="leftElePagination.pageNum"
                  :page-sizes="[10, 20, 30, 40]"
                  :page-size="leftElePagination.pageSize"
                  layout="total, sizes, prev, pager, next,jumper"
                  :total="leftElePagination.total"
                  @size-change="leftHandleSizeChange"
                  @current-change="handleCurrentChange"
                />
              </div>
            </el-col>
            <el-col :span="2">&nbsp;&nbsp;</el-col>
            <el-col :span="10">
              <el-table
                :data="rightServices"
                stripe
                border
                :height="Height"
                style="width: 100%"
                :max-height="tableHeight"
              >
                <el-table-column
                  prop="serviceName"
                  label="已选中业务名称"
                  fit
                />
                <el-table-column
                  prop="serviceDepartName"
                  label="业务归属"
                  fit
                />
                <el-table-column
                  prop="serviceType"
                  label="业务类别"
                  fit
                />

                <el-table-column
                  label="操作"
                  width="80"
                >
                  <template slot-scope="scope">
                    <el-button
                      type="text"
                      title="移除业务"
                      size="small"
                      icon="el-icon-back"
                      @click="removeService(scope.row)"
                    />
                    <el-button
                      type="text"
                      title="业务详情"
                      size="small"
                      icon="el-icon-more"
                      @click="moreInfo(scope.row)"
                    />
                  </template>
                </el-table-column>
              </el-table>
              <div class="satp-pagination-container">
                <el-pagination
                  :current-page="rightElePagination.pageNum"
                  :page-sizes="[10, 20, 30, 40]"
                  :page-size="rightElePagination.pageSize"
                  layout="total, sizes, prev, pager, next,jumper"
                  :total="rightElePagination.total"
                  @size-change="rightHandleSizeChange"
                  @current-change="rightHandleCurrentChange"
                />
              </div>
            </el-col>
          </el-row>
          <div slot="footer" class="dialog-footer">
            <el-button size="small" type="text" @click="cancle()">取消</el-button>
            <el-button size="small" type="primary" @click="saveForm()">确 定</el-button>
          </div>
        </el-dialog>

        <el-dialog title="修改" :visible.sync="dialogFormVisibleEdit" width="70%" :close-on-click-modal="false" @close="cancleEdit">
          <el-row>
            <el-col :span="10">
              <el-table
                :data="leftServices"
                stripe
                border
                :height="Height"
                style="width: 100%"
                :max-height="tableHeight"
              >
                <el-table-column
                  type="button"
                  prop="serviceName"
                  label="未选中业务名称"
                  fit
                />
                <el-table-column
                  prop="serviceDepartName"
                  label="业务归属"
                  fit
                />
                <el-table-column
                  prop="serviceType"
                  label="业务类别"
                  fit
                />
                <el-table-column
                  label="操作"
                  width="80"
                >
                  <template slot-scope="scope">
                    <el-button
                      type="text"
                      title="添加业务"
                      size="small"
                      icon="el-icon-right"
                      @click="appendService(scope.row)"
                    />
                    <el-button
                      type="text"
                      title="业务详情"
                      size="small"
                      icon="el-icon-more"
                      @click="moreInfo(scope.row)"
                    />
                  </template>

                </el-table-column>
              </el-table>
              <div class="satp-pagination-container">
                <el-pagination
                  :current-page="leftElePagination.pageNum"
                  :page-sizes="[10, 20, 30, 40]"
                  :page-size="leftElePagination.pageSize"
                  layout="total, sizes, prev, pager, next,jumper"
                  :total="leftElePagination.total"
                  @size-change="leftHandleSizeChange"
                  @current-change="handleCurrentChange"
                />
              </div>
            </el-col>
            <el-col :span="2">&nbsp;&nbsp;</el-col>
            <el-col :span="10">
              <el-table
                :data="rightServices"
                stripe
                border
                :height="Height"
                style="width: 100%"
                :max-height="tableHeight"
              >
                <el-table-column
                  prop="serviceName"
                  label="已选中业务名称"
                  fit
                />
                <el-table-column
                  prop="serviceDepartName"
                  label="业务归属"
                  fit
                />
                <el-table-column
                  prop="serviceType"
                  label="业务类别"
                  fit
                />

                <el-table-column
                  label="操作"
                  width="80"
                >
                  <template slot-scope="scope">
                    <el-button
                      type="text"
                      title="移除业务"
                      size="small"
                      icon="el-icon-back"
                      @click="removeService(scope.row)"
                    />
                    <el-button
                      type="text"
                      title="业务详情"
                      size="small"
                      icon="el-icon-more"
                      @click="moreInfo(scope.row)"
                    />
                  </template>
                </el-table-column>
              </el-table>
              <div class="satp-pagination-container">
                <el-pagination
                  :current-page="rightElePagination.pageNum"
                  :page-sizes="[10, 20, 30, 40]"
                  :page-size="rightElePagination.pageSize"
                  layout="total, sizes, prev, pager, next,jumper"
                  :total="rightElePagination.total"
                  @size-change="rightHandleSizeChange"
                  @current-change="rightHandleCurrentChange"
                />
              </div>
            </el-col>
          </el-row>
          <div slot="footer" class="dialog-footer">
            <el-button size="small" type="text" @click="cancleEdit()">取消</el-button>
            <el-button size="small" type="primary" @click="saveFormEdit()">确 定</el-button>
          </div>
        </el-dialog>

        <el-dialog title="业务详情" :visible.sync="dialogFormVisibleMore" width="30%" :model="selectObj" :close-on-click-modal="false" @close="cancleMore">
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
          <div slot="footer" class="dialog-footer">
            <el-button size="small" type="text" @click="cancleMore()">取消</el-button>
            <el-button size="small" type="primary" @click="cancleMore()">确 定</el-button>
          </div>
        </el-dialog>
        <satp-datagrid
          ref="evalListGrid"
          :url="url"
          :qparams="searchForm"
          :columns="columns"
          border
          :pagesizes="a.pSizes"
          @operClick="operClick"
        />
      </el-card>
    </div>
  </div>
</template>
<script>
import datagrid from '@/components/datagrid/datagrid'
import { parseTime } from '@/utils/index.js'
import fileUpload from '@/components/fileUpload/index'
export default {
  name: 'EvalList',
  components: { 'satp-datagrid': datagrid, 'file-upload': fileUpload },
  data() {
    return {
      Height: window.innerHeight - 195,
      leftElePagination: {
        // 右侧分页参数
        total: 0,
        pageNum: 1, // 当前页
        pageSize: 10 // 每页个数
      },
      rightElePagination: {
        // 右侧分页参数
        total: 0,
        pageNum: 1, // 当前页
        pageSize: 10 // 每页个数
      },
      dialogFormVisible: false,
      dialogFormVisibleEdit: false,
      dialogFormVisibleMore: false,
      searchForm: {
        evalName: '',
        page: true
      },
      a: {
        pSizes: [10, 15, 20]
      },
      url: 'evalInfo/loadEvalList',
      columns: [
        { label: '名称', prop: 'evalName', width: 350, align: 'left' },
        { label: '创建人', prop: 'createUser', align: 'center' },
        { label: '创建部门', prop: 'orgName', align: 'center' },
        { label: '创建时间', prop: 'createTime', align: 'center', formatter: this.dateFormatter },
        { label: '创建省份', prop: 'evalProvince', align: 'center' },
        {
          label: '操作',
          align: 'center',
          width: 300,
          actions: [
            { title: '修改', prop: 'edit', type: 'primary', icon: 'el-icon-edit', popconfirm: '确认修改这条记录?' },
            { title: '详情', prop: 'more', type: 'dashed', icon: 'el-icon-more' },
            { title: '删除', prop: 'delete', type: 'danger', icon: 'el-icon-delete', popconfirm: '确认删除这条记录?' }
          ]
        }
      ],
      leftServices: [],
      rightServices: [],
      serviceIds: '',
      selectObj: {},
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
      evalPracStageOptions: [{
        value: '1',
        label: '新业务上线'
      }, {
        value: '2',
        label: '存量重点业务'
      }],
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
      modifyEvalId: '',
      appendServiceId: [],
      removeServiceId: [],
      orignalRightServices: []
    }
  },
  computed: {
    tableHeight() {
      return window.innerHeight - 320
    }
  },
  mounted() {
    this.listLeftServices()
  },
  methods: {
    cancle() {
      this.leftServices = []
      this.rightServices = []
      this.serviceIds = ''
      this.appendServiceId = []
      this.removeServiceId = []
      this.dialogFormVisible = false
    },
    cancleEdit() {
      this.leftServices = []
      this.rightServices = []
      this.serviceIds = ''
      this.modifyEvalId = ''
      this.appendServiceId = []
      this.removeServiceId = []
      this.orignalRightServices = []
      this.dialogFormVisibleEdit = false
    },
    cancleMore() {
      this.selectObj = {}
      this.alldesFile = []
      this.techFile = []
      this.manageFile = []
      this.dialogFormVisibleMore = false
    },
    addEval() {
      this.listLeftServices()
      this.dialogFormVisible = true
    },
    saveForm() {
      var $self = this
      this.rightServices.forEach(business => {
        if (this.serviceIds === '' || this.serviceIds === null) {
          this.serviceIds = business.serviceId
        } else {
          this.serviceIds = this.serviceIds + ',' + business.serviceId
        }
      })
      this.$store.dispatch('evalInfo/addEval', { serviceIds: this.serviceIds }).then(response => {
        if (response && response.RET_CODE === '0') {
          this.reloadDatagrid()
          $self.dialogFormVisible = false
          this.cancle()
          $self.$message({
            message: '操作成功！',
            type: 'success'
          })
        }
      })
    },
    saveFormEdit() {
      // 防止重复添加清单
      this.appendServiceId.forEach((serviceId, i) => {
        this.orignalRightServices.forEach(businessInfo => {
          if (businessInfo.serviceId === serviceId) {
            this.appendServiceId.splice(i, 1)
          }
        })
      })

      var $self = this
      this.rightServices.forEach(business => {
        if (this.serviceIds === '' || this.serviceIds === null) {
          this.serviceIds = business.serviceId
        } else {
          this.serviceIds = this.serviceIds + ',' + business.serviceId
        }
      })
      const params = {}
      params.evalId = this.modifyEvalId
      params.serviceIds = this.serviceIds
      params.appendServiceId = this.appendServiceId
      params.removeServiceId = this.removeServiceId
      this.$store.dispatch('evalInfo/updateEval', params).then(response => {
        if (response && response.RET_CODE === '0') {
          this.reloadDatagrid()
          $self.dialogFormVisibleEdit = false
          this.cancleMore()
          $self.$message({
            message: '操作成功！',
            type: 'success'
          })
        }
      })
    },
    moreInfo(row) {
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
    },
    operClick(data) {
      const { row, prop } = data
      switch (prop) {
        case 'edit':
          this.listLeftServices()
          this.listRightServices(row.serviceIds)
          this.modifyEvalId = row.evalId
          this.dialogFormVisibleEdit = true
          break
        case 'delete':

          break
        case 'more':
          this.$router.push({
            path: '/doubleNew/evalInfo',
            query: {
              'evalName': row.evalName,
              'createUser': row.createUser,
              'createTime': row.createTime,
              'evalProvince': row.evalProvince,
              'orgName': row.orgName,
              'evalId': row.evalId
            }
          })
          break
        default:
          break
      }
    },
    reloadDatagrid() {
      this.$refs['evalListGrid'].reload()
    },
    dateFormatter(row) {
      const time = parseTime(row.createTime, '')
      return time
    },
    listLeftServices() {
      var _this = this
      const params = {}
      params.pageNum = this.leftElePagination.pageNum
      params.pageSize = this.leftElePagination.pageSize
      this.$store.dispatch('businessInfo/loadLeftBussinessList', params).then(resp => {
        _this.leftServices = resp.rows
        _this.leftElePagination.total = resp.total
      })
    },
    listRightServices(ids) {
      var _this = this
      const serviceIds = ids.split(',')
      const params = {}
      params.pageNum = this.rightElePagination.pageNum
      params.pageSize = this.rightElePagination.pageSize
      params.serviceIds = serviceIds
      this.$store.dispatch('businessInfo/loadRightBussinessList', params).then(resp => {
        _this.rightServices = resp.rows
        _this.rightElePagination.total = resp.total
      })
      this.orignalRightServices = this.rightServices
    },
    appendService(row) {
      this.leftServices.forEach((service, i) => {
        if (service.serviceId === row.serviceId) {
          this.leftServices.splice(i, 1)
          this.leftElePagination.total = this.leftElePagination.total - 1
        }
      })
      this.rightServices.push(row)
      this.appendServiceId.push(row.serviceId)
      this.removeServiceId.forEach((serviceId, i) => {
        if (serviceId === row.serviceId) {
          this.removeServiceId.splice(i, 1)
        }
      })
      this.rightElePagination.total = this.rightElePagination.total + 1
    },
    removeService(row) {
      this.rightServices.forEach((service, i) => {
        if (service.serviceId === row.serviceId) {
          this.rightServices.splice(i, 1)
          this.rightElePagination.total = this.rightElePagination.total - 1
        }
      })
      this.leftServices.push(row)
      this.removeServiceId.push(row.serviceId)
      this.appendServiceId.forEach((serviceId, i) => {
        if (serviceId === row.serviceId) {
          this.appendServiceId.splice(i, 1)
        }
      })
      this.leftElePagination.total = this.leftElePagination.total + 1
    },
    // 改变当前页页码
    handleCurrentChange(val) {
      this.leftElePagination.pageNum = val
      this.listLeftServices()
    },
    // 改变当前页显示条数
    leftHandleSizeChange(val) {
      this.leftElePagination.pageSize = val
      this.listLeftServices()
    },
    // 改变当前页页码
    rightHandleCurrentChange(val) {
      this.rightElePagination.pageNum = val
      this.listRightServices()
    },
    // 改变当前页显示条数
    rightHandleSizeChange(val) {
      this.rightElePagination.pageSize = val
      this.listRightServices()
    },
    getalldesList(data) {
      this.alldesFile = data
    },
    getTechList(data) {
      this.techFile = data
    },
    getManageList(data) {
      this.manageFile = data
    }
  }
}
</script>
