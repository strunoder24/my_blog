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
    getTags({commit}, { context }){
        context.$axios.get(process.env.baseUrl + '/tags/' + (context.$route.query.p ? `?p=${context.$route.query.p}` : ''))
            .then(response => {
                    commit('setTags', response.data);
                })
            .catch(e => console.log(e))
    },
    
    getTagsOnPaginator({commit}, { context, url, page_number }) {
        context.$axios.get(url)
            .then(response => {
                    commit('setTags', response.data);
                    context.$router.replace({query: {p: page_number}})
                })
            .catch(e => console.log(e))
    },
};