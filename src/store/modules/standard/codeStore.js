import standard from '@/js/initData/standard.js'

const CODE_DATA = () => {
    return {
        code_id: 0,
        code: '',
        name: '',
        group_code_id: null,
        level: 0,
        rmk: '',
        attr1: '',
        attr2: '',
        attr3: '',
        reg_dt: ''
    }
} 

const codeStore = {
    namespaced: true,
    state: {
        code: CODE_DATA(),
        codeList: standard.getCodeList()
    },
    mutations: {
        MU_CODE: (state, payload) => {
            state.code = payload
        },
        MU_CODE_PUSH: (state, payload) => {
            state.codeList.push(payload)
        },
        MU_CODE_EDIT: (state, payload) => {
            let index = state.codeList.indexOf(state.codeList.find(f=>f.code_id === payload.code.code_id))
            Object.assign(state.codeList[index], payload.code)
        },
        MU_CODE_DEL: (state, payload) => {
            let index = state.codeList.indexOf(state.codeList.find(f=>f.code_id === payload.code_id))
            state.codeList.splice(index, 1)
        },
        MU_CODE_LIST: (state, payload) => {
            state.codeList = payload
        }, 
    },
    actions: {
        AC_CODE: ({ commit }, payload)=>{
            commit('MU_CODE', payload)
        },
        AC_CODE_PUSH: ({ commit }, payload)=>{
            commit('MU_CODE_PUSH', payload)
        },
        AC_CODE_EDIT: ({ commit }, payload) =>{
            commit('MU_CODE_EDIT', payload)
        },
        AC_CODE_DEL: ({ commit }, payload) =>{
            commit('MU_CODE_DEL', payload)
        },
        AC_CODE_LIST: ({ commit }, payload)=>{
            commit('MU_CODE_LIST', payload)
        },

    },
    getters: {
        GE_CODE: state => state.code,
        GE_CODE_LIST: state => state.codeList
    }
}
export default codeStore