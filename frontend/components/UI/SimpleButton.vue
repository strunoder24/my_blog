<template>
    <md-button
            class="md-raised"
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
            }
        }
    }
</script>

<style lang="sass" scoped>
</style>