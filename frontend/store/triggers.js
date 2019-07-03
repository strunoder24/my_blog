export const state = () => ({
    createTag: '',
});

export const mutations = {
    triggerCreateTag(state) {
        state.createTag = Math.random();
    }
};