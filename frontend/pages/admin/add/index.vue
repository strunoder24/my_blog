<template>
    <div v-if="renderGranted" class="admin-wrapper main-container md-layout">
        <section class="section-wrapper">
            <ButtonsPanel />
            <Markdown v-model="value"/>
        </section>
    </div>
</template>

<script>
    import ButtonsPanel from '~/components/admin/ButtonsPanel.vue'
    import Markdown from '~/components/admin/Markdown.vue'
    import { mapState } from 'vuex'

    export default {
        data() {
            return {
                value: '',
                renderGranted: false //Чтобы данные не мелькали лишний раз при отсуствии доступа на раздел
            }
        },

        computed: {
            ...mapState({
                users: state => state.accounts['user-info']
            })
        },

        methods: {
        },

        components: {
            ButtonsPanel,
            Markdown
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

