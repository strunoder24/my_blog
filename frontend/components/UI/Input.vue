<template>
    <div class="uniq-container">
        <div class="title">
            <slot></slot>
        </div>
        <input
                :type="type"
                :value="value"
                @input="$emit('input', $event.target.value)">
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
                default: '',
            }
        }
    }
</script>

<style lang="sass" scoped>
    .uniq-container:not(:first-child)
        margin-top: 20px


    input
        height: 22px
        width: 100%
        padding: 0 7px
        font-size: 14px
</style>