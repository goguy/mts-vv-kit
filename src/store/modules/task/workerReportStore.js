const WORKER_REPORT_DATA = () => {
    return {
      report_id: 0,
      worker_id: 0,
      work_id: 0,
      total_score: 0,
      reg_dt: '',
    }
} 

const workerReportStore = {
    namespaced: true,
    state: {
        workerReport: WORKER_REPORT_DATA(),
        workerReportList: []
    },
    mutations: {
        MU_WORKER_REPORT: (state, payload) => {
            state.workerReport = payload
        },
        MU_WORKER_REPORT_PUSH: (state, payload) => {
            state.workerReportList.push(payload)
        }, 
        MU_WORKER_REPORT_EDIT: (state, payload) => {
            let index = state.workerReportList.indexOf(state.workerReportList.find(f=>f.report_id === payload.workerReport.report_id))
            Object.assign(state.workerReportList[index], payload.worker)
        },
        MU_WORKER_REPORT_DEL: (state, payload) => {
            let index = state.workerReportList.indexOf(state.workerReportList.find(f=>f.report_id === payload.report_id))
            state.workerReportList.splice(index, 1)
        },
        MU_WORKER_REPORT_LIST: (state, payload) => {
            state.workerReportList = payload
        }, 
    },
    actions: {
        AC_WORKER_REPORT: ({ commit }, payload)=>{
            commit('MU_WORKER_REPORT', payload)
        },
        AC_WORKER_REPORT_PUSH: ({ commit }, payload)=>{
            commit('MU_WORKER_REPORT_PUSH', payload)
        },
        AC_WORKER_REPORT_EDIT: ({ commit }, payload) =>{
            commit('MU_WORKER_REPORT_EDIT', payload)
        },
        AC_WORKER_REPORT_DEL: ({ commit }, payload) =>{
            commit('MU_WORKER_REPORT_DEL', payload)
        },
        AC_WORKER_REPORT_LIST: ({ commit }, payload)=>{
            commit('MU_WORKER_REPORT_LIST', payload)
        },

    },
    getters: {
        GE_WORKER_REPORT: state => state.workerReport,
        GE_WORKER_REPORT_LIST: state => state.workerReportList
    }
}
export default workerReportStore
