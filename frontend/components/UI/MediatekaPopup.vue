<template>
    <div class="overlay" @click.self="$emit('close')">
        <md-card class="container">
            <div class="img-layer">
                <div class="item" v-for="img in images.docs" :key="img._id">
                    <div
                            @mouseenter="hover_id = img._id"
                            @mouseleave="hover_id = 0"
                            style="position: relative;"
                        ><img :src="img.original_url">
                        <div
                                v-if="hover_id === img._id"
                                class="image-hover"
                                @click="pickImage(img)"
                            >Выбрать эту картинку?
                        </div>
                    </div>
                </div>
            </div>
            <Paginator
                v-if="images.pagingCounter > 1"
                :info="images"
                style="margin-bottom: 0"
                api="images"
                :p="p"
                @changePage="p = $event"
            />
        </md-card>
    </div>
</template>

<script>
    import { mapState } from 'vuex'

    export default {
        data: () => ({
            p: 1,
            hover_id: 0,
        }),


        created(){
            this.render_function();
        },


        computed: {
            ...mapState({
                images: state => state.posts.images
            })
        },


        methods: {
            pickImage(img) {
                this.$emit('imagePicked', {
                    id: img._id,
                    src: img.original_url
                });
                this.$emit('close');
            },

            async render_function(){
                document.body.style.overflow = 'hidden';
                await this.$store.dispatch('posts/getImages', this)
            }
        },


        beforeDestroy() {
            document.body.style.overflow = 'scroll'
        }
    }
</script>

<style lang="sass" scoped>
    .img-layer
        display: grid
        grid-gap: 10px
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr))
        padding-bottom: 20px


    .overlay
        display: flex
        position: fixed
        height: 100%
        top: 0
        right: 0
        bottom: 0
        left: 0
        padding: 20px 0
        z-index: 1000
        overflow: scroll
        background-color: rgba(0,0,0,.6)
        animation: .3s cubic-bezier(.4,0,.2,1) 1 slowDarkened
        transition-property: opacity
        will-change: opacity


    .image-hover
        position: absolute
        top: 0
        left: 0
        display: flex
        align-items: center
        justify-content: center
        font-size: 26px
        font-weight: 600
        color: #fff
        width: 100%
        height: 100%
        background-color: rgba(0,0,0,.6)
        animation: .3s cubic-bezier(.4,0,.2,1) 1 slowDarkened
        cursor: pointer
        z-index: 10


    .container
        max-width: 80%
        min-width: 30%
        margin: auto
        padding: 20px


    @keyframes slowDarkened
        0%
            background-color: rgba(0,0,0,.2)

        100%
            background-color: rgba(0,0,0,.6)
</style>