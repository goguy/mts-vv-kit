const workerActivityHistoryStore = {
    namespaced: true,
    state: {
        workerActivityHistoryList: []
    },
    mutations: {
        MU_WORKER_ACTIVITY_HISTORY_PUSH: (state, payload) => {
            state.workerActivityHistoryList.push(payload)
        }
    },
    actions: {
        AC_WORKER_ACTIVITY_HISTORY_PUSH: ({ commit }, payload)=>{
            commit('MU_WORKER_ACTIVITY_HISTORY_PUSH', payload)
        }
    },
    getters: {
        GE_WORKER_ACTIVITY_HISTORY_LIST: state => state.workerActivityHistoryList
    }
}
export default workerActivityHistoryStore