<template>
    <div v-if="renderGranted"
         class="admin-wrapper main-container md-layout"
         style="flex: 1">
        <login v-if="Object.keys(user).length === 0"></login>
        <section class="admin-wrapper" v-else>
            <ButtonsPanel />
            <PostsList :posts="posts.results" />
            <div class="pagination-container">
                <Paginator
                        v-if="posts && posts.pages_count > 1"
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
            return {
                renderGranted: false
            }
        },

        created(){
            this.renderMethod();
        },

        computed: {
            ...mapState({
                user: state => state.accounts['user-info'],
                posts: state => state.posts.posts
            })
        },

        methods: {
            async renderMethod(){
                await this.$store.dispatch('accounts/getUserInfo', this);
                await this.$store.dispatch('posts/getPosts', this);
                this.renderGranted = true
            },
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
        width: 100%
        max-width: 1200px
        margin: 0 auto


    .pagination-container
        margin-top: auto
        padding: 20px 0


</style>

