<template>
  <!--<div style="padding-left: 10px;padding-right: 10px;padding-top: 20px;padding-bottom: 20px;">
    <p style="padding-left: 10px;">
      审批流程
    </p>
    <el-table
      :data="auditList"
      :border="true"
      size="small"
      :show-header="false"
      style="width: 100%"
    >
      <el-table-column
        prop="TASK_NAME"
        label="流程节点"
        min-width="80"
      />
      <el-table-column
        prop="name"
        label="审批数据"
        min-width="300"
      >
        <template slot-scope="scope">
          {{ scope.row.AUDIT_RESULT }}
          {{ scope.row.AUDIT_RESULT !== '' && scope.row.AUDIT_NOTE !== '' ? ',' : '' }}
          {{ scope.row.AUDIT_NOTE }}
          <br>
          <div v-if="scope.row.FILES.length !== 0">
            <a v-for="fileBean in scope.row.FILES" :key="fileBean.IDX" style="size:10px;color:#9A9898;" href="#" :title="fileBean.REAL_NAME" :download="fileBean.REAL_NAME" @click="downloadFile(fileBean)">{{ fileBean.REAL_NAME }}</a><br>
          </div>
          <div style="text-align: right;">
            {{ scope.row.LOGIN_NAME }}
            {{ scope.row.END_TIME }}
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>-->

  <div class="block" style="margin-top: 20px;">
    <!--<el-card class="box-card">
      <h3 style="padding-left: 10px;">
        审批流程
      </h3>
      <el-timeline>
        <el-timeline-item v-for="audit in auditList" :key="audit.IDX" :timestamp="audit.END_TIME.substring(0,10)" placement="top">
          <el-card>
            <h4>{{ audit.AUDIT_RESULT }}
              {{ audit.AUDIT_RESULT !== '' && audit.AUDIT_NOTE !== '' ? ',' : '' }}
              {{ audit.AUDIT_NOTE }}</h4>
            <div v-if="audit.FILES.length !== 0">
              <a v-for="fileBean in audit.FILES" :key="fileBean.IDX" style="size:10px;color:#9A9898;" href="#" :title="fileBean.REAL_NAME" :download="fileBean.REAL_NAME" @click="downloadFile(fileBean)">{{ fileBean.REAL_NAME }}</a><br>
            </div>
            <p>{{ audit.LOGIN_NAME }}
              {{ audit.END_TIME }}</p>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </el-card>-->

    <el-collapse v-if="auditList.length != 0" v-model="activeNames" @change="handleChange">
      <el-collapse-item title="审批流程" name="1">
        <div>
          <el-timeline>
            <el-timeline-item v-for="audit in auditList" :key="audit.IDX" :timestamp="audit.END_TIME.substring(0,10)" placement="top">
              <el-card>
                <h4>{{ audit.AUDIT_RESULT }}
                  {{ audit.AUDIT_RESULT !== '' && audit.AUDIT_NOTE !== '' ? ',' : '' }}
                  {{ audit.AUDIT_NOTE }}</h4>
                <div v-if="audit.FILES.length !== 0">
                  <a v-for="fileBean in audit.FILES" :key="fileBean.IDX" style="size:10px;color:#9A9898;" href="#" :title="fileBean.REAL_NAME" :download="fileBean.REAL_NAME" @click="downloadFile(fileBean)">{{ fileBean.REAL_NAME }}</a>
                </div>
                <p>{{ audit.LOGIN_NAME }}
                  {{ audit.END_TIME }}</p>
              </el-card>
            </el-timeline-item>
          </el-timeline>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>

</template>

<script>
import workflow from '@/api/satp/workflow/workflow'

export default {
  props: {
    procDefKey: { type: String, default: '' },
    busiId: { type: String, default: '' }
  },
  data() {
    return {
      auditList: [],
      activeNames: []
    }
  },
  created() {
    this.getAuditList()
  },
  methods: {
    // 测试获取审批记录
    getAuditList() {
      workflow.auditTrace({ 'procDefKey': this.procDefKey, 'busiId': this.busiId }).then(res => {
        // console.log(res.rows)
        this.auditList = res.rows
      }).catch(err => {
        console.log(err)
      })
    },
    downloadFile(fileBean) {
      const params = { 'realName': fileBean.REAL_NAME, 'fileUrl': fileBean.FILE_URL }
      this.$store.dispatch('base/downloadFile', params).then(response => {
      })
    },
    handleChange(val) {
      console.log(val)
    }
  }
}
</script>

<style scoped>
.el-timeline {
  margin-left: -30px;
}
</style>
