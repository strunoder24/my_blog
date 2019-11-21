<template>
    <div class="default-layout-wrapper">
        <no-ssr>
            <A-Header></A-Header>
        </no-ssr>
        <div :class="{'search-panel-closed': !searchPanelEnabled, 'search-panel-opened': searchPanelEnabled}">
            <div class="search-input-container">
                <SearchInput />
            </div>
        </div>
        <nuxt/>
    </div>
</template>

<script>
    import SearchInput from '~c/UI/inputs/SearchInput';

    import { mapState } from 'vuex';

    export default {
        created(){
            this.$bus.$on('setUserCredentials', this.setjwt);
        },

        computed: {
            ...mapState({
                searchPanelEnabled: state => state.searchEnabled
            })
        },

        methods: {
            setjwt({ token, user }) {
                localStorage.setItem('token', token);
                localStorage.setItem('user', JSON.stringify(user));
            }
        },

        components: {
            SearchInput
        }
    }
</script>

<style lang="scss">
    .default-layout-wrapper {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
        padding-top: 80px;
    }


    .search-input-container {
        width: 100%;
        height: 100%;
        padding-top: 10px;
    }
</style>

