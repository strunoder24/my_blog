<template>
    <header class="md-layout md-alignment-center header md-elevation-2">
        <div class="md-layout inner-layout" v-if="!show_drawer">
            <div class="logo-container">
                <router-link to="/" class="logo-text">Блог разработчика</router-link>
            </div>
            <div class="md-layout-item">
                <md-button to="about">Обо мне</md-button>
                <md-button to="services">Услуги</md-button>
                <md-button to="projects">Портфолио</md-button>
                <md-button to="contacts">Контакты</md-button>
            </div>
        </div>
        <div class="md-layout inner-layout" v-else>
            <md-button class="md-icon-button" @click="showNavigation = true">
                <md-icon class="md-size" style="font-size: 27px !important;">menu</md-icon>
            </md-button>
            <div class="logo-container">
                <router-link to="/" class="logo-text">Блог разработчика</router-link>
            </div>
            <md-drawer :md-active.sync="showNavigation" md-swipeable>
            <md-toolbar class="md-transparent drawer-container" md-elevation="0">
                <span>Блог разработчика</span>
            </md-toolbar>

            <md-list @click="showNavigation = false">
                <md-list-item to="about">
                    <span class="md-list-item-text">Обо мне</span>
                </md-list-item>
                <md-list-item to="services">
                    <span class="md-list-item-text">Услуги</span>
                </md-list-item>
                <md-list-item to="projects">
                    <span class="md-list-item-text">Портфолио</span>
                </md-list-item>
                <md-list-item to="contacts">
                    <span class="md-list-item-text">Контакты</span>
                </md-list-item>
            </md-list>
        </md-drawer>
        </div>
        <md-button to="admin" class="md-icon-button admin-icon">
            <md-icon>edit</md-icon>
            <md-tooltip>Админка</md-tooltip>
        </md-button>
    </header>
</template>

<script>
    export default {
        data: function () {
            return {
                current_place: this.$route.name,
                show_drawer: false,
                showNavigation: false,
                showSidepanel: false,
            }
        },

        created() {
            this.resize(window.innerWidth);

            window.addEventListener('resize', function (e) {
                this.resize(e.target.innerWidth)
            }.bind(this))
        },

        watch: {
            '$route': function () {
                this.current_place = this.$route.name
            }
        },

        methods: {
            resize(width){
                this.show_drawer = width < 1000
            },
        },
    }
</script>

<style lang="sass" scoped>
    .header
        background-color: #efefef
        height: 80px



    .logo-container
        display: flex
        align-items: center
        width: 240px



    .logo-text
        font-size: 22px
        color: #000 !important
        text-decoration: none !important

        &:hover
            color: #000 !important



    .inner-layout
        @media (min-width: 1000px)
            margin: 0 62px

        @media (max-width: 999px)
            margin: 0 10px



    .md-active
        color: #2196f3


    .drawer-container
        height: 60px
        border-bottom: 1px solid black
        font-size: 26px


    .md-list-item-text
        font-size: 16px

    .admin-icon
        position: absolute

        @media (min-width: 1000px)
            right: 55px

        @media (max-width: 999px)
            right: 20px

    .md-tooltip
        font-size: 16px
        font-weight: 400 !important

        @media (min-width: 1000px)
            height: 25px !important

</style>