import standard from '@/js/initData/standard.js'

const RESULT_ITME_DATA = () => {
    return {
        result_item_id: 0,
        name: '',
        score: 0,
        disp_ord: 0,
        rmk: '',
        is_yn: '',
        result_id: 0,
        worker_id: 0
    }
} 

const resultItemStore = {
    namespaced: true,
    state: {
        resultItem: RESULT_ITME_DATA(),
        resultItemList: standard.getResultItemList()
    },
    mutations: {
        MU_RESULT_ITEM: (state, payload) => {
            state.resultItem = payload
        },
        MU_RESULT_ITEM_PUSH: (state, payload) => {
            state.resultItemList.push(payload)
        },
        MU_RESULT_ITEM_EDIT: (state, payload) => {
            let index = state.resultItemList.indexOf(state.resultItemList.find(f=>f.result_item_id === payload.resultItem.result_item_id))
            Object.assign(state.resultItemList[index], payload.resultItem)
        },
        MU_RESULT_ITEM_DEL: (state, payload) => {
            let index = state.resultItemList.indexOf(state.resultItemList.find(f=>f.result_item_id === payload.result_item_id))
            state.resultItemList.splice(index, 1)
        },
        MU_RESULT_ITEM_LIST: (state, payload) => {
            state.resultItemList = payload
        }, 
    },
    actions: {
        AC_RESULT_ITEM: ({ commit }, payload)=>{
            commit('MU_RESULT_ITEM', payload)
        },
        AC_RESULT_ITEM_PUSH: ({ commit }, payload)=>{
            commit('MU_RESULT_ITEM_PUSH', payload)
        },
        AC_RESULT_ITEM_EDIT: ({ commit }, payload) =>{
            commit('MU_RESULT_ITEM_EDIT', payload)
        },
        AC_RESULT_ITEM_DEL: ({ commit }, payload) =>{
            commit('MU_RESULT_ITEM_DEL', payload)
        },
        AC_RESULT_ITEM_LIST: ({ commit }, payload)=>{
            commit('MU_RESULT_ITEM_LIST', payload)
        },

    },
    getters: {
        GE_RESULT_ITEM: state => state.resultItem,
        GE_RESULT_ITEM_LIST: state => state.resultItemList
    }
}
export default resultItemStore