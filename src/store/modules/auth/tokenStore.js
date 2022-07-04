const TOKEN_DATA = () => {
    return {
      email: 'admin@yullin.com',
      accessToken: null,
      refreshToken: null,
    }
  } 

const tokenStore = {
    namespaced: true,
    state: {
        token: TOKEN_DATA(),
    },
    mutations: {
        MU_TOKEN: (state, payload) => {
            state.token = payload
        },
    },
    actions: {
        AC_TOKEN: ({ commit }, payload)=>{
            commit('MU_TOKEN', payload)
        },
    },
    getters: {
        GE_TOKEN: state => state.token,
    }
}
export default tokenStore