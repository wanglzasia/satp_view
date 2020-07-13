<template>
  <div v-loading="loading">
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
              :expand="false"
              border
              :tree-props="{children: 'children', hasChildren: 'hasChild'}"
              @operClick="menuGridClick"
              @loadSubList="loadSubList"
              @handleSwitch="handleSwitch"
              @handelRowClassName="handelRowClassName"
            />
          </el-row>
        </el-form>

      </el-card>
    </div>

    <el-dialog
      title="添加菜单"
      :visible.sync="dialogVisibleAdd"
      :close-on-click-modal="false"
      width="35%"
      @close="clear"
    >
      <el-form
        :model="menuForm"
        :rules="rules"
        label-width="0px"
        label-position="top"
        size="small"
        class="satp-form-label-top"
      >
        <el-row>
          <el-form-item prop="name" label="菜单名称">
            <el-input
              v-model="menuForm.name"
              type="text"
              auto-complete="off"
              placeholder="菜单名称"
            />
          </el-form-item>
        </el-row>

        <el-row>
          <el-form-item prop="url" label="路径">
            <el-input
              v-model="menuForm.url"
              type="text"
              auto-complete="off"
              placeholder="路径"
            />
          </el-form-item>
        </el-row>

        <el-row>
          <el-form-item v-show="false" prop="path">
            <el-input
              v-model="menuForm.path"
              type="text"
              auto-complete="off"
              placeholder="path"
            />
          </el-form-item>
        </el-row>

        <el-row>
          <el-form-item prop="component" label="组件">
            <el-input
              v-model="menuForm.component"
              type="text"
              auto-complete="off"
              placeholder="组件"
            />
          </el-form-item>
        </el-row>

        <el-row>
          <el-col :span="11">
            <el-form-item prop="icon" label="icon">
              <el-input
                v-model="menuForm.icon"
                type="text"
                auto-complete="off"
                placeholder="icon"
              />
            </el-form-item>
          </el-col>
          <el-col :span="2">&nbsp;</el-col>
          <el-col :span="11">
            <el-form-item prop="hidden" label="是否展示">
              <el-radio-group v-model="menuForm.showText" size="mini">
                <el-radio-button label="展示" />
                <el-radio-button label="不展示" />
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>

          <el-col :span="11">
            <el-form-item prop="redirect" label="重定向地址">
              <el-input
                v-model="menuForm.redirect"
                type="text"
                auto-complete="off"
                placeholder="重定向地址"
              />
            </el-form-item>
          </el-col>
          <el-col :span="2">&nbsp;</el-col>
          <el-col :span="11">
            <el-form-item prop="idx" label="排序">
              <el-input
                v-model="menuForm.idx"
                type="text"
                auto-complete="off"
                placeholder="排序"
              />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-form-item prop="desc" label="描述">
            <el-input
              v-model="menuForm.desc"
              type="text"
              auto-complete="off"
              placeholder="描述"
            />
          </el-form-item>
        </el-row>

      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" type="text" @click="dialogVisibleAdd = false">取 消</el-button>
        <el-button size="small" type="primary" @click="createMenu">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="添加子菜单"
      :visible.sync="dialogFormVisible"
      :close-on-click-modal="false"
    >
      <el-form
        ref="dataForm"
        v-model="selectedMenu"
        style="text-align: left"
        label-position="top"
        size="small"
        class="satp-form-label-top"
      >
        <el-row>
          <el-form-item label="父菜单名称" label-width="120px" prop="parentName">
            <el-input v-model="selectedMenu.parentName" autocomplete="off" />
          </el-form-item>
        </el-row>

        <el-row>
          <el-col :span="11">
            <el-form-item label="菜单名称" label-width="120px" prop="name">
              <el-input v-model="selectedMenu.name" autocomplete="off" />
            </el-form-item>
          </el-col>
          <el-col :span="2">&nbsp;</el-col>
          <el-col :span="11">
            <el-form-item label="icon" label-width="120px" prop="icon">
              <el-input v-model="selectedMenu.icon" autocomplete="off" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-form-item label="路径" label-width="120px" prop="路径">
            <el-input v-model="selectedMenu.path" autocomplete="off" />
          </el-form-item>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="组件" label-width="120px" prop="组件">
              <el-input v-model="selectedMenu.component" autocomplete="off" />
            </el-form-item>
          </el-col>
          <el-col :span="2">&nbsp;</el-col>
          <el-col :span="11">
            <el-form-item label="排序" label-width="120px" prop="排序">
              <el-input v-model="selectedMenu.idx" autocomplete="off" />
            </el-form-item>
          </el-col>
          <el-form-item v-show="false" label="路径" label-width="120px" prop="url">
            <el-input v-model="selectedMenu.url" autocomplete="off" />
          </el-form-item>
        </el-row>

        <el-row>
          <el-col :span="11">
            <el-form-item label="重定向地址" label-width="120px" prop="redirect">
              <el-input v-model="selectedMenu.redirect" autocomplete="off" />
            </el-form-item>
          </el-col>
          <el-col :span="2">&nbsp;</el-col>

          <el-col :span="11">
            <el-form-item label="是否展示" label-width="120px" prop="hidden">
              <el-radio-group v-model="selectedMenu.showText" size="mini">
                <el-radio-button label="展示" />
                <el-radio-button label="不展示" />
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-form-item label="描述" label-width="120px" prop="desc">
            <el-input v-model="selectedMenu.desc" autocomplete="off" />
          </el-form-item>
        </el-row>

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
      <el-form
        ref="dataFormEdit"
        v-model="selectedEditMenu"
        style="text-align: left"
        label-position="top"
        size="small"
        class="satp-form-label-top"
      >
        <el-row>
          <el-form-item label="菜单名称" label-width="120px" prop="name">
            <el-input v-model="selectedEditMenu.funcName" autocomplete="off" />
          </el-form-item>
          <el-form-item v-show="false" label="菜单id" label-width="120px" prop="id">
            <el-input v-model="selectedEditMenu.id" autocomplete="off" />
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item v-show="false" label="路径" label-width="120px" prop="url">
            <el-input v-model="selectedEditMenu.funcUrl" autocomplete="off" />
          </el-form-item>
        </el-row>

        <el-row>
          <el-col :span="11">
            <el-form-item label="path" label-width="120px" prop="path">
              <el-input v-model="selectedEditMenu.path" autocomplete="off" />
            </el-form-item>
          </el-col>
          <el-col :span="2">&nbsp;</el-col>
          <el-col :span="11">
            <el-form-item label="icon" label-width="120px" prop="icon">
              <el-input v-model="selectedEditMenu.funcIcon" autocomplete="off" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="11">
            <el-form-item label="组件" label-width="120px" prop="component">
              <el-input v-model="selectedEditMenu.component" autocomplete="off" />
            </el-form-item>
          </el-col>
          <el-col :span="2">&nbsp;</el-col>
          <el-col :span="11">
            <el-form-item label="排序" label-width="120px" prop="redirect">
              <el-input v-model="selectedEditMenu.idx" autocomplete="off" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="11">
            <el-form-item label="重定向地址" label-width="120px" prop="redirect">
              <el-input v-model="selectedEditMenu.redirect" autocomplete="off" />
            </el-form-item>
          </el-col>
          <el-col :span="2">&nbsp;</el-col>
          <el-col :span="11">
            <el-form-item label="是否展示" label-width="120px" prop="hidden">
              <el-radio-group v-model="selectedEditMenu.showText" size="mini">
                <el-radio-button label="展示" />
                <el-radio-button label="不展示" />
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-form-item label="描述" label-width="120px" prop="desc">
            <el-input v-model="selectedEditMenu.desc" autocomplete="off" />
          </el-form-item>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" type="text" @click="dialogFormVisibleEdit = false">取 消</el-button>
        <el-button size="small" type="primary" @click="editOnSubmit(selectedEditMenu)">确 定</el-button>
      </span>
    </el-dialog>

    <!--添加功能-->
    <el-dialog
      title="添加功能"
      :visible.sync="funcAddDlgShow"
      width="25%"
      :close-on-click-modal="false"
      @close="clear"
    >
      <el-form
        :model="funcAddForm"
        :rules="funcAddrules"
        label-width="0px"
        label-position="top"
        size="small"
        class="satp-form-label-top"
      >
        <el-form-item label="父级名称" label-width="120px" prop="parentName">
          <el-input v-model="funcAddForm.parentName" autocomplete="off" />
        </el-form-item>

        <el-form-item v-show="false" label="父级id" label-width="120px" prop="id">
          <el-input v-model="funcAddForm.id" autocomplete="off" />
        </el-form-item>

        <el-form-item prop="name" label="功能名称">
          <el-input
            v-model="funcAddForm.name"
            type="text"
            auto-complete="off"
            placeholder="功能名称"
          />
        </el-form-item>
        <el-form-item prop="url" label="路径">
          <el-input
            v-model="funcAddForm.url"
            type="text"
            auto-complete="off"
            placeholder="路径"
          />
        </el-form-item>
        <el-form-item prop="desc" label="描述">
          <el-input
            v-model="funcAddForm.desc"
            type="text"
            auto-complete="off"
            placeholder="描述"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" type="text" @click="funcAddDlgShow = false">取 消</el-button>
        <el-button size="small" type="primary" @click="createFunc">确 定</el-button>
      </div>
    </el-dialog>
    <!--修改功能-->

    <!--删除功能-->

  </div>
