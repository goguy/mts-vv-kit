import standard from '@/js/initData/standard.js'

const TDMOTION_DATA = () => {
  return {
    motion_id: 0,                           	
    name: '',	
    type: '',
    is_outbreak: 'N',
    rmk: '',
    disp_ord: 0,	
    disaster_id: 0,
    img_nm: '',
    img_url: '',    	
    video_nm: '',	
    video_type: '',
    play_time: 0,
    video_url: ''
  }
} 

const tdmotionStore = {
    namespaced: true,
    state: {
        tdmotion: TDMOTION_DATA(),
        tdmotionList: standard.getTdmotionList()
    },
    mutations: {
      MU_TDMOTION: (state, payload) => {
        state.tdmotion = payload
      },
      MU_TDMOTION_PUSH: (state, payload) => {
          state.tdmotionList.push(payload)
      }, 
      MU_TDMOTION_LIST: (state, payload) => {
          state.tdmotionList = payload
      },
      MU_TDMOTION_EDIT: (state, payload) => {
        let index = state.tdmotionList.indexOf(state.tdmotionList.find(f=>f.motion_id === payload.tdmotion.motion_id))
        Object.assign(state.tdmotionList[index], payload.tdmotion)
      },
      MU_TDMOTION_DEL: (state, payload) => {
        let index = state.tdmotionList.indexOf(state.tdmotionList.find(f=>f.motion_id === payload.motion_id))
        state.tdmotionList.splice(index, 1)
      },

    },
    actions: {
      AC_TDMOTION: ({ commit }, payload)=>{
        commit('MU_TDMOTION', payload)
      },
      AC_TDMOTION_PUSH: ({ commit }, payload)=>{
          commit('MU_TDMOTION_PUSH', payload)
      },
      AC_TDMOTION_LIST: ({ commit }, payload)=>{
          commit('MU_TDMOTION_LIST', payload)
      },
      AC_TDMOTION_EDIT: ({ commit }, payload) =>{
          commit('MU_TDMOTION_EDIT', payload)
      },
      AC_TDMOTION_DEL: ({ commit }, payload) =>{
          commit('MU_TDMOTION_DEL', payload)
      },
    },
    getters: {
        GE_TDMOTION: state => state.tdmotion,
        GE_TDMOTION_LIST: state => state.tdmotionList
    }
}
export default tdmotionStore