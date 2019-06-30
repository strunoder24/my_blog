<template>
    <md-button
            class="md-raised"
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
    .md-add
        color: #fff !important
        background-color: #69f0ae !important
</style>