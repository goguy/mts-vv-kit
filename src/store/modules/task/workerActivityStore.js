const WORKER_ACTIVITY_DATA = () => {
    return {
        worker_id: 0,
        activity_id: 0
    }
}

const workerActivityStore = {
    namespaced: true,
    state: {
        workerActivity: WORKER_ACTIVITY_DATA(),
        workerActivityList: []
    },
    mutations: {
        MU_WORKER_ACTIVITY: (state, payload) => {
            state.workerActivity = payload
        },
        MU_WORKER_ACTIVITY_PUSH: (state, payload) => {
            state.workerActivityList.push(payload) 
        },       
        MU_WORKER_ACTIVITY_LIST: (state, payload) => {
            state.workerActivityList = payload
        }
    },
    actions: {
        AC_WORKER_ACTIVITY_PUSH: ({ commit }, payload)=>{
            commit('MU_WORKER_ACTIVITY_PUSH', payload)
        },
        AC_WORKER_ACTIVITY_LIST: ({ commit }, payload)=>{
            commit('MU_WORKER_ACTIVITY_LIST', payload)
        }
    },
    getters: {
        GE_WORKER_ACTIVITY: state => state.workerActivity,
        GE_WORKER_ACTIVITY_LIST: state => state.workerActivityList
    }
}
export default workerActivityStore