<template>
  <div class="app-container">
    <el-card class="box-card">
      <el-form
        label-width="100px"
        label-position="left"
        size="small"
        class="satp-form-inline"
      >
        <el-row>
          <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
            <el-form-item label="字典名称">
              <el-input v-model="queryArgs.dictName" placeholder="字典名称" size="small" />
            </el-form-item>
          </el-col>
          <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
            <el-form-item label="字典服务码">
              <el-input v-model="queryArgs.dictService" placeholder="字典服务码" size="small" />
            </el-form-item>
          </el-col>
          <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
            <el-form-item label="字典服务名">
              <el-input v-model="queryArgs.dictServiceName" placeholder="字典服务名" size="small" />
            </el-form-item>
          </el-col>
          <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6" align="right">
            <el-dropdown size="small" split-button type="primary" @click="searchData">
              <i class="el-icon-search" />查询
            </el-dropdown>
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
        ref="ruleForm"
        v-loading="dialogLoading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        :model="formObj"
        label-width="100px"
        @submit.native.prevent
      >
        <el-form-item label="字典名称">
          <el-input v-model="formObj.dictName" />
        </el-form-item>
        <el-form-item label="字典服务码">
          <el-input v-model="formObj.dictService" />
        </el-form-item>
        <el-form-item label="字典服务名">
          <el-input v-model="formObj.dictServiceName" />
        </el-form-item>

        <el-row :gutter="20">
          <el-form-item label="字典键值对">
            <el-col :span="6"><el-input v-model="formObj.dictKey" placeholder="字典key" size="small" /></el-col>
            <el-col :span="6"><el-input v-model="formObj.dictValue" placeholder="字典label" size="small" /></el-col>
            <el-col :span="2">
              <el-button type="text" icon="el-icon-circle-plus" size="medium" @click="addRow" />
            </el-col>
          </el-form-item>
        </el-row>
        <div class="radius">
          <el-row>
            <template>
              <el-table
                :data="addTableData"
                style="width: 100%"
                max-height="200"
              >
                <el-table-column
                  label="字典key"
                  width="180"
                >
                  <template slot-scope="scope">
                    <!-- <i class="el-icon-time"></i> -->
                    <span style="margin-left: 10px">{{ scope.row.dictKey }}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  label="字典label"
                  width="180"
                >
                  <template slot-scope="scope">
                    <!-- <i class="el-icon-time"></i> -->
                    <span style="margin-left: 10px">{{ scope.row.dictValue }}</span>
                  </template>
                </el-table-column>

                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <el-button
                      size="mini"
                      type="danger"
                      @click="handleDelete(scope.$index, scope.row)"
                    >删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </template>
          </el-row>
        </div>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel()">取消</el-button>
        <el-button type="primary" :loading="savebutton" @click="saveForm()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      url: 'dataDict/queryDataDictListByPage',
      tableHeight: 450,
      columns: [
        { label: '字典名称(dict_name )', prop: 'dictName', 'minWidth': 150, align: 'center' },
        { label: '字典服务模块功能码(dict_service )', prop: 'dictService', 'minWidth': 150, align: 'center' },
        { label: '字典服务模块功能名', prop: 'dictServiceName', 'minWidth': 150, align: 'center' },
        {
          label: '操作',
          align: 'center',
          width: 150,
          actions: [
            { formatter: 'operFormat', label: '修改', prop: 'edit', type: 'primary', icon: 'el-icon-edit-outline' },
            { formatter: 'operFormat', label: '删除', prop: 'del', type: 'primary', icon: 'el-icon-delete' }
          ]
        }
      ],
      toolbar: [
        { label: '新增', prop: 'add', type: 'primary', icon: 'el-icon-plus' }
      ],
      componentData: {},
      loading: true,
      dialogLoading: true,
      savebutton: false,
      dialogFormVisible: false,
      title: '',
      formObj: {
        dictName: '',
        dictService: '',
        dictServiceName: '',
        dictKey: '',
        dictValue: ''
      },
      tableData: [],
      queryArgs: {
        dictName: '',
        dictService: '',
        dictServiceName: ''
      },
      elePagination: {
        // 右侧分页参数
        total: 0,
        pageNum: 1, // 当前页
        pageSize: 10 // 每页个数
      },
      addTableData: []

    }
  },
  computed: {
    dateFormat() {
      return function(el) {
        return this.moment(el).format('YYYY-MM-D HH:mm:ss')
      }
    }
  },
  created() {
    this.initTable()
  },
  mounted() {

  },
  methods: {
    initTable() {
      this.queryArgs.prepType = this.activeName
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
        case 'del':
          this.del(row)
          break
        default:
          break
      }
    },
    searchData() {
      this.initTable()
    },
    // 查询当前条件
    cleanSearchParm() {
      // tables数据查询条件
      this.queryArgs = {
        dictName: '',
        dictService: '',
        dictServiceName: ''
      }
      this.initTable()
    },
    add() {
      this.title = '新增'
      this.dialogLoading = false
      this.dialogFormVisible = true
    },
    edit(row) {
      const $self = this
      $self.dialogFormVisible = true
      const param = {}
      param.dictName = row.dictName
      param.dictService = row.dictService
      $self.title = '编辑'
      $self.dialogLoading = true
      $self.$store.dispatch('dataDict/queryDataDictList', param).then(response => {
        $self.formObj.dictName = response.result[0].dictName
        $self.formObj.dictService = response.result[0].dictService
        $self.formObj.dictServiceName = response.result[0].dictServiceName
        $self.addTableData = response.result
        $self.dialogLoading = false
      }).catch(() => {
        // reject(error)
        $self.loading = false
      })
    },
    del(row) {
      this.$confirm('是否确定删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const $self = this
        const param = {}
        param.dictName = row.dictName
        param.dictService = row.dictService
        $self.$store.dispatch('dataDict/deleteDataDict', param).then(response => {
          window.console.info(response)
          $self.savebutton = false
          $self.dialogLoading = false
          if (response.RET_CODE === '0') {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.initTable()
          } else {
            this.$message({
              type: 'error',
              message: '删除失败!'
            })
          }
        }).catch(() => {
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    saveForm() {
      const $self = this
      $self.savebutton = true
      const param = {}
      const dataDictArr = $self.addTableData
      for (var i = 0; i < dataDictArr.length; i++) {
        dataDictArr[i].dictName = $self.formObj.dictName
        dataDictArr[i].dictService = $self.formObj.dictService
        dataDictArr[i].dictServiceName = $self.formObj.dictServiceName
      }
      param.dataDictArr = dataDictArr
      if ($self.title === '新增') {
        $self.$store.dispatch('dataDict/saveDataDict', param).then(response => {
          window.console.info(response)
          $self.savebutton = false
          $self.dialogLoading = false
          if (response.RET_CODE === '0') {
            this.$message({
              showClose: true,
              message: '操作成功',
              type: 'success'
            })
            this.cancel()
            this.initTable()
          }
        }).catch(() => {
          $self.loading = false
          $self.savebutton = false
        })
      } else {
        $self.$store.dispatch('dataDict/updateDataDict', param).then(response => {
          window.console.info(response)
          $self.savebutton = false
          $self.dialogLoading = false
          if (response.RET_CODE === '0') {
            this.$message({
              showClose: true,
              message: '操作成功',
              type: 'success'
            })
            this.cancel()
            this.initTable()
          }
        }).catch(() => {
          $self.loading = false
          $self.savebutton = false
        })
      }
    },
    modalClose() {
      this.cancel()
    },
    cancel() {
      this.formObj = {
        dictName: '',
        dictService: '',
        dictServiceName: '',
        dictKey: '',
        dictValue: ''
      }
      this.addTableData = []
      this.dialogFormVisible = false
    },
    addRow() {
      const $self = this
      const param = {}
      param.dictKey = $self.formObj.dictKey
      param.dictValue = $self.formObj.dictValue
      if ($self.formObj.dictKey === '' || $self.formObj.dictValue === '') {
        this.$message({
          showClose: true,
          message: '请填写键值对',
          type: 'warning'
        })
        return
      }
      $self.addTableData.push(param)
    },
    handleDelete(idx, row) {
      this.addTableData.splice(idx, 1)
    }

  }
}
</script>
<style scoped>
.radius {
    min-height: 120px;
    width: 80%;
    border: 1px solid #d7dae2;
    border-radius: 2px;
    margin-top: 5px;
}
</style>
