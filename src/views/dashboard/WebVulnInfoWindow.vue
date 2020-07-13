<template>
    <el-dialog
        :title="probInfoTitle"
        :visible.sync="visible"
        width="80%"
        :before-close="modalClose"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        :append-to-body="true">

        <el-form label-width="100px">
          <el-row style="padding-right:20px;">
            <el-col :span="8">
              <el-form-item label="资产名称 ">
                <el-input  placeholder="资产名称 " v-model="queryArgs.assetName" size="small"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="URL ">
                <el-input  placeholder="URL " v-model="queryArgs.logicAddr" size="small"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="资产类型 ">
                <el-cascader
                 :options="assetTypeOptions"
                 :show-all-levels="false"
                 @change="getAssetTypeChecked"
                 :props="{ checkStrictly: true }"
                 clearable></el-cascader>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row style="padding-right:20px;">
            <el-col :span="8">
              <el-form-item label="漏洞名称 ">
                <el-input  placeholder="漏洞名称 " v-model="queryArgs.vulnTitle" size="small"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="漏洞级别">
                <el-select v-model="queryArgs.riskLevel" placeholder="请选择">
                  <el-option
                    v-for="item in riskLevelOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row style="padding-right:20px;">
            <el-col :span="24" align="right">
              <el-button-group style="margin-right:40px;">
                <el-button type="primary" icon="el-icon-search" size="small" @click="searchData()">查询</el-button>
                <el-button size="small" icon="el-icon-close" @click="cleanSearchParm()">重置</el-button>
              </el-button-group>
            </el-col>
          </el-row>
        </el-form>

        <div style="margin-top:10px">
            <el-table
            v-loading="loading"
            class="elTable"
            element-loading-text="拼命加载中"
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(185, 185, 185, 0.1)"
            :data="tableData"
            max-height="250"
            stripe
            style="width: 100%"
            >
                <el-table-column v-for="thead in tableThead" :key="thead.id" :prop="thead.field" :label="thead.text" min-width="150">
                  <template slot-scope="scope">
                    <span v-if="thead.fieldType=='datetime'">{{ datetimeFormat(scope.row[thead.field],scope.row.format) }}</span>
                    <span v-if="thead.fieldType=='text'">{{ scope.row[thead.field] }}</span>
                  </template>
                </el-table-column>
            </el-table>
            <div style="margin-top:10px">
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
        </div>
        
        <div slot="footer" class="dialog-footer">
            <el-button  @click="cancel()">取消</el-button>
        </div>
    </el-dialog>
</template>

