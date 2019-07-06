<template>
    <md-button
            md-with-hover
            class="md-raised butt"
            :to="to"
            :class="['md-' + type]"
            @click="$emit('click')">
        <slot></slot>
    </md-button>
</template>

<script>
    export default {
        props: {
            type: {
                required: false,
                default: 'primary'
            },

            to: {
                required: false,
            }
        }
    }
</script>

<style lang="sass" scoped>
    .butt
        margin: 0


    .md-add
        color: #fff !important
        background-color: #69f0ae !important

        &:disabled
            background-color: #dcdcdc !important
            color: #afafaf !important
</style>