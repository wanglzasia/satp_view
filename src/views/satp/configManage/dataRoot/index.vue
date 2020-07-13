<template>
  <div class="custom-tree-container">

    <el-form ref="form" :model="form" label-width="80px">

      <div class="radius">
        <div
          style="padding: 15px 15px;
              text-align: left;
              font-size: 20px;
              font-weight: 700;"
        >
          <el-row>
            <el-col :span="12">
              <span class="data_root_titles">数据权限</span>
            </el-col>
          </el-row>
        </div>
        <div style="padding:25px;">
          <el-form-item label="选择用户">
            <el-input v-model="formObj.dataRootUserName" placeholder="请选择用户 " :disabled="true" size="small">
              <el-button slot="append" icon="el-icon-search" @click="getDataRootUser()" />
            </el-input>
            <el-input v-model="formObj.dataRootUserId" type="hidden" />
          </el-form-item>
          <el-form-item label="选择资产">
            <el-input v-model="formObj.dataRootAssetName" placeholder="请选择资产 " :disabled="true" size="small">
              <el-button slot="append" icon="el-icon-search" @click="getDataRootAsset()" />
            </el-input>
          </el-form-item>
          <el-form-item label="权限类型">
            <el-select v-model="dataRootValue" placeholder="请选择" @change="dataRootChange">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </div>
      </div>
    </el-form>
    <user-window
      v-if="userWindowVisible"
      :title="title"
      :parent-component-param="parentComponentParam"
      :multiple="multiple"
      :visible.sync="userWindowVisible"
      :modal-append-to-body="false"
      @getUserInfo="getUserInfo"
    />

    <asset-window
      v-if="assetWindowVisible"
      :title="title"
      :parent-component-param="parentComponentParam"
      :multiple="assetMultiple"
      :visible.sync="assetWindowVisible"
      :modal-append-to-body="false"
      @getAssetInfo="getAssetInfo"
    />
    <component :is="tempData.component" :user-info="dataRootUserInfo" />
  </div>
</template>
<script>
import UserInfo from '@/components/Userwindow/index.vue'
import AssetInfo from '@/components/Assetwindow/index.vue'
export default {
  components: { 'user-window': UserInfo, 'asset-window': AssetInfo },
  data() {
    return {
      options: [
        { value: 'RptViewSet', label: '视图配置' }
      ],
      dataRootValue: '',
      formObj: {
        dataRootUserName: '',
        dataRootUserId: '',
        dataRootAssetName: '',
        dataRootAssetId: ''
      },
      form: {

      },
      tempData: {},
      dataRootUserInfo: {},
      dataRootAssetInfo: {},
      userWindowVisible: false,
      assetWindowVisible: false,
      parentComponentParam: {}, // 向子组件传递自定义参数对象
      multiple: false, // 默认false 单选;
      assetMultiple: false, // 默认false 单选;
      title: '请选择用户'// 弹出框标题
    }
  },
  created() {
  },
  mounted() {},
  methods: {
    getUserInfo(data, parentComponentParam) { // 确定选择用户方法 单选时data 传的对象;复选传的数组
      const $self = this
      $self.formObj.dataRootUserName = data.userName
      $self.formObj.dataRootUserId = data.userId
      $self.dataRootUserInfo = data
      // $self.formApplyObj.safetyMgr = data.staff_id;
      // $self.formApplyObj.safetyMgrName = data.user_name;
      // this.userInfoData=data;
    },
    getAssetInfo(data, parentComponentParam) { // 确定选择用户方法 单选时data 传的对象;复选传的数组
      const $self = this
      window.console.info('assetdata')
      window.console.info(data)
      $self.formObj.dataRootAssetName = data.assetName
      $self.formObj.dataRootAssetId = data.assetId
      $self.dataRootAssetInfo = data
      // $self.formApplyObj.safetyMgr = data.staff_id;
      // $self.formApplyObj.safetyMgrName = data.user_name;
      // this.userInfoData=data;
    },
    getDataRootAsset() {
      this.assetWindowVisible = true
      this.assetMultiple = true
    },
    getDataRootUser() { // 调弹窗时可修改参数
      this.userWindowVisible = true
      this.parentComponentParam.flag1 = 'test'
      this.parentComponentParam.title = '选择设置视图用户'
      this.multiple = false// true 为复选
    },
    dataRootChange(value) {
      const $self = this
      if (value !== '' && $self.dataRootUserInfo.userName === undefined) {
        $self.$message({
          message: '请选择用户！',
          type: 'warning'
        })
      } else if (value === 'RptViewSet') { // 权限类型
        var myComponent = () => import('./' + value + '.vue')
        this.tempData = {
          userInfo: $self.dataRootUserInfo,
          component: myComponent
        }
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.el-header, .el-footer {
    background-color: rgb(221, 219, 255);
    color: #333;
    text-align: center;
    line-height: 60px;
}

.el-aside {
/* background-color: #D3DCE6;
color: #333; */
text-align: center;
line-height: 200px;
}

.el-main {
/* background-color: #E9EEF3;
color: #333; */
text-align: center;
line-height: 160px;
}

body > .el-container {
margin-bottom: 100px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
line-height: 320px;
}

.custom-tree-container {
  position: relative;
  height: 100%;
  -webkit-perspective: 1500;
  -moz-perspective: 1500;
  padding:12px;
  .cards {
      margin-top: 20px;
    // height: 100%;
    transition: all 1s;
    backface-visibility: hidden;
    transform: rotateY(0deg);
    background: #f9f9f9;
    .medium {
      border-bottom: 1px solid #ededed;
      overflow: hidden;
    }
  }
  .detailSqu{
      min-height: 30px;
      display: none;
      background:#ededed
  }
  .listmeun {
    position: absolute;
    top: 0px;
    left: 0px;
    bottom: 0px;
    right: 0px;
    transition: all 1s;
    backface-visibility: hidden;
    background: #f9f9f9;
    transform: rotateY(180deg);
    .singlecharts {
      width: 100%;
      height: 350px;
      border-top: 1px solid #ccc;
    }
    ul {
      padding: 10px;
      overflow: hidden;
      li {
        width: 160px;
        height: 120px;
        float: left;
        margin: 5px;
        background: #f2f2f2;
        position: relative;
        span {
          display: inline-block;
          position: absolute;
          bottom: 0px;
          width: 100%;
          height: 30px;
          left: 0px;
          line-height: 30px;
          background: #a9a9a9;
          color: #fff;
        }
      }
      li.active {
        span {
          background: #8fc320;
        }
      }
    }
  }
}

.el-card__header{
  padding: 8px 10px;
  text-align: left;
  font-size: 16px;
  font-weight: 700;
}
.el-card__body{
  padding: 10px;
}

.radius {
    min-height: 60px;
    width: 50%;
    border: 1px solid #d7dae2;
    border-radius: 2px;
    margin-top: 20px;
}

.radius_100 {
    min-height: 60px;
    width: 100%;
    border: 1px solid #d7dae2;
    border-radius: 2px;
    margin-top: 20px;
}

.data_root_titles{
  line-height: 32px;
  float: left;
}
.data_root_titles:before{
  content:"";
  width: 4px;
  height: 25px;
  background-color: rgb(26, 111, 190);
  float: left;
  margin: 5px 5px 0px -5px;
}
</style>
