import vue from 'vue'

export const state = () => ({
    posts: {},
    published_posts: {},
    images: {},
});


export const mutations = {
    setPosts(state, posts) {
        state.posts = posts;
    },
    
    deletePost(state, id) {
        let posts = state.posts.results;
        posts.forEach((post, i) => {
            if (post.id === id) {
                vue.delete(posts, i)
            }
        })
    },
    
    changePublicationStatus(state, post) {
        let posts = state.posts.results;
        posts.forEach((item, i) => {
            if (post.id === item.id) {
                vue.set(posts[i], 'is_published', !post.is_published);
            }
        })
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
    
    async getPublishedPosts({commit}, context){
        try {
            const url = '/posts/' + (context.$route.query.p ?
                                    `?p=${context.$route.query.p}&is_published=true`
                                    : '?is_published=true');
            const response = await context.$axios.get(url);
            commit('setPosts', response.data);
        } catch (e) {
            if (e.response && e.response.status === 404) {
                const response = await context.$axios.get('/posts/');
                commit('setPosts', response.data);
            }
        }
    },
    
    async deletePost({commit}, {context, id}) {
        try {
            const url = '/posts/' + id + '/';
            const response = await context.$axios.delete(url);
            commit('deletePost', id)
        } catch (e) {
            console.log(e);
        }
    },
    
    async publicPostStatus({commit}, {context, post}) {
         try {
            const url = '/posts/' + post.id + '/';
            const response = await context.$axios.patch(url, {
                is_published: !post.is_published
            });
            commit('changePublicationStatus', post)
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