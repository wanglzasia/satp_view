<template>
  <div class="app-container">
    <el-card>
      <el-form
        label-width="100px"
        label-position="left"
        size="small"
        class="satp-form-inline"
      >
        <el-row>
          <el-col :xs="5" :sm="5" :md="5" :lg="5" :xl="5">
            <el-form-item label="设备名称">
              <el-input v-model="queryArgs.assetName" placeholder="设备名称" size="small" />
            </el-form-item>
          </el-col>
          <el-col :xs="5" :sm="5" :md="5" :lg="5" :xl="5">
            <el-form-item label="资产地址">
              <el-input v-model="queryArgs.logicAddr" placeholder="资产IP(IP或URL) " size="small" />
            </el-form-item>
          </el-col>
          <el-col :xs="5" :sm="5" :md="5" :lg="5" :xl="5">
            <el-form-item label="业务系统">
              <el-input v-model="queryArgs.bizName" placeholder="业务系统" size="small" />
            </el-form-item>
          </el-col>
          <el-col :xs="5" :sm="5" :md="5" :lg="5" :xl="5">
            <el-form-item label="资产类型 ">
              <el-select v-model="queryArgs.assetType" placeholder="资产类型" size="small">
                <el-option
                  v-for="item in probAssetTypeOptions"
                  :key="item.dictKey"
                  :label="item.dictValue"
                  :value="item.dictKey"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
            <el-dropdown size="small" split-button type="primary" @click="searchData">
              <i class="el-icon-search" />查询
              <el-dropdown-menu slot="dropdown">
                <el-link @click="showCondition=true">
                  <el-dropdown-item>高级条件</el-dropdown-item>
                </el-link>
                <el-link v-if="showCondition==true" @click="showCondition=false">
                  <el-dropdown-item>收起</el-dropdown-item>
                </el-link>
              </el-dropdown-menu>
            </el-dropdown>
            <el-button size="small" @click="cleanSearchParm">重置</el-button>
            <!-- <el-button type="success" icon="el-icon-plus" size="small" @click="dialogVisible = true">新建任务</el-button> -->
          </el-col>

        </el-row>
        <!-- 搜索条件大于三个添加这块  --第二行的搜索条件 -->
        <el-row v-show="showCondition">
          <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
            <el-form-item label="问题名称">
              <el-input v-model="queryArgs.vulnTitle" placeholder="问题名称" size="small" />
            </el-form-item>
          </el-col>
          <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
            <el-form-item label="问题分类">
              <el-select v-model="queryArgs.vulnClass" placeholder="问题分类" size="small">
                <el-option
                  v-for="item in vulnClassOptions"
                  :key="item.dictKey"
                  :label="item.dictValue"
                  :value="item.dictKey"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
            <el-form-item label="整改状态 ">
              <el-select v-model="queryArgs.rectStat" placeholder="整改状态" size="small">
                <el-option
                  v-for="item in statusOptions"
                  :key="item.dictKey"
                  :label="item.dictValue"
                  :value="item.dictKey"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-show="showCondition">
          <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
            <el-form-item label="问题发现时间 ">
              <el-date-picker
                v-model="dcvrTime"
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="yyyy-MM-dd HH:mm:ss"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div class="el-datagrid">
        <div class="toolbar">
          <el-button size="mini" type="primary" icon="el-icon-upload2" @click="showUploadDialog">
            导入
          </el-button>
        </div>
        <div ref="satpdatagrid">
          <el-table
            v-loading="loading"
            class="satp-grid-mini"
            element-loading-text="拼命加载中"
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(185, 185, 185, 0.1)"
            :data="tableData"
            :height="height"
            border
            style="width: 100%"
          >
            <el-table-column align="center" prop="assetName" label="资产名称" min-width="150" />
            <el-table-column align="center" :show-overflow-tooltip="true" prop="logicAddr" label="资产IP" min-width="120">
              <template slot-scope="scope">
                <el-link type="primary" @click.native.prevent="showProbdetail(scope.row)">{{ scope.row.logicAddr }}</el-link>
              </template>
            </el-table-column>
            <el-table-column align="center" :show-overflow-tooltip="true" prop="bizName" label="业务系统" min-width="150" />
            <el-table-column align="center" prop="assetTypeLabel" label="资产类型" min-width="120" />
            <el-table-column align="center" prop="vulnClassName" label="问题分类" min-width="120" />
            <el-table-column align="center" prop="deptName" label="部门" min-width="120" />
            <el-table-column align="center" prop="sectName" label="科室" min-width="120" />
            <el-table-column align="center" label="厂商负责人" min-width="120">
              <template slot-scope="scope">
                <div v-if="scope.row.rectStat=='0'||scope.row.rectStat=='7'">
                  <el-button v-if="scope.row.safetyMfrsName != '' && scope.row.safetyMfrsName !=null" type="info" size="mini" @click.native.prevent="getSafetyMgr(scope.row,'safetyMfrs')">{{ scope.row.safetyMfrsName }}</el-button>
                  <el-button v-if="scope.row.safetyMfrsName == '' || scope.row.safetyMfrsName ==null" type="warning" size="mini" @click.native.prevent="getSafetyMgr(scope.row,'safetyMfrs')">请选择</el-button>
                </div>
                <div v-else>
                  {{ scope.row.safetyMfrsName }}
                </div>
              </template>
            </el-table-column>
            <el-table-column align="center" label="安全责任人" min-width="120">
              <template slot-scope="scope">
                <div v-if="scope.row.rectStat=='0'||scope.row.rectStat=='7'">
                  <el-button v-if="scope.row.scyRespName != '' && scope.row.scyRespName !=null" type="info" size="mini" @click.native.prevent="getSafetyMgr(scope.row,'scyRespId')">{{ scope.row.scyRespName }}</el-button>
                  <el-button v-if="scope.row.scyRespName == '' || scope.row.scyRespName ==null" type="warning" size="mini" @click.native.prevent="getSafetyMgr(scope.row,'scyRespId')">请选择</el-button>
                </div>
                <div v-else>
                  {{ scope.row.scyRespName }}
                </div>
              </template>
            </el-table-column>
            <el-table-column align="center" label="安全管理员" min-width="120">
              <template slot-scope="scope">
                <div v-if="scope.row.rectStat=='0'||scope.row.rectStat=='7'">
                  <el-button v-if="scope.row.safetyMgrName != '' && scope.row.safetyMgrName !=null" type="info" size="mini" @click.native.prevent="getSafetyMgr(scope.row,'safetyMgr')">{{ scope.row.safetyMgrName }}</el-button>
                  <el-button v-if="scope.row.safetyMgrName == '' || scope.row.safetyMgrName ==null" type="warning" size="mini" @click.native.prevent="getSafetyMgr(scope.row,'safetyMgr')">请选择</el-button>
                </div>
                <div v-else>
                  {{ scope.row.safetyMgrName }}
                </div>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="probNo" label="问题数量" min-width="120" />
            <el-table-column align="center" prop="rectStatLabel" label="整改状态" min-width="120" />
            <el-table-column align="center" prop="rectTime" label="整改发起时间" min-width="180">
              <template slot-scope="scope">{{ dateFormat(scope.row.rectTime) }}</template>
            </el-table-column>
            <el-table-column align="center" prop="rectPeriod" label="整改期限" min-width="120" />
            <el-table-column align="center" prop="rectCnclsn" label="整改最终结论" min-width="120" />

            <el-table-column fixed="right" label="操作" min-width="150" align="center">
              <template slot-scope="scope">
                <el-button type="text" plain @click.native.prevent="probdetail(scope.row)">
                  <i class="el-icon-document" title="详情" />
                </el-button>
                <el-button v-if="scope.row.rectStat=='0'||scope.row.rectStat=='7'" type="text" plain @click.native.prevent="send(scope.row)">
                  <i class="el-icon-s-promotion" title="派发" />
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="pagination-container">
            <el-pagination
              :current-page="elePagination.pageNum"
              :page-sizes="[10, 20, 30, 40]"
              :page-size="elePagination.pageSize"
              layout="total, sizes, prev, pager, next,jumper"
              :total="elePagination.total"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
            />
          </div>
        </div>
      </div>
      <user-window
        v-if="safetyMgrVisible"
        :title="userTitle"
        :parent-component-param="parentComponentParam"
        :multiple="multiple"
        :visible.sync="safetyMgrVisible"
        :modal-append-to-body="false"
        @getUserInfo="getUserInfo"
      />
      <prob-window
        v-if="probdetailVisible"
        :parent-component-param="parentComponentParam"
        :visible.sync="probdetailVisible"
        :modal-append-to-body="false"
      />
      <!-- 派发 -->
      <el-dialog title="整改期限" :visible.sync="dialogDispatchFormVisible" width="400px">
        <el-form ref="dispatchForm" :rules="dispatchRules" :model="dispatchForm" @submit.native.prevent>

          <el-form-item prop="rectPeriod" label="整改期限:" label-width="110px">
            <el-input v-model.number="dispatchForm.rectPeriod" autocomplete="off" type="text">
              <template slot="append">工作日</template>
            </el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancel('dispatchForm')">取消</el-button>
          <el-button type="primary" :loading="savebutton" @click="dispatchSave()">派 发</el-button>
        </div>
      </el-dialog>
      <el-dialog title="合规问题导入" :visible.sync="dialogImportVisible" width="700px">
        <!-- <el-form> -->
        <el-row>

          <!-- <el-col  :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
                            <el-select placeholder="导入类型" v-model="importType" size="small">
                                <el-option
                                v-for="item in vulnClassOptions"
                                :key="item.dictKey"
                                :label="item.dictValue"
                                :value="item.dictKey">
                                </el-option>
                            </el-select>
                        </el-col> -->
          <el-col :span="8">
            <el-link style="padding:8px 0px 0px 20px;" type="primary" @click.native.prevent="downloadExcelTemp">EXCEL导入模板下载</el-link>
          </el-col>
          <el-col :span="10">
            <el-upload
              ref="upload"
              class="upload-demo"
              action=" "
              :on-change="changeFile"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :file-list="fileList"
              :auto-upload="false"
              multiple
              :limit="1"
            >
              <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
              <el-button style="margin-left: 10px;" :loading="savebutton" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
              <div slot="tip" class="el-upload__tip">
                1.仅支持后缀名为.xls的文件,红色字段为必填字段！<br>
                2.字段个数和位置不能随意增添改动,请参考模板文件。
              </div>
            </el-upload>
          </el-col>
        </el-row>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancel()">取消</el-button>
        </div>
        <!-- </el-form> -->
      </el-dialog>
    </el-card>
    <router-view />
  </div>
