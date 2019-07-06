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
            const url = '/posts/' + (context.$route.query.p ? `?p=${context.$route.query.p}` : '');
            const response = await context.$axios.get(url);
            commit('setPosts', response.data);
        } catch (e) {
            if (e.response && e.response.status === 404) {
                const response = await context.$axios.get('/posts/');
                commit('setPosts', response.data);
            }
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