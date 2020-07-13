<template>
  <div>
    <div class="app-container">
      <el-card>
        <el-form
          :model="searchForm"
          label-position="left"
          label-width="100px"
          size="small"
          class="satp-form-inline"
        >
          <el-row>
            <el-col :span="6">
              <el-form-item label="不良信息名称" prop="badName">
                <el-input v-model="searchForm.badName" placeholder="不良信息名称" />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="发现时间段" prop="searchTime">
                <el-date-picker
                  v-model="searchTime"
                  type="daterange"
                  align="right"
                  unlink-panels
                  format="yyyy-MM-dd HH:mm:ss"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  :picker-options="pickerOptions"
                />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="业务类别" prop="fengduType">
                <el-select v-model="searchForm.fengduType" placeholder="业务类型">
                  <el-option
                    v-for="item in fengduTypeOptions"
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
                <el-button type="success" icon="el-icon-plus" size="small" @click="addBadInfo">新增</el-button>
              </div>
            </el-col>
          </el-row>
        </el-form>

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
              <el-col :span="11">
                <el-form-item label="不良信息名称" prop="badName">
                  <el-input v-model="formObj.badName" placeholder="业务名称" clearable />
                </el-form-item>
              </el-col>
              <el-col :span="2">&nbsp;</el-col>
              <el-col :span="11">
                <el-form-item label="发现时间" prop="badFindtime">
                  <el-date-picker
                    v-model="formObj.badFindtime"
                    placeholder="发现时间"
                    clearable
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="问题描述" prop="badDes">
                  <el-input v-model="formObj.badDes" type="textarea" placeholder="问题描述" clearable />
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="11">
                <el-form-item label="任务类型" prop="fengduType">
                  <el-select v-model="formObj.fengduType" placeholder="任务类型,请选择" @change="change">
                    <el-option
                      v-for="item in fengduTypeOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="2">&nbsp;</el-col>
              <el-col :span="11">
                <el-form-item label="封堵状态" prop="fengduStatename">
                  <el-input v-model="formObj.fengduStatename" placeholder="封堵状态" clearable disabled />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="11">
                <el-form-item label="部门负责人" prop="depUsername">
                  <el-input v-model="formObj.depUsername" placeholder="请选择负责人 " disabled size="small">
                    <el-button slot="append" icon="el-icon-search" @click="getDataRootUser()" />
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="2">&nbsp;</el-col>
              <el-col :span="11">
                <el-form-item label="相关部门" prop="depName">
                  <el-input v-model="formObj.depName" placeholder="相关部门" disabled clearable />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="上传附件" prop="file">
                  <file-upload
                    :qrydata="fileDatas"
                    :numlimit="limit"
                    :file-list="fileList"
                    @getFileList="getFileList"
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="导入数据" prop="file">
                  <el-button type="success" icon="el-icon-upload2" size="small" @click="showImport">导入</el-button>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button size="small" type="text" @click="cancle()">取消</el-button>
            <el-button size="small" type="primary" @click="saveForm()">确 定</el-button>
          </div>
        </el-dialog>

        <el-dialog title="不良信息导入" :visible.sync="importDag" width="30%" :model="fileObj" center @close="closeImportDag">
          <el-form :model="fileObj">
            <el-row>
              <el-col :span="10">
                <el-form-item label="">
                  <el-button type="primary" icon="el-icon-download" @click="exportTemplate('xls')">xls导入模板</el-button>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="">
                  <el-button type="primary" icon="el-icon-download" @click="exportTemplate('csv')">csv导入模板</el-button>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="">
                  <el-upload
                    ref="upload"
                    class="upload-demo"
                    action=" "
                    :on-change="changeFile"
                    :on-remove="handleRemove"
                    :file-list="importFileList"
                    :auto-upload="false"
                    multiple
                    :limit="1"
                  >
                    <el-button icon="el-icon-upload2" type="primary">选择文件</el-button>
                    <div slot="tip" class="el-upload__tip">只能上传xls/csv文件,红色字段为必填字段！</div>
                  </el-upload>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="closeImportDag()">取消</el-button>
            <el-button type="primary" @click="importBadInfo()">确 定</el-button>
          </div>
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
        <satp-datagrid
          ref="badInfoListGrid"
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
import UserInfo from '@/components/Userwindow/index.vue'
import fileUpload from '@/components/fileUpload/index'
import datagrid from '@/components/datagrid/datagrid'
import { parseTime } from '@/utils/index.js'
export default {
  name: 'BadInfoList',
  components: { 'satp-datagrid': datagrid, 'user-window': UserInfo, 'file-upload': fileUpload },
  data() {
    return {
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      },
      Height: window.innerHeight - 195,
      searchTime: [],
      searchForm: {
        badName: '',
        startTime: '',
        endTime: '',
        fengduType: '',
        evalName: '',
        page: true
      },
      a: {
        pSizes: [10, 15, 20]
      },
      url: 'badInfo/loadBadInfo',
      columns: [
        { label: '不良信息名称', prop: 'badName', width: 200, align: 'left' },
        { label: '发现时间', prop: 'badFindtime', align: 'center', formatter: this.dateFormatter },
        { label: '任务类型', prop: 'fengduTypename', align: 'center' },
        { label: '封堵状态', prop: 'fengduStatename', align: 'center' },
        { label: '相关部门', prop: 'depName', align: 'center' },
        {
          label: '操作',
          align: 'center',
          width: 150,
          actions: [
            { title: '业务信息', prop: 'more', type: 'primary', icon: 'el-icon-edit' },
            { title: '流程跟踪', prop: 'follow', type: 'dashed', icon: 'el-icon-more' }
          ]
        }
      ],
      fengduTypeOptions: [{
        value: '1',
        label: '非URL封堵'
      }, {
        value: '2',
        label: 'URL封堵'
      }, {
        value: '3',
        label: 'IP封堵'
      }],
      fileDatas: {
        fileType: 'badInfo',
        busiId: '1',
        busiSeg: '1',
        busiIndex: '1'
      }, // 附件上传参数
      limit: 2, // 限制附件上传个数
      fileList: [],
      dialogFormVisible: false,
      userWindowVisible: false,
      parentComponentParam: {}, // 向子组件传递自定义参数对象
      multiple: false, // 默认false 单选;
      title: '请选择用户', // 弹出框标题
      userNames: '',
      userIds: '',
      formRule: {
        badName: [
          { required: true, message: '请填写问题名称', trigger: 'blur' }
        ],
        badFindtime: [
          { required: true, message: '请选择发现时间', trigger: 'blur' }
        ],
        badDes: [
          { required: true, message: '请填写问题描述', trigger: 'blur' }
        ],
        fengduType: [
          { required: true, message: '请选择fengduType', trigger: 'blur' }
        ],
        depUsername: [
          { required: true, message: '请选择部门负责人', trigger: 'blur' }
        ]
      },
      formObj: {
        idx: ''
      },
      fileObj: {},
      importDag: false,
      importFileList: [],
      badinfList: []
    }
  },
  computed: {
    tableHeight() {
      return window.innerHeight - 320
    }
  },
  mounted() {
  },
  methods: {
    cancle() {
      this.dialogFormVisible = false
      this.fileList = []
      this.formObj = {}
    },
    addBadInfo() {
      this.dialogFormVisible = true
    },
    saveForm() {
      const $self = this
      $self.fileList.forEach(file => {
        if (this.formObj.idx === '' || this.formObj.idx === null) {
          this.formObj.idx = file.idx
        } else {
          this.formObj.idx = this.formObj.idx + ',' + file.idx
        }
      })
      if (this.formObj.fengduType === '1') {
        this.formObj.fengduTypename = '非URL封堵'
      }
      if (this.formObj.fengduType === '2') {
        this.formObj.fengduTypename = 'URL封堵'
      }
      if (this.formObj.fengduType === '3') {
        this.formObj.fengduTypename = 'IP封堵'
      }
      this.formObj.badinfList = this.badinfList
      $self.$refs['ruleForm'].validate(valid => {
        if (valid) {
          this.$store.dispatch('badInfo/addBadInfo', this.formObj).then(response => {
            if (response && response.RET_CODE === '0') {
              $self.$message({
                message: '操作成功！',
                type: 'success'
              })
              this.dialogFormVisible = false
              this.reloadDatagrid()
            }
          })
        }
      })
    },
    operClick(data) {
      const { row, prop } = data
      switch (prop) {
        case 'edit':
          break
        case 'delete':

          break
        case 'more':
          this.$router.push({
            path: '/badInfo/badInfoPage',
            query: {
              'badId': row.badId
            }
          })
          break
        default:
          break
      }
    },
    reloadDatagrid() {
      if (this.searchTime !== null && this.searchTime.length > 0) {
        this.searchTime.forEach((time, i) => {
          if (i === 0) {
            this.searchForm.startTime = time
          } else {
            this.searchForm.endTime = time
          }
        })
      } else {
        this.searchForm.startTime = ''
        this.searchForm.endTime = ''
      }

      this.$refs['badInfoListGrid'].reload()
    },
    dateFormatter(row) {
      const time = parseTime(row.badFindtime, '')
      return time
    },
    getDataRootUser() { // 调弹窗时可修改参数
      this.userWindowVisible = true
      this.parentComponentParam.flag1 = 'test'
      this.parentComponentParam.title = '选择设置视图用户'
      this.multiple = false// true 为复选
    },
    getUserInfo(data, parentComponentParam) { // 确定选择用户方法 单选时data 传的对象;复选传的数组
      const $self = this
      $self.formObj.depUsername = data.userName
      $self.formObj.depUserid = data.userId
      $self.formObj.depId = data.orgId
      $self.formObj.depName = data.orgName
    },
    getFileList(data) {
      this.fileList = data
    },
    handleRemove(file, fileList) {
      this.importFileList.splice(0, 1)
    },
    changeFile(file) {
      this.importFileList.push(file)
    },
    exportTemplate(ext) {
      this.$store.dispatch('badInfo/exportTemplate', { ext: ext }).then(response => {
      })
    },
    change(value) {
      if (value === '2') {
        this.formObj.fengduState = '1'
        this.formObj.fengduStatename = '已封堵'
      } else {
        this.formObj.fengduState = '2'
        this.formObj.fengduStatename = '未封堵'
      }
    },
    importBadInfo() {
      this.badinfList = []
      const $self = this
      const file = this.importFileList[0]
      const param = new FormData()
      param.append('file', file.raw)
      this.$store.dispatch('badInfo/importBadInfo', param).then(response => {
        $self.$message({
          message: '操作成功！',
          type: 'success'
        })
        this.importFileList = []
        this.importDag = false
        this.badinfList = response.badinfList
      })
    },
    showImport() {
      this.importDag = true
    },
    closeImportDag() {
      this.importDag = false
    }
  }
}
</script>
