<template>
  <div>
    <div class="app-container">
      <div>
        <el-page-header content="不良信息详情" @back="goBack" />
        <router-view />
      </div>
      <el-card>
        <el-form
          ref="ruleForm"
          :model="formObj"
          label-width="0px"
          label-position="top"
          size="small"
          class="satp-form-label-top"
          disabled
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
                <el-input v-model="formObj.badFindtime" placeholder="业务名称" clearable />
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
              <el-form-item label="任务类型" prop="fengduTypeName">
                <el-input v-model="formObj.fengduTypeName" placeholder="业务名称" clearable />
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
                <el-input v-model="formObj.depUsername" placeholder="请选择负责人 " disabled size="small" />
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
              <el-form-item label="附件" prop="file">
                <file-upload
                  :file-list="fileList"
                />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-card>
    </div>
  </div>
</template>
<script>
import fileUpload from '@/components/fileUpload/index'
import { parseTime } from '@/utils/index.js'
export default {
  name: 'BadInfoList',
  components: { 'file-upload': fileUpload },
  data() {
    return {
      Height: window.innerHeight - 195,
      fileDatas: {
        fileType: 'badInfo',
        busiId: '1',
        busiSeg: '1',
        busiIndex: '1'
      }, // 附件上传参数
      limit: 2, // 限制附件上传个数
      fileList: [],
      formObj: {
        idx: ''
      },
      badId: ''
    }
  },
  computed: {
    tableHeight() {
      return window.innerHeight - 320
    }
  },
  created() {
    this.badId = this.$route.query.badId
  },
  mounted() {
    this.moreInfo()
  },
  methods: {
    goBack() {
      this.$router.push({ path: '/badInfo/badInfoDeal' })
    },
    cancle() {
      this.dialogFormVisible = false
      this.fileList = []
      this.formObj = {}
    },
    moreInfo() {
      this.$store.dispatch('badInfo/findBadInfo', { badId: this.badId }).then(response => {
        this.formObj = {}
        // 深克隆
        this.formObj = Object.assign({}, response.badinfoproc)
        // 附件信息，如果业务表里的附件id不存在，不会报错
        if (response.badinfoproc.fileList) {
          this.fileList = response.badinfoproc.fileList
        }
        this.formObj.badFindtime = this.dateFormatter(response.badinfoproc.badFindtime)
      })
    },
    dateFormatter(date) {
      const time = parseTime(date, '')
      return time
    },
    addBadInfo() {
      this.dialogFormVisible = true
    }
  }
}
</script>
