import standard from '@/js/initData/standard.js'

const DISASTER_DATA = () => {
    return {
        disaster_id: 0,	
        name: '',
        rate: '',
        rmk: ''
    }
} 

const disasterStore = {
    namespaced: true,
    state: {
        disaster: DISASTER_DATA(),
        disasterList: standard.getDisasterList()
        /*
        disasterList: []
        disasterList: [
                {
                disaster_id: 0,	
                name: '무재해',
                rate: '',
                rmk: '재해없음'
                },
                {
                disaster_id: 1,	
                name: '질식/중독',
                rate: '',
                rmk: '음식, 약물, 가스 등에 의한 중독이나 질식된 상해'
                },
                {
                disaster_id: 2,	
                name: '골절',	
                rate: '',
                rmk: '뼈가 부러진 상태'
                },
                {
                disaster_id: 3,	
                name: '동상',	
                rate: '',
                rmk: '저온물 접촉으로 생긴 동상 상해'
                },
                {
                disaster_id: 4,	
                name: '자상',	
                rate: '',
                rmk: '칼날 등 날카로운 물건에 찔린 상해'
                },
                {
                disaster_id: 5,	
                name: '좌상',	
                rate: '',
                rmk: '타박, 충돌, 추락등으로 피부 표면보다는 피하조직 또는 근육부를 다친 상해'
                },
                {
                disaster_id: 6,	
                name: '절상',	
                rate: '',	
                rmk: '신체부위가 절단된 상태'
                },
                {
                disaster_id: 7,	
                name: '찰과상',	
                rate: '',
                rmk: '스치거나 문질러서 벗겨진 상태'
                },
                {
                disaster_id: 8,	
                name: '창상',	
                rate: '',
                rmk: '창, 칼 등에 배인 상태'
                },
                {
                disaster_id: 9,	
                name: '화상',	
                rate: '',
                rmk: '화재 또는 고온물 접촉으로 인한 상해'
                },
                {
                disaster_id: 10,	
                name: '청력장애',	
                rate: '',
                rmk: '청력이 감되 또는 난청이 된 상해'
                },
                {
                disaster_id: 11,	
                name: '시력장애',	
                rate: '',
                rmk: '시력이 감퇴 또는 실명된 상해'
                },
                {
                disaster_id: 12,	
                name: '익사',	
                rate: '',
                rmk: '물에 빠져 호흡 불가능으로 사망'
                },
                {
                disaster_id: 13,	
                name: '피부병',	
                rate: '',
                rmk: '피부에 발생한 질환'
                },
                {
                disaster_id: 90,	
                name: '미비',	
                rate: '',
                rmk: '상해정도가 미비'
                },
            ]
            */
        },
    mutations: {
        MU_DISASTER: (state, payload) => {
            state.disaster = payload
        },
        MU_DISASTER_PUSH: (state, payload) => {
            state.disasterList.push(payload)
        }, 
        MU_DISASTER_LIST: (state, payload) => {
            state.disasterList = payload
        },
        MU_DISASTER_EDIT: (state, payload) => {
            let index = state.disasterList.indexOf(state.disasterList.find(f=>f.disaster_id === payload.disaster.disaster_id))
            Object.assign(state.disasterList[index], payload.disaster)
        },
        MU_DISASTER_DEL: (state, payload) => {
            let index = state.disasterList.indexOf(state.disasterList.find(f=>f.disaster_id === payload.disaster_id))            
            state.disasterList.splice(index, 1)
        },
    
    },
    actions: {
        AC_DISASTER: ({ commit }, payload)=>{
            commit('MU_DISASTER', payload)
        },
        AC_DISASTER_PUSH: ({ commit }, payload)=>{
            commit('MU_DISASTER_PUSH', payload)
        },
        AC_DISASTER_LIST: ({ commit }, payload)=>{
            commit('MU_DISASTER_LIST', payload)
        },
        AC_DISASTER_EDIT: ({ commit }, payload) =>{
            commit('MU_DISASTER_EDIT', payload)
        },
        AC_DISASTER_DEL: ({ commit }, payload) =>{
            commit('MU_DISASTER_DEL', payload)
        },
    
    },
    getters: {
        GE_DISASTER: state => state.disaster,
        GE_DISASTER_LIST: state => state.disasterList
    }
}
export default disasterStore