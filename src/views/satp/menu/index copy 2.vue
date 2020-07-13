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
            <el-col :span="5">
              <el-form-item label="path">
                <el-input v-model="searchForm.path" placeholder="path" />
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="component">
                <el-input v-model="searchForm.component" placeholder="component" />
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <div class="satp-from-btngrp-std">
                <el-button type="primary" icon="el-icon-search" size="small" @click="listMenus">查询</el-button>
                <el-button type="success" icon="el-icon-plus" size="small" @click="dialogVisibleAdd = true">新建菜单</el-button>
              </div>
            </el-col>
            <satp-treegrid
              ref="menuTreeGrid"
              :url="menuGrid.url"
              row-key="permissionId"
              :qparams="menuGrid.params"
              :columns="menuGrid.columns"
              border
              :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
              @operClick="menuGridClick"
              @loadSubList="loadSubList"
            />
          </el-row>
        </el-form>

      </el-card>
    </div>

    <el-dialog
      title="添加菜单"
      :visible.sync="dialogVisibleAdd"
      :close-on-click-modal="false"
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
            placeholder="菜单名称"
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
        <el-form-item prop="path">
          <el-input
            v-model="menuForm.path"
            type="text"
            auto-complete="off"
            placeholder="path"
          />
        </el-form-item>
        <el-form-item prop="icon">
          <el-input
            v-model="menuForm.icon"
            type="text"
            auto-complete="off"
            placeholder="icon"
          />
        </el-form-item>
        <el-form-item prop="component">
          <el-input
            v-model="menuForm.component"
            type="text"
            auto-complete="off"
            placeholder="component"
          />
        </el-form-item>
        <el-form-item prop="hidden">
          <el-select v-model="menuForm.hidden" placeholder="请选择是否展示">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item prop="redirect">
          <el-input
            v-model="menuForm.redirect"
            type="text"
            auto-complete="off"
            placeholder="重定向地址"
          />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" type="text" @click="dialogFormVisibleAdd = false">取 消</el-button>
        <el-button size="small" type="primary" @click="createMenu">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="添加子菜单"
      :visible.sync="dialogFormVisible"
      :close-on-click-modal="false"
    >
      <el-form ref="dataForm" v-model="selectedMenu" style="text-align: left">
        <el-form-item label="父菜单名称" label-width="120px" prop="parentName">
          <el-input v-model="selectedMenu.parentName" autocomplete="off" />
        </el-form-item>
        <el-form-item label="菜单名称" label-width="120px" prop="name">
          <el-input v-model="selectedMenu.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="路径" label-width="120px" prop="url">
          <el-input v-model="selectedMenu.url" autocomplete="off" />
        </el-form-item>
        <el-form-item label="path" label-width="120px" prop="path">
          <el-input v-model="selectedMenu.path" autocomplete="off" />
        </el-form-item>
        <el-form-item label="icon" label-width="120px" prop="icon">
          <el-input v-model="selectedMenu.icon" autocomplete="off" />
        </el-form-item>
        <el-form-item label="描述" label-width="120px" prop="desc">
          <el-input v-model="selectedMenu.desc" autocomplete="off" />
        </el-form-item>
        <el-form-item label="component" label-width="120px" prop="component">
          <el-input v-model="selectedMenu.component" autocomplete="off" />
        </el-form-item>
        <el-form-item label="是否展示" label-width="120px" prop="hidden">
          <el-select v-model="selectedMenu.hidden" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="重定向地址" label-width="120px" prop="redirect">
          <el-input v-model="selectedMenu.redirect" autocomplete="off" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" type="text" @click="dialogFormVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="addOnSubmit(selectedMenu)">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="修改菜单"
      :visible.sync="dialogFormVisibleEdit"
      :close-on-click-modal="false"
    >
      <el-form ref="dataFormEdit" v-model="selectedEditMenu" style="text-align: left">
        <el-form-item label="菜单名称" label-width="120px" prop="name">
          <el-input v-model="selectedEditMenu.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="路径" label-width="120px" prop="url">
          <el-input v-model="selectedEditMenu.url" autocomplete="off" />
        </el-form-item>
        <el-form-item label="path" label-width="120px" prop="path">
          <el-input v-model="selectedEditMenu.path" autocomplete="off" />
        </el-form-item>
        <el-form-item label="icon" label-width="120px" prop="icon">
          <el-input v-model="selectedEditMenu.icon" autocomplete="off" />
        </el-form-item>
        <el-form-item label="描述" label-width="120px" prop="desc">
          <el-input v-model="selectedEditMenu.desc" autocomplete="off" />
        </el-form-item>
        <el-form-item label="component" label-width="120px" prop="component">
          <el-input v-model="selectedEditMenu.component" autocomplete="off" />
        </el-form-item>
        <el-form-item label="重定向地址" label-width="120px" prop="redirect">
          <el-input v-model="selectedEditMenu.redirect" autocomplete="off" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" type="text" @click="dialogFormVisibleEdit = false">取 消</el-button>
        <el-button size="small" type="primary" @click="editOnSubmit(selectedEditMenu)">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import treegrid from '@/components/datagrid/treegrid'

