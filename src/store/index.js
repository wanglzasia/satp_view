import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import permission from './modules/permission'
import settings from './modules/settings'
import user from './modules/user'
import tool from './modules/satp/tool/tool'
import policy from './modules/satp/policy/policy'
import netAuth from './modules/satp/netScan/netAuth'
import netCfg from './modules/satp/netScan/netCfg'
import netTask from './modules/satp/netScan/netTask'
import role from './modules/role'
import rptView from './modules/satp/prob/rptView'
import menu from './modules/menu'
import dataRoot from './modules/satp/dataconfig/dataRoot'
import org from './modules/org'
import asset from './modules/asset'
import systemManage from './modules/451/systemManage'
import disposal from './modules/satp/prob/disposal'
import dataDict from './modules/satp/dataconfig/dataDict'
import base from './modules/base'
import docManage from './modules/451/docManage'
import frail from './modules/satp/prob/frail'
import inbu from './modules/451/inbu'
import task from './modules/satp/task/task'
import vulnReinforce from './modules/vuln/vulnReinforce/vulnReinforce'
import reportManage from './modules/satp/satprpt/reportManage'
import item from './modules/satp/item/item'
import template from './modules/satp/template/template'
import workflow from './modules/satp/workflow/workflow'
import specTool from './modules/satp/specTool/specTool'
import vulnTest from './modules/vuln/vulnTest/vulnTest'
import opera from './modules/551/opera/operaManage'
import businessInfo from './modules/451/businessInfo'
import evalInfo from './modules/451/evalInfo'
import vulnWhite from './modules/vuln/vulnWhite/vulnWhite'
import scheWlist from './modules/satp/scheWlist/scheWlist'
import vulnValid from './modules/vuln/vulnValid/vulnValid'
import evalVerify from './modules/451/evalVerify'
import badInfo from './modules/451/badInfo'
import selfCheck from './modules/451/selfCheck'
import emer from './modules/451/emer'
import vulnWarn from './modules/vuln/vulnWarn/vulnWarn'
import vulnReport from './modules/vuln/vulnReport/vulnReport'
import vulnSpider from './modules/vuln/vulnSpider/vulnSpider'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    permission,
    settings,
    user,
    tool,
    policy,
    netAuth,
    netCfg,
    netTask,
    role,
    rptView,
    menu,
    dataRoot,
    org,
    asset,
    systemManage,
    disposal,
    dataDict,
    base,
    docManage,
    frail,
    inbu,
    task,
    vulnReinforce,
    reportManage,
    item,
    template,
    workflow,
    specTool,
    vulnTest,
    opera,
    businessInfo,
    vulnWhite,
    evalInfo,
    scheWlist,
    vulnValid,
    evalVerify,
    badInfo,
    selfCheck,
    emer,
    vulnWarn,
    vulnReport,
    vulnSpider
  },
  getters
})

export default store
