const WORKER_RESULT_ITEM_DATA = () => {
    return {
      result_item_id: 0,
      worker_id: 0,
      work_id: 0,
      score: 0,
      reg_dt: null,
    }
  } 

const workerResultItemStore = {
    namespaced: true,
    state: {
        workerResultItem: WORKER_RESULT_ITEM_DATA(),
        workerResultItemList: []
    },
    mutations: {
        MU_WORKER_RESULT_ITEM: (state, payload) => {
            state.workerResultItem = payload
        },
        MU_WORKER_RESULT_ITEM_PUSH: (state, payload) => {
            state.workerResultItemList.push(payload)
        },
        MU_WORKER_RESULT_ITEM_EDIT: (state, payload) => {
            let index = state.workerResultItemList.indexOf(state.workerResultItemList.find(f=>(f.worker_id === payload.worker_id && f.work_id === payload.work_id)))
            Object.assign(state.workerResultItemList[index], payload)
        },
        MU_WORKER_RESULT_ITEM_DEL: (state, payload) => {
            let index = state.workerResultItemList.indexOf(state.workerResultItemList.find(f=>(f.worker_id === payload.worker_id && f.work_id === payload.work_id)))
            state.workerResultItemList.splice(index, 1)
        },
        MU_WORKER_RESULT_ITEM_LIST: (state, payload) => {
            state.workerResultItemList = payload
        }, 
    },
    actions: {
        AC_WORKER_RESULT_ITEM: ({ commit }, payload)=>{
            commit('MU_WORKER_RESULT_ITEM', payload)
        },
        AC_WORKER_RESULT_ITEM_PUSH: ({ commit }, payload)=>{
            commit('MU_WORKER_RESULT_ITEM_PUSH', payload)
        },
        AC_WORKER_RESULT_ITEM_EDIT: ({ commit }, payload) =>{
            commit('MU_WORKER_RESULT_ITEM_EDIT', payload)
        },
        AC_WORKER_RESULT_ITEM_DEL: ({ commit }, payload) =>{
            commit('MU_WORKER_RESULT_ITEM_DEL', payload)
        },
        AC_WORKER_RESULT_ITEM_LIST: ({ commit }, payload)=>{
            commit('MU_WORKER_RESULT_ITEM_LIST', payload)
        },

    },
    getters: {
        GE_WORKER_RESULT_ITEM: state => state.workerResultItem,
        GE_WORKER_RESULT_ITEM_LIST: state => state.workerResultItemList
    }
}
export default workerResultItemStore