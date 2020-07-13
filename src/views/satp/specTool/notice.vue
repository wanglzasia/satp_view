<template>
  <div>
    <div class="app-container">
      <el-card :style="{padding:'10px 200px 10px 200px'}">
        <div>
          <el-form ref="ruleForm" :model="formObj" label-width="100px" @submit.native.prevent>
            <el-row>
              <el-col :span="12">
                <el-form-item label="工具名称" prop="toolName">
                  <el-input v-model="formObj.toolName" disabled />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="工具类型" prop="toolType">
                  <el-select v-model="formObj.toolType" :style="{width: '100%'}" disabled>
                    <el-option
                      v-for="(item, index) in toolTypeOptions"
                      :key="index"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="工具有效期" prop="effectDate">
                  <el-date-picker
                    v-model="formObj.effectDate"
                    disabled
                    type="datetime"
                    :style="{width: '100%'}"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="发布人" prop="publicUser">
                  <div>
                    <el-input v-model="formObj.publicUserName" disabled />
                  </div>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="使用模式" prop="publicUser">
                  <el-select v-model="formObj.toolMode" :style="{width: '100%'}" disabled>
                    <el-option
                      v-for="(item, index) in toolModeOptions"
                      :key="index"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="任务执行类" prop="execClass">
                  <el-input v-model="formObj.execClass" disabled />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="执行命令" prop="command">
                  <el-input v-model="formObj.command" disabled />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="工具简介" prop="toolInfo">
                  <el-input
                    v-model="formObj.toolInfo"
                    disabled
                    type="textarea"
                    :rows="3"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="使用范围" prop="toolScop">
                  <el-input
                    v-model="formObj.toolScop"
                    disabled
                    type="textarea"
                    :rows="3"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="工具备注" prop="toolNote">
                  <el-input
                    v-model="formObj.toolNote"
                    disabled
                    type="textarea"
                    :rows="3"
                  />
                </el-form-item>
              </el-col>

              <div>
                <el-row v-for="file in fileList" :key="file.idx">
                  <el-link type="primary" @click.native.prevent="downloadFile(file)">{{ file.realName }}</el-link>
                </el-row>
              </div>
            </el-row>

          </el-form>
          <span slot="footer" class="dialog-footer" style="padding-left:50%">
            <el-button type="text" @click="returnWf()">取 消</el-button>
            <el-button type="primary" :loading="loading" @click="noticeResult()">确 定</el-button>
          </span>
        </div>

      </el-card>
    </div>
  </div>

</template>
<script>
export default {
  name: 'SpecToolList',
  props: [],
  data() {
    return {
      formObj: {},
      fileList: [],
      loading: false,
      toolTypeOptions: [
        {
          'label': '漏洞验证类',
          'value': '1'
        }, {
          'label': '测评类',
          'value': '2'
        }, {
          'label': '性能测试类',
          'value': '3'
        }, {
          'label': '安全测评类',
          'value': '4'
        }
      ],
      toolModeOptions: [{
        'label': '在线使用',
        'value': 1
      }, {
        'label': '离线使用',
        'value': 2
      }]
    }
  },
  computed: {},
  watch: {},
  created() {
    const noticeId = this.$route.query.busiId

    this.$store.dispatch('specTool/findSpecTool', { noticeId: noticeId }).then(response => {
      this.formObj = response.specTool
      this.fileList = response.fileList
    }).catch(() => {})
  },
  mounted() {},
  methods: {
    downloadFile(file) {
      const params = { realName: file.name, fileUrl: file.url }
      this.$store.dispatch('base/downloadFile', params).then(response => {
      })
    },
    noticeResult() {
      this.loading = true
      const params = { taskId: this.$route.query.taskId, busiId: this.$route.query.busiId }
      this.$store.dispatch('specTool/noticeResult', params).then(response => {
        this.loading = false
        this.$router.push({ path: '/system/workflow/busiTaskList' })
      })
    },
    returnWf() {
      this.$router.push({ path: '/system/workflow/busiTaskList' })
    }
  }

}
</script>

<style lang="scss" scoped>

</style>
