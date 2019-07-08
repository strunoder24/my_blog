export const state = () => ({
    posts: {},
    images: {},
});


export const mutations = {
    setPosts(state, posts) {
        state.posts = posts;
    },
    
    setImages(state, images) {
        state.images = images;
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
    
    
    async getImages({commit}, context) {
        try {
            const url = '/images/';
            const response = await context.$axios.get(url);
            commit('setImages', response.data);
        } catch (e) {
            console.log(e);
        }
    },
    
    async getImagesOnPaginator({commit}, { context, url, page_number }) {
        try {
            const response = await context.$axios.get(url);
            commit('setImages', response.data);
        } catch (e) {
            console.log(e);
        }
    },
};