<template>
    <div class="post-lists-container">
        <PostItem v-for="post in croppedPosts"
                  :key="post._id"
                  :post='post'
                  @loadNextPost='getNext'
        />
    </div>
</template>

<script>
    import PostItem from '~c/posts/PostItem.vue'
    import IntersectorComponent from '~c/posts/PostIntersectorComponent.vue'

    export default {
        props: {
            posts: {
                type: Array,
            }
        },

        data: () => ({
            croppedPosts: [],
            allLoaded: false,
        }),

        created(){
            if (this.posts.length) {
                this.croppedPosts = [ this.posts[0] ]
            }
        },

        methods: {
            getNext(){
                const croppedLength = this.croppedPosts.length;
                const postsLength = this.posts.length;

                if (postsLength > croppedLength) {
                    this.croppedPosts.push(this.posts[croppedLength]);
                } else {
                    this.$emit('allPostsLoaded')
                }
            }
        },

        components: {
            PostItem,
            IntersectorComponent
        }
    }
</script>

<style lang="sass" scoped>
    .post
        width: 100%
        padding: 20px 20px 10px
        margin-bottom: 10px


    .post-header
        display: flex
        align-items: center

        a
            margin: 0
            line-height: 1
            color: #000
            font-size: 2em
            font-weight: 600
            text-decoration: none



    .post-created-date
        margin-left: auto
        font-size: 16px
        font-family: Lora, sans-serif



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
        width: 100%


    .preview-text
        font-size: 16px
        margin: 10px 0
        font-family: Lora, sans-serif


    .controls
        display: flex
        height: 26px
        width: 100%

    .read-next
        margin-left: auto
        font-size: 16px
        cursor: pointer
        font-family: Lora, sans-serif
</style>