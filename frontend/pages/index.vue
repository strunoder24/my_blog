<template>
    <div class="main-container">
        <div class="content">
            <PostList :posts="posts.results"></PostList>
        </div>
        <div class="tags-wrapper">
            <md-card class="tags-container"></md-card>
        </div>
        <div class="paginator-container">
            <Paginator
                        :info="posts"
                        :api="'posts'"/>
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    import PostList from '~/components/PostList.vue'

    export default {
        computed: {
            ...mapState({
                posts: state => state.posts.posts,
            })
        },

        components: {
            PostList
        }
    }
</script>

<style lang="sass" scoped>
    .main-container
        display: grid
        grid-gap: 10px
        padding: 10px 0
        grid-template-areas: "c c c s" "c c c s" "p p p p"
        grid-template-columns: 1fr 1fr 1fr 1fr

        @media (max-width: 999px)
            grid-template-areas: "c c c c" "c c c c" "p p p p"


    .content
        grid-area: c
        max-width: 100%


    .tags-wrapper
        grid-area: s
        width: 100%


    .tags-container
        padding: 15px


        @media (max-width: 999px)
            display: none


    .paginator-container
        grid-area: p
</style>