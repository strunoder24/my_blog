<template>
    <div class="main-container">
        <div class="posts"
             v-for="post in posts"
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
    .main-container
        @media (min-width: 1000px)
            margin: 0 62px

        @media (max-width: 999px)
            margin: 0 25px
</style>