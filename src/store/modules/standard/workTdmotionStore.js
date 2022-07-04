import standard from '@/js/initData/standard.js'

const WORK_TDMOTION_DATA = () => {
    return {
        work_id: 0,	
        motion_id: 0,	
        disp_ord: 0,	
        type: ''
    }
}

const workTdmotionStore = {
    namespaced: true,
    state: {
        workTdmotion: WORK_TDMOTION_DATA(),
        workTdmotionList: standard.getWorkTdmotionList()
        /*
        workTdmotionList: []
        workTdmotionList:  [
            {
                work_id: 1,	
                motion_id: 1,	
                type: 'normal'
            },
            {
                work_id: 1,	
                motion_id: 2,	
                type: 'normal'
            },
            {
                work_id: 1,	
                motion_id: 3,	
                type: 'normal'
            },
            {
                work_id: 1,	
                motion_id: 4,	
                type: 'normal'
            },
            {
                work_id: 1,	
                motion_id: 5,	
                type: 'normal'
            },
            {
                work_id: 1,	
                motion_id: 12,	
                type: 'equipment'
            },
            {
                work_id: 1,	
                motion_id: 13,	
                type: 'equipment'
            },
            {
                work_id: 2,	
                motion_id: 6,	
                type: 'normal'
            },
            {
                work_id: 2,	
                motion_id: 7,	
                type: 'normal'
            },
            {
                work_id: 2,	
                motion_id: 8,	
                type: 'normal'
            },
            {
                work_id: 2,	
                motion_id: 9,	
                type: 'normal'
            },
            {
                work_id: 2,	
                motion_id: 10,	
                type: 'normal'
            },
            {
                work_id: 2,	
                motion_id: 12,	
                type: 'equipment'
            },
            {
                work_id: 2,	
                motion_id: 13,	
                type: 'equipment'
            },
            {
                work_id: 2,	
                motion_id: 14,	
                type: 'equipment'
            },
            {
                work_id: 1,	
                motion_id: 1,	
                type: 'outbreak'
            },
            {
                work_id: 1,	
                motion_id: 2,	
                type: 'outbreak'
            },
            {
                work_id: 1,	
                motion_id: 11,	
                type: 'outbreak'
            },
            {
                work_id: 1,	
                motion_id: 3,	
                type: 'outbreak'
            },
            {
                work_id: 1,	
                motion_id: 4,	
                type: 'outbreak'
            },
            {
                work_id: 1,	
                motion_id: 5,	
                type: 'outbreak'
            },
            {
                work_id: 2,	
                motion_id: 6,	
                type: 'outbreak'
            },
            {
                work_id: 2,	
                motion_id: 7,	
                type: 'outbreak'
            },
            {
                work_id: 2,	
                motion_id: 8,	
                type: 'outbreak'
            },
            {
                work_id: 2,	
                motion_id: 9,	
                type: 'outbreak'
            },
            {
                work_id: 2,	
                motion_id: 11,	
                type: 'outbreak'
            },
            {
                work_id: 2,	
                motion_id: 10,	
                type: 'outbreak'
            }        
        ]
        */
        
    },
    mutations: {
        MU_WORK_TDMOTION: (state, payload) => {
            state.workTdmotion = payload
        },
        MU_WORK_TDMOTION_PUSH: (state, payload) => {
            state.workTdmotionList.push(payload)
        }, 
        MU_WORK_TDMOTION_LIST: (state, payload) => {
            state.workTdmotionList = payload
        },
        MU_WORK_TDMOTION_EDIT: (state, payload) => {
            let index = state.workTdmotionList.indexOf(state.workTdmotionList.find(f=>(f.work_id === payload.workTdmotion.work_id && f.motion_id === payload.workTdmotion.motion_id)))
            Object.assign(state.workTdmotionList[index], payload.workTdmotion)
        },
        MU_WORK_TDMOTION_DEL: (state, payload) => {
            let index = state.workTdmotionList.indexOf(state.workTdmotionList.find(f=>(f.work_id === payload.work_id && f.motion_id === payload.motion_id )))
            state.workTdmotionList.splice(index, 1)
        },    

    },
    actions: {
        AC_WORK_TDMOTION: ({ commit }, payload)=>{
            commit('MU_WORK_TDMOTION', payload)
        },
        AC_WORK_TDMOTION_PUSH: ({ commit }, payload)=>{
            commit('MU_WORK_TDMOTION_PUSH', payload)
        },
        AC_WORK_TDMOTION_LIST: ({ commit }, payload)=>{
            commit('MU_WORK_TDMOTION_LIST', payload)
        },
        AC_WORK_TDMOTION_EDIT: ({ commit }, payload) =>{
            commit('MU_WORK_TDMOTION_EDIT', payload)
        },
        AC_WORK_TDMOTION_DEL: ({ commit }, payload) =>{
            commit('MU_WORK_TDMOTION_DEL', payload)
        },
    },
    getters: {
        GE_WORK_TDMOTION: state => state.workTdmotion,
        GE_WORK_TDMOTION_LIST: state => state.workTdmotionList
    }
}
export default workTdmotionStore