</template>
<script>
import treegrid from '@/components/datagrid/treegridx'

export default {
  name: 'MenuInfo',
  components: { 'satp-treegrid': treegrid },
  inject: ['reload'],
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
        showText: '展示',
        idx: '',
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
        showText: '展示',
        redirect: '',
        idx: ''

      },
      selectedEditMenu: {
        id: '',
        name: '',
        url: '',
        desc: '',
        path: '',
        icon: '',
        component: '',
        hidden: '',
        showText: '展示',
        redirect: '',
        idx: ''
      },
      // 表格属性
      menuGrid: {
        url: 'menu/menuList',
        params: { 'page': true, 'parentId': 0, 'permissionType': 'menu' },
        columns: [
          { type: 'text', label: '菜单名称', prop: 'funcName', width: 300, align: 'left' },
          { type: 'icon', label: '类型', prop: 'permissionType', width: 50, align: 'center' },
          { type: 'icon', label: '图标', prop: 'funcIcon', width: 50, align: 'center' },
          { type: 'text', label: 'path', prop: 'path', align: 'left', formatter: this.pathFormatter },
          { type: 'text', label: '组件', prop: 'component', align: 'left' },
          { type: 'text', label: '重定向', prop: 'redirect', align: 'left' },
          { type: 'switch', label: '展示', prop: 'hidden', width: 80, align: 'center', formatter: this.hideFormatter },
          { type: 'text', label: '排序', prop: 'idx', width: 50, align: 'center' },
          { type: 'action', label: '操作', align: 'center', width: 160, actions: [], formatter: this.operFormatter
          }
        ]
      },
      // 功能增加对话框
      funcAddDlgShow: false,
      funcAddForm: {
        id: '',
        parentName: '',
        name: '',
        url: '',
        desc: ''
      },
      funcAddrules: {
        name: [{ required: true, message: '功能名不能为空', trigger: 'blur' }]
      },
      gTree: '',
      gTreeNode: '',
      gResolve: ''
    }
  },
  created() {
    // this.menuGrid.params = JSON.parse(JSON.stringify(this.searchForm))
  },
  mounted() {
    const that = this
    window.onresize = () => {
      return (() => {
        that.Height = window.innerHeight - 195
      })()
    }
    // this.listMenus()
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
        showText: '展示',
        redirect: '',
        idx: ''
      }
    },
    clearEdit() {
      this.selectedMenuEdit = {
        id: '',
        name: '',
        url: '',
        desc: '',
        path: '',
        icon: '',
        component: '',
        hidden: '',
        showText: '展示',
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
        showText: '展示',
        redirect: '',
        idx: ''
      }
    },
    addChildMenu(menuId, menuName) {
      this.dialogFormVisible = true
      this.selectedMenu.id = menuId
      this.selectedMenu.parentName = menuName
    },
    editMenu(menu) {
      this.dialogFormVisibleEdit = true
      if (menu.hidden === false) {
        menu.showText = '展示'
      } else {
        menu.showText = '不展示'
      }
      this.selectedEditMenu = menu
    },
    listMenus() {
      this.$refs.menuTreeGrid.reload()
    },
    // 添加子菜单
    addOnSubmit(menu) {
      const type = 'menu'
      if (menu.showText === '展示') {
        menu.hidden = 0
      } else {
        menu.hidden = 1
      }
      this.$store.dispatch('menu/add', {
        parentId: menu.id,
        name: menu.name,
        url: '#',
        path: menu.path,
        icon: menu.icon,
        desc: menu.desc,
        component: menu.component,
        hidden: menu.hidden,
        redirect: menu.redirect,
        type: type,
        idx: menu.idx
      }).then(resp => {
        if (resp && resp.RET_CODE === '0') {
          this.$message({
            showClose: true,
            message: '操作成功',
            type: 'success'
          })
          this.clear()
          this.dialogFormVisible = false
          if (menu.id === 0) {
            this.listMenus()
          } else {
            // 菜单没展开就添加子菜单的情况 不做数据刷新
            if (this.gTree !== '') {
              this.gTree.permissionId = menu.id
              this.loadSubList(this.gTree, this.gTreeNode, this.gResolve)
            } else {
              this.listMenus()
            }
          }
        }
      })
    },
    // 删除菜单
    deleteMenu(menu) {
      this.$store.dispatch('menu/delete', {
        menuId: menu.permissionId
      }).then(resp => {
        if (resp && resp.RET_CODE === '0') {
          this.$message({
            showClose: true,
            message: resp.RET_INFO,
            type: 'success'
          })
          if (menu.parentId === 0) {
            this.listMenus()
          } else {
            this.gTree.permissionId = menu.parentId
            this.loadSubList(this.gTree, this.gTreeNode, this.gResolve)
          }
        }
      })
    },
    // 修改菜单
    editOnSubmit(menu) {
      // 根据视图绑定的角色 id 向后端传送角色信息
      if (menu.showText === '展示') {
        menu.hidden = 0
      } else {
        menu.hidden = 1
      }
      this.$store.dispatch('menu/modify', {
        id: menu.permissionId,
        name: menu.funcName,
        url: menu.funcUrl,
        path: menu.path,
        icon: menu.funcIcon,
        desc: menu.desc,
        component: menu.component,
        hidden: menu.hidden,
        redirect: menu.redirect,
        idx: menu.idx
      }).then(resp => {
        if (resp && resp.RET_CODE === '0') {
          this.$message({
            showClose: true,
            message: '操作成功',
            type: 'success'
          })
          this.dialogFormVisibleEdit = false

          if (menu.parentId === 0) {
            this.listMenus()
          } else {
            this.gTree.permissionId = menu.parentId
            this.loadSubList(this.gTree, this.gTreeNode, this.gResolve)
          }

          this.clearEdit()
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
      if (this.menuForm.showText === '展示') {
        this.menuForm.hidden = 0
      } else {
        this.menuForm.hidden = 1
      }

      this.$store.dispatch('menu/add', {
        name: this.menuForm.name,
        url: this.menuForm.url,
        path: this.menuForm.path,
        icon: this.menuForm.icon,
        desc: this.menuForm.desc,
        component: this.menuForm.component,
        hidden: this.menuForm.hidden,
        redirect: this.menuForm.redirect,
        idx: this.menuForm.idx,
        type: type
      }).then(resp => {
        if (resp && resp.RET_CODE === '0') {
          this.$message({
            showClose: true,
            message: '操作成功',
            type: 'success'
          })
          this.clearMenuForm()
          this.dialogVisibleAdd = false
          this.listMenus()
        } else {
          this.$message({
            showClose: true,
            message: resp.RET_INFO,
            type: 'error'
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
            this.$message({
              showClose: true,
              message: '已显示',
              type: 'success'
            })
          } else {
            this.$message({
              showClose: true,
              message: '已隐藏',
              type: 'success'
            })
          }
        }
      })
    },
    menuGridClick(data) {
      const { row, prop } = data
      switch (prop) {
        case 'addMenu':
          this.addChildMenu(row.permissionId, row.funcName)
          break
        case 'delMenu':
          this.deleteMenu(row)
          break
        case 'modMenu':
          this.editMenu(row)
          break
        case 'addFun':
          this.showAddFunc(row)
          break
        case 'delFun':
          this.delFunc(row)
          break
        case 'modFun':
          this.modFun(row)
          break
        default:
          break
      }
    },
    loadSubList(tree, treeNode, resolve) {
      const $self = this
      $self.gTree = tree
      $self.gTreeNode = treeNode
      $self.gResolve = resolve
      const params = { parentId: tree.permissionId, page: false }
      this.$store.dispatch($self.menuGrid.url, params).then(resp => {
        if (resp.rows.length === 0) {
          // 解决当子节点全部删除后 不刷新问题
          this.reload()
        } else {
          resolve(resp.rows)
        }
      })
    },
    operFormatter(row) {
      let actions = []
      const type = row.permissionType
      if (type === 'menu') {
        actions = [
          { title: '添加子菜单', prop: 'addMenu', type: 'text', icon: 'el-icon-menu' },
          { title: '添加功能', prop: 'addFun', type: 'text', icon: 'el-icon-set-up' },
          { title: '删除菜单', prop: 'delMenu', type: 'text', icon: 'el-icon-delete', popconfirm: '确认删除此菜单' },
          { title: '修改菜单', prop: 'modMenu', type: 'text', icon: 'el-icon-edit-outline' }
        ]
      } else if (type === 'func') {
        actions = [
          { title: '添加子功能', prop: 'addFun', type: 'text', icon: 'el-icon-set-up' },
          { title: '删除功能', prop: 'delFun', type: 'text', icon: 'el-icon-delete', popconfirm: '确认删除此功能' },
          { title: '修改功能', prop: 'modFun', type: 'text', icon: 'el-icon-edit-outline' }
        ]
      }
      return actions
    },
    pathFormatter(row) {
      const type = row.permissionType
      if (type === 'menu') {
        return row.path
      } else if (type === 'func') {
        return row.funcUrl
      }
    },
    hideFormatter(row, prop) {
      const hide = row.hidden
      if (hide === true) {
        return false
      } else {
        return true
      }
    },
    showAddFunc(row) {
      this.funcAddForm.parentName = row.funcName
      this.funcAddForm.id = row.permissionId
      this.funcAddDlgShow = true
    },
    createFunc() {
      const menu = this.funcAddForm
      const type = 'func'
      this.loading = false
      this.$store.dispatch('menu/add', {
        parentId: menu.id,
        name: menu.name,
        url: menu.url,
        desc: menu.desc,
        type: type
      }).then(resp => {
        if (resp && resp.RET_CODE === '0') {
          this.$message({
            showClose: true,
            message: resp.RET_INFO,
            type: 'success'
          })
          if (menu.id === 0) {
            this.listMenus()
          } else {
            // 菜单没展开就添加子菜单的情况 不做数据刷新
            if (this.gTree !== '') {
              this.gTree.permissionId = menu.id
              this.loadSubList(this.gTree, this.gTreeNode, this.gResolve)
            } else {
              this.listMenus()
            }
          }
          this.clear()
        }
        this.funcAddDlgShow = false
      }).catch(() => {
        this.loading = false
        this.funcAddDlgShow = false
      })
    },
    delFunc(menu) {
      this.loading = true
      this.$store.dispatch('menu/delete', {
        menuId: menu.permissionId
      }).then(resp => {
        if (resp && resp.RET_CODE === '0') {
          this.$message({
            showClose: true,
            message: resp.RET_INFO,
            type: 'success'
          })
          this.gTree.permissionId = menu.parentId
          this.loadSubList(this.gTree, this.gTreeNode, this.gResolve)
          this.loading = false
        }
      }).catch(() => {
        this.loading = false
      })
    },
    modFun() {

    },
    handleSwitch(value, data) {
      const { row, prop } = data
      row.hidden = !row.hidden
      if (prop === 'hidden') {
        this.$store.dispatch('menu/modify', {
          hidden: value,
          id: row.permissionId
        }).then(resp => {
          if (resp && resp.RET_CODE === '0') {
            if (value) {
              this.$message({
                showClose: true,
                message: '已展示',
                type: 'success'
              })
            } else {
              this.$message({
                showClose: true,
                message: '已隐藏',
                type: 'success'
              })
            }
          }
        })
      }
    },
    handelRowClassName(row, callBack) {
      const type = row.row.permissionType
      if (type === 'func') {
        callBack('menu-func')
      }
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
