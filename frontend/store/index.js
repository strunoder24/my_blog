export const actions = {
    async nuxtServerInit({ dispatch, commit }, context) {
        await dispatch('getPostsOnRender', context);
    },
    
    async getPostsOnRender({ commit }, context){
        try {
            const response = await context.app.$axios.get('/posts/' +
                                                         (context.query.p ? `?p=${context.query.p}` : ''));
            commit('posts/setPosts', response.data);
        } catch (e) {
            if (e.response.status === 404 && context.query.p) {
                const response = await context.app.$axios.get('/posts/');
                commit('posts/setPosts', response.data);
            }
        }
        
        // Тоже самое но на промисвх
        // return context.app.$axios
        //     .get('/posts/' + (context.query.p ? `?p=${context.query.p}` : ''))
        //     .then(response => {
        //         commit('posts/setPosts', response.data)
        //     })
        //     .catch(e => {
        //         if (e.response) {
        //             if (e.response.status === 404 && context.query.p) { // Если страница пагинатора косячная,
        //                 return context.app.$axios                       // то запрашивай по умолчанию
        //                     .get('/posts/')
        //                     .then(response => {
        //                         commit('posts/setPosts', response.data);
        //                     })
        //             }
        //         }
        //     })
    },
};
