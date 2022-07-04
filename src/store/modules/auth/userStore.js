const USER_DATA = () => {
    return {
      email: 'admin@yullin.com',
      name: '대박열린',
      password: '1',
      agree: true,
      limits:0,
      role: 'Admin',
      reg_dt: '',
    }
  } 

const userStore = {
    namespaced: true,
    state: {
        user: USER_DATA(),
        userList: []
    },
    mutations: {
        MU_USER: (state, payload) => {
            state.user = payload
        },
        MU_USER_PUSH: (state, payload) => {
            state.userList.push(payload)
        },
        MU_USER_EDIT: (state, payload) => {
            let index = state.userList.indexOf(state.userList.find(f=>f.email === payload.user.email))
            Object.assign(state.userList[index], payload.user)
        },
        MU_USER_DEL: (state, payload) => {
            let index = state.userList.indexOf(state.userList.find(f=>f.email === payload.email))            
            state.userList.splice(index, 1)
        },
        MU_USER_LIST: (state, payload) => {
            state.userList = payload
        },

    },
    actions: {
        AC_USER: ({ commit }, payload)=>{
            commit('MU_USER', payload)
        },
        AC_USER_PUSH: ({ commit }, payload)=>{
            commit('MU_USER_PUSH', payload)
        },
        AC_USER_EDIT: ({ commit }, payload) =>{
            commit('MU_USER_EDIT', payload)
        },
        AC_USER_DEL: ({ commit }, payload) =>{
            commit('MU_USER_DEL', payload)
        },
        AC_USER_LIST: ({ commit }, payload)=>{
            commit('MU_USER_LIST', payload)
        },

    },
    getters: {
        GE_USER: state => state.user,
        GE_USER_LIST: state => state.userList
    }
}
export default userStore