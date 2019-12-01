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
                    "token": token
                }
            });
            commit('setInfo', response.data);
        } catch (e) {
            console.log(e);
        }
    },
    
    logout({commit}, context) {
        context.$axios.post('/auth/logout')
            .then(() => {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
    
                commit('setInfo', {});
                context.$router.push('/')
            })
    }
};