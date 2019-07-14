export const actions = {
    async nuxtServerInit({ dispatch, commit }, context) {
        await dispatch('getPostsOnRender', context);
    },
    
    async getPostsOnRender({ commit }, context){
        try {
            const response = await context.app.$axios.get('/posts/' +
                                                         (context.query.p ?
                                                             `?p=${context.query.p}&is_published=true`
                                                             : '?is_published=true'));
            commit('posts/setPosts', response.data);
        } catch (e) {
            if (e.response.status === 404 && context.query.p) {
                const response = await context.app.$axios.get('/posts/?is_published=true');
            }
        }
    },
};
