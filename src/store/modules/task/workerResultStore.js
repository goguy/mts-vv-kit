const WORKER_RESULT_DATA = () => {
    return {
      result_id: 0,
      worker_id: 0,
      work_id: 0,
      score: 0,
      reg_dt: null,
    }
  } 

const workerResultStore = {
    namespaced: true,
    state: {
        workerResult: WORKER_RESULT_DATA(),
        workerResultList: []
    },
    mutations: {
        MU_WORKER_RESULT: (state, payload) => {
            state.workerResult = payload
        },
        MU_WORKER_RESULT_PUSH: (state, payload) => {
            state.workerResultList.push(payload)
        },
        MU_WORKER_RESULT_EDIT: (state, payload) => {
            let index = state.workerResultList.indexOf(state.workerResultList.find(f=>(f.worker_id === payload.worker_id && f.work_id === payload.work_id)))
            Object.assign(state.workerResultList[index], payload)
        },
        MU_WORKER_RESULT_DEL: (state, payload) => {
            let index = state.workerResultList.indexOf(state.workerResultList.find(f=>(f.worker_id === payload.worker_id && f.work_id === payload.work_id)))
            state.workerResultList.splice(index, 1)
        },
        MU_WORKER_RESULT_LIST: (state, payload) => {
            state.workerResultList = payload
        }, 
    },
    actions: {
        AC_WORKER_RESULT: ({ commit }, payload)=>{
            commit('MU_WORKER_RESULT', payload)
        },
        AC_WORKER_RESULT_PUSH: ({ commit }, payload)=>{
            commit('MU_WORKER_RESULT_PUSH', payload)
        },
        AC_WORKER_RESULT_EDIT: ({ commit }, payload) =>{
            commit('MU_WORKER_RESULT_EDIT', payload)
        },
        AC_WORKER_RESULT_DEL: ({ commit }, payload) =>{
            commit('MU_WORKER_RESULT_DEL', payload)
        },
        AC_WORKER_RESULT_LIST: ({ commit }, payload)=>{
            commit('MU_WORKER_RESULT_LIST', payload)
        },

    },
    getters: {
        GE_WORKER_RESULT: state => state.workerResult,
        GE_WORKER_RESULT_LIST: state => state.workerResultList
    }
}
export default workerResultStore