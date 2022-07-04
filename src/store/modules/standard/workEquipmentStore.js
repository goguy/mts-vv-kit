import standard from '@/js/initData/standard.js'

const WORK_EQUIPMENT_DATA = () => {
    return {
        work_id: 0,		
        equipment_id: 0
    }
}

const workEquipmentStore = {
    namespaced: true,
    state: {
        workEquipment: WORK_EQUIPMENT_DATA(),
        workEquipmentList: standard.getWorkEquipmentList()
        /*
        workEquipmentList: []
        workEquipmentList:  [
                {    
                    work_id: 1,		
                    equipment_id: 1
                },
                {    
                    work_id: 1,		
                    equipment_id: 2
                },
                {    
                    work_id: 1,		
                    equipment_id: 3
                },
                {    
                    work_id: 1,		
                    equipment_id: 6
                },
                {    
                    work_id: 1,		
                    equipment_id: 7
                },
                {    
                    work_id: 1,		
                    equipment_id: 9
                },
                {    
                    work_id: 1,		
                    equipment_id: 12
                },
                {    
                    work_id: 1,		
                    equipment_id: 15
                },
                {            
                    work_id: 1,		
                    equipment_id: 16
                },
                {    
                    work_id: 1,		
                    equipment_id: 17
                },
                {    
                    work_id: 1,		
                    equipment_id: 30
                },
                {    
                    work_id: 1,		
                    equipment_id: 31
                },
                {    
                    work_id: 1,		
                    equipment_id: 32
                },
                {    
                    work_id: 1,		
                    equipment_id: 33
                },
                {    
                    work_id: 1,		
                    equipment_id: 34
                },
                {    
                    work_id: 1,		
                    equipment_id: 35
                },
                {    
                    work_id: 1,		
                    equipment_id: 36
                },
                {    
                    work_id: 2,		
                    equipment_id: 1
                },
                {    
                    work_id: 2,		
                    equipment_id: 2
                },
                {    
                    work_id: 2,		
                    equipment_id: 3
                },
                {    
                    work_id: 2,		
                    equipment_id: 4
                },
                {    
                    work_id: 2,		
                    equipment_id: 5
                },
                {    
                    work_id: 2,		
                    equipment_id: 6
                },
                {    
                    work_id: 2,		
                    equipment_id: 7
                },
                {    
                    work_id: 2,		
                    equipment_id: 11
                },
                {    
                    work_id: 2,		
                    equipment_id: 12
                },
                {    
                    work_id: 2,		
                    equipment_id: 15
                },
                {    
                    work_id: 2,		
                    equipment_id: 16
                },
                {    
                    work_id: 2,		
                    equipment_id: 17
                },
                {    
                    work_id: 2,		
                    equipment_id: 37
                },
                {    
                    work_id: 2,		
                    equipment_id: 38
                },
                {    
                    work_id: 2,		
                    equipment_id: 39
                },
                {    
                    work_id: 2,		
                    equipment_id: 40
                },
                {    
                    work_id: 2,		
                    equipment_id: 41
                },
                {    
                    work_id: 2,		
                    equipment_id: 42
                },
                {    
                    work_id: 2,		
                    equipment_id: 43
                },
                {    
                    work_id: 2,		
                    equipment_id: 44
                },
                {    
                    work_id: 2,		
                    equipment_id: 45                    
                }
            ]  
        */      
            
    },
    mutations: {
        MU_WORK_EQUIPMENT: (state, payload) => {
            state.workEquipment = payload
        },
        MU_WORK_EQUIPMENT_PUSH: (state, payload) => {
            state.workEquipmentList.push(payload)
        }, 
        MU_WORK_EQUIPMENT_LIST: (state, payload) => {
            state.workEquipmentList = payload
        },
        MU_WORK_EQUIPMENT_EDIT: (state, payload) => {
            let index = state.workEquipmentList.indexOf(state.workEquipmentList.find(f=>(f.work_id === payload.workEquipment.work_id && f.equipment_id === payload.workEquipment.equipment_id)))
            Object.assign(state.workEquipmentList[index], payload.workEquipment)
        },
        MU_WORK_EQUIPMENT_DEL: (state, payload) => {
            let index = state.workEquipmentList.indexOf(state.workEquipmentList.find(f=>(f.work_id === payload.work_id && f.equipment_id === payload.equipment_id )))
            state.workEquipmentList.splice(index, 1)
        },    
    
    },
    actions: {
        AC_WORK_EQUIPMENT: ({ commit }, payload)=>{
            commit('MU_WORK_EQUIPMENT', payload)
        },
        AC_WORK_EQUIPMENT_PUSH: ({ commit }, payload)=>{
            commit('MU_WORK_EQUIPMENT_PUSH', payload)
        },
        AC_WORK_EQUIPMENT_LIST: ({ commit }, payload)=>{
            commit('MU_WORK_EQUIPMENT_LIST', payload)
        },
        AC_WORK_EQUIPMENT_EDIT: ({ commit }, payload) =>{
            commit('MU_WORK_EQUIPMENT_EDIT', payload)
        },
        AC_WORK_EQUIPMENT_DEL: ({ commit }, payload) =>{
            commit('MU_WORK_EQUIPMENT_DEL', payload)
        },    
    },
    getters: {
        GE_WORK_EQUIPMENT: state => state.workEquipment,
        GE_WORK_EQUIPMENT_LIST: state => state.workEquipmentList
    }
}
//namespaced : 각 파일별로 네임스페이스를 지정하여, 해당 파일의 상태, 변이, 액션, getter을 사용하겠다고 명시하는 문구입니다.
export default workEquipmentStore