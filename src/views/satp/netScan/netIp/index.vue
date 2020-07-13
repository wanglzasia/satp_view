<template>
  <div class="app-container">
    <el-card>
      <div>
        <el-row>
          <el-form ref="elForm" :model="queryArgs" size="small" label-width="70px">
            <el-col :span="6">
              <el-form-item label="ip地址" prop="ip">
                <el-input v-model="queryArgs.appName" placeholder="应用名称" clearable :style="{width: '100%'}" />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="扫描状态" prop="status" label-width="110px">
                <!-- <el-input v-model="queryArgs.busiCode" placeholder="归属业务系统" clearable :style="{width: '100%'}" /> -->
                <el-select v-model="queryArgs.status" placeholder="扫描状态" clearable :style="{width: '100%'}">
                  <el-option
                    v-for="(item, index) in statusOption"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                    :disabled="item.disabled"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="连通状态" prop="connect" label-width="100px">
                <!-- <el-input v-model="queryArgs.ipAddress" placeholder="网络/IP范围" clearable :style="{width: '100%'}" /> -->
                <el-select v-model="queryArgs.connect" placeholder="连通状态" clearable :style="{width: '100%'}">
                  <el-option
                    v-for="(item, index) in connectOption"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                    :disabled="item.disabled"
                  />
                </el-select></el-form-item>
            </el-col>
            <el-col :span="6">
              <div class="satp-from-btngrp-std">
                <el-button type="primary" icon="el-icon-search" size="small" @click="searchData()">查询</el-button>
              </div>
            </el-col>
          </el-form>
        </el-row>
      </div>
      <div>
        <satp-treegrid
          ref="ipGrid"
          :url="ipGrid.url"
          row-key="id"
          :qparams="queryArgs"
          :columns="ipGrid.columns"
          :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
          border
          @loadSubList="loadSubList"
          @operClick="ipGridClick"
        />
      </div>

      <el-dialog title="扫描结果" :visible.sync="dialogFormVisible" width="50%" :model="formObj" @close="cancle">
        <table class="satp-table-detail" style="margin-bottom:10px">
          <tr>
            <th>IP地址</th>
            <td>{{ formObj.ip }}</td>
            <th>连通状态</th>
            <td>{{ formObj.connect ==0?'不通':'通' }}</td>
          </tr>
          <tr>
            <th>开始时间</th>
            <td>{{ datetimeFormat(formObj.startTime) }}</td>
            <th>结束时间</th>
            <td>{{ datetimeFormat(formObj.endTime) }}</td>
          </tr>
          <tr>
            <th>主机信息</th>
            <td>{{ formObj.hostInfo }}</td>
            <th>MAC</th>
            <td>{{ formObj.mac }}</td>
          </tr>
          <tr>
            <th>端口信息</th>
            <td colspan="3">
              <span v-html="formObj.portInfo" />
            </td>
          </tr>
          <tr>
            <th>系统信息</th>
            <td colspan="3">
              <p v-html="formObj.osInfo" />
            </td>
          </tr>
        </table>
        <div slot="footer" class="dialog-footer">
          <el-button size="small" @click="cancle()">返 回</el-button>
        </div>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>

import { findNetResult, netResultList } from '../../../../api/satp/netScan/netTask'
import treegrid from '@/components/datagrid/treegrid'
export default {
  components: { 'satp-treegrid': treegrid },
  props: [],
  data() {
    return {
      ipGrid: {
        url: 'netTask/ipList',
        columns: [
          { label: 'IP地址', prop: 'ip' },
          { label: '最后扫描时间', prop: 'startTime', formatter: this.startTimeFormatter },
          { label: '扫描状态', prop: 'status', formatter: this.statusFormatter },
          { label: '连通状态', prop: 'connect', formatter: this.connectFormatter },
          {
            label: '操作',
            align: 'center',
            actions: [
              { title: '详情', prop: 'detail', type: 'text', icon: 'el-icon-s-grid' }
            ]
          }
        ]
      },
      queryArgs: {},
      formObj: {},
      formAttr: {},
      dialogFormVisible: false,
      connectOption: [{
        'label': '不通',
        'value': 0
      }, {
        'label': '通',
        'value': 1
      }],
      statusOption: [{
        'label': '未扫描',
        'value': 0
      }, {
        'label': '已扫描',
        'value': 1
      }, {
        'label': '扫描中',
        'value': 2
      }, {
        'label': '异常',
        'value': 3
      }]

    }
  },
  computed: {
    dateFormat() {
      return function(el) {
        return this.moment(el).format('YYYY-MM-DD HH:mm:ss')
      }
    },
    datetimeFormat() {
      return function(el, format) {
        let fmt = 'YYYY-MM-DD HH:mm:ss'
        let value = ''
        if (format) {
          fmt = format
        }
        if (el) {
          value = this.moment(el).format(fmt)
        }
        return value
      }
    }
  },
  watch: {},
  created() {
  },
  mounted() {},
  methods: {

    searchData() {
      this.$refs['ipGrid'].reload()
    },
    loadSubList(tree, treeNode, resolve) {
      const params = { 'ip': tree.ip }
      params.pageNum = 1
      params.pageSize = 5
      netResultList(params).then(response => {
        // 当id相同时会发生递归报错
        response.rows.forEach(row => {
          if (row.id === tree.id) {
            response.rows.splice(response.rows.indexOf(row), 1)
          }
        })
        console.log(response.rows)
        resolve(response.rows)
      }).catch(error => {
        console.log(error)
      })
    },
    ipGridClick(data) {
      const { row, prop } = data
      switch (prop) {
        case 'detail':
          this.showDialog(row)
          break
        default:
          break
      }
    },
    startTimeFormatter(row) {
      const fmt = 'YYYY-MM-DD HH:mm:ss'
      const el = row.startTime
      let value
      if (el) {
        value = this.moment(el).format(fmt)
      }
      return value
    },
    connectFormatter(row) {
      if (row.connect === 1) {
        return '通'
      } else if (row.connect === 0) {
        return '不通'
      }
    },
    statusFormatter(row) {
      if (row.status === 1) {
        return '已扫描'
      } else if (row.status === 0) {
        return '未扫描'
      } else if (row.status === 2) {
        return '扫描中'
      } else if (row.status === 3) {
        return '待配置'
      }
    },
    cancle() {
      this.dialogFormVisible = false
    },
    showDialog(row) {
      const params = { id: row.id }
      findNetResult(params).then(response => {
        this.formObj = response.netResult
      })
      this.dialogFormVisible = true
    }
  }
}
</script>
