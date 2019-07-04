export const state = () => ({
    'user-info': {}
});

export const mutations = {
    setInfo: (state, info) => {
        state['user-info'] = info
    },
};

export const actions = {
    getUserInfo({commit}, context) {
        return new Promise((res, rej) => {
            context.$axios
                .get(process.env.baseUrl + '/user-info/')
                .then(response => {
                    commit('setInfo', response.data);
                    res()
                })
                .catch(e => {
                    context.$router.push('404');
                    console.log(e);
                    res()
                })
        });
    }
};