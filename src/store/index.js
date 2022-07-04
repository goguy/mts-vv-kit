import Vue from 'vue'
import Vuex from 'vuex'

import createPersistedState from 'vuex-persistedstate'

import workStore from '@/store/modules/standard/workStore'
import equipmentStore from '@/store/modules/standard/equipmentStore'
import workEquipmentStore from '@/store/modules/standard/workEquipmentStore'
import tdmotionStore from '@/store/modules/standard/tdmotionStore'
import workTdmotionStore from '@/store/modules/standard/workTdmotionStore'
import activityStore from '@/store/modules/standard/activityStore'
import disasterStore from '@/store/modules/standard/disasterStore'
import codeStore from '@/store/modules/standard/codeStore'
import resultStore from '@/store/modules/standard/resultStore'
import resultItemStore from '@/store/modules/standard/resultItemStore'

import workerStore from '@/store/modules/task/workerStore'
import workerEquipmentStore from '@/store/modules/task/workerEquipmentStore'
import workerTdmotionStore from '@/store/modules/task/workerTdmotionStore'
import workerActivityStore from '@/store/modules/task/workerActivityStore'
import workerActivityHistoryStore from '@/store/modules/task/workerActivityHistoryStore'
import workerReportStore from '@/store/modules/task/workerReportStore'
import workerWorkingStore from '@/store/modules/task/workerWorkingStore'
import workerResultStore from '@/store/modules/task/workerResultStore'
import workerResultItemStore from '@/store/modules/task/workerResultItemStore'
import workerResultEvalStore from '@/store/modules/task/workerResultEvalStore'

import userStore from '@/store/modules/auth/userStore'
import tokenStore from '@/store/modules/auth/tokenStore'

import layoutStore from '@/store/modules/design/layoutStore'


Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    workStore,
    activityStore,
    equipmentStore,
    workEquipmentStore,
    tdmotionStore,
    disasterStore,
    codeStore,
    resultStore,
    resultItemStore,
    workTdmotionStore,
    workerStore,
    workerEquipmentStore,
    workerTdmotionStore,
    workerActivityStore,
    workerActivityHistoryStore,
    workerReportStore,
    workerWorkingStore,
    workerResultStore,
    workerResultItemStore,
    workerResultEvalStore,
    userStore,
    tokenStore,
    layoutStore
  },
  plugins: [
    createPersistedState()
  ]  
})
