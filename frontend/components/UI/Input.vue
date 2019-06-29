<template>
    <div class="uniq-container">
        <md-field>
            <label><slot></slot></label>
            <md-input
                    :type="type"
                    v-model="localValue"
            />
      </md-field>
    </div>
</template>

<script>
    export default {
        name: 'InputComponent',

        props: {
            type: {
                required: false,
                default: 'text'
            },
            value: {
                required: true,
            },
        },

        /*
        Пришлось делать локальные данные, так как компонент MaterialDesign
        не возвращает объект $event
        */

        data: function() {
            return {
                localValue: ''
            }
        },

        created() {
            this.localValue = this.value
        },

        watch: {
            'localValue': function () {
                console.log('aashdjsjsjdsd');
                 this.$emit('input', this.localValue)
            }
        },
    }
</script>

<style lang="sass" scoped>
    .uniq-container:not(:first-child)
        margin-top: 20px


    .title
        margin-bottom: 5px


    input
        height: 22px
        width: 100%
        padding: 0 7px
        font-size: 14px
</style>