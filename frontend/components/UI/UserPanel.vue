<template>
    <div class='user-panel' v-if='Object.keys(user).length' @click='toggleOptions'>
        <span>Привет {{ cutDog(user.email) }}!</span>
        <md-card class='user-panel-dropdown' v-if='showOptions' v-click-outside='closeOptions'>
            <md-button class='item' v-if='user.isAdmin' to='admin' @click='closeOptions'>
                В админку
            </md-button>
            <md-button class='item' @click='logout'>
                Выход
            </md-button>
        </md-card>
    </div>
</template>

<script>
    import { mapState } from 'vuex'

    export default {
        data: () => ({
            showOptions: false
        }),
        mounted() {},
        computed: {
            ...mapState({
                user: state => state.accounts['user-info'],
            })
        },
        methods: {
            cutDog(email) {
                return email.split('@')[0]
            },

            toggleOptions(){
                this.showOptions = !this.showOptions
            },

            closeOptions(){
                this.showOptions = false
            },

            logout(){
                this.$store.dispatch('accounts/logout', this);
                this.closeOptions();
            }
        },
        components: {}
    }
</script>

<style lang='scss' scoped>
    .user-panel {
        position: relative;
        display: flex;
        align-items: center;
        cursor: pointer;
    }

    .user-panel-dropdown {
        position: absolute;
        left: 0;
        top: 40px;
        width: 100%;
        padding: 10px 0;
        transition: top linear 1s, opacity .5s linear;
    }

    .item {
        width: 100%;
        margin: 0;
    }

</style>