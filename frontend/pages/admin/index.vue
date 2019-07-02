<template>
    <div class="admin-wrapper main-container md-layout">
        <login v-if="Object.keys(users).length === 0"></login>
        <section class="admin-wrapper md-layout" v-else>
            <ButtonsPanel />
            <PostsList :posts="posts.results" />
            <div class="pagination-container">
                <Paginator
                        v-if="posts.pages_count > 1"
                        :info="posts"
                        :api="'posts'"/>
            </div>
        </section>
    </div>
</template>

<script>
    import login from '~/components/admin/Login.vue'
    import PostsList from '~/components/admin/PostsList.vue'
    import ButtonsPanel from '~/components/admin/ButtonsPanel.vue'

    import { mapState } from 'vuex'

    export default {
        data(){
            return {}
        },

        computed: {
            ...mapState({
                users: state => state.accounts['user-info'],
                posts: state => state.posts.posts
            })
        },

        methods: {
        },

        components: {
            login,
            ButtonsPanel,
            PostsList
        }
    }
</script>

<style lang="sass" scoped>
    .admin-wrapper
        display: flex
        flex-direction: column
        flex: 1


    .pagination-container
        margin-top: auto
        padding: 20px 0


</style>

