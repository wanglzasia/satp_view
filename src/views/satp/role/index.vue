<template>
  <div>
    <el-dialog
      title="修改角色信息"
      :visible.sync="dialogFormVisible"
    >
      <el-form ref="dataForm" v-model="selectedRole" style="text-align: left">
        <el-form-item label="角色名" label-width="120px" prop="roleName">
          <el-input v-model="selectedRole.roleName" autocomplete="off" />
        </el-form-item>
        <el-form-item label="角色描述" label-width="120px" prop="desc">
          <el-input v-model="selectedRole.desc" autocomplete="off" />
        </el-form-item>
        <el-form-item label="菜单配置" label-width="120px" prop="menus">
          <el-tree
            ref="menuTree"
            :data="menus"
            :props="props"
            show-checkbox
            :default-checked-keys="selectedMenusIds"
            node-key="id"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit(selectedRole)">确 定</el-button>
      </div>
    </el-dialog>
    <role-create @onSubmit="listRoles()" />
    <el-card style="margin: 18px 2%;width: 95%">
      <el-table
        :data="roles"
        stripe
        :height="Height"
        style="width: 100%"
        :max-height="tableHeight"
      >
        <el-table-column
          prop="roleId"
          label="id"
          width="100"
        />
        <el-table-column
          prop="roleName"
          label="角色名"
          fit
        />
        <el-table-column
          prop="roleCode"
          label="角色编码"
          fit
        />
        <el-table-column
          prop="desc"
          label="角色描述"
          fit
        />
        <el-table-column
          label="操作"
          width="180"
        >
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              icon="el-icon-edit"
              @click="editRole(scope.row)"
            >
              编辑
            </el-button>
            <el-button
              type="text"
              size="small"
              icon="el-icon-delete"
              @click="deleteRole(scope.row)"
            >
              移除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="satp-pagination-container">
        <el-pagination
          :current-page="elePagination.pageNum"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="elePagination.pageSize"
          layout="total, sizes, prev, pager, next,jumper"
          :total="elePagination.total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-card>
  </div>
</template>

<script>
import RoleCreate from './RoleCreate'
export default {
  name: 'UserRole',
  components: { RoleCreate },
  data() {
    return {
      Height: window.innerHeight - 195,
      elePagination: {
        // 右侧分页参数
        total: 0,
        pageNum: 1, // 当前页
        pageSize: 10 // 每页个数
      },
      dialogFormVisible: false,
      roles: [],
      menus: [],
      selectedRole: [],
      selectedMenusIds: [],
      selectedFuncIds: [],
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
  computed: {
    tableHeight() {
      return window.innerHeight - 320
    }
  },
  mounted() {
    const that = this
    window.onresize = () => {
      return (() => {
        that.Height = window.innerHeight - 195
      })()
    }
    this.listRoles()
    this.listMenus()
  },
  methods: {
    listRoles() {
      var _this = this
      const params = {}
      params.pageNum = this.elePagination.pageNum
      params.pageSize = this.elePagination.pageSize
      this.$store.dispatch('role/roleList', params).then(resp => {
        _this.roles = resp.rows
        _this.elePagination.total = resp.total
      })
    },
    listMenus() {
      var _this = this
      const params = JSON.parse(JSON.stringify(_this.searchForm))
      this.$store.dispatch('role/menus', params).then(resp => {
        _this.menus = resp.data
      })
    },
    editRole(role) {
      this.dialogFormVisible = true
      this.selectedRole = role
      const menuIds = []
      for (let i = 0; i < role.menus.length; i++) {
        menuIds.push(role.menus[i].permissionId)
      }
      this.selectedMenusIds = menuIds
      // 判断树是否已经加载，第一次打开对话框前树不存在，会报错。所以需要设置 default-checked
      if (this.$refs.menuTree) {
        this.$refs.menuTree.setCheckedKeys(menuIds)
      }
    },
    deleteRole(role) {
      this.$store.dispatch('role/delete', {
        roleId: role.roleId
      }).then(resp => {
        if (resp && resp.RET_CODE === '0') {
          this.$alert(resp.RET_INFO)
          this.dialogFormVisible = false
          this.listRoles()
        }
      })
    },
    onSubmit(role) {
      // 根据视图绑定的角色 id 向后端传送角色信息
      // 用getCheckedNodes方法获得半选节点
      this.$store.dispatch('role/modify', {
        roleId: role.roleId,
        roleName: role.roleName,
        desc: role.desc,
        menusIds: this.$refs.menuTree.getCheckedNodes(false, true)
      }).then(resp => {
        if (resp && resp.RET_CODE === '0') {
          this.$alert(resp.RET_INFO)
          this.dialogFormVisible = false
          this.listRoles()
        }
      })
    },
    // 改变当前页页码
    handleCurrentChange(val) {
      this.elePagination.pageNum = val
      this.listRoles()
    },
    // 改变当前页显示条数
    handleSizeChange(val) {
      this.elePagination.pageSize = val
      this.listRoles()
    }
  }
}
</script>

<style scoped>
  .add-button {
    float: left;
    margin: 18px 0 18px 10px;
  }
</style>
