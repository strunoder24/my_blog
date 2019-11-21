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
            let token = localStorage.getItem('token');
            
            const response = await context.$axios.get('/auth/user-info/', {
                headers: {
                    "jwt": token
                }
            });
            commit('setInfo', response.data);
        } catch (e) {
            console.log(e);
        }
    }
};