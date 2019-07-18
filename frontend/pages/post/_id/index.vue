<template>
    <div>{{ post.title }}</div>
</template>

<script>
    import { mapState } from 'vuex'

    export default {
        async fetch(context){
            await context.store.dispatch('posts/getPublishedPost', context)
        },

        computed: {
            ...mapState({
                post: state => state.posts.post
            })
        }
    }
</script>

<style lang="sass" scoped>

</style>