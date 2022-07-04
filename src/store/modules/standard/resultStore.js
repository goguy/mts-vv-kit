import standard from '@/js/initData/standard.js'

const RESULT_DATA = () => {
    return {
        result_id: 0,
        name: '',
        type: '',
        rmk: '',
        reg_dt: '',
    }
} 

const resultStore = {
    namespaced: true,
    state: {
        result: RESULT_DATA(),
        resultList: standard.getResultList()
    },
    mutations: {
        MU_RESULT: (state, payload) => {
            state.result = payload
        },
        MU_RESULT_PUSH: (state, payload) => {
            state.resultList.push(payload)
        },
        MU_RESULT_EDIT: (state, payload) => {
            let index = state.resultList.indexOf(state.resultList.find(f=>f.result_id === payload.result.result_id))
            Object.assign(state.resultList[index], payload.result)
        },
        MU_RESULT_DEL: (state, payload) => {
            let index = state.resultList.indexOf(state.resultList.find(f=>f.result_id === payload.result_id))
            state.resultList.splice(index, 1)
        },
        MU_RESULT_LIST: (state, payload) => {
            state.resultList = payload
        }, 
    },
    actions: {
        AC_RESULT: ({ commit }, payload)=>{
            commit('MU_RESULT', payload)
        },
        AC_RESULT_PUSH: ({ commit }, payload)=>{
            commit('MU_RESULT_PUSH', payload)
        },
        AC_RESULT_EDIT: ({ commit }, payload) =>{
            commit('MU_RESULT_EDIT', payload)
        },
        AC_RESULT_DEL: ({ commit }, payload) =>{
            commit('MU_RESULT_DEL', payload)
        },
        AC_RESULT_LIST: ({ commit }, payload)=>{
            commit('MU_RESULT_LIST', payload)
        },

    },
    getters: {
        GE_RESULT: state => state.result,
        GE_RESULT_LIST: state => state.resultList
    }
}
export default resultStore