import standard from '@/js/initData/standard.js'

const WORK_DATA = () => {
    return {
        work_id: 0,
        name: '',
        rmk: '',
        time: 10*60,
        type: '',
        img_url:''
    }
} 

const workStore = {
    namespaced: true,
    state: {
        work: WORK_DATA(),
        workList: standard.getWorkList()
        /*
        workList: []
        workList:  [
            {
                work_id: 1,
                name: '탱크 Cleaning',
                rmk: '탱크 Cleaning 작업을 한다.',
                time: 10*60,
                img_src:''
            },
            {
                work_id: 2,
                name: '탱크 샌딩 및 도장',
                rmk: '탱크 샌딩 및 도장 작업을 한다.',
                time: 10*60,
                img_src:''
            }
        ]
        */
    },
    mutations: {
        MU_WORK: (state, payload) => {
            state.work = payload
        },
        MU_WORK_PUSH: (state, payload) => {
            state.workList.push(payload)
        }, 
        MU_WORK_EDIT: (state, payload) => {
            let index = state.workList.indexOf(state.workList.find(f=>f.work_id === payload.work.work_id))
            Object.assign(state.workList[index], payload.work)
        },
        MU_WORK_DEL: (state, payload) => {
            let index = state.workList.indexOf(state.workList.find(f=>f.work_id === payload.work_id))            
            state.workList.splice(index, 1)
        },
        MU_WORK_LIST: (state, payload) => {
            state.workList = payload
        },
    },
    actions: {
        AC_WORK: ({ commit }, payload)=>{
            commit('MU_WORK', payload)
        },
        AC_WORK_PUSH: ({ commit }, payload)=>{
            commit('MU_WORK_PUSH', payload)
        },
        AC_WORK_EDIT: ({ commit }, payload) =>{
            commit('MU_WORK_EDIT', payload)
        },
        AC_WORK_DEL: ({ commit }, payload) =>{
            commit('MU_WORK_DEL', payload)
        },
        AC_WORK_LIST: ({ commit }, payload)=>{
            commit('MU_WORK_LIST', payload)
        },
    },
    getters: {
        GE_WORK: state => state.work,
        GE_WORK_LIST: state => state.workList
    }
}
export default workStore