export const state = () => ({
    posts: {}
});


export const mutations = {
    setPosts(state, posts) {
        state.posts = posts;
    },
};


export const actions = {
    async getPosts({commit}, context) {
        try {
            const response = await context.$axios.get(process.env.baseUrl +
                                                      '/posts/' +
                                                      (context.$route.query.p ? `?p=${context.$route.query.p}` : ''));
            commit('setPosts', response.data);
        } catch (e) {
            console.log(e);
        }
    },
    
    async getPostsOnPaginator({commit}, { context, url, page_number }) {
        try {
            const response = await context.$axios.get(url);
            commit('setPosts', response.data);
            context.$router.replace({query: {p: page_number}})
        } catch (e) {
            console.log(e);
        }
    },
};