export default {
  name: 'MenuInfo',
  components: { 'satp-treegrid': treegrid },
  data() {
    return {
      Height: window.innerHeight - 195,
      dialogVisibleAdd: false,
      dialogFormVisible: false,
      dialogFormVisibleEdit: false,
      rules: {
        name: [{ required: true, message: '菜单名不能为空', trigger: 'blur' }]
      },
      loading: false,
      tableData: [],
      searchForm: {
        funcName: '',
        funcUrl: '',
        path: '',
        component: ''
      },
      menuForm: {
        name: '',
        url: '',
        desc: '',
        path: '',
        icon: '',
        component: '',
        hidden: '',
        redirect: ''
      },
      selectedMenu: {
        name: '',
        url: '',
        desc: '',
        path: '',
        icon: '',
        component: '',
        hidden: '',
        redirect: ''
      },
      selectedEditMenu: {
        name: '',
        url: '',
        desc: '',
        path: '',
        icon: '',
        component: '',
        hidden: '',
        redirect: ''
      },
      options: [{
        value: '0',
        label: '展示'
      }, {
        value: '1',
        label: '不展示'
      }],
      // 表格属性
      menuGrid: {
        url: 'role/menuList',
        params: [],
        columns: [
          { label: '菜单名称', prop: 'funcName', width: 300, align: 'left' }
        ]
      }
    }
  },
  created() {
    this.menuGrid.params = JSON.parse(JSON.stringify(this.searchForm))
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
        desc: '',
        path: '',
        icon: '',
        component: '',
        hidden: '',
        redirect: ''
      }
    },
    clearEdit() {
      this.selectedMenuEdit = {
        name: '',
        url: '',
        desc: '',
        path: '',
        icon: '',
        component: '',
        hidden: '',
        redirect: ''
      }
    },
    clearMenuForm() {
      this.menuForm = {
        name: '',
        url: '',
        desc: '',
        path: '',
        icon: '',
        component: '',
        hidden: '',
        redirect: ''
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
      /*
      const $self = this
      const params = JSON.parse(JSON.stringify($self.searchForm))
      $self.loading = true
      this.$store.dispatch('role/menus', params).then(resp => {
        $self.tableData = resp.data
        $self.loading = false
      }).catch(
        $self.loading = false
      )
      */
    },
    addOnSubmit(menu) {
      const type = 'menu'
      this.$store.dispatch('menu/add', {
        parentId: menu.id,
        name: menu.name,
        url: menu.url,
        path: menu.path,
        icon: menu.icon,
        desc: menu.desc,
        component: menu.component,
        hidden: menu.hidden,
        redirect: menu.redirect,
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
        path: menu.path,
        icon: menu.icon,
        desc: menu.desc,
        component: menu.component,
        hidden: menu.hidden,
        redirect: menu.redirect
      }).then(resp => {
        if (resp && resp.RET_CODE === '0') {
          this.$alert(resp.RET_INFO)
          this.clearEdit()
          this.dialogFormVisibleEdit = false
          this.listMenus()
        }
      })
    },
    /*
    load(tree, treeNode, resolve) {
      setTimeout(() => {
        resolve()
      }, 1000)
    },*/
    createMenu() {
      const type = 'menu'
      this.$store.dispatch('menu/add', {
        name: this.menuForm.name,
        url: this.menuForm.url,
        path: this.menuForm.path,
        icon: this.menuForm.icon,
        desc: this.menuForm.desc,
        component: this.menuForm.component,
        hidden: this.menuForm.hidden,
        redirect: this.menuForm.redirect,
        type: type
      }).then(resp => {
        if (resp && resp.RET_CODE === '0') {
          this.$alert('保存成功', '提示', {
            confirmButtonText: '确定'
          })
          this.clearMenuForm()
          this.dialogVisibleAdd = false
          this.listMenus()
        } else {
          this.$alert(resp.RET_INFO, '提示', {
            confirmButtonText: '确定'
          })
        }
      })
    },
    commitStatusChange(value, menu) {
      this.$store.dispatch('menu/modify', {
        hidden: value,
        id: menu.id
      }).then(resp => {
        if (resp && resp.RET_CODE === '0') {
          if (value) {
            this.$message('已展示')
          } else {
            this.$message('已隐藏')
          }
        }
      })
    },
    menuGridClick() {

    },
    loadSubList() {

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
