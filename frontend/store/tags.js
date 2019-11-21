import vue from 'vue'

export const state = () => ({
    tags: {}
});


export const mutations = {
    setTags(state, tags) {
        state.tags = tags;
    },
};


export const actions = {
    async getTags({commit}, context){
        try {
            let is_admin = context.$route.name === 'admin-tags';
            let has_page = context.$route.query.p;
            let params = '';
            
            if (has_page && is_admin) {
                params = `?p=${context.$route.query.p}&is_admin=true`
            }
            else if (has_page) {
                params = `?p=${context.$route.query.p}`
            }
            else if (is_admin) {
                params = '?is_admin=true'
            }
            
            const { data } = await context.$axios.get(`/api/tags/${params}`);
            commit('setTags', data);
        } catch (e) {
            console.log(e);
        }
    },
    
    async changeTag({commit, dispatch}, { context, tag }) {
        await context.$axios.put(`/api/tags/${tag._id}`, {name: tag.name});
        dispatch('getTags', context);
    },
    
    async deleteTag({commit, dispatch}, {context, tag}) {
        await context.$axios.delete(`/api/tags/${tag._id}`);
        dispatch('getTags', context);
    },
    
    async getTagsOnPaginator({commit}, { context, url, page_number }) {
        try {
            const response = await context.$axios.get(url);
            commit('setTags', response.data);
            context.$router.replace({query: {p: page_number}});
            context.$axios.get(url)
        } catch (e) {
            console.log(e);
        }
    },
};