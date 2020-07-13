<template>
  <div class="app-container">
    <el-card>
      <el-row :gutter="10">
        <el-col v-for="(item,index) in chartsData1" :key="index" :span="12">
          <el-card shadow="hover">
            <div style="position:relative;height:350px;overflow: hidden;">
              <el-alert
                v-if="item.option ==null"
                title="暂无数据"
                type="warning"
                center
                effect="dark"
                :closable="false"
              />
              <component
                :is="item.templeSrc"
                v-else
                :chart-data="item"
              />
            </div>
          </el-card>
        </el-col>

        <el-col v-for="(item,index) in chartsData2" :key="index" :span="12">
          <el-card shadow="hover">
            <div style="position:relative;height:350px;overflow: hidden;">
              <el-alert
                v-if="item.option ==null"
                title="暂无数据"
                type="warning"
                center
                effect="dark"
                :closable="false"
              />
              <component
                :is="item.templeSrc"
                v-else
                :chart-data="item"
              />
            </div>
          </el-card>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sourceUrl: 'vulnWhite/whiteSourceData',
      statusUrl: 'vulnWhite/whiteStatusData',
      chartsData1: [],
      chartsData2: []
    }
  },
  created() {
    this.getWhiteSourceData()
    this.getWhiteStatusData()
  },
  mounted() {},
  methods: {
    getWhiteSourceData() {
      this.$store.dispatch(this.sourceUrl, {}).then(resp => {
        const initDataVer = {
          vulnType: '',
          vulnClass: '',
          viewType: 'rectify',
          templeSrc: () => import('../../../echarts/piechart.vue')
        }
        initDataVer.option = resp.option
        this.chartsData1.push(initDataVer)
      }).catch(
      )
    },
    getWhiteStatusData() {
      this.$store.dispatch(this.statusUrl, {}).then(resp => {
        const initDataVer = {
          vulnType: '',
          vulnClass: '',
          viewType: 'rectify',
          templeSrc: () => import('../../../echarts/piechart.vue')
        }
        initDataVer.option = resp.option
        this.chartsData2.push(initDataVer)
      }).catch(
      )
    }
  }
}
</script>
