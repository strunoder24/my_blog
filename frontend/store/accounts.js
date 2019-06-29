export const state = () => ({
    'user-info': {}
});

export const mutations = {
    setInfo: (state, info) => {
        state['user-info'] = info
    }
};