export const actions = {
    nuxtServerInit(vuexContext, context) {
        return context.app.$axios
            .get(process.env.baseUrl + '/posts/')
            .then(response => {
                vuexContext.commit('posts/setPosts', response.data)
            })
            .catch(e => {
                console.log(e);
            })
    },
};
