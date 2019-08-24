<template>
    <div class="container main-container">
        <input
            class="input md-elevation-2"
            type="text"
            ref="input"
            @keyup.enter="sendRequest()"
            placeholder="Введите фразу или тег"
            v-model="value"
        />
        <md-button
                v-if="value"
                class="md-raised md-primary button"
                @click="sendRequest"
            >Искать
        </md-button>
    </div>
</template>

<script>
    import { mapState } from 'vuex'

    export default {
        data: () => ({
            value: ''
        }),

        computed: {
            ...mapState({searchPanelEnabled: state => state.searchEnabled})
        },

        watch: {
            searchPanelEnabled: function () {
                if (this.searchPanelEnabled) this.$refs.input.focus();
            }
        },

        methods: {
            sendRequest(){
                this.$store.commit('toggleSearchPanel', false);
            }
        }
    }
</script>

<style lang="sass" scoped>
    .container
        position: relative
        display: flex
        align-items: center
        height: 100%



    .button
        position: absolute
        height: 80%
        right: 5px
        margin: 0


    .input
        width: 100%
        height: 100%
        border: none
        border-radius: 3px
        font-size: 18px
        padding-left: 20px
        padding-right: 100px
</style>