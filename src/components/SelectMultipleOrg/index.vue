<template>
  <el-dialog
    title="选择部门"
    :visible.sync="visible"
    :close-on-click-modal="false"
    :before-close="cancle"
  >
    <el-input
      v-model="filterText"
      placeholder="输入关键字进行过滤"
    />

    <el-tree
      ref="tree"
      class="filter-tree"
      :data="data"
      show-checkbox
      check-strictly
      node-key="id"
      :props="defaultProps"
      :filter-node-method="filterNode"
    />
    <div slot="footer" class="dialog-footer">
      <el-button size="small" type="text" @click="cancle()">取消</el-button>
      <el-button size="small" type="primary" @click="getOrg()">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
export default {
  props: {
    visible: { type: Boolean, default: false }
  },
  data() {
    return {
      data: [],
      filterText: '',
      defaultProps: {
        id: 'id',
        children: 'children',
        label: 'label'
      },
      currentRow: []
    }
  },

  watch: {
    filterText(val) {
      this.$refs.tree.filter(val)
    }
  },
  mounted() {
    this.listOrgs()
  },
  methods: {
    cancle() {
      this.currentRow = []
      this.$emit('update:visible', false) // 直接修改父组件的属性
    },
    listOrgs() {
      var _this = this
      this.$store.dispatch('org/list').then(resp => {
        _this.data = resp.data
      })
    },
    filterNode(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    getOrg() {
      const $self = this
      this.currentRow = this.$refs.tree.getCheckedNodes(false, true)
      if ($self.currentRow.length === 0) {
        $self.$message({
          message: `请选择部门！`,
          type: 'warning'
        })
      } else {
        this.$emit('getOrg', $self.currentRow)
        this.$emit('update:visible', false) // 直接修改父组件的属性
      }
    }
  }

}
</script>
