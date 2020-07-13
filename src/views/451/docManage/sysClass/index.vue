<template>
  <div>
    <el-dialog
      title="添加子类型"
      :visible.sync="dialogFormVisible"
    >
      <el-form ref="dataForm" v-model="selectedFileType" style="text-align: left">
        <el-form-item label="父类型名称" label-width="120px" prop="parentName">
          <el-input v-model="selectedFileType.parentName" autocomplete="off" />
        </el-form-item>
        <el-form-item label="文档目录名称" label-width="120px" prop="fileTypeName">
          <el-input v-model="selectedFileType.fileTypeName" autocomplete="off" />
        </el-form-item>
        <el-form-item label="文档代码" label-width="120px" prop="fileTypeCode">
          <el-input v-model="selectedFileType.fileTypeCode" autocomplete="off" />
        </el-form-item>
        <el-form-item label="文档描述" label-width="120px" prop="fileTypeDesc">
          <el-input v-model="selectedFileType.fileTypeDesc" autocomplete="off" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addOnSubmit(selectedFileType)">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog
      title="修改文档目录"
      :visible.sync="dialogFormVisibleEdit"
    >
      <el-form ref="dataFormEdit" v-model="selectedEditFileType" style="text-align: left">
        <el-form-item label="文档目录名称" label-width="120px" prop="fileTypeName">
          <el-input v-model="selectedEditFileType.fileTypeName" autocomplete="off" />
        </el-form-item>
        <el-form-item label="文档代码" label-width="120px" prop="fileTypeCode">
          <el-input v-model="selectedEditFileType.fileTypeCode" autocomplete="off" />
        </el-form-item>
        <el-form-item label="文档描述" label-width="120px" prop="fileTypeDesc">
          <el-input v-model="selectedEditFileType.fileTypeDesc" autocomplete="off" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleEdit = false">取 消</el-button>
        <el-button type="primary" @click="editOnSubmit(selectedEditFileType)">确 定</el-button>
      </div>
    </el-dialog>
    <class-create @onSubmit="listFileTypes()" />
    <el-card style="margin: 18px 2%;width: 95%">
      <el-table
        :data="tableData"
        style="width: 100%;margin-bottom: 20px;"
        row-key="id"
        border
        lazy
        :load="load"
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      >
        <el-table-column
          prop="fileTypeName"
          label="文档目录名称"
          sortable
          width="220"
          fit
        />
        <el-table-column
          prop="createUserName"
          label="创建人"
          sortable
          width="220"
        />
        <el-table-column
          prop="fileTypeDesc"
          label="描述"
          sortable
          width="180"
        />
        <el-table-column
          label="操作"
          width="250"
        >
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              icon="el-icon-plus"
              @click="addChildFileType(scope.row.id,scope.row.fileTypeName)"
            >
              添加
            </el-button>
            <el-button
              type="text"
              size="small"
              icon="el-icon-edit"
              @click="editFileType(scope.row)"
            >
              编辑
            </el-button>
            <el-button
              type="text"
              size="small"
              icon="el-icon-delete"
              @click="deleteFileType(scope.row)"
            >
              移除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
<script>
import ClassCreate from './ClassCreate'
export default {
  name: 'FileTypeInfo',
  components: { ClassCreate },
  data() {
    return {
      selectedFileType: [],
      selectedEditFileType: [],
      dialogFormVisible: false,
      dialogFormVisibleEdit: false,
      tableData: []
    }
  },
  mounted() {
    this.listFileTypes()
  },
  methods: {
    clear() {
      this.selectedFileType = {
        fileTypeName: '',
        fileTypeCode: '',
        fileTypeDesc: ''
      }
    },
    addChildFileType(id, fileTypeName) {
      this.dialogFormVisible = true
      this.selectedFileType.id = id
      this.selectedFileType.parentName = fileTypeName
    },
    editFileType(fileType) {
      this.dialogFormVisibleEdit = true
      this.selectedEditFileType = fileType
    },
    listFileTypes() {
      var _this = this
      this.$store.dispatch('docManage/listFileTypes').then(resp => {
        _this.tableData = resp.data
      })
    },
    addOnSubmit(fileType) {
      this.$store.dispatch('docManage/fileTypeAdd', {
        pFileTypeId: fileType.id,
        fileTypeName: fileType.fileTypeName,
        fileTypeCode: fileType.fileTypeCode,
        fileTypeDesc: fileType.fileTypeDesc
      }).then(resp => {
        if (resp && resp.RET_CODE === '0') {
          this.$alert(resp.RET_INFO)
          this.clear()
          this.dialogFormVisible = false
          this.listFileTypes()
        }
      })
    },
    deleteFileType(fileType) {
      this.$store.dispatch('docManage/fileTypeDelete', {
        id: fileType.id
      }).then(resp => {
        if (resp && resp.RET_CODE === '0') {
          this.$alert(resp.RET_INFO)
          this.listFileTypes()
        }
      })
    },
    editOnSubmit(fileType) {
      // 根据视图绑定的角色 id 向后端传送角色信息
      this.$store.dispatch('docManage/fileTypeModify', {
        id: fileType.id,
        fileTypeName: fileType.fileTypeName,
        fileTypeCode: fileType.fileTypeCode,
        fileTypeDesc: fileType.fileTypeDesc
      }).then(resp => {
        if (resp && resp.RET_CODE === '0') {
          this.$alert(resp.RET_INFO)
          this.dialogFormVisibleEdit = false
          this.listFileTypes()
        }
      })
    },
    load(tree, treeNode, resolve) {
      setTimeout(() => {
        resolve()
      }, 1000)
    }
  }
}
</script>
