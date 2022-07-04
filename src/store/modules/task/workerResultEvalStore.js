const WORKER_RESULT_EVAL_DATA = () => {
    return {
      worker_id: 0,
      work_id: 0,
      result_id: 0,
      user_email: '',
      is_pass:'',
      rmk: '',
      reg_dt: '',
    }
  } 

const workerResultEvalStore = {
    namespaced: true,
    state: {
        workerResultEval: WORKER_RESULT_EVAL_DATA(),
        workerResultEvalList: []
    },
    mutations: {
        MU_WORKER_RESULT_EVAL: (state, payload) => {
            state.workerResultEval = payload
        },
        MU_WORKER_RESULT_EVAL_PUSH: (state, payload) => {
            state.workerResultEvalList.push(payload)
        },
        MU_WORKER_RESULT_EVAL_EDIT: (state, payload) => {
            let index = state.workerResultEvalList.indexOf(state.workerResultEvalList.find(
                f=>(f.worker_id === payload.workerResultEval.worker_id
                    && f.result_id === payload.workerResultEval.result_id
                    && f.user_email === payload.workerResultEval.user_email)))
            Object.assign(state.workerResultEvalList[index], payload.workerResultEval)
        },
        MU_WORKER_RESULT_EVAL_DEL: (state, payload) => {
            let index = state.workerResultEvalList.indexOf(state.workerResultEvalList.find(
                f=>(f.worker_id === payload.worker_id && f.result_id === payload.result_id && f.user_email === payload.user_email)))
            state.workerResultEvalList.splice(index, 1)
        },
        MU_WORKER_RESULT_EVAL_LIST: (state, payload) => {
            state.workerResultEvalList = payload
        }, 
    },
    actions: {
        AC_WORKER_RESULT_EVAL: ({ commit }, payload)=>{
            commit('MU_WORKER_RESULT_EVAL', payload)
        },
        AC_WORKER_RESULT_EVAL_PUSH: ({ commit }, payload)=>{
            commit('MU_WORKER_RESULT_EVAL_PUSH', payload)
        },
        AC_WORKER_RESULT_EVAL_EDIT: ({ commit }, payload) =>{
            commit('MU_WORKER_RESULT_EVAL_EDIT', payload)
        },
        AC_WORKER_RESULT_EVAL_DEL: ({ commit }, payload) =>{
            commit('MU_WORKER_RESULT_EVAL_DEL', payload)
        },
        AC_WORKER_RESULT_EVAL_LIST: ({ commit }, payload)=>{
            commit('MU_WORKER_RESULT_EVAL_LIST', payload)
        },

    },
    getters: {
        GE_WORKER_RESULT_EVAL: state => state.workerResultEval,
        GE_WORKER_RESULT_EVAL_LIST: state => state.workerResultEvalList
    }
}
export default workerResultEvalStore