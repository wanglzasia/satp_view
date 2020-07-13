<template>
  <div v-loading="loading">
    <div class="app-container">
      <el-card>
        <el-row>
          <el-col :span="18">
            <div style="text-align:left">
              <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
                <el-form-item label="选择资产">

                  <template>
                    <el-select v-model="form.region" placeholder="请选择资产" size="small" style="width:100%" @change="chgAsset">
                      <el-option
                        v-for="item in assetList"
                        :key="item.assetId"
                        :label="item.assetName + ' : ' +item.logicAddr"
                        :value="item.assetId"
                      />
                    </el-select>
                  </template>

                </el-form-item>
              </el-form>
            </div>
          </el-col>
          <el-col :span="6">
            <div style="text-align:right">
              <el-button size="mini" type="primary" icon="el-icon-suitcase">一键关联工具结果</el-button>
              <el-button type="success" size="mini" icon="el-icon-check" @click="workDone">完成任务</el-button>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="3">
            <div>
              <div style="padding:5px 5px 5px 5px;border:1px solid #EBEEF5;">
                <el-tree
                  ref="tree"
                  class="filter-tree"
                  :data="data"
                  :props="defaultProps"
                  default-expand-all
                  :filter-node-method="filterNode"
                  @node-click="handleNodeClick"
                />
              </div>
            </div>
          </el-col>
          <el-col :span="21">
            <div style="margin-left:20px;border-left:1px solid #EBEEF5;border-right:1px solid #EBEEF5;border-bottom:1px solid #EBEEF5;">
              <form ref="ASSIGN_RESULT_DTL">
                <template v-if="ctrlClass.length>0">
                  <el-collapse v-model="activeNames" @change="handleChange">
                    <template v-for="( ctrl, ctrlIdx) in ctrlClass">
                      <el-collapse-item
                        :key="ctrlIdx"
                        :title="ctrl.ctrlClass"
                        :name="ctrlIdx"
                        style="padding:0px 5px 0px 5px;"
                      >
                        <table style="width:100%" class="satp-table-grade">
                          <tr>
                            <th>&nbsp;</th>
                            <th>测评指标</th>
                            <th>测评单元</th>
                            <th>结果</th>
                            <th>附件</th>
                          </tr>

                          <template v-for="( item, idx) in ctrl.item">
                            <tr :key="ctrlIdx+'_'+item.itemNo+'_'+idx">
                              <td style="width:10px;">{{ idx+1 }}</td>
                              <td style="width:220px;">
                                {{ item.content }}
                              </td>
                              <td>
                                <div class="items">a) 测评对象：网闸、防火墙、路由器、交换机和无线接入网关设备等提供访问控制功能的设备或相关组件。</div>
                                <div class="items">b) 单元判定：如果1)~3)均为肯定,则符合本测评单元指标要求,否则不符合或部分符合本测评单元指标要求。</div>
                                <div class="items">c) 测评实施包括以下内容：</div>
                              </td>
                              <td style="width:80px">
                                <select v-model="formData[item.idx].val" :name="'RESULT_'+item.itemNo">
                                  <option v-for="option in options" :key="option.id" :value="option.id">{{ option.name }}</option>
                                </select>
                              </td>
                              <td style="width:100px">
                                <el-upload
                                  class="upload-demo"
                                  action="https://jsonplaceholder.typicode.com/posts/"
                                >
                                  <el-button size="mini" type="primary" icon="el-icon-upload2">上传</el-button>
                                </el-upload>
                              </td>
                            </tr>
                            <tr :key="ctrlIdx+'_'+item.itemNo+'_note_'+idx">
                              <td>&nbsp;</td>
                              <td colspan="4">
                                备注：<input v-model="formData[item.idx].note" type="text" :name="'NOTE_'+item.itemNo" style="width:90%;">
                              </td>
                            </tr>
                          </template>
                        </table>
                      </el-collapse-item>
                    </template>
                  </el-collapse>

                  <div style="text-align:right;padding:10px 10px 10px 10px">
                    <el-button type="success" size="mini" icon="el-icon-folder" plain @click="saveResult">保存结果</el-button>
                  </div>

                </template>
              </form>
            </div>
          </el-col>
        </el-row>
      </el-card>
    </div>
  </div>

</template>
<script>

