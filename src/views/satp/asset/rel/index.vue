<template>
  <div class="app-container">
    <el-page-header :content="assetName" @back="goBack" />
    <el-card>
      <el-form
        label-width="100px"
        label-position="left"
        size="small"
        class="satp-form-inline"
      >
        <el-row>
          <el-col :span="8">
            <el-form-item label="关联关系 ">
              <el-select v-model="queryArgs.relTypeId" placeholder="关联关系" size="small">
                <el-option
                  v-for="item in assetRelOptions"
                  :key="item.dictKey"
                  :label="item.dictValue"
                  :value="item.dictKey"
                />
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-button size="small" @click="cleanSearchParm()">重置</el-button>
            <el-button type="primary" size="small" @click="searchData()">查询</el-button>
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
      :title="assetTitle"
      :visible.sync="assetVisible"
      :close-on-click-modal="false"
      width="35%"
    >
      <el-form
        ref="formObj"
        :model="formObj"
        :rules="rules"
        label-width="0px"
        label-position="top"
        size="small"
        class="satp-form-label-top"
      >
        <el-row>
          <el-form-item prop="relTypeId" label="关联关系" label-width="120px">
            <el-select v-model="formObj.relTypeId" placeholder="关联关系" size="small">
              <el-option
                v-for="item in assetRelOptions"
                :key="item.dictKey"
                :label="item.dictValue"
                :value="item.dictKey"
              />
            </el-select>
          </el-form-item>
          <el-form-item prop="relAssetName" label="目标资产" label-width="120px">
            <el-input v-model="formObj.relAssetName" placeholder="请选择目标资产" :readonly="true" size="small">
              <el-button slot="append" icon="el-icon-search" @click="openAsset" />
            </el-input>
          </el-form-item>
        </el-row>
      </el-form>
      <asset-window
        v-if="assetWindowVisible"
        :title="title"
        :parent-component-param="parentComponentParam"
        :multiple="assetMultiple"
        :visible.sync="assetWindowVisible"
        :modal-append-to-body="false"
        @getAssetInfo="getAssetInfo"
      />
      <div slot="footer" class="dialog-footer">
        <el-button size="small" type="text" @click="cancel">取 消</el-button>
        <el-button size="small" type="primary" :loading="loading" @click="saveForm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import AssetInfo from '@/components/Assetwindow/index.vue'
export default {
  components: { 'asset-window': AssetInfo },
  data() {
    return {
      assetVisible: false,
      innerVisible: false,
      assetWindowVisible: false,
      assetMultiple: false, // 默认false 单选;
      loading: false,
      parentComponentParam: {}, // 向子组件传递自定义参数对象
      assetRelOptions: [],
      queryArgs: {
        relTypeId: '',
        assetId: ''
      },
      url: 'asset/getAssetRelList',
      tableHeight: 450,
      columns: [
        { label: '源资产', prop: 'assetName', 'minWidth': 150, align: 'center' },
        { label: '关联关系', prop: 'typeValue', 'minWidth': 150, align: 'center' },
        { label: '目标资产', prop: 'relAssetName', 'minWidth': 150, align: 'center' },
        {
          label: '操作',
          align: 'center',
          width: 200,
          actions: [
            { formatter: 'operFormat', label: '修改', prop: 'edit', type: 'primary', icon: 'el-icon-edit-outline' },
            { formatter: 'operFormat', label: '删除', prop: 'del', type: 'primary', icon: 'el-icon-delete', popconfirm: '是否删除' }
          ]
        }
      ],
      toolbar: [
        { label: '新增关联', prop: 'add', type: 'primary', icon: 'el-icon-circle-plus-outline' }
      ],
      componentData: {},
      assetName: '',
      assetTitle: '',
      rules: {
        relTypeId: [{ required: true, message: '请填写必填项', trigger: 'change' }],
        relAssetName: [
          { required: true, message: '请填写必填项', trigger: 'blur' }
        ]
      },
      formObj: {
        relTypeId: '',
        relAssetId: '',
        relAssetName: '',
        assetId: '',
        assetName: ''
      },
      delObj: {
        relTypeId: '',
        relAssetId: '',
        assetId: ''
      }
    }
  },
  created() {
    this.assetName = this.$route.query.assetName
    this.getOptions('asset', 'assetRel', 'assetRelOptions')
    this.initTable()
  },
  methods: {
    initTable() {
      this.queryArgs.assetId = this.$route.query.assetId
      this.formObj.assetId = this.$route.query.assetId
      var myComponent = () => import('@/components/datagrid/datagrid')
      this.componentData = {
        component: myComponent
      }
    },
    searchData() {
      this.initTable()
    },
    cleanSearchParm() {
      this.queryArgs.relTypeId = ''
      this.initTable()
    },
    goBack() {
      this.$router.push({
        path: '/system/asset/asset',
        query: {
        }
      })
    },
    getOptions(dictName, dictService, options) {
      const param = {}
      const $self = this
      param.dictName = dictName
      param.dictService = dictService
      $self.$store.dispatch('dataDict/queryDataDictList', param).then(response => {
        if (options === 'assetRelOptions') {
          $self.assetRelOptions = response.result
        }
      }).catch(() => {
      })
    },
    toolbarClick(data) {
      const { rows, prop } = data
      console.log(rows)
      switch (prop) {
        case 'add':
          this.addRel()
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
    addRel() {
      this.assetTitle = '新增关联'
      this.assetVisible = true
    },
    openAsset() {
      this.assetWindowVisible = true
      this.assetMultiple = false
    },
    getAssetInfo(data, parentComponentParam) { // 确定选择用户方法 单选时data 传的对象;复选传的数组
      const $self = this
      if (data.assetId === $self.queryArgs.assetId) {
        this.$message({
          type: 'warning',
          message: '不能选择相同的源资产'
        })
        return
      }
      $self.formObj.relAssetName = data.assetName
      $self.formObj.relAssetId = data.assetId
      // $self.dataRootAssetInfo=data;
    },
    saveForm() {
      this.$refs['formObj'].validate((valid) => {
        this.loading = true
        const param = {}
        param.formObj = this.formObj
        param.delObj = this.delObj
        this.$store.dispatch('asset/saveAssetRel', param).then(response => {
          if (response.RET_CODE === '0') {
            this.assetVisible = false
            this.$message({
              type: 'success',
              message: '操作成功'
            })
          }
          this.loading = false
          this.initTable()
        }).catch(() => {
          this.assetVisible = false
        })
      })
    },
    cancel() {
      this.assetVisible = false
      this.formObj = {
        relTypeId: '',
        relAssetId: ''
      }
    },
    edit(row) {
      this.assetTitle = '编辑关联'
      this.assetVisible = true
      this.formObj.relAssetId = row.relAssetId
      this.formObj.relAssetName = row.relAssetName
      this.formObj.relTypeId = row.relTypeId
      this.formObj.assetId = row.assetId
      this.delObj.relAssetId = row.relAssetId
      this.delObj.relTypeId = row.relTypeId
      this.delObj.assetId = row.assetId
    },
    del(row) {
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      this.formObj.relAssetId = row.relAssetId
      this.formObj.relTypeId = row.relTypeId
      this.formObj.assetId = row.assetId
      this.$store.dispatch('asset/deleteAssetRel', this.formObj).then(response => {
        window.console.info(response)
        loading.close()
        if (response.RET_CODE === '0') {
          this.$message({
            type: 'success',
            message: '操作成功'
          })
        }
        this.initTable()
      }).catch(() => {
        loading.close()
        this.initTable()
      })
    }
  }
}
</script>
