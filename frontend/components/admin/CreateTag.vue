<template>
    <div>
        <md-dialog-prompt
                :md-active.sync="active"
                v-model="value"
                md-title="Создание нового тега"
                md-input-placeholder="Название тега"
                md-input-maxlength="60"
                md-confirm-text="Создать"
                md-cancel-text="Отмена"
                @md-cancel="onCancel"
                @md-confirm="createTag"/>
    </div>
</template>

<script>
    import { mapState } from 'vuex'

    export default {
        name: 'CreateTag',

        data: () => ({
            active: false,
            value: ''
        }),

        computed: {
            ...mapState({
                'createTrigger': state => state.triggers.createTag
            })
        },

        watch: {
            createTrigger: function () {
                this.active = true
            }
        },

        methods: {
            createTag(){
                this.$axios.$post('/api/tags/', {
                    name: this.value
                })
                    .then(r => {
                        this.value = '';
                        this.$store.dispatch('tags/getTags', this);
                    })
                    .catch(e => {
                        console.log(e.response);
                    })
            },

            onCancel() {
                this.value = ''
            },
        }
    }
</script>

<style lang="sass" scoped>

</style>