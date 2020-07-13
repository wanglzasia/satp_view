import {
  taskList, addTask,
  itemList, taskItemList, saveTaskItem, deleteTaskItem,
  loadAssetToSel, loadTaskAsset, deleteTaskAsset, saveAsset,
  taskToolList, taskToolToSel, saveTaskTool, deleteTaskTool,
  loadTask, loadSubTaskTree, addSubTask, loadTaskAssignToAssignList, loadTaskAssignList, moveIn, moveOut, splitDone, configDone, configSingleDone, removeSubTask, removeTask,
  loadGradeAssetData, loadGradeItemData, saveGradeAsset, removeGradeAsset, saveGradeItem, removeGradeItem, gradeSplitDone, gradeConfigDone, gradeAssignDetailList, startGradeTask, gradeTaskDone, saveGradeResult, taskGradeRptItems, taskGradeRptResults, taskGradeChkResults, taskGradeDtlAssigns,
  saveServerTarget, removeServerTarget, taskServerAssets, taskServerConfigDone,
  singleStartTask
} from '@/api/satp/task/task'
// import qs from 'qs'

const actions = {
  // 任务列表
  taskList({ commit }, params) {
    // const { taskName, bussiness, taskSource, itemType, taskType, pageNum, pageSize, parentTaskId } = params
    return new Promise((resolve, reject) => {
      taskList(
        params
      ).then(result => {
        resolve(result)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 增加任务
  addTask({ commit }, params) {
    return new Promise((resolve, reject) => {
      addTask(
        params
      ).then(result => {
        resolve(result)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 合规项待选列表
  itemList({ commit }, params) {
    return new Promise((resolve, reject) => {
      itemList(
        params
      ).then(result => {
        resolve(result)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 合规项已选列表
  taskItemList({ commit }, params) {
    return new Promise((resolve, reject) => {
      taskItemList(
        params
      ).then(result => {
        resolve(result)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 合规项已选列表
  saveTaskItem({ commit }, params) {
    return new Promise((resolve, reject) => {
      saveTaskItem(
        params
      ).then(result => {
        resolve(result)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 删除已选合规项
  deleteTaskItem({ commit }, params) {
    return new Promise((resolve, reject) => {
      deleteTaskItem(
        params
      ).then(result => {
        resolve(result)
      }).catch(error => {
        reject(error)
      })
    })
  },

  loadAssetToSel({ commit }, params) {
    return new Promise((resolve, reject) => {
      loadAssetToSel(
        params
      ).then(result => {
        resolve(result)
      }).catch(error => {
        reject(error)
      })
    })
  },

  loadTaskAsset({ commit }, params) {
    return new Promise((resolve, reject) => {
      loadTaskAsset(
        params
      ).then(result => {
        resolve(result)
      }).catch(error => {
        reject(error)
      })
    })
  },
  saveAsset({ commit }, params) {
    return new Promise((resolve, reject) => {
      saveAsset(
        params
      ).then(result => {
        resolve(result)
      }).catch(error => {
        reject(error)
      })
    })
  },
  deleteTaskAsset({ commit }, params) {
    return new Promise((resolve, reject) => {
      deleteTaskAsset(
        params
      ).then(result => {
        resolve(result)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 已选工具列表
  taskToolList({ commit }, params) {
    return new Promise((resolve, reject) => {
      taskToolList(
        params
      ).then(result => {
        resolve(result)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 待选任务列表
  taskToolToSel({ commit }, params) {
    return new Promise((resolve, reject) => {
      taskToolToSel(
        params
      ).then(result => {
        resolve(result)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 保存任务工具
  saveTaskTool({ commit }, params) {
    return new Promise((resolve, reject) => {
      saveTaskTool(
        params
      ).then(result => {
        resolve(result)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 删除任务工具
  deleteTaskTool({ commit }, params) {
    return new Promise((resolve, reject) => {
      deleteTaskTool(
        params
      ).then(result => {
        resolve(result)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 加载任务
  loadTask({ commit }, params) {
    return new Promise((resolve, reject) => {
      loadTask(
        params
      ).then(result => {
        resolve(result)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 加载任务
  loadSubTaskTree({ commit }, params) {
    return new Promise((resolve, reject) => {
      loadSubTaskTree(
        params
      ).then(result => {
        resolve(result)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 任务列表
  addSubTask({ commit }, params) {
    return new Promise((resolve, reject) => {
      addSubTask(
        params
      ).then(result => {
        resolve(result)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 查询已经分配给任务的资产列表
  loadTaskAssignList({ commit }, params) {
    return new Promise((resolve, reject) => {
      loadTaskAssignList(
        params
      ).then(result => {
        resolve(result)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 查询待分配任务列表
  loadTaskAssignToAssignList({ commit }, params) {
    return new Promise((resolve, reject) => {
      loadTaskAssignToAssignList(
        params
      ).then(result => {
        resolve(result)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 查询待分配任务列表
  moveIn({ commit }, params) {
    return new Promise((resolve, reject) => {
      moveIn(
        params
      ).then(result => {
        resolve(result)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 查询待分配任务列表
  moveOut({ commit }, params) {
    return new Promise((resolve, reject) => {
      moveOut(
        params
      ).then(result => {
        resolve(result)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 拆分完成
  splitDone({ commit }, params) {
    return new Promise((resolve, reject) => {
      splitDone(
        params
      ).then(result => {
        resolve(result)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 删除子任务
  removeSubTask({ commit }, params) {
    return new Promise((resolve, reject) => {
      removeSubTask(
        params
      ).then(result => {
        resolve(result)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 删除任务
  removeTask({ commit }, params) {
    return new Promise((resolve, reject) => {
      removeTask(
        params
      ).then(result => {
        resolve(result)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 等保 资产查询列表
  loadGradeAssetData({ commit }, params) {
    return new Promise((resolve, reject) => {
      loadGradeAssetData(
        params
      ).then(result => {
        resolve(result)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 等保合规项查询列表
  loadGradeItemData({ commit }, params) {
    return new Promise((resolve, reject) => {
      loadGradeItemData(
        params
      ).then(result => {
        resolve(result)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 保存等保子任务资产数据
  saveGradeAsset({ commit }, params) {
    return new Promise((resolve, reject) => {
      saveGradeAsset(
        params
      ).then(result => {
        resolve(result)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 移除等保子任务资产数据
  removeGradeAsset({ commit }, params) {
    return new Promise((resolve, reject) => {
      removeGradeAsset(
        params
      ).then(result => {
        resolve(result)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 保存等保子任务合规项数据
  saveGradeItem({ commit }, params) {
    return new Promise((resolve, reject) => {
      saveGradeItem(
        params
      ).then(result => {
        resolve(result)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 移除等保子任务合规项数据
  removeGradeItem({ commit }, params) {
    return new Promise((resolve, reject) => {
      removeGradeItem(
        params
      ).then(result => {
        resolve(result)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 综合检测任务配置完成
  configDone({ commit }, params) {
    return new Promise((resolve, reject) => {
      configDone(
        params
      ).then(result => {
        resolve(result)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 单项检测任务配置完成
  configSingleDone({ commit }, params) {
    return new Promise((resolve, reject) => {
      configSingleDone(
        params
      ).then(result => {
        resolve(result)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 等保任务配置完成
  gradeConfigDone({ commit }, params) {
    return new Promise((resolve, reject) => {
      gradeConfigDone(
        params
      ).then(result => {
        resolve(result)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 等保任务拆分完成
  gradeSplitDone({ commit }, params) {
    return new Promise((resolve, reject) => {
      gradeSplitDone(
        params
      ).then(result => {
        resolve(result)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 等保assign详细列表
  gradeAssignDetailList({ commit }, params) {
    return new Promise((resolve, reject) => {
      gradeAssignDetailList(
        params
      ).then(result => {
        resolve(result)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 保存等保填报结果
  saveGradeResult({ commit }, params) {
    return new Promise((resolve, reject) => {
      saveGradeResult(
        params
      ).then(result => {
        resolve(result)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 启动等保检查任务
  startGradeTask({ commit }, params) {
    return new Promise((resolve, reject) => {
      startGradeTask(
        params
      ).then(result => {
        resolve(result)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 完成等保任务
  gradeTaskDone({ commit }, params) {
    return new Promise((resolve, reject) => {
      gradeTaskDone(
        params
      ).then(result => {
        resolve(result)
      }).catch(error => {
        reject(error)
      })
    })
  },

  taskGradeRptItems({ commit }, params) {
    return new Promise((resolve, reject) => {
      taskGradeRptItems(
        params
      ).then(result => {
        resolve(result)
      }).catch(error => {
        reject(error)
      })
    })
  },

  taskGradeRptResults({ commit }, params) {
    return new Promise((resolve, reject) => {
      taskGradeRptResults(
        params
      ).then(result => {
        resolve(result)
      }).catch(error => {
        reject(error)
      })
    })
  },

  taskGradeChkResults({ commit }, params) {
    return new Promise((resolve, reject) => {
      taskGradeChkResults(
        params
      ).then(result => {
        resolve(result)
      }).catch(error => {
        reject(error)
      })
    })
  },

  taskGradeDtlAssigns({ commit }, params) {
    return new Promise((resolve, reject) => {
      taskGradeDtlAssigns(
        params
      ).then(result => {
        resolve(result)
      }).catch(error => {
        reject(error)
      })
    })
  },

  //  应用管理地址探测
  saveServerTarget({ commit }, params) {
    return new Promise((resolve, reject) => {
      saveServerTarget(
        params
      ).then(result => {
        resolve(result)
      }).catch(error => {
        reject(error)
      })
    })
  },
  taskServerAssets({ commit }, params) {
    return new Promise((resolve, reject) => {
      taskServerAssets(
        params
      ).then(result => {
        resolve(result)
      }).catch(error => {
        reject(error)
      })
    })
  },
  removeServerTarget({ commit }, params) {
    return new Promise((resolve, reject) => {
      removeServerTarget(
        params
      ).then(result => {
        resolve(result)
      }).catch(error => {
        reject(error)
      })
    })
  },
  taskServerConfigDone({ commit }, params) {
    return new Promise((resolve, reject) => {
      taskServerConfigDone(
        params
      ).then(result => {
        resolve(result)
      }).catch(error => {
        reject(error)
      })
    })
  },
  singleStartTask({ commit }, params) {
    return new Promise((resolve, reject) => {
      singleStartTask(
        params
      ).then(result => {
        resolve(result)
      }).catch(error => {
        reject(error)
      })
    })
  }
}

export default {
  namespaced: true,
  actions
}
