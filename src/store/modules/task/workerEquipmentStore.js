const workerEquipmentStore = {
    namespaced: true,
    state: {
        workerEquipmentList: []
    },
    mutations: {
        MU_WORKER_EQUIPMENT_PUSH: (state, payload) => {
            state.workerEquipmentList.push(payload)   
        },
        MU_WORKER_EQUIPMENT_DEL: (state, payload) => {
            let index = state.workerEquipmentList.indexOf(state.workerEquipmentList.find(f=> (f.equipment_id === payload.equipment_id && f.worker_id === payload.worker_id ) ))
            //console.log('index : ' + index)
            if(index > -1)
                state.workerEquipmentList.splice(index, 1)
        },
        MU_WORKER_EQUIPMENT_LIST: (state, payload) => {
            state.workerEquipmentList = payload
        }
    },
    actions: {
        AC_WORKER_EQUIPMENT_PUSH: ({ commit }, payload)=>{
            commit('MU_WORKER_EQUIPMENT_PUSH', payload)
        },
        AC_WORKER_EQUIPMENT_DEL: ({ commit }, payload)=>{
            commit('MU_WORKER_EQUIPMENT_DEL', payload)
        },
        AC_WORKER_EQUIPMENT_LIST: ({ commit }, payload)=>{
            commit('MU_WORKER_EQUIPMENT_LIST', payload)
        }
    },
    getters: {
        GE_WORKER_EQUIPMENT_LIST: state => state.workerEquipmentList
    }
}
export default workerEquipmentStore