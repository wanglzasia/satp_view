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
            <el-form-item label="扩展属性 ">
              <el-select v-model="queryArgs.extKey" placeholder="扩展属性" size="small">
                <el-option
                  v-for="item in assetExtOptions"
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
          <el-form-item prop="extKey" label="属性名称" label-width="120px">
            <el-select v-model="formObj.extKey" placeholder="属性名称" size="small" @change="changeLocationValue">
              <el-option
                v-for="item in assetExtOptions"
                :key="item.dictKey"
                :label="item.dictValue"
                :value="item.dictKey"
              />
            </el-select>
          </el-form-item>
          <el-form-item prop="extValue" label="属性值" label-width="120px">
            <el-input v-model="formObj.extValue" placeholder="属性值" size="small" />
          </el-form-item>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" type="text" @click="cancel">取 消</el-button>
        <el-button size="small" type="primary" :loading="loading" @click="saveForm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      assetVisible: false,
      loading: false,
      assetExtOptions: [],
      queryArgs: {
        extKey: '',
        assetId: ''
      },
      url: 'asset/getAssetExtList',
      tableHeight: 450,
      columns: [
        { label: '属性名称', prop: 'extName', 'minWidth': 150, align: 'center' },
        { label: '属性值', prop: 'extValue', 'minWidth': 150, align: 'center' },
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
        { label: '新增属性', prop: 'add', type: 'primary', icon: 'el-icon-circle-plus-outline' }
      ],
      componentData: {},
      assetName: '',
      assetTitle: '',
      rules: {
        extKey: [{ required: true, message: '请填写必填项', trigger: 'change' }],
        extValue: [
          { required: true, message: '请填写必填项', trigger: 'blur' }
        ]
      },
      formObj: {
        assetId: '',
        extKey: '',
        extName: '',
        extValue: '',
        dataSrc: '1'
      },
      delObj: {
        assetId: '',
        extKey: '',
        extName: '',
        extValue: ''
      }
    }
  },
  created() {
    this.assetName = this.$route.query.assetName
    this.getOptions('asset', 'assetExt', 'assetExtOptions')
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
      this.queryArgs.extKey = ''
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
        if (options === 'assetExtOptions') {
          $self.assetExtOptions = response.result
        }
      }).catch(() => {
      })
    },
    changeLocationValue(vId) {
      let obj = {}
      obj = this.assetExtOptions.find((item) => {
        return item.dictKey === vId
      })
      this.formObj.extName = obj.dictValue
    },
    toolbarClick(data) {
      const { rows, prop } = data
      console.log(rows)
      switch (prop) {
        case 'add':
          this.addExt()
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
    addExt() {
      this.assetTitle = '新增属性'
      this.assetVisible = true
    },
    saveForm() {
      this.$refs['formObj'].validate((valid) => {
        this.loading = true
        const param = {}
        param.formObj = this.formObj
        param.delObj = this.delObj
        window.console.info(param)
        this.$store.dispatch('asset/saveAssetExt', param).then(response => {
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
        assetId: '',
        extKey: '',
        extName: '',
        extValue: ''
      }
    },
    edit(row) {
      this.assetTitle = '编辑属性'
      this.assetVisible = true
      this.formObj.extValue = row.extValue
      this.formObj.extKey = row.extKey
      this.formObj.assetId = row.assetId
      this.delObj.extValue = row.extValue
      this.delObj.extKey = row.extKey
      this.delObj.assetId = row.assetId
    },
    del(row) {
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      this.formObj.extKey = row.extKey
      this.formObj.extValue = row.extValue
      this.formObj.assetId = row.assetId
      this.$store.dispatch('asset/deleteAssetExt', this.formObj).then(response => {
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