export default {
  data() {
    return {
      loading: false,
      taskId: this.$route.params.taskId,
      actTaskId: this.$route.params.actTaskId,
      filterText: '',
      labelPosition: 'right',
      formLabelAlign: { name: '', region: '', type: '' },
      activeNames: [],
      assetList: [],
      ctrlClass: [],
      formData: [],
      ops: -1,
      itemIdx: 0,
      curAssetId: '',
      data: [{
        id: 1,
        label: '管理要求',
        children: [
          { id: 3, label: '安全建设管理' },
          { id: 4, label: '安全管理人员' },
          { id: 5, label: '安全管理制度' },
          { id: 6, label: '安全管理机构' },
          { id: 7, label: '安全运维管理' }
        ]
      }, {
        id: 2,
        label: '技术要求',
        children: [
          { id: 8, label: '安全物理环境' },
          { id: 9, label: '安全通信网络' },
          { id: 10, label: '安全区域边界' },
          { id: 11, label: '安全计算环境' },
          { id: 12, label: '安全管理中心' }
        ]
      }],
      options: [
        { 'id': '-1', 'name': '未检查' },
        { 'id': '-2', 'name': '不适用' },
        { 'id': '0', 'name': '不符合' },
        { 'id': '2', 'name': '部分符合' },
        { 'id': '1', 'name': '符合' }
      ],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      form: {
        region: ''
      }
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val)
    },
    assetList(val) {
      // console.log(val)
    }
  },
  mounted() {
    this.loadTaskAsset()
  },
  methods: {
    filterNode(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    handleChange(val) {
      // console.log(val)
    },
    loadTaskAsset() {
      const params = { 'taskId': this.taskId }
      this.loading = true

      this.$store.dispatch('task/loadTaskAsset', params).then(resp => {
        if (resp && resp.RET_CODE === '0') {
          this.assetList = resp.list
          this.loading = false
        }
      }).catch(() => {
        this.loading = false
      })
    },
    chgAsset(val) {
      this.curAssetId = val
      this.ctrlClass = []
      this.activeNames = []
      this.formData = []
    },
    handleNodeClick(data) {
      this.ctrlClass = []
      this.activeNames = []
      this.formData = []
      if (this.curAssetId !== '') {
        this.loading = true
        const params = { 'taskId': this.taskId, 'ctrlType': data.label, 'assetId': this.curAssetId }
        this.$store.dispatch('task/gradeAssignDetailList', params).then(resp => {
          if (resp && resp.RET_CODE === '0') {
            this.dealItemDetail(resp.list)
            this.loading = false
          }
        }).catch(() => {
          this.loading = false
        })
      } else {
        //
      }
    },
    dealItemDetail(list) {
      for (var i = 0; i < list.length; i++) {
        this.distinctCtrlType(list[i], i)
      }
      this.showTable()
    },
    distinctCtrlType(data, idx) {
      let tmpVal = ''
      let isExist = 0
      let position = -1
      for (var i = 0; i < this.ctrlClass.length; i++) {
        tmpVal = this.ctrlClass[i].ctrlClass
        if (tmpVal === data.ctrlClass) {
          isExist = 1
          position = i
          break
        }
      }
      if (isExist === 0) {
        this.ctrlClass.push({ 'ctrlClass': data.ctrlClass, 'item': [{ 'content': data.itemContent, 'itemNo': data.itemNo, 'idx': idx }] })
      } else {
        this.ctrlClass[position].item.push({ 'content': data.itemContent, 'itemNo': data.itemNo, 'idx': idx })
      }

      tmpVal = data.rptStatus
      if (tmpVal === '' || typeof (tmpVal) === 'undefined') {
        tmpVal = -1
      }
      this.formData.push({ 'assetId': this.curAssetId, 'taskId': this.taskId, 'itemNo': data.itemNo, 'val': tmpVal, 'note': data.rptMsg })
      position = -1
    },
    showTable() {
      for (var i = 0; i < this.ctrlClass.length; i++) {
        this.activeNames.push(i.toString())
      }
    },
    saveResult() {
      const $self = this
      const params = { 'ARR': JSON.parse(JSON.stringify($self.formData)) }
      this.loading = true
      this.$store.dispatch('task/saveGradeResult', params).then(resp => {
        if (resp && resp.RET_CODE === '0') {
          this.$message({
            showClose: true,
            message: resp.RET_INFO,
            type: 'success'
          })
        }
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    workDone() {
      // 任务完成
      const params = { 'taskId': this.actTaskId, 'busiId': this.taskId }
      this.loading = true
      this.$store.dispatch('task/gradeTaskDone', params).then(resp => {
        if (resp && resp.RET_CODE === '0') {
          this.$message({
            showClose: true,
            message: resp.RET_INFO,
            type: 'success'
          })

          this.$router.push({ path: '/system/workflow/busiTaskList' })
          // 待办列表
        }
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    }
  }
}
</script>
