const workerTdmotionStore = {
    namespaced: true,
    state: {
        workerTdmotionList: []
    },
    mutations: {
        MU_WORKER_TDMOTION_LIST: (state, payload) => {
            state.workerTdmotionList = payload
        }
    },
    actions: {
        AC_WORKER_TDMOTION_LIST: ({ commit }, payload)=>{
            commit('MU_WORKER_TDMOTION_LIST', payload)
        }
    },
    getters: {
        GE_WORKER_TDMOTION_LIST: state => state.workerTdmotionList
    }
}
export default workerTdmotionStore