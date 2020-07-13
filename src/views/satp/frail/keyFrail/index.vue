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
          <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
            <el-form-item label="问题名称">
              <el-input v-model="queryArgs.vulnName" size="small" />
            </el-form-item>
          </el-col>
          <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
            <el-form-item label="CVE编码">
              <el-input v-model="queryArgs.cveId" size="small" />
            </el-form-item>
          </el-col>
          <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
            <el-form-item label="风险等级">
              <el-select v-model="queryArgs.vulnLevel" size="small">
                <el-option
                  v-for="item in vulnLevelOptions"
                  :key="item.dictKey"
                  :label="item.dictValue"
                  :value="item.dictKey"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6" align="right">
            <!-- <el-dropdown size="small" split-button type="primary" @click="searchData">
              <i class="el-icon-search" />查询
            </el-dropdown> -->
            <el-button size="small" type="primary" class="el-icon-search" @click="searchData">查询</el-button>
            <el-button size="small" @click="cleanSearchParm">重置</el-button>
          </el-col>
        </el-row>
      </el-form>
      <component
        :is="componentData.component"
        :url="url"
        :qparams="queryArgs"
        :columns="columns"
        :toolbar="toolbar"
        idx
        :height="tableHeight"
        border
        @operClick="operClick"
        @toolbarClick="toolbarClick"
      />
    </el-card>
    <el-dialog
      :title="title"
      :visible.sync="dialogFormVisible"
      width="60%"
      :before-close="modalClose"
    >
      <el-form
        ref="formObj"
        v-loading="dialogLoading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        :rules="rules"
        :model="formObj"
        label-width="100px"
        @submit.native.prevent
      >

        <el-row :gutter="20">
          <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
            <el-form-item label="问题名称" prop="vulnName">
              <el-input v-model="formObj.vulnName" />
            </el-form-item>
          </el-col>
          <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
            <el-form-item label="CVE_ID" prop="cveId">
              <el-input v-model="formObj.cveId" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
            <el-form-item label="风险等级" prop="vulnLevel">
              <el-select v-model="formObj.vulnLevel" size="small">
                <el-option
                  v-for="item in vulnLevelOptions"
                  :key="item.dictKey"
                  :label="item.dictValue"
                  :value="item.dictKey"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
            <el-form-item label="适用范围">
              <el-input v-model="formObj.scope" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <el-form-item label="备注">
              <el-input v-model="formObj.remark" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel()">取消</el-button>
        <el-button type="primary" :loading="savebutton" @click="saveForm('formObj')">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog
      title="资产详情"
      :visible.sync="dialogDetailVisible"
      width="60%"
      :before-close="modalClose2"
    >
      <component
        :is="componentDetailData.component"
        :url="assetDetailParam.url"
        :qparams="assetDetailParam.params"
        :columns="assetDetailParam.columns"
        idx
        :height="assetDetailParam.tableHeight"
        border
      />
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel2()">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      url: 'frail/queryKeyFrailListByPage',
      tableHeight: 400,
      columns: [
        { label: '问题名称', prop: 'vulnName', 'minWidth': 150, align: 'center' },
        { label: 'CVE编号', prop: 'cveId', 'minWidth': 150, align: 'center' },
        { label: '风险等级', prop: 'vulnLevelLabel', 'minWidth': 150, align: 'center' },
        { label: '创建时间', prop: 'cTime', 'minWidth': 150, align: 'center' },
        {
          label: '操作',
          align: 'center',
          width: 200,
          actions: [
            { formatter: 'operFormat', label: '修改', prop: 'edit', type: 'primary', icon: 'el-icon-edit-outline' },
            { formatter: 'operFormat', label: '资产详情', prop: 'assetDetail', type: 'primary', icon: 'el-icon-document' }
          ]
        }
      ],
      toolbar: [
        { label: '新增', prop: 'add', type: 'primary', icon: 'el-icon-plus' }
      ],
      componentData: {},
      assetDetailParam: {
        url: 'frail/queryFrailAssetVulnInfo',
        params: { cveId: '' },
        tableHeight: 200,
        columns: [
          { label: '资产名称', prop: 'assetName', 'minWidth': 150, align: 'center' },
          { label: '资产类型', prop: 'assetTypeLabel', 'minWidth': 150, align: 'center' },
          { label: '地址', prop: 'logicAddr', 'minWidth': 150, align: 'center' },
          { label: '整改状态', prop: 'rectStatLabel', 'minWidth': 150, align: 'center' },
          { label: '发现时间', prop: 'findTime', 'minWidth': 150, align: 'center', 'template': true, 'formatter': this.findTimeFormatter },
          { label: '整改完成时间', prop: 'finishTime', 'minWidth': 150, align: 'center', 'template': true, 'formatter': this.finishTimeFormatter }
        ]
      },
      componentDetailData: {},
      vulnLevelOptions: [],
      loading: true,
      dialogLoading: false,
      savebutton: false,
      dialogFormVisible: false,
      dialogDetailVisible: false,
      title: '',
      formObj: {
        keyFrailId: '',
        vulnName: '',
        cveId: '',
        vulnLevel: '',
        scope: '',
        remark: ''
      },
      queryArgs: {
        vulnName: '',
        cveId: '',
        vulnLevel: ''
      },
      rules: {
        // 验证必填项
        vulnName: [
          { required: true, message: '请填写必填项' }
        ],
        cveId: [
          { required: true, message: '请填写必填项' }
        ],
        vulnLevel: [
          { required: true, message: '请填写必填项' }
        ]
      }
    }
  },
  computed: {
    dateFormat() {
      return function(el) {
        return this.moment(el).format('YYYY-MM-DD HH:mm:ss')
      }
    }
  },
  created() {
    this.initTable()
    this.getOptions('riskLevel', 'all', 'vulnLevelOptions')
  },
  methods: {
    initTable() {
      var myComponent = () => import('@/components/datagrid/datagrid')
      this.componentData = {
        component: myComponent
      }
    },
    toolbarClick(data) {
      const { rows, prop } = data
      console.log(rows)
      switch (prop) {
        case 'add':
          this.add()
          break
        default:
          break
      }
    },
    operClick(data) {
      const { row, prop } = data
      switch (prop) {
        case 'edit':
          this.edit(row)
          break
        case 'assetDetail':
          this.assetDetail(row)
          break
        default:
          break
      }
    },
    findTimeFormatter(row) {
      if (!row.expDate) {
        return ''
      }
      return this.moment(row.cTime).format('YYYY-MM-DD HH:mm:ss')
    },
    finishTimeFormatter(row) {
      if (!row.expDate) {
        return ''
      }
      return this.moment(row.cTime).format('YYYY-MM-DD HH:mm:ss')
    },
    searchData() {
      this.initTable()
    },
    // 查询当前条件
    cleanSearchParm() {
      // tables数据查询条件
      this.queryArgs = {
        vulnName: '',
        cveId: '',
        vulnLevel: ''
      }
      this.initTable()
    },
    getOptions(dictName, dictService, options) {
      const param = {}
      const $self = this
      param.dictName = dictName
      param.dictService = dictService
      $self.$store.dispatch('dataDict/queryDataDictList', param).then(response => {
        if (options === 'vulnLevelOptions') {
          $self.vulnLevelOptions = response.result
        }
      }).catch(() => {
      })
    },
    modalClose() {
      this.cancel()
    },
    modalClose2() {
      this.cancel2()
    },
    cancel() {
      this.formObj = {
        keyFrailId: '',
        vulnName: '',
        cveId: '',
        vulnLevel: '',
        scope: '',
        remark: ''
      }
      this.savebutton = false
      this.$refs['formObj'].resetFields()
    },
    cancel2() {
      this.dialogDetailVisible = false
    },
    add() {
      this.dialogFormVisible = true
      this.title = '新增'
    },
    edit(row) {
      const $self = this
      $self.title = '修改'
      $self.dialogFormVisible = true
      $self.dialogLoading = true
      const param = {}
      param.keyFrailId = row.keyFrailId
      $self.$store.dispatch('frail/queryKeyFrailList', param).then(response => {
        $self.dialogLoading = false
        $self.formObj = response.result[0]
      }).catch(() => {
        $self.dialogLoading = false
      })
    },
    assetDetail(row) {
      this.dialogDetailVisible = true
      this.assetDetailParam.params.cveId = row.cveId
      var myComponent = () => import('@/components/datagrid/datagrid')
      this.componentDetailData = {
        component: myComponent
      }
    },
    saveForm(formName) {
      const $self = this
      let url = ''
      if ($self.formObj.keyFrailId === '') {
        url = 'frail/addKeyFrail'
      } else {
        url = 'frail/updateKeyFrail'
      }
      $self.savebutton = true
      $self.$refs[formName].validate(valid => {
        if (valid) {
          $self.$store.dispatch(url, $self.formObj).then(response => {
            if (response.RET_CODE === '0') {
              $self.$message({
                type: 'success',
                message: '操作成功!'
              })
            } else {
              $self.$message({
                type: 'error',
                message: '操作失败!'
              })
            }
            $self.cancel()
            $self.initTable()
          }).catch(() => {
            $self.cancel()
          })
        } else {
          $self.loading = false
          $self.savebutton = false
          return false
        }
      })
    }
    // getDetailTableData() {
    //   const $self = this
    //   $self.expandeLoading = false
    //   const param = {}
    //   param.cveId = $self.expands[0]
    //   param.pageNum = $self.expandPagination.pageNum
    //   param.pageSize = $self.expandPagination.pageSize
    //   $self.$store.dispatch('frail/queryFrailAssetVulnInfo', param).then(response => {
    //     window.console.info(response.rows)
    //     $self.detailTableData = response.rows
    //     $self.expandPagination.total = response.total
    //     $self.expandeLoading = false
    //     // this.rowsFormatter(response.rows)
    //   }).catch(() => {
    //     $self.expandeLoading = false
    //   })
    // }
  }
}
</script>
<style scoped>
.radius {
    min-height: 120px;
    width: 100%;
    border: 1px solid #d7dae2;
    border-radius: 2px;
    margin-top: 5px;
    padding:15px;
}
</style>
