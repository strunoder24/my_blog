<template>
    <div v-if="renderGranted" class="admin-wrapper main-container md-layout">
        <section class="section-wrapper">
            <ButtonsPanel/>
            <TagsList :tags="tags" />
            <CreateTag
                        :active="showCreateTag"
            />
        </section>
    </div>
</template>

<script>
    import ButtonsPanel from '~/components/admin/ButtonsPanel.vue'
    import CreateTag from '~/components/admin/CreateTag.vue'
    import TagsList from '~/components/admin/TagsList.vue'
    import { mapState } from 'vuex'

    export default {
        data(){
            return {
                showCreateTag: false,
                renderGranted: false
            }
        },

        created() {
            this.$store.dispatch('tags/getTags', this);
        },

        computed: {
            ...mapState({
                users: state => state.accounts['user-info'],
                tags: state => state.tags.tags
            })
        },

        methods: {
        },

        components: {
            ButtonsPanel,
            TagsList,
            CreateTag,
        },

        beforeRouteEnter(to, from, next) {
            next(
                async vm => {
                    await vm.$store.dispatch('accounts/getUserInfo', vm);
                    if (Object.keys(vm.users).length === 0) next('/admin');
                    else vm.renderGranted = true;
                }
            )
        },
    }
</script>

<style lang="sass" scoped>
    .admin-wrapper
        flex: 1
</style>