<script>
export default {
    data(){
        return{
            loading: true,
            probInfoTitle:'',
            title:'',
            tableThead: [//漏洞明细
                { 'id': '1', 'field': 'logicAddr', 'fieldType': 'text', 'text': 'URL', 'align': 'left' },
                { 'id': '2', 'field': 'assetTypeLabel', 'fieldType': 'text', 'text': '资产类型', 'align': 'left' },
                { 'id': '3', 'field': 'assetName', 'fieldType': 'text', 'text': '资产名称', 'align': 'left' },
                { 'id': '4', 'field': 'cveId', 'fieldType': 'text', 'text': 'CVEID', 'align': 'left' },
                { 'id': '5', 'field': 'vulnTitle', 'fieldType': 'text', 'text': '漏洞名称', 'align': 'left' },
                { 'id': '6', 'field': 'riskLevelLabel', 'fieldType': 'text', 'text': '漏洞级别', 'align': 'left' },
                { 'id': '7', 'field': 'vendor', 'fieldType': 'text', 'text': '扫描工具厂商', 'align': 'left' },
                { 'id': '8', 'field': 'dcvrTime', 'fieldType': 'datetime', 'text': '发现时间', 'align': 'left' },
                { 'id': '9', 'field': 'rectStatLabel', 'fieldType': 'text', 'text': '处置状态', 'align': 'left' },
                { 'id': '10', 'field': 'rectTime', 'fieldType': 'datetime', 'text': '处置时间', 'align': 'left' }
            ],
            
            tableData: [], // tables数据
            elePagination: {
                // 右侧分页参数
                total: 0,
                pageNum: 1, // 当前页
                pageSize: 10 // 每页个数
            },
            queryArgs: {
              assetName: '',
              logicAddr: '',
              assetType: '',
              riskLevel: '',
              serviceName: '',
              port: ''
            },
            assetTypeOptions: [],
            riskLevelOptions:[
              {value: '0', label: '低危'},
              {value: '1', label: '中危'},
              {value: '2', label: '高危'},
              {value: '3', label: '超危'},
            ]

        }
    },
    props: {
        visible: {type: Boolean, default: false} ,
        parentComponentParam: Object
    },
    methods: {
        modalClose() {
            this.$emit('update:visible', false); // 直接修改父组件的属性
        },
        cancel(){
          this.probInfoTitle="";
          this.$emit('update:parentComponentParam', {});
          this.$emit('update:visible', false); // 直接修改父组件的属性
        },
        searchData(){
          let $self = this;
          $self.elePagination.pageNum='1';
          $self.elePagination.pageSize='10';
          $self.getTableData();
        },
        cleanSearchParm(){
          this.queryArgs = {
              assetName: '',
              logicAddr: '',
              assetType: '',
              riskLevel: '',
              serviceName: '',
              port: ''
            };
        },
        getAssetTypeChecked(arr){
          window.console.info(arr);
          this.queryArgs.assetType = arr[arr.length-1];
        },
        // 改变当前页页码
        handleCurrentChange(val) {
            this.elePagination.pageNum = val
            this.getTableData()
        },
        // 改变当前页显示条数
        handleSizeChange(val) {
            this.elePagination.pageSize = val
            this.getTableData()
        },
        parseYearMonth(yearMonth,param){
          let $self = this;
          var yearStart = yearMonth.substr(0,4);
          var monthStart = yearMonth.substr(4,6);
          var yearEnd = "";
          var monthEnd = "";
          if(monthStart == "12"){
              monthEnd = "1";
              yearEnd = parseInt(yearStart)+1;
          }else if(monthStart=="11"||monthStart=="10"){
              monthEnd = parseInt(monthStart)+1;
              yearEnd = yearStart;
          }else{
              monthEnd = parseInt(monthStart.substr(1, 2))+1;
              yearEnd = yearStart;
          }
          var beginTime = yearStart+"-"+monthStart+"-02 00:00:01";
          var endTime = yearEnd+"-"+monthEnd+"-02 00:00:01";
          param.beginTime = new Date(beginTime);
          param.endTime = new Date(endTime);
        },
        getTableData(){
            let $self = this;
            window.console.info($self.parentComponentParam);
            let param = {};
            param = $self.queryArgs;
            $self.loading = true;
            let vulnType = $self.parentComponentParam.vulnType;
            let vulnClass = $self.parentComponentParam.vulnClass;
            let yearMonth = $self.parentComponentParam.yearMonth;
            let rectStat = $self.parentComponentParam.rectStat;
            let bizName = $self.parentComponentParam.bizName;

            // let assetName = $self.parentComponentParam.vulnClass;
            let year = yearMonth.substr(0,4)+"年";
            let month = yearMonth.substr(4,6)+"月";
            let titleContent = "";
            if(yearMonth!='')$self.parseYearMonth(yearMonth,$self.queryArgs);
            param.rectStat = rectStat;
            param.vulnClass = vulnClass;
            param.vulnType = vulnType;
            param.bizName = bizName;
            param.pageNum = $self.elePagination.pageNum;
            param.pageSize = $self.elePagination.pageSize;

            this.$store.dispatch($self.parentComponentParam.infoUrl, param).then(response => {
                $self.loading = false
                $self.tableData = response.rows
                $self.elePagination.total = response.total
                // this.rowsFormatter(response.rows)
            }).catch(error => {
              $self.loading = false;
            })
        },
        getAssetTypeTree(){
          let $self = this;
          let param = {};
          this.$store.dispatch('asset/getAssetTypeTree', param).then(response => {
              $self.assetTypeOptions = response.treeList;
              // this.rowsFormatter(response.rows)
          }).catch(error => {
          });
        },
        setTitle(){
          let $self = this;
          let viewType = $self.parentComponentParam.viewType;
          let vulnType = $self.parentComponentParam.vulnType;
          let vulnClass = $self.parentComponentParam.vulnClass;
          let yearMonth = $self.parentComponentParam.yearMonth;
          let rectStat = $self.parentComponentParam.rectStat;
          let bizName = $self.parentComponentParam.bizName;
          let year = yearMonth.substr(0,4)+"年";
          let month = yearMonth.substr(4,6)+"月";
          let titleContent = "WEB漏洞明细";
          if(viewType == "vuln"){
            titleContent = year+month+titleContent;
          }else if(viewType == "rectify"){
            if(rectStat=="3"){
              titleContent = "正在整改"+titleContent;
            }else if(rectStat=="1"){
              titleContent = "已整改"+titleContent;
            }else if(rectStat=="0"){
              titleContent = "待整改"+titleContent;
            }else if(rectStat=="4"){
              titleContent = "已报备"+titleContent;
            }
          }else if(viewType == "biz"){
            titleContent = "【"+bizName+"】中高危WEB漏洞明细";
          }
          $self.probInfoTitle = titleContent;
        }
    },
    created() {
      this.getAssetTypeTree();
      this.setTitle();
      this.getTableData();
    },
    // 格式化返回的时间格式
    computed: {
        dateFormat() {
            return function(el) {
                return this.moment(el).utc().zone(+6).format('YYYY-MM-DD HH:mm:ss')
            }
        },
        datetimeFormat() {
            return function(el, format) {
                let fmt = 'YYYY-MM-DD HH:mm:ss'
                let value = ''
                if (format) {
                fmt = format
                }
                if (el) {
                value = this.moment(el).format(fmt)
                }
                return value
            }
        }
    },
}
</script>

<style  lang="scss" scoped>

</style>
