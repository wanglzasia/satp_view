<template>
  <div>

    <div>
      <el-select v-model="config.planType" clearable placeholder="计划类型" size="small" style="width:100px" @change="chgPlanType">
        <el-option
          v-for="item in planTypes"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>

      <el-select v-model="config.planFreq" clearable placeholder="执行频率" size="small" style="width:100px" :style="{display:freqShow}" @change="chgFreq">
        <el-option
          v-for="item in planFreqs"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>

    </div>

    <div style="margin-top:10px">
      <el-select v-model="config.month" clearable placeholder="月" size="small" style="width:80px" :style="{display:monthShow}">
        <el-option
          v-for="item in months"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>

      <el-select v-model="config.week" clearable placeholder="周" size="small" style="width:80px" :style="{display:weekShow}">
        <el-option
          v-for="item in weeks"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>

      <el-select v-model="config.day" clearable placeholder="日" size="small" style="width:80px" :style="{display:dayShow}">
        <el-option
          v-for="item in days"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>

      <el-select v-model="config.hour" clearable placeholder="小时" size="small" style="width:80px" :style="{display:hourShow}">
        <el-option
          v-for="item in hours"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>

      <el-select v-model="config.min" clearable placeholder="分钟" size="small" style="width:80px" :style="{display:minShow}">
        <el-option
          v-for="item in mins"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 计划类型
      planTypes: [
        { value: '1', label: '定时执行' },
        { value: '2', label: '立即执行' }
      ],
      // 计划频率
      planFreqs: [
        { value: '5', label: '单次' },
        { value: '1', label: '每日' },
        { value: '2', label: '每周' },
        { value: '3', label: '每月' },
        { value: '4', label: '年' }
      ],

      months: [],
      weeks: [],
      days: [],
      hours: [],
      mins: [],

      config: {
        planType: '2',
        planFreq: '',
        month: '',
        week: '',
        day: '',
        hour: '',
        min: ''
      },
      // shows
      freqShow: 'none',
      monthShow: 'none',
      weekShow: 'none',
      dayShow: 'none',
      hourShow: 'none',
      minShow: 'none'

    }
  },
  mounted() {
    this.fillMonths()
    this.fillHours()
    this.fillMins()
    this.fillWeeks()
    this.fillDays()
  },
  methods: {
    fillMonths() {
      for (var i = 1; i < 13; i++) {
        this.months.push({ 'value': i, 'label': i + '月' })
      }
    },
    fillWeeks() {
      for (var i = 1; i < 8; i++) {
        this.weeks.push({ 'value': i, 'label': '周' + i })
      }
    },
    fillDays() {
      for (var i = 1; i < 31; i++) {
        this.days.push({ 'value': i, 'label': i + '日' })
      }
    },
    fillHours() {
      for (var i = 0; i < 24; i++) {
        this.hours.push({ 'value': i, 'label': i + '时' })
      }
    },
    fillMins() {
      for (var i = 0; i < 60; i++) {
        this.mins.push({ 'value': i, 'label': i + '分' })
      }
    },

    chgPlanType(item) {
      if (item === '1') {
        // 定时执行
        this.freqShow = 'inline-block'
      }
      if (item === '2') {
        // 立即执行
        this.freqShow = 'none'

        this.monthShow = 'none'
        this.weekShow = 'none'
        this.dayShow = 'none'
        this.hourShow = 'none'
        this.minShow = 'none'
      }
      this.config.planType = item
      this.config.planFreq = ''
      this.config.month = ''
      this.config.week = ''
      this.config.day = ''
      this.config.hour = ''
      this.config.min = ''
    },
    chgFreq(item) {
      if (item === '1') { // 日
        this.monthShow = 'none'
        this.weekShow = 'none'
        this.dayShow = 'none'
        this.hourShow = 'inline-block'
        this.minShow = 'inline-block'
      } else if (item === '2') { // 周
        this.monthShow = 'none'
        this.weekShow = 'inline-block'
        this.dayShow = 'none'
        this.hourShow = 'inline-block'
        this.minShow = 'inline-block'
      } else if (item === '3') { // 月
        this.monthShow = 'none'
        this.weekShow = 'none'
        this.dayShow = 'inline-block'
        this.hourShow = 'inline-block'
        this.minShow = 'inline-block'
      } else if (item === '4') { // 年
        this.monthShow = 'inline-block'
        this.weekShow = 'none'
        this.dayShow = 'inline-block'
        this.hourShow = 'inline-block'
        this.minShow = 'inline-block'
      } else if (item === '5') { // 单次
        this.monthShow = 'none'
        this.weekShow = 'none'
        this.dayShow = 'none'
        this.hourShow = 'inline-block'
        this.minShow = 'inline-block'
      }

      this.config.month = ''
      this.config.week = ''
      this.config.day = ''
      this.config.hour = ''
      this.config.min = ''
    },
    getConfig() {
      return this.config
    }
  }
}
</script>
