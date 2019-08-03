import vue from 'vue'


export const state = () => ({
    tags: {}
});


export const mutations = {
    setTags(state, tags) {
        state.tags = tags;
    },
    
    changeTagValue(state, {id, value}) {
        const collection = state.tags.results;
        for (let i = 0; i < collection.length; i++) {
            if (collection[i].id === id) {
                vue.set(collection[i], 'name', value);
                return
            }
        }
    }
};


export const actions = {
    async getTags({commit}, context){
        try {
            let is_admin = context.$route.name === 'admin-tags';
            let has_page = context.$route.query.p;
            console.log('hey', is_admin, has_page);
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
            
            const response = await context.$axios.get(`/tags/${params}`);
            commit('setTags', response.data);
        } catch (e) {
            console.log(e);
        }
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