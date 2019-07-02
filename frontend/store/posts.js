export const state = () => ({
    posts: {}
});


export const mutations = {
    setPosts(state, posts) {
        state.posts = posts;
    },
};


export const actions = {
    getPostsOnPaginator({commit}, { context, url, page_number }) {
        context.$axios.get(url)
            .then(response => {
                    commit('setPosts', response.data);
                    context.$router.replace({query: {p: page_number}})
                })
            .catch(e => console.log(e))
    },
};