</template>
<script>
import UserInfo from '@/components/Userwindow/index.vue'
import ProbdetailInfo from './Probdetailwindow.vue'
export default {
  components: { 'user-window': UserInfo, 'prob-window': ProbdetailInfo },
  data() {
    return {
      loading: true,
      savebutton: false,
      showCondition: false,
      dcvrTime: [],
      statusOptions: [],
      vulnClassOptions: [],
      probAssetTypeOptions: [],
      boxTop: 70,
      height: window.innerHeight - 215,
      tableData: [],
      detailTableData: [],
      probDetailTableThead: [],
      queryArgs: {

      },
      elePagination: {
        // 右侧分页参数
        total: 0,
        pageNum: 1, // 当前页
        pageSize: 10 // 每页个数
      },
      parentComponentParam: {}, // 向子组件传递自定义参数对象
      multiple: false, // 默认false 单选;
      userTitle: '', // 弹出框标题
      safetyMgrVisible: false,
      probdetailVisible: false,
      dispatchForm: {
        rectPeriod: '',
        probId: ''
      },
      dialogDispatchFormVisible: false,
      dialogImportVisible: false,
      dispatchRules: {
        // 验证必填项
        rectPeriod: [
          { required: true, message: '请填写必填项' },
          { type: 'number', message: '期限必须为数字值' }
        ]
      },
      fileList: [],
      importType: ''
    }
  },
  computed: {
    dateFormat() {
      return function(el) {
        if (!el) {
          return ''
        }
        return this.moment(el).format('YYYY-MM-DD HH:mm:ss')
      }
    }
  },
  created() {
    this.getTableData()
    this.getOptions('rectStat', 'cmpProb', 'statusOptions')
    this.getOptions('probAssetType', 'cmpProb', 'probAssetTypeOptions')
    this.getOptions('vulnClass', 'cmpProb', 'vulnClassOptions')
  },
  mounted() {
    // this.getTableData()
    if (this.height === 0) {
      this.boxTop = this.$refs.satpdatagrid.getBoundingClientRect().top + 75
      window.onresize = () => {
        return (() => {
          this.myHeight = window.innerHeight - this.boxTop
        })()
      }
    }
  },
  methods: {
    getTableData() {
      const $self = this
      $self.loading = true
      let param = {}
      window.console.info('this.dcvrTime')
      window.console.info(this.dcvrTime)

      param = $self.queryArgs
      if (this.dcvrTime.length > 0) {
        param.beginTime = this.dcvrTime[0]
        param.endTime = this.dcvrTime[1]
      }
      param.pageNum = $self.elePagination.pageNum
      param.pageSize = $self.elePagination.pageSize
      this.$store.dispatch('disposal/queryProbcenListByPage', param).then(response => {
        $self.loading = false
        $self.tableData = response.rows
        $self.elePagination.total = response.total
        $self.loading = false
        // this.rowsFormatter(response.rows)
      }).catch(() => {
        $self.loading = false
      })
    },
    // 改变当前页页码
    handleCurrentChange(val) {
      window.console.info('this.elePagination.pageNum', this.elePagination)
      this.elePagination.pageNum = val
      this.getTableData()
    },
    // 改变当前页显示条数
    handleSizeChange(val) {
      this.elePagination.pageSize = val
      this.getTableData()
    },
    searchData() {
      this.getTableData()
    },
    // 查询当前条件
    cleanSearchParm() {
      // tables数据查询条件
      this.queryArgs = {

      }
      // window.console.log(this.dcvrTime);
      this.dcvrTime = []
    },
    showUploadDialog() {
      this.dialogImportVisible = true
    },
    getOptions(dictName, dictService, options) {
      const param = {}
      const $self = this
      param.dictName = dictName
      param.dictService = dictService
      $self.$store.dispatch('dataDict/queryDataDictList', param).then(response => {
        if (options === 'statusOptions') {
          $self.statusOptions = response.result
        } else if (options === 'probAssetTypeOptions') {
          $self.probAssetTypeOptions = response.result
        } else if (options === 'vulnClassOptions') {
          $self.vulnClassOptions = response.result
        }
      }).catch(() => {
      })
    },
    getSafetyMgr(row, userFlag) {
      this.safetyMgrVisible = true
      this.parentComponentParam.userId = row.safetyMgr
      this.parentComponentParam.probId = row.probId
      this.parentComponentParam.userFlag = userFlag
      if (userFlag === 'safetyMgr') {
        this.userTitle = '请选择安全管理员'
      } else if (userFlag === 'scyRespId') {
        this.userTitle = '请选择安全责任人'
      } else if (userFlag === 'safetyMfrs') {
        this.userTitle = '请选择厂商负责人'
      }
    },
    getUserInfo(data, parentComponentParam) { // 确定选择用户方法 单选时data 传的对象;复选传的数组
      const userId = data.userId
      const param = {}
      const userFlag = parentComponentParam.userFlag
      if (userFlag === 'safetyMgr') {
        param.safetyMgr = userId
      } else if (userFlag === 'scyRespId') {
        param.scyRespId = userId
      } else if (userFlag === 'safetyMfrs') {
        param.safetyMfrs = userId
      }
      param.probId = parentComponentParam.probId
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      this.$store.dispatch('disposal/updateProbcen', param).then(response => {
        if (response.RET_CODE === '0') {
          this.$message({
            type: 'success',
            message: '操作成功!'
          })
        } else {
          this.$message({
            type: 'error',
            message: '操作失败!'
          })
        }
        loading.close()
        this.getTableData()
      }).catch(() => {
      })
    },
    // 派发弹出页
    send(row) {
      const $self = this
      if (row.scyRespId === '') {
        this.$message({
          type: 'warning',
          message: '请选择安全责任人!'
        })
        return
      } else if (row.safetyMgr === '') {
        this.$message({
          type: 'warning',
          message: '请选择安全管理员!'
        })
        return
      } else if (row.safetyMfrs === '') {
        this.$message({
          type: 'warning',
          message: '请选择厂商负责人!'
        })
        return
      }
      this.$confirm('是否派发整改？').then(_ => {
        $self.dispatchForm.busiId = row.probId
        $self.dispatchForm.nextLogin = row.safetyMfrs
        $self.dialogDispatchFormVisible = true
      }).catch(_ => {})
    },
    // 派发
    dispatchSave() {
      const $self = this
      this.savebutton = true
      $self.$refs['dispatchForm'].validate(valid => {
        if (valid) {
          this.$store.dispatch('disposal/dispatch', $self.dispatchForm).then(response => {
            if (response.RET_CODE === '0') {
              this.$message({
                type: 'success',
                message: '操作成功!'
              })
            } else {
              this.$message({
                type: 'error',
                message: '操作失败!'
              })
            }
            // loading.close()
            this.cancel()
            this.getTableData()
          }).catch(() => {
            this.loading.close()
            this.cancel()
            this.getTableData()
          })
        } else {
          $self.loading = false
          $self.savebutton = false
          return false
        }
      })
    },
    // 取消操作
    cancel(formName) {
      this.loading = false
      this.savebutton = false
      this.dialogFormVisible = false
      this.dialogDispatchFormVisible = false
      this.dialogImportVisible = false
      if (formName) { this.$refs['dispatchForm'].resetFields() }
    },
    submitUpload() {
      this.savebutton = true
      const $self = this
      const file = this.fileList[0]
      const param = new FormData()
      param.append('file', file.raw)
      param.append('imptype', '1')
      // console.log(param.get('file'))
      window.console.info(param)
      // return false;
      this.$store.dispatch('disposal/importProbInfo', param).then(response => {
        $self.getTableData()
        $self.$message({
          message: '操作成功！',
          type: 'success'
        })
        this.fileList = []
        this.savebutton = false
      })
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    },
    changeFile(file) {
      this.fileList.push(file)
    },
    downloadExcelTemp() { // 下载模板
      const params = { realName: '合规问题中心处置模板.xls', fileUrl: 'upload\\prepFile\\20191228235529138164_1_prepFile.xls' }
      this.$store.dispatch('base/downloadFile', params).then(response => {
      })
    },
    showProbdetail(row) {
      this.probdetailVisible = true
      this.parentComponentParam.logicAddr = row.logicAddr
      this.parentComponentParam.vulnClass = row.vulnClass
      this.parentComponentParam.probId = row.probId
    },
    probdetail(row) {
      this.$router.push({
        path: '/satp/disposal/probDetail',
        query: {
          'probId': row.probId
        }
      })
    }
  }

}
</script>
<style scoped>
.radius {
    min-height: 120px;
    width: 60%;
    border: 1px solid #d7dae2;
    border-radius: 2px;
    margin-top: 5px;
    padding:15px;
}
.el-datagrid {
    padding: 0px;
    background-color: #FFF;
    border-radius: 5px;
}
.toolbar {
    margin-bottom: 5px;
}
.pagination-container {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-top: 5px;
}
</style>
