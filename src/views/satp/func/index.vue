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
              <el-form-item label="菜单名称">
                <el-input v-model="searchForm.funcName" placeholder="菜单名称" />
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="路径">
                <el-input v-model="searchForm.funcUrl" placeholder="路径" />
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <div class="satp-from-btngrp-std">
                <el-dropdown size="small" split-button type="primary" @click="listMenus">
                  <i class="el-icon-search" />查询
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>高级条件</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
                <el-button type="success" icon="el-icon-plus" size="small" @click="dialogVisibleAdd = true">新建功能</el-button>
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
            prop="name"
            label="菜单名称"
            sortable
            width="200"
            fit
          />
          <el-table-column
            prop="url"
            label="路径"
            sortable
            fit
          />
          <el-table-column
            prop="desc"
            label="desc"
            sortable
            fit
          />
          <el-table-column
            label="操作"
            width="200"
            fit
          >
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                icon="el-icon-plus"
                @click="addChildMenu(scope.row.id,scope.row.name)"
              >
                添加
              </el-button>
              <el-button
                type="text"
                size="small"
                icon="el-icon-edit"
                @click="editMenu(scope.row)"
              >
                编辑
              </el-button>
              <el-button
                type="text"
                size="small"
                icon="el-icon-delete"
                @click="deleteMenu(scope.row)"
              >
                移除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </div>

    <el-dialog
      title="添加功能"
      :visible.sync="dialogVisibleAdd"
      width="25%"
      @close="clear"
    >
      <el-form
        v-loading="loading"
        :model="menuForm"
        :rules="rules"
        label-position="left"
        label-width="0px"
      >
        <el-form-item prop="name">
          <el-input
            v-model="menuForm.name"
            type="text"
            auto-complete="off"
            placeholder="功能名称"
          />
        </el-form-item>
        <el-form-item prop="url">
          <el-input
            v-model="menuForm.url"
            type="text"
            auto-complete="off"
            placeholder="路径"
          />
        </el-form-item>
        <el-form-item prop="desc">
          <el-input
            v-model="menuForm.desc"
            type="text"
            auto-complete="off"
            placeholder="描述"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" type="text" @click="dialogVisibleAdd = false">取 消</el-button>
        <el-button size="small" type="primary" @click="createMenu">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog
      title="添加子功能"
      :visible.sync="dialogFormVisible"
    >
      <el-form ref="dataForm" v-model="selectedMenu" style="text-align: left">
        <el-form-item label="父功能名称" label-width="120px" prop="parentName">
          <el-input v-model="selectedMenu.parentName" autocomplete="off" />
        </el-form-item>
        <el-form-item label="功能名称" label-width="120px" prop="name">
          <el-input v-model="selectedMenu.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="路径" label-width="120px" prop="url">
          <el-input v-model="selectedMenu.url" autocomplete="off" />
        </el-form-item>
        <el-form-item label="描述" label-width="120px" prop="desc">
          <el-input v-model="selectedMenu.desc" autocomplete="off" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" type="text" @click="dialogFormVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="addOnSubmit(selectedMenu)">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog
      title="修改功能"
      :visible.sync="dialogFormVisibleEdit"
    >
      <el-form ref="dataFormEdit" v-model="selectedEditMenu" style="text-align: left">
        <el-form-item label="功能名称" label-width="120px" prop="name">
          <el-input v-model="selectedEditMenu.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="路径" label-width="120px" prop="url">
          <el-input v-model="selectedEditMenu.url" autocomplete="off" />
        </el-form-item>
        <el-form-item label="描述" label-width="120px" prop="desc">
          <el-input v-model="selectedEditMenu.desc" autocomplete="off" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" type="text" @click="dialogFormVisibleEdit = false">取 消</el-button>
        <el-button size="small" type="primary" @click="editOnSubmit(selectedEditMenu)">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'MenuInfo',
  data() {
    return {
      Height: window.innerHeight - 195,
      selectedMenu: [],
      selectedEditMenu: [],
      dialogVisibleAdd: false,
      dialogFormVisible: false,
      dialogFormVisibleEdit: false,
      tableData: [],
      rules: {
        name: [{ required: true, message: '功能名不能为空', trigger: 'blur' }]
      },
      checked: true,
      menuForm: {
        name: '',
        url: '',
        desc: ''
      },
      searchForm: {
        funcName: '',
        funcUrl: ''
      },
      loading: false
    }
  },
  created() {

  },
  mounted() {
    const that = this
    window.onresize = () => {
      return (() => {
        that.Height = window.innerHeight - 195
      })()
    }
    this.listMenus()
  },
  methods: {
    clear() {
      this.selectedMenu = {
        name: '',
        url: '',
        desc: ''
      }
    },
    clearEdit() {
      this.selectedEditMenu = {
        name: '',
        url: '',
        desc: ''
      }
    },
    addChildMenu(menuId, menuName) {
      this.dialogFormVisible = true
      this.selectedMenu.id = menuId
      this.selectedMenu.parentName = menuName
    },
    editMenu(menu) {
      this.dialogFormVisibleEdit = true
      this.selectedEditMenu = menu
    },
    listMenus() {
      var _this = this
      const params = JSON.parse(JSON.stringify(_this.searchForm))
      _this.loading = true
      this.$store.dispatch('menu/funcs', params).then(resp => {
        _this.tableData = resp.data
        _this.loading = false
      }).catch(
        _this.loading = false
      )
    },
    addOnSubmit(menu) {
      const type = 'func'
      this.$store.dispatch('menu/add', {
        parentId: menu.id,
        name: menu.name,
        url: menu.url,
        desc: menu.desc,
        type: type
      }).then(resp => {
        if (resp && resp.RET_CODE === '0') {
          this.$alert(resp.RET_INFO)
          this.clear()
          this.dialogFormVisible = false
          this.listMenus()
        }
      })
    },
    deleteMenu(menu) {
      this.$store.dispatch('menu/delete', {
        menuId: menu.id
      }).then(resp => {
        if (resp && resp.RET_CODE === '0') {
          this.$alert(resp.RET_INFO)
          this.listMenus()
        }
      })
    },
    editOnSubmit(menu) {
      // 根据视图绑定的角色 id 向后端传送角色信息
      this.$store.dispatch('menu/modify', {
        id: menu.id,
        name: menu.name,
        url: menu.url,
        desc: menu.desc
      }).then(resp => {
        if (resp && resp.RET_CODE === '0') {
          this.$alert(resp.RET_INFO)
          this.clearEdit()
          this.dialogFormVisibleEdit = false
          this.listMenus()
        }
      })
    },
    load(tree, treeNode, resolve) {
      setTimeout(() => {
        resolve()
      }, 1000)
    },
    clearAdd() {
      this.menuForm = {
        name: '',
        url: '',
        desc: ''
      }
    },
    createMenu() {
      const type = 'func'
      this.$store.dispatch('menu/add', {
        name: this.menuForm.name,
        url: this.menuForm.url,
        desc: this.menuForm.desc,
        type: type
      }).then(resp => {
        if (resp && resp.RET_CODE === '0') {
          this.$alert('注册成功', '提示', {
            confirmButtonText: '确定'
          })
          this.clearAdd()
          this.dialogVisibleAdd = false
          this.listMenus()
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
