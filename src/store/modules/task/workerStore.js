const WORKER_DATA = () => {
    return {
      worker_id: 0,
      name: '',
      email: '',
      agency: '',
      guide_chk: false,
      order_chk: false,
      reg_dt: '',
      work_id: 0
    }
  } 

const workerStore = {
    namespaced: true,
    state: {
        worker: WORKER_DATA(),
        workerList: []
    },
    mutations: {
        MU_WORKER: (state, payload) => {
            state.worker = payload
        },
        MU_WORKER_PUSH: (state, payload) => {
            state.workerList.push(payload)
        },
        MU_WORKER_EDIT: (state, payload) => {
            let index = state.workerList.indexOf(state.workerList.find(f=>f.worker_id === payload.worker.worker_id))
            Object.assign(state.workerList[index], payload.worker)
        },
        MU_WORKER_DEL: (state, payload) => {
            let index = state.workerList.indexOf(state.workerList.find(f=>f.worker_id === payload.worker_id))
            state.workerList.splice(index, 1)
        },
        MU_WORKER_LIST: (state, payload) => {
            state.workerList = payload
        }, 
    },
    actions: {
        AC_WORKER: ({ commit }, payload)=>{
            commit('MU_WORKER', payload)
        },
        AC_WORKER_PUSH: ({ commit }, payload)=>{
            commit('MU_WORKER_PUSH', payload)
        },
        AC_WORKER_EDIT: ({ commit }, payload) =>{
            commit('MU_WORKER_EDIT', payload)
        },
        AC_WORKER_DEL: ({ commit }, payload) =>{
            commit('MU_WORKER_DEL', payload)
        },
        AC_WORKER_LIST: ({ commit }, payload)=>{
            commit('MU_WORKER_LIST', payload)
        },

    },
    getters: {
        GE_WORKER: state => state.worker,
        GE_WORKER_LIST: state => state.workerList
    }
}
export default workerStore