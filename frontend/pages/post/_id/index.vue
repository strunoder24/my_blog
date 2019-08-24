<template>
    <div class="main-container">
        <md-card class="content">
            <div class="post-header">
                <div class="post-title">
                    <h1>
                        {{ post.title }}
                    </h1>
                    <div class="post-created-date">
                        {{ date_parser(post.create_date) }}
                    </div>
                </div>
                <div class="tags-container">
                    <a
                            href="#"
                            v-for="tag in post.tags"
                            :key="tag.id"
                    >{{ tag.name }}
                    </a>
                </div>
            </div>
            <img class="main-image" :src="get_main_image(post)" alt="Главное изображение поста">
            <div class="post-text markdown-parsed" v-html="$md.render(post.markdown)"></div>
        </md-card>
        <div class="tags-wrapper">
            <PopularTags/>
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    import PopularTags from '~/components/partials/PopularTags.vue'
    import { dateToHuman } from '~/helpers/date.js'

    export default {
        async fetch(context){
            await context.store.dispatch('posts/getPublishedPost', context)
        },

        computed: {
            ...mapState({
                post: state => state.posts.post,
            })
        },

        methods: {
            get_main_image(post){
                return process.env.postListImageUrl + post.main_image.file
            },

            date_parser(date) {
                return dateToHuman(date)
            },
        },

        components: {
            PopularTags
        }
    }
</script>

<style lang="sass" scoped>
    .main-container
        display: grid
        grid-gap: 10px
        padding: 10px 0
        grid-template-areas: "c c c s" "c c c s"
        grid-template-columns: 1fr 1fr 1fr 1.2fr

        @media (max-width: 999px)
            grid-template-areas: "c c c c" "c c c c"


    .content
        grid-area: c
        max-width: 100%
        padding: 20px


    .post-title
        display: flex

        h1
            max-width: 82%
            margin-top: 0
            margin-bottom: 0
            line-height: 1


    .post-created-date
        margin-left: auto
        font-size: 16px
        font-family: Lora, sans-serif
        padding: 4px 0


    .tags-wrapper
        position: relative
        grid-area: s

        @media (max-width: 999px)
            display: none


    .tags-container
        display: flex
        flex-wrap: wrap
        align-items: center
        padding: 10px 0

        a
            margin-right: 10px
            line-height: 1.6
            font-size: 18px
            text-decoration: none
            transition: color linear .2s
            font-family: Lora, sans-serif

            &:hover
                color: blue


    .main-image
        display: block
        margin: 0 auto 20px
        max-height: 444px


    .post-text
        font-family: Lora, sans-serif

</style>