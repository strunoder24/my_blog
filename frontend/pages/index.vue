<template>
    <div class="main-container">
        <div class="content">
            <md-card class="tag-results" v-if="$route.query.t">
                <h1>Результаты по тегу: {{ $route.query.t }}</h1>
                <Button @click="toAllPosts">Вернутся к списку постов</Button>
            </md-card>
            <PostList :posts="posts.results"></PostList>
        </div>
        <div class="tags-wrapper">
            <PopularTags/>
        </div>
        <div class="paginator-container">
            <Paginator
                        v-if="posts.pages_count > 1"
                        :info="posts"
                        :api="'posts'"/>
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    import PostList from '~/components/PostList.vue'
    import PopularTags from '~/components/partials/PopularTags.vue'

    export default {
        computed: {
            ...mapState({
                posts: state => state.posts.posts,
            })
        },

        mounted() {
            if (this.$route.query.t) {
                this.$store.dispatch('posts/getPostsOnTags', this)
            }
        },

        watch: {
            $route: function () {
                if (this.$route.query.t) {
                    this.$store.dispatch('posts/getPostsOnTags', this)
                }
            }
        },

        methods: {
            toAllPosts(){
                this.$router.replace({query: {}});
                this.$store.dispatch('posts/getPosts', this)
            }
        },

        components: {
            PostList,
            PopularTags
        },
    }
</script>

<style lang="sass" scoped>
    .main-container
        display: grid
        grid-gap: 10px
        padding: 10px 0
        grid-template-areas: "c c c s" "c c c s" "p p p p"
        grid-template-columns: 1fr 1fr 1fr 1.2fr

        @media (max-width: 999px)
            grid-template-areas: "c c c c" "c c c c" "p p p p"


    .content
        grid-area: c
        max-width: 100%


    .tag-results
        padding: 20px
        margin-bottom: 20px


    .tags-wrapper
        position: relative
        grid-area: s

        @media (max-width: 999px)
            display: none


    .paginator-container
        grid-area: p

</style>