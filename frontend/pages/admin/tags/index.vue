<template>
    <div class="admin-wrapper main-container md-layout">
        <section class="admin-wrapper md-layout">
            <ButtonsPanel />
        </section>
    </div>
</template>

<script>
    import ButtonsPanel from '~/components/admin/ButtonsPanel.vue'
    import { mapState } from 'vuex'

    export default {
        data(){
            return {}
        },

        created() {
            if (Object.keys(this.users).length === 0) {
                this.$router.push('admin')
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
            ButtonsPanel
        }
    }
</script>

<style lang="sass" scoped>
    .admin-wrapper
        flex: 1
</style>

