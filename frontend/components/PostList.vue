<template>
    <div class="post-lists-container">
        <md-card
                class="post"
                v-for="post in posts"
                :key="post.id"
            ><div class="post-header">
                <router-link
                        :to="{name: 'post-id', params: {id: post.id}}"
                    >{{ post.title }}
                </router-link>
                <div class="post-created-date">
                    {{ date_parser(post.create_date) }}
                </div>
            </div>
            <div class="tags-container">
                <a
                        href="#"
                        v-for="tag in post.tags"
                        :key="tag.id"
                    >{{ tag.name }}</a>
            </div>
            <img
                    class="main-image"
                    :src="get_image(post)"
                    alt="Заглавная картинка поста">
        </md-card>
    </div>
</template>

<script>
    import { dateToHuman } from '~/helpers/date.js'

    export default {
        props: {
            posts: {
                type: Array,
                required: true
            }
        },

        methods: {
            date_parser(date) {
                return dateToHuman(date)
            },

            get_image(post){
                return process.env.postListImageUrl + post.main_image.file
            }
        }
    }
</script>

<style lang="sass" scoped>
    .post
        width: 100%
        padding: 20px
        margin-bottom: 10px


    .post-header
        display: flex
        align-items: center

        a
            margin: 0
            line-height: 1
            color: #000
            font-size: 26px
            font-weight: 600
            text-decoration: none



    .post-created-date
        margin-left: auto
        font-size: 16px



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

            &:hover
                color: blue


    .main-image
        width: 100%
</style>