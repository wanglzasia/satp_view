<template>
  <div>
    <el-card class="box-card">
      <div>
        <el-page-header content="编辑资产" @back="goBack" />
        <router-view />
      </div>
      <div style="margin-top: 5px;">
        <el-card shadow="never">
          <div style="padding: 0px 15px 15px 15px;">
            <el-row>
              <el-col :span="12">
                <h3><span class="satp-div-titles">编辑</span></h3>
              </el-col>
            </el-row>
          </div>
          <el-form ref="formObj" :rules="formRules" label-width="95px" :model="formObj" @submit.native.prevent>
            <el-row>
              <el-col :span="8">
                <el-form-item label="资产类型" prop="assetType">
                  <el-cascader
                    v-model="formObj.assetType"
                    :options="assetTypeTreeData"
                    :show-all-levels="false"
                    :props="{ value: 'value',checkStrictly: true }"
                    clearable
                    filterable
                    @change="getAssetTypeChecked"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="资产名称" prop="assetName">
                  <el-input v-model="formObj.assetName" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="逻辑地址" prop="logicAddr">
                  <el-input v-model="formObj.logicAddr" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="安全责任人" prop="secAdmName">
                  <el-input v-model="formObj.secAdmName" placeholder="请选择安全责任人" :readonly="true" size="small">
                    <el-button slot="append" icon="el-icon-search" @click="getSafetyUsr()" />
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="所属机构" prop="orgName">
                  <el-input v-model="formObj.orgName" placeholder="所属机构" :readonly="true" size="small">
                    <el-button slot="append" icon="el-icon-search" @click="selectOrgVisible = true" />
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="IPV6:">
                  <el-input v-model="formObj.ipv6" />
                </el-form-item>
              </el-col>
            </el-row>

          </el-form>
        </el-card>
        <el-row style="margin-top:15px;">
          <el-col align="center">
            <el-button type="text" size="small" @click="goBack">返 回</el-button>
            <el-button type="primary" size="small" :loading="savebutton" @click="saveForm()">确 定</el-button>
          </el-col>
        </el-row>
      </div>
    </el-card>
    <user-window
      v-if="userWindowVisible"
      :title="title"
      :parent-component-param="parentComponentParam"
      :multiple="multiple"
      :visible.sync="userWindowVisible"
      :modal-append-to-body="false"
      @getUserInfo="getUserInfo"
    />
    <select-org
      v-if="selectOrgVisible"
      :visible.sync="selectOrgVisible"
      @getOrg="getOrgInfo"
    />
  </div>
</template>
<script>
import UserInfo from '@/components/Userwindow/index.vue'
import SelectOrg from '@/components/SelectOrg/index'
export default {
  components: {
    // eslint-disable-next-line vue/no-unused-components
    'user-window': UserInfo,
    'select-org': SelectOrg
  },
  data() {
    return {
      formObj: {
        assetId: '',
        assetType: '',
        assetName: '',
        logicAddr: '',
        secAdmName: '',
        secAdm: '',
        orgId: '',
        orgName: '',
        ipv6: ''
      },
      formRules: {
        assetType: [
          { required: true, message: '请填写必填项', trigger: 'change' }
        ],
        assetName: [
          { required: true, message: '请填写必填项', trigger: 'blur' }
        ],
        logicAddr: [
          { required: true, message: '请填写必填项', trigger: 'blur' }
        ]
        // file:[
        //     { required: true, message: "请上传文件"}
        // ],
      },
      title: '',
      assetTypeTreeData: [],
      loadingTree: false,
      userWindowVisible: false,
      multiple: false, // 默认false 单选;
      parentComponentParam: {},
      selectOrgVisible: false,
      savebutton: false
    }
  },
  created() {
    this.formObj.assetId = this.$route.query.assetId
    this.getAssetTypeTree()
  },
  methods: {
    goBack() {
      this.$router.push({
        path: '/system/asset/asset',
        query: {
        }
      })
    },
    getAsset() {
      this.$store.dispatch('asset/getOneAsset', this.formObj).then(response => {
        this.formObj = response.asset
      })
    },
    getAssetTypeTree() {
      const $self = this
      $self.loadingTree = true
      const params = {}
      $self.$store.dispatch('asset/getAssetTypeTree', params).then(response => {
        $self.assetTypeTreeData = response.treeList
        $self.loadingTree = false
        this.getAsset()
      })
    },
    getAssetTypeChecked(arr) {
      window.console.info(arr)
      this.formObj.assetType = arr[arr.length - 1]
    },
    getSafetyUsr() { // 调弹窗时可修改参数
      this.userWindowVisible = true
      this.parentComponentParam.title = '请选择安全管理员'
      this.multiple = false// true 为复选
    },
    getUserInfo(data, parentComponentParam) { // 确定选择用户方法 单选时data 传的对象;复选传的数组
      const $self = this
      $self.formObj.secAdmName = data.userName
      $self.formObj.secAdm = data.userId
      // $self.dataRootUserInfo=data;
    },
    getOrgInfo(data) {
      window.console.info(data)
      this.formObj.orgId = data.id
      this.formObj.orgName = data.label
    },
    saveForm() {
      this.$refs['formObj'].validate((valid) => {
        this.savebutton = true
        this.$store.dispatch('asset/updateAsset', this.formObj).then(response => {
          if (response.RET_CODE === '0') {
            this.assetVisible = false
            this.$message({
              type: 'success',
              message: '操作成功'
            })
          }
          this.savebutton = false
          this.goBack()
        }).catch(() => {
          this.savebutton = false
        })
      })
    }
  }
}
</script>
