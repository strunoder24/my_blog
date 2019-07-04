export const actions = {
    async nuxtServerInit({ dispatch, commit }, context) {
        await dispatch('getPostsOnRender', context);
    },
    
    getPostsOnRender({ commit }, context){
        return context.app.$axios
            .get(process.env.baseUrl + '/posts/' + (context.query.p ? `?p=${context.query.p}` : ''))
            .then(response => {
                commit('posts/setPosts', response.data)
            })
            .catch(e => {
                if (e.response) {
                    if (e.response.status === 404 && context.query.p) { // Если страница пагинатора косячная,
                        return context.app.$axios                       // то запрашивай по умолчанию
                            .get(process.env.baseUrl + '/posts/')
                            .then(response => {
                                commit('posts/setPosts', response.data);
                            })
                    }
                }
            })
    },
};
