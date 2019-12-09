export const state = () => ({
    searchEnabled: false
});

export const mutations = {
    toggleSearchPanel(state, status) {
        state.searchEnabled = status
    }
};

export const actions = {
    async nuxtServerInit({ dispatch, commit }, context) {
        await dispatch('getPostsOnRender', context);
        await dispatch('getTagsOnRender', context);
    },
    
    async getPostsOnRender({ commit }, context){
        try {
            const response = await context.app.$axios.get('/api/posts/' +
                                                         (context.query.p ?
                                                             `?p=${context.query.p}&is_published=true`
                                                             : '?is_published=true'));
            commit('posts/setPosts', response.data);
        } catch (e) {
            // if (e.response.status === 404 && context.query.p) {
            //     const response = await context.app.$axios.get('/api/posts/?is_published=true');
            // }
        }
    },
    
    async getTagsOnRender({ commit }, context){
        try {
            // ПОДРАЗУМЕВАЕТСЯ ЧТО ТЕГОВ НЕ БОЛЕЕ 20 И ОНИ УМЕСТЯТСЯ НА 1 СТРАНИЦУ! Не хочу делать отдельный роут.
            const response = await context.$axios.get('/api/tags/' + '?p=1');
            commit('tags/setTags', response.data);
        } catch (e) {
            //ты в дерьме
        }
    },
};
