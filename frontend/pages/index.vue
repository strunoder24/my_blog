<template>
    <div class="main-container">
        <div class="posts"
             v-for="post in posts.results"
             :key="post.id">
            <post :post="post"></post>
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    import Post from '~/components/Post.vue'

    export default {
        computed: {
            ...mapState({
                posts: state => state.posts.posts,
            })
        },

        components: {
            'Post': Post
        }
    }
</script>

<style lang="sass" scoped>
</style>