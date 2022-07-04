import standard from '@/js/initData/standard.js'

const ACTIVITY_DATA = () => {
    return {
        activity_id: 0,	
        parent_id: 0,	
        name: '',	
        level: 0,	
        source: '',	
        type: '',	
        rmk: ''
    }
}

const activityStore = {
    namespaced: true,
    state: {
        activity: ACTIVITY_DATA(),
        activityList: standard.getActivityList()
        /*
        activityList: []
        activityList:  [
            {
                activity_id: 1,	
                parent_id: 0,	
                name: 'MTS',	
                defth: 0,	
                leaf_yn: 'N',	
                type: 'root',	
                rmk: 'SYSTEM명',
                path: ''
            },{
                activity_id: 2,	
                parent_id: 0,	
                name: '홈',	
                defth: 0,	
                leaf_yn: 'N',	
                type: 'info',	
                rmk: '홈',
                path: ''
            },{
                activity_id: 3,	
                parent_id: 0,	
                name: '정비작업선택',	
                defth: 0,	
                leaf_yn: 'N',	
                type: 'check',	
                rmk: '정비작업선택',
                path: ''
            },{
                activity_id: 4,	
                parent_id: 0,	
                name: '교육생정보입력',	
                defth: 0,	
                leaf_yn: 'N',	
                type: 'form',	
                rmk: '교육생정보입력',
                path: ''
            },{
                activity_id: 5,	
                parent_id: 0,	
                name: '작업준비',	
                defth: 0,	
                leaf_yn: 'Y',	
                type: 'folder',	
                rmk: '작업준비',
                path: ''
            },{
                activity_id: 6,	
                parent_id: 5,	
                name: '작업가이드',	
                defth: 1,	
                leaf_yn: 'N',	
                type: 'agree',	
                rmk: '작업가이드',
                path: ''
            },{
                activity_id: 7,	
                parent_id: 5,	
                name: '작업허가서',	
                defth: 1,	
                leaf_yn: 'N',	
                type: 'agree',	
                rmk: '작업허가서'
            },{
                activity_id: 8,	
                parent_id: 5,	
                name: '보호구선택',	
                defth: 1,	
                leaf_yn: 'N',	
                type: 'check',	
                rmk: '보호구선택',
                path: ''
            },{
                activity_id: 9,	
                parent_id: 5,	
                name: '안전장비선택',	
                defth: 1,	
                leaf_yn: 'N',	
                type: 'check',	
                rmk: '안전장비선택',
                path: ''
            },{
                activity_id: 10,	
                parent_id: 0,	
                name: '작업하기',	
                defth: 0,	
                leaf_yn: 'Y',	
                type: 'folder',	
                rmk: '작업하기',
                path: ''
            },{
                activity_id: 11,	
                parent_id: 10,	
                name: '표준작업',	
                defth: 1,	
                leaf_yn: 'N',	
                type: 'watch',	
                rmk: '표준작업',
                path: ''
            },{
                activity_id: 12,	
                parent_id: 10,	
                name: '장비확인작업',	
                defth: 1,	
                leaf_yn: 'N',	
                type: 'watch',	
                rmk: '장비확인작업',
                path: ''
            },{
                activity_id: 13,	
                parent_id: 0,	
                name: '작업보고서',	
                defth: 0,	
                leaf_yn: 'N',	
                type: 'report',	
                rmk: '작업보고서',
                path: ''
            }
        ]
        */
    },
    mutations: {
        MU_ACTIVITY: (state, payload) => {
            state.activity = payload
        },
        MU_ACTIVITY_PUSH: (state, payload) => {
            state.activityList.push(payload)
        }, 
        MU_ACTIVITY_LIST: (state, payload) => {
            state.activityList = payload
        },
        MU_ACTIVITY_EDIT: (state, payload) => {
            let index = state.activityList.indexOf(state.activityList.find(f=>f.activity_id === payload.activity.activity_id))
            Object.assign(state.activityList[index], payload.activity)
        },
        MU_ACTIVITY_DEL: (state, payload) => {
            let index = state.activityList.indexOf(state.activityList.find(f=>f.activity_id === payload.activity_id))
            state.activityList.splice(index, 1)
        },
    },
    actions: {
        AC_ACTIVITY: ({ commit }, payload)=>{
            commit('MU_ACTIVITY', payload)
        },
        AC_ACTIVITY_PUSH: ({ commit }, payload)=>{
            commit('MU_ACTIVITY_PUSH', payload)
        },
        AC_ACTIVITY_LIST: ({ commit }, payload)=>{
            commit('MU_ACTIVITY_LIST', payload)
        },
        AC_ACTIVITY_EDIT: ({ commit }, payload) =>{
            commit('MU_ACTIVITY_EDIT', payload)
        },
        AC_ACTIVITY_DEL: ({ commit }, payload) =>{
            commit('MU_ACTIVITY_DEL', payload)
        },    
    },
    getters: {
        GE_ACTIVITY: state => state.activity,
        GE_ACTIVITY_LIST: state => state.activityList
    }
}
export default activityStore