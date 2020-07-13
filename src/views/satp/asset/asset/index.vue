<template>
  <div class="app-container">
    <el-row :gutter="24" style="margin:10px 0px 0px; padding:0px">
      <el-col :span="6">
        <el-card class="box-card">
          <div style="padding:20px;">
            <el-tree
              v-loading="loadingTree"
              element-loading-spinner="el-icon-loading"
              :data="assetTypeTreeData"
              node-key="value"
              highlight-current
              @node-click="getCurrentNode"
            />
          </div>
        </el-card>
      </el-col>
      <el-col :span="18">
        <el-card>
          <el-form
            label-width="100px"
            label-position="left"
            size="small"
            class="satp-form-inline"
          >
            <el-row>
              <el-col :span="8">
                <el-form-item label="地址">
                  <el-input v-model="queryArgs.logicAddr" placeholder="" size="small" />
                </el-form-item>
              </el-col>

              <el-col :span="8">
                <el-form-item label="资产名称">
                  <el-input v-model="queryArgs.assetName" placeholder="" size="small" />
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
      </el-col>
    </el-row>
    <router-view />
  </div>
</template>
<script>
export default {
  data() {
    return {
      heightVal: (window.innerHeight - 70) + 'px',
      assetTypeTreeData: [],
      loadingTree: false,
      currentRow: null,
      queryArgs: {
        assetName: '',
        logicAddr: '',
        assetType: ''
      },
      url: 'asset/getAssetList',
      tableHeight: 450,
      columns: [
        { label: '资产标识', prop: 'assetId', 'minWidth': 150, align: 'center' },
        { label: '资产名称', prop: 'assetName', 'minWidth': 150, align: 'center' },
        { label: 'IP/URL', prop: 'logicAddr', 'minWidth': 150, align: 'center' },
        { label: '资产类型', prop: 'assetTypeLabel', 'minWidth': 150, align: 'center' },
        { label: '归属组织', prop: 'orgName', 'minWidth': 150, align: 'center' },
        {
          label: '操作',
          align: 'center',
          width: 200,
          actions: [
            { formatter: 'operFormat', label: '关联关系', prop: 'rel', type: 'primary', icon: 'iconfont satp-icon-guanlian1' },
            { formatter: 'operFormat', label: '扩展信息', prop: 'ext', type: 'primary', icon: 'iconfont satp-icon-shuxing' },
            { formatter: 'operFormat', label: '编辑资产', prop: 'edit', type: 'primary', icon: 'el-icon-edit-outline' }
          ]
        }
      ],
      toolbar: [
        { label: '同步资产', prop: 'sync', type: 'primary', icon: 'el-icon-refresh' },
        { label: '新增资产', prop: 'add', type: 'primary', icon: 'el-icon-plus' }
      ]
    }
  },
  created() {
    this.getAssetTypeTree()
    this.initTable()
  },
  methods: {
    initTable() {
      const assetName = this.queryArgs.assetName
      const logicAddr = this.queryArgs.logicAddr
      const assetType = this.queryArgs.assetType
      this.queryArgs = {
        assetName: assetName,
        logicAddr: logicAddr,
        assetType: assetType
      }
      var myComponent = () => import('@/components/datagrid/datagrid')
      this.componentData = {
        component: myComponent
      }
    },
    getAssetTypeTree() {
      const $self = this
      $self.loadingTree = true
      const params = {}
      $self.$store.dispatch('asset/getAssetTypeTree', params).then(response => {
        $self.assetTypeTreeData = response.treeList
        $self.loadingTree = false
      })
    },
    getCurrentNode(node) {
      this.queryArgs.assetType = node.value
      this.initTable()
    },
    toolbarClick(data) {
      const { rows, prop } = data
      console.log(rows)
      switch (prop) {
        case 'add':
          this.addAsset()
          break
        default:
          break
      }
    },
    operClick(data) {
      const { row, prop } = data
      switch (prop) {
        case 'rel':
          this.assetRel(row)
          break
        case 'ext':
          this.assetExt(row)
          break
        case 'edit':
          this.editAsset(row)
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
        assetName: '',
        logicAddr: '',
        assetType: ''
      }
      this.initTable()
    },
    assetRel(row) {
      this.$router.push({
        path: '/system/asset/rel',
        query: {
          'assetId': row.assetId,
          'assetName': row.assetName
        }
      })
    },
    assetExt(row) {
      this.$router.push({
        path: '/system/asset/ext',
        query: {
          'assetId': row.assetId,
          'assetName': row.assetName
        }
      })
    },
    addAsset() {
      this.$router.push({
        path: '/system/asset/add',
        query: {}
      })
    },
    editAsset(row) {
      this.$router.push({
        path: '/system/asset/edit',
        query: {
          'assetId': row.assetId
        }
      })
    }
  }
}
</script>
<style scoped>

</style>
