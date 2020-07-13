<template>
  <div class="app-container">
    <el-card>
      <el-row :gutter="10">
        <el-col v-for="(item,index) in chartsData" :key="index" :span="24">
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
      projUrl: 'vulnReport/loadVulnProjData',
      chartsData: []
    }
  },
  created() {
    this.getVulnProjData()
  },
  mounted() {},
  methods: {
    getVulnProjData() {
      this.$store.dispatch(this.projUrl, {}).then(resp => {
        const initDataVer = {
          vulnType: '',
          vulnClass: '',
          viewType: 'rectify',
          templeSrc: () => import('../../../echarts/barverticalchart.vue')
        }
        initDataVer.option = resp.option
        this.chartsData.push(initDataVer)
      }).catch(
      )
    }
  }
}
</script>
