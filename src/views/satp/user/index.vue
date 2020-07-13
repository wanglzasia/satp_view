<template>
  <div>
    <div class="app-container">
      <el-card>
        <el-form
          :model="searchForm"
          label-position="left"
          label-width="70px"
          size="small"
          class="satp-form-inline"
        >
          <el-row>
            <el-col :span="5">
              <el-form-item label="用户名称">
                <el-input v-model="searchForm.userName" placeholder="用户名称" />
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="用户账号">
                <el-input v-model="searchForm.loginNo" placeholder="用户账号" />
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="部门">
                <el-select :value="valueTitleSearch" :clearable="clearable" placeholder="部门" @clear="clearHandleSearch">
                  <el-option :value="valueTitleSearch" :label="valueTitleSearch">
                    <el-tree
                      id="tree-option"
                      ref="selectTree"
                      :accordion="accordion"
                      :data="orgs"
                      :props="props"
                      :node-key="props.id"
                      :default-expanded-keys="defaultExpandedKey"
                      @node-click="handleNodeClickSearch"
                    />
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="手机号">
                <el-input v-model="searchForm.phone" placeholder="手机号" />
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <div class="satp-from-btngrp-std">
                <el-dropdown size="small" split-button type="primary" @click="listUsers">
                  <i class="el-icon-search" />查询
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>高级条件</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
                <el-button type="success" icon="el-icon-plus" size="small" @click="userAdd">新增用户</el-button>
              </div>
            </el-col>

          </el-row>
        </el-form>

        <el-table
          ref="multipleTable"
          :data="users"
          stripe
          border
          :default-sort="{prop: 'id', order: 'ascending'}"
          style="width: 100%"
          :height="Height"
          @selection-change="handleSelectionChange"
        >
          <el-table-column
            type="selection"
            width="55"
          />
          <el-table-column
            prop="userId"
            label="id"
            sortable
            width="100"
          />
          <el-table-column
            prop="loginNo"
            label="用户名"
            width="100"
          />
          <el-table-column
            prop="userName"
            label="真实姓名"
            fit
          />
          <el-table-column
            prop="orgName"
            label="部门"
            fit
          />
          <el-table-column
            prop="phone"
            label="手机号"
            fit
          />
          <el-table-column
            prop="eMail"
            label="邮箱"
            show-overflow-tooltip
            fit
          />
          <el-table-column
            label="状态"
            width="100"
          >
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.isActive"
                active-color="#13ce66"
                inactive-color="#ff4949"
                @change="(value) => commitStatusChange(value, scope.row)"
              />
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            width="180"
            fit
          >
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                icon="el-icon-edit"
                @click="editUser(scope.row)"
              >
                编辑
              </el-button>
              <el-button
                type="text"
                size="small"
                icon="el-icon-delete"
                @click="deleteUser(scope.row)"
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
        <div style="margin: 20px 0 20px 0;float: left">
          <el-button size="small" type="text" @click="toggleSelection()">取消选择</el-button>
          <el-button size="small" type="primary" @click="deleteManyUsers()">批量删除</el-button>
        </div>
      </el-card>
    </div>

    <el-dialog
      title="添加用户"
      :visible.sync="dialogVisibleAdd"
      width="25%"
      @close="clear"
    >
      <el-form
        :model="loginForm"
        :rules="rules"
        label-position="left"
        label-width="0px"
      >
        <el-form-item prop="loginNo">
          <el-input
            v-model="loginForm.loginNo"
            type="text"
            auto-complete="off"
            placeholder="账号"
          />
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            type="password"
            auto-complete="off"
            placeholder="密码"
          />
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="loginForm.userName"
            type="text"
            auto-complete="off"
            placeholder="真实姓名"
          />
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="loginForm.phone"
            type="text"
            auto-complete="off"
            placeholder="电话号码"
          />
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="loginForm.eMail"
            type="text"
            auto-complete="off"
            placeholder="E-Mail"
          />
        </el-form-item>
        <el-form-item>
          <el-select :value="valueTitle" :clearable="clearable" placeholder="部门配置,请选择" @clear="clearHandle">
            <el-option :value="valueTitle" :label="valueTitle">
              <el-tree
                id="tree-option"
                ref="selectTree"
                :accordion="accordion"
                :data="orgs"
                :props="props"
                :node-key="props.id"
                :default-expanded-keys="defaultExpandedKey"
                @node-click="handleNodeClick"
              />
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="角色分配" label-width="120px" prop="roles">
          <el-checkbox-group v-model="selectedRolesIds">
            <el-checkbox v-for="(role,i) in roles" :key="i" :label="role.roleId">{{ role.roleName }}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" type="text" @click="dialogVisibleAdd = false">取 消</el-button>
        <el-button size="small" type="primary" @click="register">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog
      title="修改用户信息"
      :visible.sync="dialogFormVisible"
    >
      <el-form ref="dataForm" v-model="selectedUser" style="text-align: left">
        <el-form-item label="用户名" label-width="120px" prop="loginNo">
          <label>{{ selectedUser.loginNo }}</label>
        </el-form-item>
        <el-form-item label="真实姓名" label-width="120px" prop="userName">
          <el-input v-model="selectedUser.userName" autocomplete="off" />
        </el-form-item>
        <el-form-item label="手机号" label-width="120px" prop="phone">
          <el-input v-model="selectedUser.phone" autocomplete="off" />
        </el-form-item>
        <el-form-item label="邮箱" label-width="120px" prop="eMail">
          <el-input v-model="selectedUser.eMail" autocomplete="off" />
        </el-form-item>
        <el-form-item label="密码" label-width="120px" prop="password">
          <el-button type="warning" @click="resetPassword(selectedUser)">重置密码</el-button>
        </el-form-item>
        <el-form-item label="部门配置" label-width="120px" prop="orgs">
          <el-select :value="valueTitle" :clearable="clearable" @clear="clearHandle">
            <el-option :value="valueTitle" :label="valueTitle">
              <el-tree
                id="tree-option"
                ref="selectTree"
                :accordion="accordion"
                :data="orgs"
                :props="props"
                :node-key="props.id"
                :default-expanded-keys="defaultExpandedKey"
                @node-click="handleNodeClick"
              />
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="角色分配" label-width="120px" prop="roles">
          <el-checkbox-group v-model="selectedRolesIds">
            <el-checkbox v-for="(role,i) in roles" :key="i" :label="role.roleId">{{ role.roleName }}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" type="text" @click="dialogFormVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="onSubmit(selectedUser)">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'UserProfile',
  props: {
    /* 选项列表数据(树形结构的对象数组) */
    options: {
      type: Array,
      default: () => { return [] }
    },
    /* 可清空选项 */
    clearable: {
      type: Boolean,
      default: () => { return true }
    },
    /* 自动收起 */
    accordion: {
      type: Boolean,
      default: () => { return false }
    }
  },

  data() {
    return {
      Height: window.innerHeight - 195,
      elePagination: {
        // 右侧分页参数
        total: 0,
        pageNum: 1, // 当前页
        pageSize: 10 // 每页个数
      },
      users: [],
      roles: [],
      orgs: [],
      dialogFormVisible: false,
      dialogVisibleAdd: false,
      selectedUser: [],
      selectedRolesIds: [],
      multipleSelection: [],
      rules: {
        loginNo: [{ required: true, message: '用户名不能为空', trigger: 'blur' }],
        password: [{ required: true, message: '密码不能为空', trigger: 'blur' }]
      },
      loginForm: {
        loginNo: '',
        password: '',
        userName: '',
        phone: '',
        eMail: ''
      },
      props: {
        id: 'id',
        label: 'label',
        children: 'children'
      },
      valueId: '', // 初始值
      valueTitle: '',
      valueIdSearch: '', // 初始值
      valueTitleSearch: '',
      defaultExpandedKey: [],
      searchForm: {
        userName: '',
        loginNo: '',
        phone: ''
      }
    }
  },
  mounted() {
    const that = this
    window.onresize = () => {
      return (() => {
        that.Height = window.innerHeight - 195
      })()
    }
    this.listUsers()
    this.listRoles()
    this.listOrgs()
  },
  methods: {
    userAdd() {
      this.dialogVisibleAdd = true
      this.selectedRolesIds = []
      this.valueId = ''
      this.valueTitle = ''
    },
    listUsers() {
      var _this = this
      const params = JSON.parse(JSON.stringify(_this.searchForm))
      params.pageNum = this.elePagination.pageNum
      params.pageSize = this.elePagination.pageSize
      params.orgId = this.valueIdSearch
      this.$store.dispatch('user/userList', params).then(resp => {
        _this.users = resp.rows
        _this.elePagination.total = resp.total
      })
    },
    listRoles() {
      var _this = this
      this.$store.dispatch('user/role').then(resp => {
        _this.roles = resp.data
      })
    },
    listOrgs() {
      var _this = this
      this.$store.dispatch('org/list').then(resp => {
        _this.orgs = resp.data
      })
    },
    commitStatusChange(value, user) {
      if (user.loginNo !== 'admin') {
        this.$store.dispatch('user/status', {
          enabled: value,
          userId: user.userId
        }).then(resp => {
          if (resp && resp.RET_CODE === '0') {
            if (value) {
              this.$message('用户 [' + user.loginNo + '] 已启用')
            } else {
              this.$message('用户 [' + user.loginNo + '] 已禁用')
            }
          }
        })
      } else {
        user.isActive = true
        this.$alert('不能禁用管理员账户')
      }
    },
    onSubmit(user) {
      const _this = this
      // 根据视图绑定的角色 id 向后端传送角色信息
      const roles = []
      for (let i = 0; i < _this.selectedRolesIds.length; i++) {
        for (let j = 0; j < _this.roles.length; j++) {
          if (_this.selectedRolesIds[i] === _this.roles[j].roleId) {
            roles.push(_this.roles[j])
          }
        }
      }
      const orgId = this.valueId
      this.$store.dispatch('user/modify', {
        userId: user.userId,
        loginNo: user.loginNo,
        userName: user.userName,
        phone: user.phone,
        eMail: user.eMail,
        orgId: orgId,
        roles: roles
      }).then(resp => {
        if (resp && resp.RET_CODE === '0') {
          this.$alert('用户信息修改成功')
          this.dialogFormVisible = false
          // 修改角色后重新请求用户信息，实现视图更新
          this.listUsers()
        }
      })
    },
    editUser(user) {
      this.dialogFormVisible = true
      this.selectedUser = user
      const roleIds = []
      for (let i = 0; i < user.userRoles.length; i++) {
        roleIds.push(user.userRoles[i].roleId)
      }
      this.selectedRolesIds = roleIds
      this.valueTitle = user.orgName
      this.valueId = user.orgId
    },
    deleteUser(user) {
      this.selectedUser = user
      this.$store.dispatch('user/remove', {
        userId: user.userId
      }).then(resp => {
        if (resp && resp.RET_CODE === '0') {
          this.$alert('用户删除成功')
          this.listUsers()
        }
      })
    },
    resetPassword(userInfo) {
      this.$store.dispatch('user/password', {
        userId: userInfo.userId
      }).then(resp => {
        if (resp && resp.RET_CODE === '0') {
          this.$alert('密码已重置为 111111')
        }
      })
    },
    toggleSelection() {
      this.$refs.multipleTable.clearSelection()
    },
    deleteManyUsers() {
      if (this.multipleSelection.length === 0) {
        this.$message({
          message: '请至少勾选一项，再进行操作',
          type: 'warning'
        })
      } else {
        const users = this.multipleSelection
        this.$store.dispatch('user/removeUsers', {
          users: users
        }).then(resp => {
          if (resp && resp.RET_CODE === '0') {
            this.$alert('用户批量删除成功')
            this.listUsers()
          }
        })
      }
    },
    clear() {
      this.loginForm = {
        loginNo: '',
        password: '',
        userName: '',
        phone: '',
        eMail: ''
      }
      this.selectedRolesIds = []
    },
    register() {
      const _this = this
      const roles = []
      for (let i = 0; i < _this.selectedRolesIds.length; i++) {
        for (let j = 0; j < _this.roles.length; j++) {
          if (_this.selectedRolesIds[i] === _this.roles[j].roleId) {
            roles.push(_this.roles[j])
          }
        }
      }
      this.$store.dispatch('user/add', {
        loginNo: this.loginForm.loginNo,
        password: this.loginForm.password,
        userName: this.loginForm.userName,
        phone: this.loginForm.phone,
        eMail: this.loginForm.eMail,
        orgId: this.valueId,
        roles: roles
      }).then(resp => {
        if (resp.RET_CODE === '0') {
          this.$alert('注册成功', '提示', {
            confirmButtonText: '确定'
          })
          this.clear()
          this.listUsers()
          this.dialogVisibleAdd = false
        } else {
          this.$alert(resp.RET_INFO, '提示', {
            confirmButtonText: '确定'
          })
        }
      })
        .catch(failResponse => {})
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    // 改变当前页页码
    handleCurrentChange(val) {
      this.elePagination.pageNum = val
      this.listUsers()
    },
    // 改变当前页显示条数
    handleSizeChange(val) {
      this.elePagination.pageSize = val
      this.listUsers()
    },
    // 切换选项
    handleNodeClick(node) {
      this.valueTitle = node[this.props.label]
      this.valueId = node[this.props.id]
      this.$emit('getValue', this.valueId)
      this.defaultExpandedKey = []
    },
    // 清除选中
    clearHandle() {
      this.valueTitle = ''
      this.valueId = ''
      this.defaultExpandedKey = []
      this.clearSelected()
      this.$emit('getValue', null)
    },
    // 切换选项
    handleNodeClickSearch(node) {
      this.valueTitleSearch = node[this.props.label]
      this.valueIdSearch = node[this.props.id]
      this.$emit('getValue', this.valueIdSearch)
      this.defaultExpandedKey = []
    },
    // 清除选中
    clearHandleSearch() {
      this.valueTitleSearch = ''
      this.valueIdSearch = ''
      this.defaultExpandedKey = []
      this.clearSelected()
      this.$emit('getValue', null)
    },
    /* 清空选中样式 */
    clearSelected() {
      const allNode = document.querySelectorAll('#tree-option .el-tree-node')
      allNode.forEach((element) => element.classList.remove('is-current'))
    }
  }
}
</script>

<style scoped>
.el-scrollbar .el-scrollbar__view .el-select-dropdown__item{
    height: auto;
    max-height: 274px;
    padding: 0;
    overflow: hidden;
    overflow-y: auto;
  }
  .el-select-dropdown__item.selected{
    font-weight: normal;
  }
  ul li >>>.el-tree .el-tree-node__content{
    height:auto;
    padding: 0 20px;
  }
  .el-tree-node__label{
    font-weight: normal;
  }
  .el-tree >>>.is-current .el-tree-node__label{
    color: #409EFF;
    font-weight: 700;
  }
  .el-tree >>>.is-current .el-tree-node__children .el-tree-node__label{
    color:#606266;
    font-weight: normal;
  }
</style>
