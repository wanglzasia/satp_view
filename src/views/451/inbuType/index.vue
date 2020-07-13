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
              <el-form-item label="工单名称">
                <el-input v-model="searchForm.typeName" placeholder="工单名称" />
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="描述">
                <el-input v-model="searchForm.typeDesc" placeholder="描述" />
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <div class="satp-from-btngrp-std">
                <el-dropdown size="small" split-button type="primary" @click="reloadDatagrid">
                  <i class="el-icon-search" />查询
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>高级条件</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
                <el-button type="success" icon="el-icon-plus" size="small" @click="dialogVisibleAdd = true">新建类型</el-button>
              </div>
            </el-col>

          </el-row>
        </el-form>
        <satp-treegrid
          ref="inbuTypeTreeGrid"
          :url="inbuTypeGrid.url"
          row-key="inbuId"
          :qparams="inbuTypeGrid.params"
          :columns="inbuTypeGrid.columns"
          border
          :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
          @loadSubList="loadSubList"
          @operClick="inbuTypeClick"
        />
      </el-card>
    </div>

    <el-dialog
      title="添加工单类型"
      :visible.sync="dialogVisibleAdd"
      :close-on-click-modal="false"
      width="25%"
      @close="clear"
    >
      <el-form
        v-loading="loading"
        :model="inbuTypeForm"
        :rules="rules"
        label-position="left"
        label-width="0px"
      >
        <el-form-item prop="typeName">
          <el-input
            v-model="inbuTypeForm.typeName"
            type="text"
            auto-complete="off"
            placeholder="工单类型名称"
          />
        </el-form-item>
        <el-form-item prop="typeDesc">
          <el-input
            v-model="inbuTypeForm.typeDesc"
            type="text"
            auto-complete="off"
            placeholder="描述"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" type="text" @click="dialogVisibleAdd = false">取 消</el-button>
        <el-button size="small" type="primary" @click="createInbuType">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog
      title="添加子功能"
      :visible.sync="dialogFormVisible"
      :close-on-click-modal="false"
    >
      <el-form ref="dataForm" v-model="selectedinbuType" style="text-align: left">
        <el-form-item label="父工单名称" label-width="120px" prop="parentName">
          <el-input v-model="selectedinbuType.parentName" autocomplete="off" />
        </el-form-item>
        <el-form-item label="工单名称" label-width="120px" prop="typeName">
          <el-input v-model="selectedinbuType.typeName" autocomplete="off" />
        </el-form-item>
        <el-form-item label="描述" label-width="120px" prop="typeDesc">
          <el-input v-model="selectedinbuType.typeDesc" autocomplete="off" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" type="text" @click="dialogFormVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="addOnSubmit(selectedinbuType)">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog
      title="修改功能"
      :visible.sync="dialogFormVisibleEdit"
      :close-on-click-modal="false"
    >
      <el-form ref="dataFormEdit" v-model="selectedEditInbuType" style="text-align: left">
        <el-form-item label="工单名称" label-width="120px" prop="typeName">
          <el-input v-model="selectedEditInbuType.typeName" autocomplete="off" />
        </el-form-item>
        <el-form-item label="描述" label-width="120px" prop="typeDesc">
          <el-input v-model="selectedEditInbuType.typeDesc" autocomplete="off" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" type="text" @click="dialogFormVisibleEdit = false">取 消</el-button>
        <el-button size="small" type="primary" @click="editOnSubmit(selectedEditInbuType)">确 定</el-button>
      </div>
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
      selectedinbuType: [],
      selectedEditInbuType: [],
      dialogVisibleAdd: false,
      dialogFormVisible: false,
      dialogFormVisibleEdit: false,
      tableData: [],
      rules: {
        name: [{ required: true, message: '功能名不能为空', trigger: 'blur' }]
      },
      checked: true,
      inbuTypeForm: {
        typeName: '',
        typeDesc: ''
      },
      searchForm: {
        typeName: '',
        typeDesc: ''
      },
      loading: false,
      inbuTypeGrid: {
        url: 'inbu/inbuTypeList',
        params: {
          inbuId: 0,
          parentId: 0,
          typeName: '',
          typeDesc: '',
          page: 'true'
        },
        columns: [
          { label: '工单名称', prop: 'typeName', width: 300, align: 'left' },
          { label: '描述', prop: 'typeDesc', align: 'left' },
          {
            label: '操作',
            align: 'center',
            width: 300,
            actions: [
              { label: '添加子节点', prop: 'add', type: 'success', icon: 'el-icon-plus' },
              { label: '修改', prop: 'edit', type: 'primary', icon: 'el-icon-edit', popconfirm: '确认修改这条记录?' },
              { label: '删除', prop: 'delete', type: 'danger', icon: 'el-icon-delete', popconfirm: '确认删除这条记录?' }
            ]
          }
        ]
      }
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
  },
  methods: {
    clear() {
      this.selectedinbuType = {
        parentId: '',
        typeName: '',
        typeDesc: '',
        parentName: ''
      }
    },
    clearAdd() {
      this.inbuTypeForm = {
        typeName: '',
        typeDesc: ''
      }
    },
    clearEdit() {
      this.selectedEditInbuType = {
        typeName: '',
        typeDesc: ''
      }
    },
    addOnSubmit(inbuType) {
      this.$store.dispatch('inbu/inbuTypeAdd', {
        parentId: inbuType.parentId,
        typeName: inbuType.typeName,
        typeDesc: inbuType.typeDesc
      }).then(resp => {
        if (resp && resp.RET_CODE === '0') {
          this.$alert(resp.RET_INFO)
          this.clear()
          this.dialogFormVisible = false
          this.$refs['inbuTypeTreeGrid'].reload()
        }
      })
    },
    editOnSubmit(inbuType) {
      // 根据视图绑定的角色 id 向后端传送角色信息
      this.$store.dispatch('inbu/inbuTypeModify', {
        inbuId: inbuType.inbuId,
        typeName: inbuType.typeName,
        typeDesc: inbuType.typeDesc
      }).then(resp => {
        if (resp && resp.RET_CODE === '0') {
          this.$alert(resp.RET_INFO)
          this.clearEdit()
          this.dialogFormVisibleEdit = false
          this.$refs['inbuTypeTreeGrid'].reload()
        }
      })
    },
    createInbuType() {
      this.$store.dispatch('inbu/inbuTypeAdd', {
        typeName: this.inbuTypeForm.typeName,
        typeDesc: this.inbuTypeForm.typeDesc,
        parentId: 0
      }).then(resp => {
        if (resp && resp.RET_CODE === '0') {
          this.$alert('注册成功', '提示', {
            confirmButtonText: '确定'
          })
          this.clearAdd()
          this.dialogVisibleAdd = false
          this.$refs['inbuTypeTreeGrid'].reload()
        } else {
          this.$alert(resp.RET_INFO, '提示', {
            confirmButtonText: '确定'
          })
        }
      })
    },
    inbuTypeClick(data) {
      console.log('inbuTypeClick')
      const { row, prop } = data
      console.log(row)
      switch (prop) {
        case 'edit':
          this.dialogFormVisibleEdit = true
          this.selectedEditInbuType = row
          break
        case 'delete':
          this.$store.dispatch('inbu/inbuTypeDelete', {
            inbuId: row.inbuId
          }).then(resp => {
            if (resp && resp.RET_CODE === '0') {
              this.$alert(resp.RET_INFO)
              this.$refs['inbuTypeTreeGrid'].reload()
            }
          })
          break
        case 'add':
          this.dialogFormVisible = true
          this.selectedinbuType.parentId = row.inbuId
          this.selectedinbuType.parentName = row.typeName
          break
        default:
          break
      }
    },
    reloadDatagrid() {
      this.inbuTypeGrid.params.typeName = this.searchForm.typeName
      this.inbuTypeGrid.params.typeDesc = this.searchForm.typeDesc
      if (this.inbuTypeGrid.params.typeName === '' && this.inbuTypeGrid.params.typeDesc === '') {
        this.inbuTypeGrid.params.parentId = 0
      } else {
        this.inbuTypeGrid.params.parentId = null
      }

      this.$refs['inbuTypeTreeGrid'].reload()
    },
    loadSubList(tree, treeNode, resolve) {
      this.$store.dispatch('inbu/inbuTypeChildren', {
        parentId: tree.inbuId
      }).then(resp => {
        console.log(resp)
        resolve(resp)
      })
    }
  }
}
</script>
