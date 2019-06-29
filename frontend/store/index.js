export const actions = {
    async nuxtServerInit({ dispatch, commit }, context) {
        await dispatch('getPosts', context);
        await dispatch('getUserInfo', context);
    },
    
    getPosts({ commit }, context){
        return context.app.$axios
            .get(process.env.baseUrl + '/posts/')
            .then(response => {
                commit('posts/setPosts', response.data)
            })
            .catch(e => {
                console.log(e);
            })
    },
    
    getUserInfo({commit}, context) {
        return context.app.$axios
            .get(process.env.baseUrl + '/user-info/')
            .then(response => {
                commit('accounts/setInfo', response.data)
            })
            .catch(e => {
                console.log(e);
            })
    }
};
