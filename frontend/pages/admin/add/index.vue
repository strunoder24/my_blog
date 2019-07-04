<template>
    <div class="admin-wrapper main-container md-layout">
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
        data(){
            return {
                value: ''
            }
        },

        created() {
            console.log(document);
            this.GTFO();
        },

        computed: {
            ...mapState({
                users: state => state.accounts['user-info']
            })
        },

        methods: {
            GTFO() {
                if (Object.keys(this.users).length === 0) {
                    this.$router.push('/admin')
                }
            },
        },

        components: {
            ButtonsPanel,
            Markdown
        }
    }
</script>

<style lang="sass" scoped>
    .admin-wrapper
        flex: 1
</style>

