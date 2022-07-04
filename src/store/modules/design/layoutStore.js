const layoutStore = {
    namespaced: true,
    state: {
        drawer: null,
        tree: {
            open: [],
            active: []
        }
    },
    mutations: {
        MU_DRAWER: (state, payload) => {
            state.drawer = payload
        },
        MU_TREE: (state, payload) => {
            state.tree = payload
        },
    },
    actions: {
        AC_DRAWER: ({ commit }, payload)=>{
            commit('MU_DRAWER', payload)
        },
        AC_TREE: ({ commit }, payload)=>{
            commit('MU_TREE', payload)
        },
    },
    getters: {
        GE_DRAWER: state => state.drawer,
        GE_TREE: state => state.tree,
    }
}
export default layoutStore