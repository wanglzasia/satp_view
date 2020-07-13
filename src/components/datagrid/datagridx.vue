<template>
  <div v-loading="dataGridLoading" class="satp-el-datagrid">
    <div v-if="title" class="satp-grid-title">{{ title }}</div>

    <template v-if="toolbar.length>0">
      <div class="satp-grid-toolbar">
        <el-button-group>
          <el-button
            v-for="(tool, toolIdx) in toolbar"
            :key="toolIdx"
            :size="tool.size || 'small'"
            :type="tool.type"
            :icon="tool.icon"
            :disabled="tool.usableAfterSelect && selectRows.length == 0"
            @click="toolbarClick(selectRows, tool.prop)"
          >{{ tool.label }}
          </el-button>
        </el-button-group>
      </div>
    </template>

    <div ref="satpdatagrid">
      <el-table
        :data="tableData"
        class="satp-grid"
        :height="myHeight"
        :stripe="stripe"
        :border="border"
        :row-key="rowkey"
        @row-click="rowClick"
        @selection-change="selectRowsChange"
      >
        <!-- 多选框 -->
        <el-table-column v-if="checkbox" type="selection" />
        <!-- 序号 -->
        <el-table-column
          v-if="idx"
          type="index"
          :index="index"
          show-overflow-tooltip
        />

        <template v-for="(item, colIdx) in columns">

          <!-- 内容列 -->
          <el-table-column
            v-if="item.type==='text'"
            :key="colIdx"
            :label="item.label"
            :width="item.width"
            :min-width="item.minWidth"
            :prop="item.prop"
            :align="item.align"
            :formatter="item.formatter"
            show-overflow-tooltip
          />
          <!--进度条-->
          <el-table-column
            v-else-if="item.type==='progress'"
            :key="colIdx"
            :label="item.label"
            :width="item.width"
            :min-width="item.minWidth"
            :prop="item.prop"
            :align="item.align"
            :formatter="item.formatter"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <el-progress :text-inside="true" :stroke-width="14" :percentage="scope.row[item.prop]" status="success" />
            </template>
          </el-table-column>

          <!--模板 template-->
          <el-table-column
            v-else-if="item.type==='tmpl'"
            :key="colIdx"
            :label="item.label"
            :prop="item.prop"
            :width="item.width"
            :min-width="item.minWidth"
            :align="item.align"
            :text="item.text"
            :formatter="item.formatter"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <div v-html="item.formatter(scope.row)" />
            </template>
          </el-table-column>

          <!--switch-->
          <el-table-column
            v-else-if="item.type==='switch'"
            :key="colIdx"
            :label="item.label"
            :prop="item.prop"
            :width="item.width"
            :min-width="item.minWidth"
            :align="item.align"
            :text="item.text"
            :formatter="item.formatter"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <template v-if="item.formatter">
                <el-switch
                  :value="item.formatter(scope.row,item.prop)"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  @change="handleSwitch($event,scope.row,item.prop)"
                />
              </template>
              <template v-else>
                <el-switch
                  :value="scope.row[item.prop]"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  @change="handleSwitch($event,scope.row,item.prop)"
                />
              </template>
            </template>
          </el-table-column>

          <!--icon-->
          <el-table-column
            v-else-if="item.type==='icon'"
            :key="colIdx"
            :label="item.label"
            :prop="item.prop"
            :width="item.width"
            :min-width="item.minWidth"
            :align="item.align"
            :text="item.text"
            :formatter="item.formatter"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <template v-if="scope.row[item.prop]">
                <svg-icon :icon-class="scope.row[item.prop]" />
              </template>
              <template v-else>
                {{ scope.row[item.prop] }}
              </template>
            </template>
          </el-table-column>

          <!-- 操作按钮列 静态配置-->
          <!--按钮列-->
          <el-table-column
            v-else-if="item.type==='action' && !item.formatter"
            :key="colIdx"
            :label="item.label"
            :min-width="item.minWidth"
            :width="item.width"
            :align="item.align"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <template v-for="(action, actIdx) in item.actions">
                <template v-if="action.popconfirm">
                  <el-popconfirm :key="actIdx" :title="action.popconfirm" @onConfirm="operClick(scope.row, action.prop)">
                    <el-button
                      slot="reference"
                      :size="action.size || 'small'"
                      :type="action.type"
                      :icon="action.icon"
                      :title="action.title"
                      :class="action.class"
                    >
                      <template v-if="action.link">
                        {{ scope.row[action.link] }}
                      </template>
                      <template v-else>
                        {{ action.label }}
                      </template>
                    </el-button>
                    <template />
                  </el-popconfirm>
                </template>
                <template v-else>
                  <el-button
                    :key="actIdx"
                    :size="action.size || 'small'"
                    :type="action.type"
                    :icon="action.icon"
                    :title="action.title"
                    :class="action.class"
                    @click="operClick(scope.row, action.prop)"
                  >
                    <template v-if="action.link">
                      {{ scope.row[action.link] }}
                    </template>
                    <template v-else>
                      {{ action.label }}
                    </template>
                  </el-button>
                </template>
              </template>
            </template>
          </el-table-column>

          <!-- 操作按钮列 根据formatter获取-->
          <el-table-column
            v-else-if="item.type==='action' && item.formatter"
            :key="colIdx"
            :label="item.label"
            :min-width="item.minWidth"
            :width="item.width"
            :align="item.align"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <template v-for="(action, actIdx) in item.formatter(scope.row)">
                <template v-if="action.popconfirm">
                  <el-popconfirm :key="actIdx" :title="action.popconfirm" @onConfirm="operClick(scope.row, action.prop)">
                    <el-button
                      slot="reference"
                      :size="action.size || 'small'"
                      :type="action.type"
                      :icon="action.icon"
                      :title="action.title"
                      :class="action.class"
                    >
                      <template v-if="action.link">
                        {{ scope.row[action.link] }}
                      </template>
                      <template v-else>
                        {{ action.label }}
                      </template>
                    </el-button>
                    <template />
                  </el-popconfirm>
                </template>
                <template v-else>
                  <el-button
                    :key="actIdx"
                    :size="action.size || 'small'"
                    :type="action.type"
                    :icon="action.icon"
                    :title="action.title"
                    :class="action.class"
                    @click="operClick(scope.row, action.prop)"
                  >
                    <template v-if="action.link">
                      {{ scope.row[action.link] }}
                    </template>
                    <template v-else>
                      {{ action.label }}
                    </template>
                  </el-button>
                </template>
              </template>
            </template>
          </el-table-column>
        </template>
      </el-table>

      <div class="satp-pagination-container">
        <!-- 分页工具 -->
        <el-pagination
          layout="total, sizes, prev, pager, next, jumper"
          :page-sizes="pageSizes"
          :page-size="pageSize"
          :current-page="currentPage"
          :total="total"
          @size-change="pageSizeChange"
          @current-change="currentPageChange"
        />
      </div>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    url: { type: String, default: '' },
    qparams: { type: Object, default() { return {} } },
    columns: { type: Array, default() { return [] } },
    checkbox: { type: Boolean, default: false },
    stripe: { type: Boolean, default: false },
    border: { type: Boolean, default: true },
    toolbar: { type: Array, default() { return [] } },
    buttombar: { type: Array, default() { return [] } },
    pagesizes: { type: Array, default() { return [10, 20, 50, 100] } },
    idx: { type: Boolean, default: false },
    height: { type: Number, default: 0 },
    title: { type: String, default: '' },
    visible: { type: Boolean, default: true },
    tabledata: { type: Array, default() { return [] } },
    rowkey: { type: String, default: '' },
    reservesel: { type: Boolean, default: false }
  },

  data() {
    return {
      boxTop: 70,
      myHeight: this.height === 0 ? window.innerHeight - 215 : this.height,
      selectRows: [],
      currentPage: 1,
      pageSizes: this.pagesizes,
      pageSize: this.pagesizes[0],
      total: 0,
      index: 0,
      dataGridLoading: false,
      tableData: []
    }
  },
  mounted() {
    // this.monitoring() // 注册监听事件
    this.loadData()

    if (this.height === 0) {
      this.boxTop = this.$refs.satpdatagrid.getBoundingClientRect().top + 75
      window.onresize = () => {
        return (() => {
          this.myHeight = window.innerHeight - this.boxTop
        })()
      }
    }
  },
  methods: {
    loadData() {
      this.queryData(this.url, this.qparams)
    },
    queryData(url, params) {
      const $self = this
      if (url !== '') {
        // $self.qparams.pageNum = $self.currentPage
        // $self.qparams.pageSize = $self.pageSize
        params.pageNum = $self.currentPage
        params.pageSize = $self.pageSize
        $self.dataGridLoading = true

        this.$store.dispatch(url, params).then(resp => {
          $self.tableData = resp.rows
          $self.total = resp.total
          // 撤销loading 遮罩
          $self.dataGridLoading = false
          this.index = (this.currentPage - 1) * this.pageSize + 1
        }).catch(
        // 撤销loading 遮罩
          $self.dataGridLoading = false
        )
      } else {
        $self.tableData = this.tabledata
        $self.total = this.tabledata.length
        this.index = (this.currentPage - 1) * this.pageSize + 1
      }
    },
    operClick(row, prop) {
      this.$emit('operClick', { row, prop })
    },
    rowClick(row, column, event) {
      // this.$emit('rowClick', { row, column, event })
    },
    selectRowsChange(rows) {
      this.selectRows = rows
    },
    toolbarClick(rows, prop) {
      this.$emit('toolbarClick', { rows, prop })
    },
    pageSizeChange(pageSize) {
      this.pageSize = pageSize
      this.loadData()
    },
    currentPageChange(currentPage) {
      this.currentPage = currentPage
      this.loadData()
    },
    // 刷新重载数据
    reload() {
      this.loadData()
    },
    // 改变参数重新查询
    query(params) {
      this.currentPage = 1
      this.queryData(this.url, params)
    },
    // 改变url params重新查询
    reQuery(url, params) {
      this.currentPage = 1
      this.queryData(url, params)
    },
    monitoring() { // 监听事件
      this.$on('getSelectRows', (res) => {
        console.log('方法1:触发监听事件监听成功')
        console.log(res)
      })
    },
    getSelectRows() {
      return this.selectRows
    },
    setTableData(data) {
      this.tableData = data
      this.total = this.tableData.length
      this.index = (this.currentPage - 1) * this.pageSize + 1
    }
  }
}
</script>
