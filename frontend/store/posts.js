export const state = () => ({
    posts: {}
});


export const mutations = {
    setPosts(state, posts) {
        state.posts = posts;
    },
};


export const actions = {
    getPosts({commit}, context) {
        return new Promise((res, rej) => {
            context.$axios
                .get(process.env.baseUrl + '/posts/' + (context.$route.query.p ? `?p=${context.$route.query.p}` : ''))
                .then(response => {
                    commit('setPosts', response.data);
                    res()
                })
                .catch(e => {
                    console.log(e);
                    res()
                })
        })
    },
    
    getPostsOnPaginator({commit}, { context, url, page_number }) {
        context.$axios.get(url)
            .then(response => {
                    commit('setPosts', response.data);
                    context.$router.replace({query: {p: page_number}})
                })
            .catch(e => console.log(e))
    },
};