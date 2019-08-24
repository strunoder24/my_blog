<template>
    <div>
        <md-card
                class="tags-container"
                :class="{'md-elevation-0': insideHeader}"
                id="sidebar"
            ><h1>Теги</h1>
            <div v-for="tag in tags.results" :key="tag.id">
                <router-link class="tag-item" :to="{name: 'index', query: {t: tag.name}}">
                    {{ tag.name }}
                </router-link>
            </div>
        </md-card>
        <div class="up-container" v-if="!insideHeader">
            <md-button class="md-icon-button up-we-go" @click="scrollToTop">
                <md-icon>arrow_upward</md-icon>
            </md-button>
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex'

    export default {
        props: {
            insideHeader: {
                type: Boolean,
                default: false,
            }
        },

        computed: {
            ...mapState({
                tags: state => state.tags.tags
            })
        },

        methods: {
            scrollToTop(){
                window.scrollTo({top: 0, behavior: 'smooth'});
            },
        },
    }
</script>

<style lang="sass" scoped>
    .tags-container
        padding: 23px 15px 15px
        z-index: 10

        h1
            margin-top: 0

        div
            a
                text-decoration: none
                transition: color linear .2s
                font-weight: 600

                &:hover
                    color: blue


    .tag-item
        font-size: 20px


    .up-container
        position: fixed
        bottom: 100px
        width: 330px
        display: flex
        justify-content: center
        z-index: 1


    .up-we-go
        height: 100px
        width: 100px

        .md-icon
            color: rgba(0,0,0, .1) !important
            font-size: 50px !important

        &:hover
            .md-icon
                color: rgba(0,0,0, .3) !important
</style>