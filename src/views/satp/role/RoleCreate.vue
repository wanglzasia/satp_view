<template>
  <div style="text-align: left">
    <el-button style="margin: 18px 2%;" class="add-button" type="primary" @click="dialogFormVisible = true">添加角色</el-button>
    <el-dialog
      title="添加角色"
      :visible.sync="dialogFormVisible"
      width="25%"
      @close="clear"
    >
      <el-form
        v-loading="loading"
        :model="roleForm"
        :rules="rules"
        label-position="left"
        label-width="0px"
      >
        <el-form-item prop="roleName">
          <el-input
            v-model="roleForm.roleName"
            type="text"
            auto-complete="off"
            placeholder="角色名"
          />
        </el-form-item>
        <el-form-item prop="roleCode">
          <el-input
            v-model="roleForm.roleCode"
            type="text"
            auto-complete="off"
            placeholder="角色编码"
          />
        </el-form-item>
        <el-form-item prop="desc">
          <el-input
            v-model="roleForm.desc"
            type="text"
            auto-complete="off"
            placeholder="角色描述"
          />
        </el-form-item>
        <el-form-item label="菜单配置" label-width="120px" prop="menus">
          <el-tree
            ref="menuTree"
            :data="menus"
            :props="props"
            show-checkbox
            node-key="id"
          />
        </el-form-item>
        <el-form-item style="width: 100%">
          <el-button type="primary" style="width: 40%;background: #505458;border: none" @click="createRole">添加</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'RoleCreate',
  data() {
    return {
      dialogFormVisible: false,
      rules: {
        roleName: [{ required: true, message: '角色名不能为空', trigger: 'blur' }]
      },
      checked: true,
      roleForm: {
        roleName: '',
        roleCode: '',
        desc: ''
      },
      menus: [],
      loading: false,
      props: {
        id: 'id',
        label: 'name',
        children: 'children'
      },
      searchForm: {
        funcName: '',
        funcUrl: '',
        path: '',
        component: ''
      }
    }
  },
  mounted() {
    this.listMenus()
  },
  methods: {
    clear() {
      this.roleForm = {
        roleName: '',
        roleCode: '',
        desc: '',
        menus: []
      }
    },
    listMenus() {
      var _this = this
      const params = JSON.parse(JSON.stringify(_this.searchForm))
      this.$store.dispatch('role/menus', params).then(resp => {
        _this.menus = resp.data
      })
    },
    createRole() {
      // 用getCheckedNodes方法获得半选节点
      const checkIds = this.$refs.menuTree.getCheckedNodes(false, true)
      this.$store.dispatch('role/add', {
        roleName: this.roleForm.roleName,
        roleCode: this.roleForm.roleCode,
        desc: this.roleForm.desc,
        checkIds: checkIds
      }).then(resp => {
        if (resp.RET_CODE === '0') {
          this.$alert('注册成功', '提示', {
            confirmButtonText: '确定'
          })
          this.clear()
          this.$emit('onSubmit')
        } else {
          this.clear()
          this.$alert(resp.RET_INFO, '提示', {
            confirmButtonText: '确定'
          })
        }
      })
        .catch(failResponse => {})
      this.dialogFormVisible = false
    }
  }
}
</script>

<style scoped>
  .add-button {
    margin: 18px 0 0 10px;
  }
</style>
