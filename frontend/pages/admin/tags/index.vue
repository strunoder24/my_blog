<template>
    <div class="admin-wrapper main-container md-layout">
        <section class="admin-wrapper md-layout">
            <ButtonsPanel />

            <Paginator
                        v-if="tags.pages_count > 1"
                        :info="tags"
                        :api="'tags'"/>
        </section>
    </div>
</template>

<script>
    import ButtonsPanel from '~/components/admin/ButtonsPanel.vue'
    import TagsList from '~/components/admin/TagsList.vue'
    import { mapState } from 'vuex'

    export default {
        data(){
            return {}
        },

        created() {
            this.$store.dispatch('tags/getTags', {context: this});
            this.GTFO();
        },

        computed: {
            ...mapState({
                users: state => state.accounts['user-info'],
                tags: state => state.tags.tags
            })
        },

        methods: {
            GTFO() {
                if (Object.keys(this.users).length === 0) {
                    this.$router.push('admin')
                }
            }
        },

        components: {
            ButtonsPanel,
            TagsList
        }
    }
</script>

<style lang="sass" scoped>
    .admin-wrapper
        flex: 1
</style>

