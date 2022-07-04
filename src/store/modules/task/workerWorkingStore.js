const WORKER_WORKING_DATA = () => {
    return {
      worker_health_guage: 100,
      oxygen_density_guage: 100,
      oxygen_density_value: 20,
      player_list_current_index: 0,
      outbreak_situation_play_Index: 0,
      worker_id: 0,
      overlay: false,
      isAllStopFlag: false,
    }
  } 

const workerWorkingStore = {
    namespaced: true,
    state: {
        workerWorking: WORKER_WORKING_DATA()
    },
    mutations: {
        MU_WORKER_WORKING: (state, payload) => {
            state.workerWorking = payload
        },
    },
    actions: {
        AC_WORKER_WORKING: ({ commit }, payload)=>{
            commit('MU_WORKER_WORKING', payload)
        },

    },
    getters: {
        GE_WORKER_WORKING: state => state.workerWorking
    }
}
export default workerWorkingStore