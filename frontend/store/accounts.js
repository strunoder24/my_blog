export const state = () => ({
    'user-info': {}
});

export const mutations = {
    setInfo: (state, info) => {
        state['user-info'] = info
    },
};

export const actions = {
    async getUserInfo({ commit }, context) {
        try {
            const response = await context.$axios.get(process.env.baseUrl + '/user-info/');
            commit('setInfo', response.data);
        } catch (e) {
            console.log(e);
        }
    }
};