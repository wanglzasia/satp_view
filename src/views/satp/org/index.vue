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
              <el-form-item label="部门名称">
                <el-input v-model="searchForm.orgName" placeholder="部门名称" />
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <div class="satp-from-btngrp-std">
                <el-dropdown size="small" split-button type="primary" @click="listOrg">
                  <i class="el-icon-search" />查询
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>高级条件</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
                <el-button type="success" icon="el-icon-plus" size="small" @click="dialogVisibleAdd = true">新增部门</el-button>
              </div>
            </el-col>

          </el-row>
        </el-form>
        <el-table
          :data="tableData"
          style="width: 100%;"
          row-key="id"
          :height="Height"
          border
          lazy
          :load="load"
          :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
        >
          <el-table-column
            prop="label"
            label="部门名称"
            sortable
            fit
          />
          <el-table-column
            label="操作"
            fit
          >
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                icon="el-icon-plus"
                @click="addChildOrg(scope.row.id,scope.row.label)"
              >
                添加
              </el-button>
              <el-button
                type="text"
                size="small"
                icon="el-icon-edit"
                @click="editOrg(scope.row)"
              >
                编辑
              </el-button>
              <el-button
                type="text"
                size="small"
                icon="el-icon-delete"
                @click="deleteOrg(scope.row)"
              >
                移除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </div>
    <el-dialog
      title="添加部门"
      :visible.sync="dialogVisibleAdd"
      width="25%"
      @close="clear"
    >
      <el-form
        v-loading="loading"
        :model="orgForm"
        :rules="rules"
        label-position="left"
        label-width="0px"
      >
        <el-form-item prop="name">
          <el-input
            v-model="orgForm.name"
            type="text"
            auto-complete="off"
            placeholder="部门名称"
          />
        </el-form-item>
        <el-form-item style="width: 100%">
          <el-button type="primary" style="width: 40%;background: #505458;border: none" @click="createOrg">添加</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-dialog
      title="添加子部门"
      :visible.sync="dialogFormVisible"
    >
      <el-form ref="dataForm" v-model="selectedOrg" style="text-align: left">
        <el-form-item label="父级部门名称" label-width="120px" prop="parentName">
          <el-input v-model="selectedOrg.parentName" autocomplete="off" />
        </el-form-item>
        <el-form-item label="部门名称" label-width="120px" prop="name">
          <el-input v-model="selectedOrg.name" autocomplete="off" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addOnSubmit(selectedOrg)">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog
      title="修改部门"
      :visible.sync="dialogFormVisibleEdit"
    >
      <el-form ref="dataFormEdit" v-model="selectedEditOrg" style="text-align: left">
        <el-form-item label="部门名称" label-width="120px" prop="name">
          <el-input v-model="selectedEditOrg.label" autocomplete="off" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleEdit = false">取 消</el-button>
        <el-button type="primary" @click="editOnSubmit(selectedEditOrg)">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'OrgInfo',
  data() {
    return {
      Height: window.innerHeight - 195,
      selectedOrg: [],
      selectedEditOrg: [],
      dialogVisibleAdd: false,
      dialogFormVisible: false,
      dialogFormVisibleEdit: false,
      tableData: [],
      rules: {
        name: [{ required: true, message: '部门名称不能为空', trigger: 'blur' }]
      },
      checked: true,
      orgForm: {
        name: ''
      },
      loading: false,
      searchForm: {
        orgName: ''
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
    this.listOrg()
  },
  methods: {
    clear() {
      this.selectedOrg = {
        name: ''
      }
    },
    addChildOrg(orgId, orgName) {
      this.dialogFormVisible = true
      this.selectedOrg.id = orgId
      this.selectedOrg.parentName = orgName
    },
    editOrg(org) {
      this.dialogFormVisibleEdit = true
      this.selectedEditOrg = org
    },
    listOrg() {
      var _this = this
      const params = _this.searchForm
      this.$store.dispatch('org/searchList', params).then(resp => {
        _this.tableData = resp.data
      })
    },
    addOnSubmit(org) {
      this.$store.dispatch('org/add', {
        parentId: org.id,
        name: org.name
      }).then(resp => {
        if (resp && resp.RET_CODE === '0') {
          this.$alert(resp.RET_INFO)
          this.clear()
          this.dialogFormVisible = false
          this.listOrg()
        }
      })
    },
    deleteOrg(org) {
      this.$store.dispatch('org/delete', {
        orgId: org.id
      }).then(resp => {
        if (resp && resp.RET_CODE === '0') {
          this.$alert(resp.RET_INFO)
          this.listOrg()
        }
      })
    },
    editOnSubmit(org) {
      // 根据视图绑定的角色 id 向后端传送角色信息
      this.$store.dispatch('org/modify', {
        id: org.id,
        name: org.label
      }).then(resp => {
        if (resp && resp.RET_CODE === '0') {
          this.$alert(resp.RET_INFO)
          this.dialogFormVisibleEdit = false
          this.listOrg()
        }
      })
    },
    load(tree, treeNode, resolve) {
      setTimeout(() => {
        resolve()
      }, 1000)
    },
    clearAdd() {
      this.orgForm = {
        name: ''
      }
    },
    createOrg() {
      this.$store.dispatch('org/add', {
        name: this.orgForm.name
      }).then(resp => {
        if (resp && resp.RET_CODE === '0') {
          this.$alert('注册成功', '提示', {
            confirmButtonText: '确定'
          })
          this.clearAdd()
          this.dialogVisibleAdd = false
          this.listOrg()
        } else {
          this.$alert(resp.RET_INFO, '提示', {
            confirmButtonText: '确定'
          })
        }
      })
    }
  }
}
</script>
